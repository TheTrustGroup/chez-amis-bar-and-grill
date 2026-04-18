import { NextRequest, NextResponse } from 'next/server'
import { processNotificationOutbox } from '@/lib/services/notification-outbox'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function isAuthorized(request: NextRequest): boolean {
  const expectedSecret = process.env.OUTBOX_CRON_SECRET || process.env.CRON_SECRET
  if (!expectedSecret) return false
  const authHeader = request.headers.get('authorization')
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  const providedSecret =
    bearer || request.headers.get('x-cron-secret') || request.nextUrl.searchParams.get('secret')
  return providedSecret === expectedSecret
}

async function runRetry(request: NextRequest, limitFromPayload?: number) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'x-request-id': requestId } })
  }

  const limit = Math.min(Math.max(limitFromPayload || 50, 1), 500)
  const result = await processNotificationOutbox(limit)

  return NextResponse.json(
    {
      success: true,
      result,
    },
    { headers: { 'x-request-id': requestId } }
  )
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as { limit?: number }
  return runRetry(request, payload.limit)
}

export async function GET(request: NextRequest) {
  const limitParam = Number.parseInt(request.nextUrl.searchParams.get('limit') || '50', 10)
  return runRetry(request, limitParam)
}
