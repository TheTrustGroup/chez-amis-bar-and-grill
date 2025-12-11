import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, getOrdersByStatus, getRecentOrders, getOrdersCountByStatus } from '@/lib/services/order-storage'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

/**
 * GET /api/orders/list
 * Get all orders or filter by status
 * 
 * Query parameters:
 * - status: Filter by status (pending, preparing, ready, out-for-delivery, delivered, cancelled)
 * - limit: Limit number of results (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled' | null
    const limit = parseInt(searchParams.get('limit') || '50')

    let orders
    if (status) {
      orders = await getOrdersByStatus(status)
    } else {
      // Get all orders, then limit if needed
      const allOrders = await getAllOrders()
      orders = limit > 0 ? allOrders.slice(0, limit) : allOrders
    }

    const counts = await getOrdersCountByStatus()

    console.log(`📥 GET /api/orders/list: Returning ${orders.length} orders (status: ${status || 'all'})`)

    return NextResponse.json({
      success: true,
      orders,
      counts,
      total: orders.length,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

