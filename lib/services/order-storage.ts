/**
 * Order Storage Service
 * File-based persistent storage for orders
 * Orders are saved to a JSON file that persists across server restarts
 */

import type { OrderRequest } from '@/app/api/orders/route'
import { promises as fs } from 'fs'
import path from 'path'

export interface StoredOrder extends OrderRequest {
  id: string
  createdAt: string
  status: 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
  updatedAt: string
}

// Storage file path
const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'orders.json')

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist, ignore error
  }
}

// Read orders from file
async function readOrders(): Promise<StoredOrder[]> {
  try {
    await ensureStorageDir()
    const data = await fs.readFile(STORAGE_FILE, 'utf-8')
    const orders = JSON.parse(data)
    return Array.isArray(orders) ? orders : []
  } catch (error) {
    // File doesn't exist yet, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    console.error('Error reading orders:', error)
    return []
  }
}

// Write orders to file
async function writeOrders(orders: StoredOrder[]): Promise<boolean> {
  try {
    await ensureStorageDir()
    await fs.writeFile(STORAGE_FILE, JSON.stringify(orders, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing orders:', error)
    return false
  }
}

/**
 * Save a new order
 */
export async function saveOrder(orderData: OrderRequest): Promise<StoredOrder> {
  const now = new Date().toISOString()
  const storedOrder: StoredOrder = {
    ...orderData,
    id: orderData.orderId,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
  }

  const orders = await readOrders()
  orders.push(storedOrder)
  
  // Keep only last 1000 orders (prevent file from growing too large)
  const trimmedOrders = orders.length > 1000 ? orders.slice(-1000) : orders
  
  await writeOrders(trimmedOrders)
  
  console.log('✅ Order saved to persistent storage:', storedOrder.orderId)
  return storedOrder
}

/**
 * Get all orders
 */
export async function getAllOrders(): Promise<StoredOrder[]> {
  const orders = await readOrders()
  return orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status: StoredOrder['status']): Promise<StoredOrder[]> {
  const orders = await readOrders()
  return orders
    .filter(order => order.status === status)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<StoredOrder | undefined> {
  const orders = await readOrders()
  return orders.find(order => order.orderId === orderId || order.id === orderId)
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: StoredOrder['status']
): Promise<StoredOrder | null> {
  const orders = await readOrders()
  const orderIndex = orders.findIndex(order => 
    order.orderId === orderId || order.id === orderId
  )
  
  if (orderIndex === -1) {
    return null
  }

  orders[orderIndex].status = status
  orders[orderIndex].updatedAt = new Date().toISOString()

  await writeOrders(orders)
  console.log('✅ Order status updated:', orderId, '->', status)
  
  return orders[orderIndex]
}

/**
 * Get recent orders (last N orders)
 */
export async function getRecentOrders(limit: number = 50): Promise<StoredOrder[]> {
  const orders = await getAllOrders()
  return orders.slice(0, limit)
}

/**
 * Get orders count by status
 */
export async function getOrdersCountByStatus(): Promise<Record<StoredOrder['status'], number>> {
  const orders = await readOrders()
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
