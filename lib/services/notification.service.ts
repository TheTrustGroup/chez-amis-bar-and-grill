/**
 * Professional Notification Service
 * Centralized service for all customer and admin communications
 * Supports Email (Resend) and SMS (Twilio)
 */

import { sendEmail } from './email.service'
import { sendSMS } from './sms.service'
import type { OrderData, ReservationData, NotificationResult } from '@/lib/types/notifications'
import type { OrderStatusUpdateData } from '@/lib/templates/emails/order-status-update'

/**
 * Send order confirmation notifications (Email + SMS)
 */
export async function sendOrderConfirmation(
  orderData: OrderData
): Promise<NotificationResult> {
  const results: NotificationResult = {
    email: { sent: false, error: null },
    sms: { sent: false, error: null },
  }

  // Send email and SMS in parallel
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail({
      to: orderData.customer.email,
      subject: `Order Confirmation #${orderData.orderId} - Chez Amis Bar and Grill`,
      template: 'order-confirmation',
      data: orderData,
    }),
    sendSMS({
      to: orderData.customer.phone,
      template: 'order-confirmation',
      data: orderData,
    }),
  ])

  results.email.sent = emailResult.status === 'fulfilled'
  results.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null

  results.sms.sent = smsResult.status === 'fulfilled'
  results.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null

  return results
}

/**
 * Send reservation confirmation notifications (Email + SMS)
 */
export async function sendReservationConfirmation(
  reservationData: ReservationData
): Promise<NotificationResult> {
  const results: NotificationResult = {
    email: { sent: false, error: null },
    sms: { sent: false, error: null },
  }

  // Send email and SMS in parallel
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail({
      to: reservationData.customer.email,
      subject: `Reservation Confirmation #${reservationData.reservationNumber} - Chez Amis Bar and Grill`,
      template: 'reservation-confirmation',
      data: reservationData,
    }),
    sendSMS({
      to: reservationData.customer.phone,
      template: 'reservation-confirmation',
      data: reservationData,
    }),
  ])

  results.email.sent = emailResult.status === 'fulfilled'
  results.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null

  results.sms.sent = smsResult.status === 'fulfilled'
  results.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null

  return results
}

/**
 * Send order ready for pickup notification (Email + SMS)
 */
export async function sendOrderReadyNotification(
  orderId: string,
  customerPhone: string,
  customerName: string,
  customerEmail: string,
  orderType: 'takeaway' | 'delivery'
): Promise<{ email: { sent: boolean; error: string | null }; sms: { sent: boolean; error: string | null } }> {
  const results = {
    email: { sent: false, error: null as string | null },
    sms: { sent: false, error: null as string | null },
  }

  // Send email and SMS in parallel
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail({
      to: customerEmail,
      subject: `Order Ready #${orderId} - Chez Amis Bar and Grill`,
      template: 'order-ready',
      data: {
        orderId,
        customerName,
        orderType,
        status: 'ready',
      },
    }),
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

  results.email.sent = emailResult.status === 'fulfilled'
  results.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null

  results.sms.sent = smsResult.status === 'fulfilled'
  results.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null

  return results
}

/**
 * Send order out for delivery notification (Email + SMS)
 */
export async function sendOrderOutForDeliveryNotification(
  orderId: string,
  customerPhone: string,
  customerName: string,
  customerEmail: string,
  estimatedTime: string
): Promise<{ email: { sent: boolean; error: string | null }; sms: { sent: boolean; error: string | null } }> {
  const results = {
    email: { sent: false, error: null as string | null },
    sms: { sent: false, error: null as string | null },
  }

  // Send email and SMS in parallel
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail({
      to: customerEmail,
      subject: `Order Out for Delivery #${orderId} - Chez Amis Bar and Grill`,
      template: 'order-out-for-delivery',
      data: {
        orderId,
        customerName,
        orderType: 'delivery',
        status: 'out-for-delivery',
        estimatedTime,
      },
    }),
    sendSMS({
      to: customerPhone,
      template: 'order-out-for-delivery',
      data: {
        orderId,
        customerName,
        estimatedTime,
      },
    }),
  ])

  results.email.sent = emailResult.status === 'fulfilled'
  results.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null

  results.sms.sent = smsResult.status === 'fulfilled'
  results.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null

  return results
}

/**
 * Send reservation reminder (SMS only, day-of reminder)
 */
export async function sendReservationReminder(
  reservationData: ReservationData
): Promise<{ sent: boolean; error: string | null }> {
  try {
    await sendSMS({
      to: reservationData.customer.phone,
      template: 'reservation-reminder',
      data: reservationData,
    })
    return { sent: true, error: null }
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send admin notification (Email + SMS)
 * All orders and reservations are sent to: chez@chezamisrestaurant.com
 */
export async function sendAdminNotification(
  type: 'order' | 'reservation',
  data: OrderData | ReservationData
): Promise<NotificationResult> {
  // Admin email: All orders go to chez@chezamisrestaurant.com
  // Can be overridden with ADMIN_EMAIL env variable, but defaults to restaurant email
  const adminEmail = process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'
  const adminPhone = process.env.ADMIN_PHONE || process.env.NEXT_PUBLIC_PHONE || '+233557032312'

  const results: NotificationResult = {
    email: { sent: false, error: null },
    sms: { sent: false, error: null },
  }

  // Send admin notifications in parallel
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail({
      to: adminEmail,
      subject: `New ${type === 'order' ? 'Order' : 'Reservation'} - Chez Amis`,
      template: `admin-${type}`,
      data,
    }),
    sendSMS({
      to: adminPhone,
      template: `admin-${type}`,
      data,
    }),
  ])

  results.email.sent = emailResult.status === 'fulfilled'
  results.email.error = emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null

  results.sms.sent = smsResult.status === 'fulfilled'
  results.sms.error = smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null

  return results
}
