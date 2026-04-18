import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getOutboxSummary, processNotificationOutbox } from '@/lib/services/notification-outbox'
import { checkRateLimit } from '@/lib/server/api-security'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'x-request-id': requestId } })
  }

  const rate = await checkRateLimit(request, 'api:admin:outbox:get', 120, 60_000)
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'x-request-id': requestId } })
  }

  const limit = Math.min(Math.max(Number.parseInt(request.nextUrl.searchParams.get('limit') || '100', 10), 1), 500)
  const summary = await getOutboxSummary(limit)
  return NextResponse.json(
    {
      success: true,
      counts: summary.counts,
      items: summary.items,
    },
    { headers: { 'x-request-id': requestId } }
  )
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'x-request-id': requestId } })
  }

  const rate = await checkRateLimit(request, 'api:admin:outbox:retry', 30, 60_000)
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'x-request-id': requestId } })
  }

  const payload = (await request.json().catch(() => ({}))) as { limit?: number }
  const limit = Math.min(Math.max(payload.limit || 25, 1), 200)
  const result = await processNotificationOutbox(limit)

  return NextResponse.json(
    {
      success: true,
      result,
    },
    { headers: { 'x-request-id': requestId } }
  )
}
