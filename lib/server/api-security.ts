import { NextRequest } from 'next/server'

type IdempotencyRecord = {
  status: number
  body: unknown
  createdAt: number
}

type RateLimitRecord = {
  count: number
  resetAt: number
}

const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000
const IDEMPOTENCY_MAX_KEYS = 5000
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const UPSTASH_TIMEOUT_MS = 3000

const idempotencyStore = new Map<string, IdempotencyRecord>()
const rateLimitStore = new Map<string, RateLimitRecord>()

function pruneIdempotencyStore(now: number): void {
  for (const [key, value] of idempotencyStore.entries()) {
    if (now - value.createdAt > IDEMPOTENCY_TTL_MS) {
      idempotencyStore.delete(key)
    }
  }
  if (idempotencyStore.size <= IDEMPOTENCY_MAX_KEYS) return

  const sorted = [...idempotencyStore.entries()].sort((a, b) => a[1].createdAt - b[1].createdAt)
  const overflow = sorted.length - IDEMPOTENCY_MAX_KEYS
  for (let index = 0; index < overflow; index += 1) {
    idempotencyStore.delete(sorted[index][0])
  }
}

function buildIdempotencyKey(scope: string, key: string): string {
  return `${scope}:${key}`
}

export function getIdempotencyReplay(scope: string, key: string | null): IdempotencyRecord | null {
  if (!key) return null
  const now = Date.now()
  pruneIdempotencyStore(now)
  const value = idempotencyStore.get(buildIdempotencyKey(scope, key))
  if (!value) return null
  if (now - value.createdAt > IDEMPOTENCY_TTL_MS) {
    idempotencyStore.delete(buildIdempotencyKey(scope, key))
    return null
  }
  return value
}

export function setIdempotencyReplay(
  scope: string,
  key: string | null,
  response: { status: number; body: unknown }
): void {
  if (!key) return
  const now = Date.now()
  pruneIdempotencyStore(now)
  idempotencyStore.set(buildIdempotencyKey(scope, key), {
    status: response.status,
    body: response.body,
    createdAt: now,
  })
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

async function runUpstashCommand(path: string): Promise<unknown> {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!baseUrl || !token) {
    throw new Error('Upstash Redis env vars not configured')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTASH_TIMEOUT_MS)
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Upstash request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as { result?: unknown; error?: string }
    if (payload.error) {
      throw new Error(payload.error)
    }
    return payload.result
  } finally {
    clearTimeout(timeout)
  }
}

async function checkRateLimitInUpstash(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now()
  const windowIndex = Math.floor(now / windowMs)
  const windowResetAt = (windowIndex + 1) * windowMs
  const redisKey = `ratelimit:${key}:${windowIndex}`
  const ttlSeconds = Math.max(Math.ceil((windowResetAt - now) / 1000), 1)

  const countResult = await runUpstashCommand(`/incr/${encodeURIComponent(redisKey)}`)
  const count = Number(countResult)
  if (!Number.isFinite(count)) {
    throw new Error('Invalid Upstash INCR response')
  }

  // Best effort TTL so old window keys are cleaned up.
  await runUpstashCommand(`/expire/${encodeURIComponent(redisKey)}/${ttlSeconds}`).catch(() => {})

  if (count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: windowResetAt,
    }
  }

  return {
    allowed: true,
    remaining: Math.max(maxRequests - count, 0),
    resetAt: windowResetAt,
  }
}

function checkRateLimitInMemory(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const existing = rateLimitStore.get(key)

  if (!existing || now > existing.resetAt) {
    const next = { count: 1, resetAt: now + windowMs }
    rateLimitStore.set(key, next)
    return { allowed: true, remaining: Math.max(maxRequests - 1, 0), resetAt: next.resetAt }
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  rateLimitStore.set(key, existing)
  return { allowed: true, remaining: Math.max(maxRequests - existing.count, 0), resetAt: existing.resetAt }
}

export async function checkRateLimit(
  request: NextRequest,
  scope: string,
  maxRequests: number,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const ip = getClientIp(request)
  const key = `${scope}:${ip}`

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await checkRateLimitInUpstash(key, maxRequests, windowMs)
    } catch {
      // Fall back to in-memory limiter if Upstash is temporarily unavailable.
      return checkRateLimitInMemory(key, maxRequests, windowMs)
    }
  }

  return checkRateLimitInMemory(key, maxRequests, windowMs)
}
