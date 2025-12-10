import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation, sendAdminNotification } from '@/lib/services/notification.service'
import { saveOrder, getAllOrders } from '@/lib/services/order-storage'
import type { OrderData } from '@/lib/types/notifications'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export interface OrderRequest {
  orderId: string
  orderType: 'dine-in' | 'takeaway' | 'delivery'
  customer: {
    fullName: string
    email: string
    phone: string
  }
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  orderDetails: {
    tableNumber?: string
    date?: string
    time?: string
    guests?: string
    pickupTime?: string
    deliveryAddress?: string
    specialRequests?: string
  }
  payment: {
    subtotal: number
    tax: number
    deliveryFee: number
    serviceCharge: number
    total: number
    method: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderRequest = await request.json()

    // Validate required fields
    if (!orderData.customer?.email || !orderData.customer?.phone || !orderData.customer?.fullName) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Convert to OrderData format
    const notificationData: OrderData = {
      orderId: orderData.orderId,
      orderType: orderData.orderType,
      customer: orderData.customer,
      items: orderData.items,
      orderDetails: orderData.orderDetails,
      payment: orderData.payment,
    }

    // Send customer confirmation and admin notification in parallel
    const [customerResult, adminResult] = await Promise.allSettled([
      sendOrderConfirmation(notificationData),
      sendAdminNotification('order', notificationData),
    ])

    // Log results
    const customerNotifications = customerResult.status === 'fulfilled' 
      ? customerResult.value 
      : { 
          email: { sent: false, error: customerResult.reason instanceof Error ? customerResult.reason.message : 'Unknown error' }, 
          sms: { sent: false, error: customerResult.reason instanceof Error ? customerResult.reason.message : 'Unknown error' } 
        }

    const adminNotifications = adminResult.status === 'fulfilled'
      ? adminResult.value
      : { 
          email: { sent: false, error: adminResult.reason instanceof Error ? adminResult.reason.message : 'Unknown error' }, 
          sms: { sent: false, error: adminResult.reason instanceof Error ? adminResult.reason.message : 'Unknown error' } 
        }

    // Save order to storage
    const savedOrder = saveOrder(orderData)

    // Log notification results for debugging (dev only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Order notifications:', {
        customer: customerNotifications,
        admin: adminNotifications,
      })
    }

    // Return success even if notifications fail (order is still placed)
    return NextResponse.json({
      success: true,
      orderId: orderData.orderId,
      message: 'Order placed successfully',
      order: savedOrder,
      notifications: {
        customer: customerNotifications,
        admin: adminNotifications,
      },
    })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch all orders (for admin)
export async function GET(request: NextRequest) {
  try {
    const orders = getAllOrders()
    
    return NextResponse.json({
      success: true,
      orders: orders,
      count: orders.length
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

