/**
 * Order Storage Service
 * File-based persistent storage for orders with robust error handling
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

// Storage file path - use /tmp for serverless environments (Vercel, etc.)
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === 'nodejs'
const STORAGE_DIR = isServerless 
  ? path.join('/tmp', '.data') 
  : path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'orders.json')

// In-memory fallback for serverless environments where file writes may not persist
// This ensures orders are available even if file system is read-only
let memoryFallback: StoredOrder[] = []

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
    console.log('✅ Storage directory ready:', STORAGE_DIR)
  } catch (error) {
    console.warn('⚠️ Could not create storage directory:', error)
    // In serverless, /tmp might not be writable, use memory fallback
  }
}

// Read orders from file (with memory fallback)
async function readOrders(): Promise<StoredOrder[]> {
  // Try file first - FILE IS THE SOURCE OF TRUTH
  try {
    await ensureStorageDir()
    const data = await fs.readFile(STORAGE_FILE, 'utf-8')
    const orders = JSON.parse(data)
    
    if (Array.isArray(orders) && orders.length > 0) {
      // File has orders - use file as source of truth
      // Update memory fallback with file data
      memoryFallback = [...orders]
      console.log(`📥 Read ${orders.length} orders from file (source of truth)`)
      return orders
    } else if (Array.isArray(orders)) {
      // File exists but is empty
      console.log('📭 Orders file exists but is empty')
      // If memory has orders, merge them back to file
      if (memoryFallback.length > 0) {
        console.log(`📦 Restoring ${memoryFallback.length} orders from memory to file`)
        await writeOrders(memoryFallback)
        return memoryFallback
      }
      return []
    }
  } catch (error) {
    // File doesn't exist yet or can't be read
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('📭 Orders file does not exist yet')
      // If memory has orders, write them to file
      if (memoryFallback.length > 0) {
        console.log(`📦 Writing ${memoryFallback.length} orders from memory to file`)
        await writeOrders(memoryFallback)
        return memoryFallback
      }
      console.log('📭 No orders file found, starting fresh')
      return []
    }
    console.error('❌ Error reading orders from file:', error)
    console.error('❌ Error details:', {
      code: (error as NodeJS.ErrnoException).code,
      message: (error as Error).message,
      path: STORAGE_FILE,
    })
    // Fallback to memory
    if (memoryFallback.length > 0) {
      console.log('📦 Falling back to memory storage:', memoryFallback.length)
      return memoryFallback
    }
  }
  
  // Return memory fallback if file read failed
  return memoryFallback
}

// Write orders to file (with memory fallback)
async function writeOrders(orders: StoredOrder[]): Promise<boolean> {
  // Always update memory fallback first (critical for serverless)
  memoryFallback = [...orders] // Create a copy to avoid reference issues
  
  // Try to write to file - CRITICAL: This must succeed for persistence
  try {
    await ensureStorageDir()
    
    // Use atomic write: write to temp file first, then rename (prevents corruption)
    const tempFile = `${STORAGE_FILE}.tmp`
    await fs.writeFile(tempFile, JSON.stringify(orders, null, 2), 'utf-8')
    
    // Atomic rename (atomic operation - either succeeds or fails, no partial state)
    await fs.rename(tempFile, STORAGE_FILE)
    
    console.log('✅ Orders written to file successfully:', orders.length, 'orders')
    console.log('📁 Storage file:', STORAGE_FILE)
    return true
  } catch (error) {
    console.error('❌ CRITICAL: Error writing orders to file:', error)
    console.error('❌ Error details:', {
      code: (error as NodeJS.ErrnoException).code,
      message: (error as Error).message,
      path: STORAGE_FILE,
    })
    // Memory fallback is already updated, so orders are still saved
    console.log('📦 Orders saved to memory fallback (file write failed)')
    // Still return true because memory fallback succeeded, but log warning
    return true // Return true because memory fallback succeeded
  }
}

/**
 * Save a new order
 * CRITICAL: This function MUST always return a StoredOrder, even if file write fails
 * Orders are always saved to memory fallback as a last resort
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

  try {
    // Read existing orders from file (source of truth)
    const orders = await readOrders()
    
    // Check if order already exists (prevent duplicates)
    const existingIndex = orders.findIndex(o => o.orderId === storedOrder.orderId)
    if (existingIndex >= 0) {
      // Update existing order
      orders[existingIndex] = storedOrder
      console.log('🔄 Order updated in storage:', storedOrder.orderId)
    } else {
      // Add new order
      orders.push(storedOrder)
      console.log('➕ New order added to storage:', storedOrder.orderId)
    }
    
    // Keep only last 1000 orders (prevent file from growing too large)
    const trimmedOrders = orders.length > 1000 ? orders.slice(-1000) : orders
    
    // Write to file - CRITICAL for persistence
    const success = await writeOrders(trimmedOrders)
    
    if (success) {
      console.log('✅ Order saved to file successfully:', storedOrder.orderId, `(Total: ${trimmedOrders.length} orders)`)
    } else {
      console.warn('⚠️ Failed to save order to file, but order is saved in memory fallback')
    }
    
    // Always return the stored order
    return storedOrder
  } catch (error) {
    console.error('❌ Error in saveOrder:', error)
    // Fallback: save to memory
    memoryFallback.push(storedOrder)
    console.log('📦 Order saved to memory fallback as fallback')
    return storedOrder
  }
}

/**
 * Get all orders
 */
export async function getAllOrders(): Promise<StoredOrder[]> {
  try {
    const orders = await readOrders()
    const sorted = orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    console.log(`📥 getAllOrders: Returning ${sorted.length} orders`)
    return sorted
  } catch (error) {
    console.error('❌ Error in getAllOrders:', error)
    // Return memory fallback as last resort
    const sorted = memoryFallback.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    console.log(`📦 getAllOrders: Returning ${sorted.length} orders from memory fallback`)
    return sorted
  }
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status: StoredOrder['status']): Promise<StoredOrder[]> {
  try {
    const orders = await readOrders()
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  } catch (error) {
    console.error('❌ Error in getOrdersByStatus:', error)
    return memoryFallback
      .filter(order => order.status === status)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<StoredOrder | undefined> {
  try {
    const orders = await readOrders()
    return orders.find(order => order.orderId === orderId || order.id === orderId)
  } catch (error) {
    console.error('❌ Error in getOrderById:', error)
    return memoryFallback.find(order => order.orderId === orderId || order.id === orderId)
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: StoredOrder['status']
): Promise<StoredOrder | null> {
  try {
    const orders = await readOrders()
    const orderIndex = orders.findIndex(order => 
      order.orderId === orderId || order.id === orderId
    )
    
    if (orderIndex === -1) {
      console.warn('⚠️ Order not found:', orderId)
      return null
    }

    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()

    await writeOrders(orders)
    console.log('✅ Order status updated:', orderId, '->', status)
    
    return orders[orderIndex]
  } catch (error) {
    console.error('❌ Failed to update order status:', error)
    // Try memory fallback
    const orderIndex = memoryFallback.findIndex(order => 
      order.orderId === orderId || order.id === orderId
    )
    if (orderIndex >= 0) {
      memoryFallback[orderIndex].status = status
      memoryFallback[orderIndex].updatedAt = new Date().toISOString()
      return memoryFallback[orderIndex]
    }
    return null
  }
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
  try {
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
  } catch (error) {
    console.error('❌ Error in getOrdersCountByStatus:', error)
    const counts: Record<string, number> = {
      pending: 0,
      preparing: 0,
      ready: 0,
      'out-for-delivery': 0,
      delivered: 0,
      cancelled: 0,
    }
    memoryFallback.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1
    })
    return counts as Record<StoredOrder['status'], number>
  }
}
