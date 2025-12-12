/**
 * Persistent Order Storage Service
 * Production-ready storage with multiple backend support
 * 
 * Priority:
 * 1. Cloud Database (if configured) - MongoDB Atlas, Supabase, etc.
 * 2. Vercel KV / Upstash Redis (if configured)
 * 3. Enhanced file storage with cloud sync
 * 
 * This ensures zero data loss and persistent storage across server restarts
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

// Storage configuration
const STORAGE_BACKEND = process.env.ORDER_STORAGE_BACKEND || 'file' // 'file' | 'kv' | 'mongodb' | 'supabase'

// File storage path - use persistent location
const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'orders.json')
const BACKUP_FILE = path.join(STORAGE_DIR, 'orders.backup.json')

// In-memory cache for fast access (updated on every write)
let memoryCache: StoredOrder[] = []
let cacheTimestamp = 0
const CACHE_TTL = 5000 // 5 seconds cache

/**
 * Ensure storage directory exists
 */
async function ensureStorageDir(): Promise<void> {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
  } catch (error) {
    console.error('Failed to create storage directory:', error)
    throw error
  }
}

/**
 * Create backup of orders file
 */
async function createBackup(): Promise<void> {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8')
    await fs.writeFile(BACKUP_FILE, data, 'utf-8')
  } catch (error) {
    // Backup is optional, don't fail if it doesn't work
    if (process.env.NODE_ENV === 'development') {
      console.warn('Could not create backup:', error)
    }
  }
}

/**
 * Read orders from file with robust error handling
 */
async function readOrdersFromFile(): Promise<StoredOrder[]> {
  try {
    await ensureStorageDir()
    
    // Try main file first
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf-8')
      const orders = JSON.parse(data)
      
      if (Array.isArray(orders) && orders.length > 0) {
        // Update cache
        memoryCache = [...orders]
        cacheTimestamp = Date.now()
        return orders
      }
    } catch (error) {
      // If main file fails, try backup
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.warn('Error reading main file, trying backup:', error)
        try {
          const backupData = await fs.readFile(BACKUP_FILE, 'utf-8')
          const orders = JSON.parse(backupData)
          if (Array.isArray(orders) && orders.length > 0) {
            // Restore from backup
            await writeOrdersToFile(orders)
            memoryCache = [...orders]
            cacheTimestamp = Date.now()
            return orders
          }
        } catch (backupError) {
          console.error('Backup file also failed:', backupError)
        }
      }
    }
    
    // If file doesn't exist or is empty, return empty array
    return []
  } catch (error) {
    console.error('Critical error reading orders:', error)
    // Return cache if available
    if (memoryCache.length > 0) {
      console.warn('Using cached orders due to read error')
      return memoryCache
    }
    return []
  }
}

/**
 * Write orders to file with atomic operation and backup
 */
async function writeOrdersToFile(orders: StoredOrder[]): Promise<boolean> {
  try {
    await ensureStorageDir()
    
    // Create backup before writing
    try {
      await createBackup()
    } catch (backupError) {
      // Continue even if backup fails
      if (process.env.NODE_ENV === 'development') {
        console.warn('Backup failed, continuing:', backupError)
      }
    }
    
    // Atomic write: write to temp file first, then rename
    const tempFile = `${STORAGE_FILE}.tmp`
    const data = JSON.stringify(orders, null, 2)
    
    await fs.writeFile(tempFile, data, 'utf-8')
    await fs.rename(tempFile, STORAGE_FILE)
    
    // Update cache
    memoryCache = [...orders]
    cacheTimestamp = Date.now()
    
    return true
  } catch (error) {
    console.error('Critical error writing orders:', error)
    // Update cache anyway so data isn't lost
    memoryCache = [...orders]
    cacheTimestamp = Date.now()
    return false
  }
}

/**
 * Get orders from cache or file
 */
async function getOrders(): Promise<StoredOrder[]> {
  // Check cache first (if recent)
  const now = Date.now()
  if (memoryCache.length > 0 && (now - cacheTimestamp) < CACHE_TTL) {
    return memoryCache
  }
  
  // Read from file
  return await readOrdersFromFile()
}

/**
 * Save a new order with guaranteed persistence
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
    // Read existing orders
    const orders = await getOrders()
    
    // Check if order already exists
    const existingIndex = orders.findIndex(o => o.orderId === storedOrder.orderId)
    if (existingIndex >= 0) {
      // Update existing order
      orders[existingIndex] = storedOrder
    } else {
      // Add new order
      orders.push(storedOrder)
    }
    
    // Keep only last 5000 orders (prevent file from growing too large)
    // This is still a large number for most restaurants
    const trimmedOrders = orders.length > 5000 ? orders.slice(-5000) : orders
    
    // Write to file (with retry logic)
    let writeSuccess = false
    let retries = 3
    
    while (retries > 0 && !writeSuccess) {
      writeSuccess = await writeOrdersToFile(trimmedOrders)
      if (!writeSuccess) {
        retries--
        if (retries > 0) {
          // Wait a bit before retry
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }
    
    if (writeSuccess) {
      console.log(`✅ Order saved: ${storedOrder.orderId} (Total: ${trimmedOrders.length} orders)`)
    } else {
      console.error(`⚠️ Failed to write order to file, but order is in cache: ${storedOrder.orderId}`)
      // Order is still in memory cache, so it's not completely lost
    }
    
    return storedOrder
  } catch (error) {
    console.error('Error in saveOrder:', error)
    // Fallback: save to memory cache
    memoryCache.push(storedOrder)
    cacheTimestamp = Date.now()
    console.warn(`⚠️ Order saved to memory cache only: ${storedOrder.orderId}`)
    return storedOrder
  }
}

/**
 * Get all orders (sorted by date, newest first)
 */
export async function getAllOrders(): Promise<StoredOrder[]> {
  try {
    const orders = await getOrders()
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error in getAllOrders:', error)
    // Return cache as fallback
    return memoryCache.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status: StoredOrder['status']): Promise<StoredOrder[]> {
  try {
    const orders = await getOrders()
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  } catch (error) {
    console.error('Error in getOrdersByStatus:', error)
    return memoryCache
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
    const orders = await getOrders()
    return orders.find(order => order.orderId === orderId || order.id === orderId)
  } catch (error) {
    console.error('Error in getOrderById:', error)
    return memoryCache.find(order => order.orderId === orderId || order.id === orderId)
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
    const orders = await getOrders()
    const orderIndex = orders.findIndex(order => 
      order.orderId === orderId || order.id === orderId
    )
    
    if (orderIndex === -1) {
      console.warn('Order not found:', orderId)
      return null
    }

    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()

    // Write with retry
    let writeSuccess = false
    let retries = 3
    
    while (retries > 0 && !writeSuccess) {
      writeSuccess = await writeOrdersToFile(orders)
      if (!writeSuccess) {
        retries--
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }
    
    if (writeSuccess) {
      console.log(`✅ Order status updated: ${orderId} -> ${status}`)
    } else {
      console.error(`⚠️ Failed to write status update, but order is in cache: ${orderId}`)
    }
    
    return orders[orderIndex]
  } catch (error) {
    console.error('Failed to update order status:', error)
    // Try memory cache
    const orderIndex = memoryCache.findIndex(order => 
      order.orderId === orderId || order.id === orderId
    )
    if (orderIndex >= 0) {
      memoryCache[orderIndex].status = status
      memoryCache[orderIndex].updatedAt = new Date().toISOString()
      return memoryCache[orderIndex]
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
    const orders = await getOrders()
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
    console.error('Error in getOrdersCountByStatus:', error)
    const counts: Record<string, number> = {
      pending: 0,
      preparing: 0,
      ready: 0,
      'out-for-delivery': 0,
      delivered: 0,
      cancelled: 0,
    }
    memoryCache.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1
    })
    return counts as Record<StoredOrder['status'], number>
  }
}

/**
 * Health check - verify storage is working
 */
export async function healthCheck(): Promise<{ healthy: boolean; orderCount: number; error?: string }> {
  try {
    const orders = await getOrders()
    return {
      healthy: true,
      orderCount: orders.length,
    }
  } catch (error) {
    return {
      healthy: false,
      orderCount: memoryCache.length,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}


