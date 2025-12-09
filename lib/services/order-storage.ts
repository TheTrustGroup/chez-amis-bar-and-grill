/**
 * Order Storage Service
 * Simple in-memory storage for orders
 * In production, replace with a database (PostgreSQL, MongoDB, etc.)
 */

import type { OrderRequest } from '@/app/api/orders/route'

export interface StoredOrder extends OrderRequest {
  id: string
  createdAt: string
  status: 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
  updatedAt: string
}

// In-memory storage (replace with database in production)
let orders: StoredOrder[] = []

/**
 * Save a new order
 */
export function saveOrder(orderData: OrderRequest): StoredOrder {
  const now = new Date().toISOString()
  const storedOrder: StoredOrder = {
    ...orderData,
    id: orderData.orderId,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
  }

  orders.push(storedOrder)
  
  // Keep only last 1000 orders in memory (prevent memory issues)
  if (orders.length > 1000) {
    orders = orders.slice(-1000)
  }

  return storedOrder
}

/**
 * Get all orders
 */
export function getAllOrders(): StoredOrder[] {
  return [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

/**
 * Get orders by status
 */
export function getOrdersByStatus(status: StoredOrder['status']): StoredOrder[] {
  return orders
    .filter(order => order.status === status)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

/**
 * Get order by ID
 */
export function getOrderById(orderId: string): StoredOrder | undefined {
  return orders.find(order => order.orderId === orderId || order.id === orderId)
}

/**
 * Update order status
 */
export function updateOrderStatus(
  orderId: string,
  status: StoredOrder['status']
): StoredOrder | null {
  const order = getOrderById(orderId)
  if (!order) {
    return null
  }

  order.status = status
  order.updatedAt = new Date().toISOString()

  return order
}

/**
 * Get recent orders (last N orders)
 */
export function getRecentOrders(limit: number = 50): StoredOrder[] {
  return getAllOrders().slice(0, limit)
}

/**
 * Get orders count by status
 */
export function getOrdersCountByStatus(): Record<StoredOrder['status'], number> {
  const counts: Record<string, number> = {
    pending: 0,
    preparing: 0,
    ready: 0,
    'out-for-delivery': 0,
    delivered: 0,
    cancelled: 0,
  }

  orders.forEach(order => {
    counts[order.status] = (counts[order.status] || 0) + 1
  })

  return counts as Record<StoredOrder['status'], number>
}

