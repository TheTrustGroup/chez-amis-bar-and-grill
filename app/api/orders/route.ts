import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation, sendAdminNotification } from '@/lib/services/notification.service'
import { saveOrder, getAllOrders } from '@/lib/services/order-storage-persistent'
import type { OrderData } from '@/lib/types/notifications'
import type { OrderRequest } from '@/lib/types/orders'
import { PAYMENT_ON_DELIVERY_ONLY } from '@/lib/config/payments'
import { orderRequestSchema } from '@/lib/api-schemas'
import {
  checkRateLimit,
  getIdempotencyReplay,
  setIdempotencyReplay,
} from '@/lib/server/api-security'
import { logError, logInfo, logWarn } from '@/lib/server/logger'
import { enqueueFailedNotification } from '@/lib/services/notification-outbox'

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic'
// Add caching headers for GET requests
export const revalidate = 0

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  const idempotencyKey = request.headers.get('idempotency-key')

  try {
    const rateLimit = await checkRateLimit(request, 'api:orders:create', 30, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait and try again.',
          retryAt: new Date(rateLimit.resetAt).toISOString(),
        },
        { status: 429 }
      )
    }

    const replay = getIdempotencyReplay('orders:create', idempotencyKey)
    if (replay) {
      return NextResponse.json(replay.body, {
        status: replay.status,
        headers: { 'x-idempotent-replay': 'true', 'x-request-id': requestId },
      })
    }

    const parsed = orderRequestSchema.safeParse(await request.json())
    if (!parsed.success) {
      const body = {
        error: 'Invalid order payload',
        details: parsed.error.flatten(),
      }
      setIdempotencyReplay('orders:create', idempotencyKey, { status: 400, body })
      return NextResponse.json(body, { status: 400, headers: { 'x-request-id': requestId } })
    }

    const orderData: OrderRequest = parsed.data

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

    if (PAYMENT_ON_DELIVERY_ONLY && orderData.payment?.method !== 'pay-later') {
      return NextResponse.json(
        { error: 'Online payment is not enabled. Orders must use pay on delivery.' },
        { status: 400 }
      )
    }

    // CRITICAL: Save order to storage FIRST before sending notifications
    // This ensures order is always recorded even if notifications fail
    logInfo({
      event: 'order.save.start',
      route: '/api/orders',
      requestId,
      metadata: { orderId: orderData.orderId, orderType: orderData.orderType },
    })
    const savedOrder = await saveOrder(orderData)
    
    if (!savedOrder) {
      logError({
        event: 'order.save.failed',
        route: '/api/orders',
        requestId,
        metadata: { orderId: orderData.orderId },
      })
      return NextResponse.json(
        { error: 'Failed to save order. Please try again.' },
        { status: 500, headers: { 'x-request-id': requestId } }
      )
    }

    // Convert to OrderData format for notifications
    const notificationData: OrderData = {
      orderId: orderData.orderId,
      orderType: orderData.orderType,
      customer: orderData.customer,
      items: orderData.items,
      orderDetails: orderData.orderDetails,
      payment: orderData.payment,
    }

    // Send customer confirmation and admin notification in parallel
    // These can fail without affecting order storage
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

    const safeEnqueue = async (
      args: Parameters<typeof enqueueFailedNotification>[0],
      reason: string
    ) => {
      try {
        await enqueueFailedNotification(args)
      } catch (outboxError) {
        logWarn({
          event: 'order.notification_outbox.enqueue_failed',
          route: '/api/orders',
          requestId,
          metadata: {
            orderId: orderData.orderId,
            channel: args.channel,
            recipient: args.recipient,
            reason,
            message: outboxError instanceof Error ? outboxError.message : 'Unknown outbox error',
          },
        })
      }
    }

    if (!customerNotifications.email.sent) {
      await safeEnqueue(
        {
          eventType: 'order_customer_notification',
          channel: 'email',
          recipient: orderData.customer.email,
          payload: {
            template: 'order-confirmation',
            subject: `Order Confirmation #${orderData.orderId} - Chez Amis Bar and Grill`,
            data: notificationData as unknown as Record<string, unknown>,
          },
          errorMessage: customerNotifications.email.error || undefined,
        },
        'customer_email_failed'
      )
    }
    if (!customerNotifications.sms.sent) {
      await safeEnqueue(
        {
          eventType: 'order_customer_notification',
          channel: 'sms',
          recipient: orderData.customer.phone,
          payload: {
            template: 'order-confirmation',
            data: notificationData as unknown as Record<string, unknown>,
          },
          errorMessage: customerNotifications.sms.error || undefined,
        },
        'customer_sms_failed'
      )
    }
    if (!adminNotifications.email.sent) {
      await safeEnqueue(
        {
          eventType: 'order_admin_notification',
          channel: 'email',
          recipient: process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com',
          payload: {
            template: 'admin-order',
            subject: 'New Order - Chez Amis',
            data: notificationData as unknown as Record<string, unknown>,
          },
          errorMessage: adminNotifications.email.error || undefined,
        },
        'admin_email_failed'
      )
    }
    if (!adminNotifications.sms.sent) {
      await safeEnqueue(
        {
          eventType: 'order_admin_notification',
          channel: 'sms',
          recipient: process.env.ADMIN_PHONE || process.env.NEXT_PUBLIC_PHONE || '+233557032312',
          payload: {
            template: 'admin-order',
            data: notificationData as unknown as Record<string, unknown>,
          },
          errorMessage: adminNotifications.sms.error || undefined,
        },
        'admin_sms_failed'
      )
    }

    // Return success even if notifications fail (order is still placed)
    const responseBody = {
      success: true,
      orderId: orderData.orderId,
      message: 'Order placed successfully',
      order: savedOrder,
      notifications: {
        customer: customerNotifications,
        admin: adminNotifications,
      },
    }
    setIdempotencyReplay('orders:create', idempotencyKey, { status: 200, body: responseBody })
    return NextResponse.json(responseBody, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    logError({
      event: 'order.create.error',
      route: '/api/orders',
      requestId,
      metadata: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    })
    return NextResponse.json(
      { error: 'Failed to process order', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}

// GET endpoint to fetch all orders (for admin)
export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  try {
    const rateLimit = await checkRateLimit(request, 'api:orders:list', 180, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const orders = await getAllOrders()
    logInfo({
      event: 'order.list.success',
      route: '/api/orders',
      requestId,
      metadata: { count: orders.length },
    })
    
    return NextResponse.json({
      success: true,
      orders: orders,
      count: orders.length
    }, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    logWarn({
      event: 'order.list.error',
      route: '/api/orders',
      requestId,
      metadata: { message: error instanceof Error ? error.message : 'Unknown error' },
    })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}

