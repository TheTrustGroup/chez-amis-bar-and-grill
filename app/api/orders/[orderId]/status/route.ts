import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReadyNotification, sendOrderOutForDeliveryNotification } from '@/lib/services/notification.service'
import { updateOrderStatus, getOrderById } from '@/lib/services/order-storage-persistent'
import { sendEmail } from '@/lib/services/email.service'
import { sendSMS } from '@/lib/services/sms.service'

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic'
export const revalidate = 0

export interface OrderStatusUpdateRequest {
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
  customerPhone?: string
  customerName?: string
  customerEmail?: string
  orderType?: 'dine-in' | 'takeaway' | 'delivery'
  estimatedTime?: string // For "out-for-delivery" status
}

/**
 * Update Order Status API Route
 * Allows admin to update order status and send customer notifications
 * 
 * POST /api/orders/[orderId]/status
 * Body: {
 *   status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled',
 *   customerPhone: string,
 *   customerName: string,
 *   customerEmail?: string,
 *   orderType: 'dine-in' | 'takeaway' | 'delivery',
 *   estimatedTime?: string
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId
    const updateData: OrderStatusUpdateRequest = await request.json()

    // Validate status
    if (!updateData.status) {
      return NextResponse.json(
        { error: 'Missing required field: status' },
        { status: 400 }
      )
    }

    // Fetch order from storage if customer details not provided
    let customerPhone = updateData.customerPhone
    let customerName = updateData.customerName
    let customerEmail = updateData.customerEmail
    let orderType = updateData.orderType

    if (!customerPhone || !customerName || !orderType) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📦 Fetching order details from storage for:', orderId)
      }
      const storedOrder = await getOrderById(orderId)
      
      if (!storedOrder) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }

      // Use stored order details if not provided
      customerPhone = customerPhone || storedOrder.customer?.phone || ''
      customerName = customerName || (storedOrder.customer as any)?.fullName || (storedOrder.customer as any)?.name || ''
      customerEmail = customerEmail || storedOrder.customer?.email || ''
      orderType = orderType || storedOrder.orderType || 'delivery'

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Retrieved order details:', {
          customerName,
          customerPhone,
          customerEmail,
          orderType,
        })
      }
    }

    // Validate we have all required fields now
    if (!customerPhone || !customerName || !orderType) {
      return NextResponse.json(
        { error: 'Missing required fields: customerPhone, customerName, orderType. Order may be missing customer information.' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled']
    if (!validStatuses.includes(updateData.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    const results: {
      statusUpdated: boolean
      notification: {
        email: { sent: boolean; error: string | null }
        sms: { sent: boolean; error: string | null }
      }
      notificationType?: string
    } = {
      statusUpdated: true,
      notification: {
        email: { sent: false, error: null },
        sms: { sent: false, error: null },
      },
    }

    // Send notifications based on status
    try {
      switch (updateData.status) {
        case 'preparing':
          // Send "order in progress" notification (Email + SMS)
          if (customerEmail) {
            const [emailResult, smsResult] = await Promise.allSettled([
              sendEmail({
                to: customerEmail,
                subject: `Order In Progress #${orderId} - Chez Amis Bar and Grill`,
                template: 'order-in-progress',
                data: {
                  orderId,
                  customerName,
                  orderType,
                  status: 'preparing',
                },
              }),
              sendSMS({
                to: customerPhone,
                template: 'order-in-progress',
                data: {
                  orderId,
                  customerName,
                  orderType,
                },
              }),
            ])
            results.notification.email.sent = emailResult.status === 'fulfilled'
            results.notification.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null
            results.notification.sms.sent = smsResult.status === 'fulfilled'
            results.notification.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null
          } else {
            // Send SMS only if no email
            const smsResult = await Promise.allSettled([
              sendSMS({
                to: customerPhone,
                template: 'order-in-progress',
                data: {
                  orderId,
                  customerName,
                  orderType,
                },
              }),
            ])
            results.notification.sms.sent = smsResult[0].status === 'fulfilled'
            results.notification.sms.error = smsResult[0].status === 'rejected' ? (smsResult[0].reason as Error).message : null
          }
          results.notificationType = 'order-in-progress'
          break

        case 'ready':
          // Send "order ready" notification (Email + SMS)
          if (orderType === 'takeaway' || orderType === 'delivery') {
            if (!customerEmail) {
              results.notification.email.error = 'Customer email required for ready notification'
              // Still send SMS
              const smsResult = await Promise.allSettled([
                sendSMS({
                  to: customerPhone,
                  template: 'order-ready',
                  data: {
                    orderId,
                    customerName,
                    orderType,
                  },
                }),
              ])
              results.notification.sms.sent = smsResult[0].status === 'fulfilled'
              results.notification.sms.error = smsResult[0].status === 'rejected' ? (smsResult[0].reason as Error).message : null
            } else {
              const readyResult = await sendOrderReadyNotification(
                orderId,
                customerPhone,
                customerName,
                customerEmail,
                orderType
              )
              results.notification = readyResult
              results.notificationType = 'order-ready'
            }
          }
          break

        case 'out-for-delivery':
          // Send "out for delivery" notification (Email + SMS)
          if (orderType === 'delivery') {
            if (!customerEmail) {
              results.notification.email.error = 'Customer email required for delivery notification'
              // Still send SMS
              const smsResult = await Promise.allSettled([
                sendSMS({
                  to: customerPhone,
                  template: 'order-out-for-delivery',
                  data: {
                    orderId,
                    customerName,
                    estimatedTime: updateData.estimatedTime || '30-40 minutes',
                  },
                }),
              ])
              results.notification.sms.sent = smsResult[0].status === 'fulfilled'
              results.notification.sms.error = smsResult[0].status === 'rejected' ? (smsResult[0].reason as Error).message : null
            } else {
              const deliveryResult = await sendOrderOutForDeliveryNotification(
                orderId,
                customerPhone,
                customerName,
                customerEmail,
                updateData.estimatedTime || '30-40 minutes'
              )
              results.notification = deliveryResult
              results.notificationType = 'order-out-for-delivery'
            }
          }
          break

        case 'delivered':
        case 'cancelled':
          // Status updates only, no notifications for these
          results.notificationType = updateData.status
          break
      }
    } catch (notificationError) {
      console.error('Error sending status notification:', notificationError)
      const errorMsg = notificationError instanceof Error ? notificationError.message : 'Unknown error'
      if (!results.notification.email.error) {
        results.notification.email.error = errorMsg
      }
      if (!results.notification.sms.error) {
        results.notification.sms.error = errorMsg
      }
    }

    // Prevent changing status of delivered orders
    const existingOrder = await getOrderById(orderId)
    if (existingOrder && existingOrder.status === 'delivered') {
      return NextResponse.json(
        { error: 'Cannot change status of a delivered order' },
        { status: 400 }
      )
    }

    // Update order status in storage (now async)
    const updatedOrder = await updateOrderStatus(orderId, updateData.status)
    
    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Log status update (dev only)
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Order ${orderId} status updated to: ${updateData.status}`, {
        customer: customerName,
        phone: customerPhone,
        email: customerEmail,
        orderType,
        notifications: {
          email: results.notification.email.sent,
          sms: results.notification.sms.sent,
          emailError: results.notification.email.error,
          smsError: results.notification.sms.error,
        },
      })
    }

    return NextResponse.json({
      success: true,
      orderId,
      status: updateData.status,
      message: `Order status updated to ${updateData.status}`,
      order: updatedOrder,
      notification: results,
    })
  } catch (error) {
    console.error('Order status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update order status', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for order status check
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId
  
  // In a real system, you would fetch order status from database
  // For now, return a placeholder response
  return NextResponse.json({
    orderId,
    message: 'Order status endpoint',
    note: 'Use POST to update order status',
    availableStatuses: ['preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
  })
}

