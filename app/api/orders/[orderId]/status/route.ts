import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReadyNotification, sendOrderOutForDeliveryNotification } from '@/lib/services/notification.service'
import { updateOrderStatus } from '@/lib/services/order-storage'
import { sendEmail } from '@/lib/services/email.service'

export interface OrderStatusUpdateRequest {
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
  customerPhone: string
  customerName: string
  customerEmail?: string
  orderType: 'dine-in' | 'takeaway' | 'delivery'
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

    // Validate required fields
    if (!updateData.status || !updateData.customerPhone || !updateData.customerName || !updateData.orderType) {
      return NextResponse.json(
        { error: 'Missing required fields: status, customerPhone, customerName, orderType' },
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
          if (updateData.customerEmail) {
            try {
              await sendEmail({
                to: updateData.customerEmail,
                subject: `Order In Progress #${orderId} - Chez Amis Bar and Grill`,
                template: 'order-in-progress',
                data: {
                  orderId,
                  customerName: updateData.customerName,
                  orderType: updateData.orderType,
                  status: 'preparing',
                },
              })
              results.notification.email.sent = true
            } catch (emailError) {
              results.notification.email.error = emailError instanceof Error ? emailError.message : 'Unknown error'
            }
          }
          results.notificationType = 'order-in-progress'
          break

        case 'ready':
          // Send "order ready" notification (Email + SMS)
          if (updateData.orderType === 'takeaway' || updateData.orderType === 'delivery') {
            if (!updateData.customerEmail) {
              results.notification.email.error = 'Customer email required for ready notification'
            } else {
              const readyResult = await sendOrderReadyNotification(
                orderId,
                updateData.customerPhone,
                updateData.customerName,
                updateData.customerEmail,
                updateData.orderType
              )
              results.notification = readyResult
              results.notificationType = 'order-ready'
            }
          }
          break

        case 'out-for-delivery':
          // Send "out for delivery" notification (Email + SMS)
          if (updateData.orderType === 'delivery') {
            if (!updateData.customerEmail) {
              results.notification.email.error = 'Customer email required for delivery notification'
            } else {
              const deliveryResult = await sendOrderOutForDeliveryNotification(
                orderId,
                updateData.customerPhone,
                updateData.customerName,
                updateData.customerEmail,
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

    // Update order status in storage
    const updatedOrder = updateOrderStatus(orderId, updateData.status)

    // Log status update
    console.log(`Order ${orderId} status updated to: ${updateData.status}`, {
      customer: updateData.customerName,
      phone: updateData.customerPhone,
      email: updateData.customerEmail,
      notifications: {
        email: results.notification.email.sent,
        sms: results.notification.sms.sent,
      },
    })

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

