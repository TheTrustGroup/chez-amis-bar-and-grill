/**
 * Professional SMS Notification Templates
 * Concise, clear, and actionable messages
 * Optimized for mobile readability
 */

import type { OrderData, ReservationData } from '@/lib/types/notifications'
import { format, parseISO } from 'date-fns'

const RESTAURANT_NAME = 'Chez Amis'
const RESTAURANT_PHONE = process.env.NEXT_PUBLIC_PHONE || '+233 055 703 2312'

/**
 * Order Confirmation SMS
 * Format: "Hi [Name]! Your [type] order #[number] is confirmed at Chez Amis. Total: GH₵[amount]. Ready in: [time]. Questions? Call [phone]"
 */
export function getOrderConfirmationSMS(orderData: OrderData): string {
  const { customer, orderId, orderType, payment, orderDetails } = orderData

  // Get customer's first name
  const firstName = customer.fullName.split(' ')[0]

  // Format order type
  const orderTypeText = {
    'dine-in': 'dine-in',
    'takeaway': 'takeaway',
    'delivery': 'delivery',
  }[orderType] || 'order'

  // Build order details
  let details = ''
  if (orderType === 'dine-in' && orderDetails.tableNumber) {
    details = `Table ${orderDetails.tableNumber}, ${orderDetails.time || 'TBD'}`
  } else if (orderType === 'takeaway' && orderDetails.pickupTime) {
    details = `Pickup: ${orderDetails.pickupTime}`
  } else if (orderType === 'delivery') {
    details = `Delivery in ${orderDetails.estimatedTime || '35-45 min'}`
  } else {
    details = 'We\'ll notify you when ready'
  }

  return `Hi ${firstName}! Your ${orderTypeText} order #${orderId} is confirmed at ${RESTAURANT_NAME}. ${details}. Total: GH₵${payment.total.toFixed(2)}. Questions? Call ${RESTAURANT_PHONE}`
}

/**
 * Reservation Confirmation SMS
 * Format: "Hi [Name]! Your table for [guests] at Chez Amis is confirmed for [date] at [time]. Reservation #[number]. See you soon!"
 */
export function getReservationConfirmationSMS(reservationData: ReservationData): string {
  const { customer, reservationNumber, date, time, guests } = reservationData

  const firstName = customer.fullName.split(' ')[0]

  let formattedDate = date
  try {
    formattedDate = format(parseISO(date), 'MMM d')
  } catch {
    formattedDate = date
  }

  return `Hi ${firstName}! Your table for ${guests} at ${RESTAURANT_NAME} is confirmed for ${formattedDate} at ${time}. Reservation #${reservationNumber}. See you soon!`
}

/**
 * Order In Progress SMS
 */
export function getOrderInProgressSMS(data: { orderId: string; customerName: string; orderType: 'dine-in' | 'takeaway' | 'delivery' }): string {
  const firstName = data.customerName.split(' ')[0]

  return `Hi ${firstName}! Your order #${data.orderId} is being prepared at ${RESTAURANT_NAME}. We'll notify you when it's ready!`
}

/**
 * Order Ready for Pickup SMS
 */
export function getOrderReadySMS(data: { orderId: string; customerName: string; orderType: 'takeaway' | 'delivery' }): string {
  const firstName = data.customerName.split(' ')[0]
  const action = data.orderType === 'takeaway' ? 'ready for pickup' : 'ready'

  return `Hi ${firstName}! Your order #${data.orderId} is ${action} at ${RESTAURANT_NAME}. See you soon!`
}

/**
 * Order Out for Delivery SMS
 */
export function getOrderOutForDeliverySMS(data: { orderId: string; customerName: string; estimatedTime: string }): string {
  const firstName = data.customerName.split(' ')[0]

  return `Hi ${firstName}! Your order #${data.orderId} is out for delivery. Expected arrival: ${data.estimatedTime}. Track: ${RESTAURANT_PHONE}`
}

/**
 * Reservation Reminder SMS (day-of reminder)
 */
export function getReservationReminderSMS(reservationData: ReservationData): string {
  const { customer, reservationNumber, date, time, guests } = reservationData

  const firstName = customer.fullName.split(' ')[0]

  let formattedDate = date
  try {
    formattedDate = format(parseISO(date), 'MMM d')
  } catch {
    formattedDate = date
  }

  return `Hi ${firstName}! Reminder: Your reservation for ${guests} at ${RESTAURANT_NAME} is today (${formattedDate}) at ${time}. Reservation #${reservationNumber}. See you soon!`
}

/**
 * Admin Order Notification SMS
 */
export function getAdminOrderSMS(orderData: OrderData): string {
  const { orderId, orderType, customer, payment } = orderData

  const orderTypeText = {
    'dine-in': 'Dine-in',
    'takeaway': 'Takeaway',
    'delivery': 'Delivery',
  }[orderType] || 'Order'

  return `New ${orderTypeText} Order #${orderId} from ${customer.fullName}. Total: GH₵${payment.total.toFixed(2)}. Check dashboard for details.`
}

/**
 * Admin Reservation Notification SMS
 */
export function getAdminReservationSMS(reservationData: ReservationData): string {
  const { reservationNumber, date, time, guests, customer } = reservationData

  let formattedDate = date
  try {
    formattedDate = format(parseISO(date), 'MMM d')
  } catch {
    formattedDate = date
  }

  return `New Reservation #${reservationNumber} from ${customer.fullName}. ${formattedDate} at ${time} for ${guests} ${guests === 1 ? 'guest' : 'guests'}. Check dashboard.`
}
