import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, getOrdersByStatus, getRecentOrders, getOrdersCountByStatus } from '@/lib/services/order-storage-persistent'

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic'
// No caching for admin dashboard (needs real-time data)
export const revalidate = 0

/**
 * GET /api/orders/list
 * Get all orders or filter by status with pagination
 * 
 * Query parameters:
 * - status: Filter by status (pending, preparing, ready, out-for-delivery, delivered, cancelled)
 * - limit: Limit number of results (default: 100, max: 1000)
 * - offset: Pagination offset (default: 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled' | null
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 1000) // Max 1000 per request
    const offset = parseInt(searchParams.get('offset') || '0')

    let orders
    if (status) {
      orders = await getOrdersByStatus(status)
    } else {
      // Get all orders
      orders = await getAllOrders()
    }

    // Apply pagination
    const total = orders.length
    const paginatedOrders = limit > 0 ? orders.slice(offset, offset + limit) : orders

    const counts = await getOrdersCountByStatus()

    // Log only in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📥 GET /api/orders/list: Returning ${paginatedOrders.length} orders (status: ${status || 'all'}, offset: ${offset}, limit: ${limit})`)
    }

    // Add performance headers
    const response = NextResponse.json({
      success: true,
      orders: paginatedOrders,
      counts,
      total,
      pagination: {
        offset,
        limit,
        hasMore: offset + limit < total,
      },
    })

    // Add cache headers (short cache for admin dashboard)
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('X-Total-Count', total.toString())

    return response
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

