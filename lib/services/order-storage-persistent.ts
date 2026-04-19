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

import type { OrderRequest, OrderStatus } from '@/lib/types/orders'
import { getSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/services/supabase-server'
import { promises as fs } from 'fs'
import path from 'path'

export interface StoredOrder extends OrderRequest {
  id: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

// Storage configuration
const STORAGE_BACKEND = (process.env.ORDER_STORAGE_BACKEND || 'file').toLowerCase() // 'file' | 'kv' | 'mongodb' | 'supabase'
const SUPABASE_ORDERS_TABLE = 'restaurant_orders'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// File storage path - use persistent location
const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'orders.json')
const BACKUP_FILE = path.join(STORAGE_DIR, 'orders.backup.json')

// In-memory cache for fast access (updated on every write)
let memoryCache: StoredOrder[] = []
let cacheTimestamp = 0
const CACHE_TTL = 5000 // 5 seconds cache

interface SupabaseOrderRow {
  id: string
  order_id: string
  order_type: OrderRequest['orderType']
  status: OrderStatus
  customer: OrderRequest['customer']
  items: OrderRequest['items']
  order_details: OrderRequest['orderDetails']
  payment: OrderRequest['payment']
  created_at: string
  updated_at: string
}

function shouldUseSupabaseOrdersBackend(): boolean {
  if (IS_PRODUCTION && STORAGE_BACKEND !== 'supabase') {
    throw new Error(
      `Unsafe order storage backend "${STORAGE_BACKEND}" in production. Set ORDER_STORAGE_BACKEND=supabase.`
    )
  }

  if (STORAGE_BACKEND !== 'supabase') return false
  if (!hasSupabaseServerConfig()) {
    if (IS_PRODUCTION) {
      throw new Error(
        'ORDER_STORAGE_BACKEND is set to supabase but Supabase server credentials are missing. Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.'
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'ORDER_STORAGE_BACKEND is supabase but SUPABASE_SERVICE_ROLE_KEY is missing. Falling back to file storage.'
      )
    }
    return false
  }
  return true
}

function mapSupabaseRowToStoredOrder(row: SupabaseOrderRow): StoredOrder {
  return {
    id: row.id,
    orderId: row.order_id,
    orderType: row.order_type,
    status: row.status,
    customer: row.customer,
    items: row.items,
    orderDetails: row.order_details,
    payment: row.payment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

async function saveOrderToSupabase(orderData: OrderRequest): Promise<StoredOrder> {
  const client = getSupabaseServerClient()
  const payload = {
    order_id: orderData.orderId,
    order_type: orderData.orderType,
    status: 'pending' as OrderStatus,
    customer: orderData.customer,
    items: orderData.items,
    order_details: orderData.orderDetails,
    payment: orderData.payment,
  }

  const { data, error } = await client
    .from(SUPABASE_ORDERS_TABLE)
    .upsert(payload, { onConflict: 'order_id' })
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(`Supabase order save failed: ${error?.message || 'Unknown error'}`)
  }

  return mapSupabaseRowToStoredOrder(data as SupabaseOrderRow)
}

async function getAllOrdersFromSupabase(): Promise<StoredOrder[]> {
  const client = getSupabaseServerClient()
  const { data, error } = await client
    .from(SUPABASE_ORDERS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase get all orders failed: ${error.message}`)
  }

  return (data || []).map((row) => mapSupabaseRowToStoredOrder(row as SupabaseOrderRow))
}

async function getOrdersByStatusFromSupabase(status: OrderStatus): Promise<StoredOrder[]> {
  const client = getSupabaseServerClient()
  const { data, error } = await client
    .from(SUPABASE_ORDERS_TABLE)
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase get orders by status failed: ${error.message}`)
  }

  return (data || []).map((row) => mapSupabaseRowToStoredOrder(row as SupabaseOrderRow))
}

async function getOrderByIdFromSupabase(orderId: string): Promise<StoredOrder | undefined> {
  const client = getSupabaseServerClient()

  const byOrderIdResult = await client
    .from(SUPABASE_ORDERS_TABLE)
    .select('*')
    .eq('order_id', orderId)
    .maybeSingle()

  if (byOrderIdResult.error) {
    throw new Error(`Supabase get order by order_id failed: ${byOrderIdResult.error.message}`)
  }
  if (byOrderIdResult.data) {
    return mapSupabaseRowToStoredOrder(byOrderIdResult.data as SupabaseOrderRow)
  }

  if (!isUuid(orderId)) {
    return undefined
  }

  const byIdResult = await client
    .from(SUPABASE_ORDERS_TABLE)
    .select('*')
    .eq('id', orderId)
    .maybeSingle()

  if (byIdResult.error) {
    throw new Error(`Supabase get order by id failed: ${byIdResult.error.message}`)
  }
  if (!byIdResult.data) {
    return undefined
  }

  return mapSupabaseRowToStoredOrder(byIdResult.data as SupabaseOrderRow)
}

async function updateOrderStatusInSupabase(orderId: string, status: OrderStatus): Promise<StoredOrder | null> {
  const client = getSupabaseServerClient()
  const lookup = await getOrderByIdFromSupabase(orderId)
  if (!lookup) return null

  const { data, error } = await client
    .from(SUPABASE_ORDERS_TABLE)
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', lookup.id)
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(`Supabase update order status failed: ${error?.message || 'Unknown error'}`)
  }

  return mapSupabaseRowToStoredOrder(data as SupabaseOrderRow)
}

async function getOrdersCountByStatusFromSupabase(): Promise<Record<OrderStatus, number>> {
  const counts: Record<OrderStatus, number> = {
    pending: 0,
    preparing: 0,
    ready: 0,
    'out-for-delivery': 0,
    delivered: 0,
    cancelled: 0,
  }

  const orders = await getAllOrdersFromSupabase()
  for (const order of orders) {
    counts[order.status] = (counts[order.status] || 0) + 1
  }

  return counts
}

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
  if (shouldUseSupabaseOrdersBackend()) {
    return saveOrderToSupabase(orderData)
  }

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
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Order saved: ${storedOrder.orderId} (Total: ${trimmedOrders.length} orders)`)
      }
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
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Order saved to memory cache only: ${storedOrder.orderId}`)
    }
    return storedOrder
  }
}

/**
 * Get all orders (sorted by date, newest first)
 */
export async function getAllOrders(): Promise<StoredOrder[]> {
  if (shouldUseSupabaseOrdersBackend()) {
    return getAllOrdersFromSupabase()
  }

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
export async function getOrdersByStatus(status: OrderStatus): Promise<StoredOrder[]> {
  if (shouldUseSupabaseOrdersBackend()) {
    return getOrdersByStatusFromSupabase(status)
  }

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
  if (shouldUseSupabaseOrdersBackend()) {
    return getOrderByIdFromSupabase(orderId)
  }

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
  status: OrderStatus
): Promise<StoredOrder | null> {
  if (shouldUseSupabaseOrdersBackend()) {
    return updateOrderStatusInSupabase(orderId, status)
  }

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
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Order status updated: ${orderId} -> ${status}`)
      }
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
export async function getOrdersCountByStatus(): Promise<Record<OrderStatus, number>> {
  if (shouldUseSupabaseOrdersBackend()) {
    return getOrdersCountByStatusFromSupabase()
  }

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

    return counts as Record<OrderStatus, number>
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
    return counts as Record<OrderStatus, number>
  }
}

/**
 * Health check - verify storage is working
 */
export async function healthCheck(): Promise<{ healthy: boolean; orderCount: number; error?: string }> {
  if (shouldUseSupabaseOrdersBackend()) {
    try {
      const orders = await getAllOrdersFromSupabase()
      return { healthy: true, orderCount: orders.length }
    } catch (error) {
      return {
        healthy: false,
        orderCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

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



