import { NextRequest, NextResponse } from 'next/server'
import { getOrderById } from '@/lib/services/order-storage-persistent'
import { checkRateLimit } from '@/lib/server/api-security'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()

  try {
    const rateLimit = await checkRateLimit(request, 'api:orders:detail', 240, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const orderId = decodeURIComponent(params.orderId)
    const order = await getOrderById(orderId)

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404, headers: { 'x-request-id': requestId } }
      )
    }

    const response = NextResponse.json(
      { success: true, order },
      { headers: { 'x-request-id': requestId } }
    )
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}
