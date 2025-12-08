/**
 * Notification Types and Interfaces
 */

export interface OrderData {
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
    estimatedTime?: string
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

export interface ReservationData {
  reservationNumber: string
  customer: {
    fullName: string
    email: string
    phone: string
  }
  date: string // ISO date string
  time: string // e.g., "7:00 PM"
  guests: number
  seatingPreference?: string
  occasion?: string
  specialRequests?: string
}

export interface NotificationResult {
  email: {
    sent: boolean
    error: string | null
  }
  sms: {
    sent: boolean
    error: string | null
  }
}

export type EmailTemplate =
  | 'order-confirmation'
  | 'reservation-confirmation'
  | 'admin-order'
  | 'admin-reservation'

export type SMSTemplate =
  | 'order-confirmation'
  | 'reservation-confirmation'
  | 'order-ready'
  | 'order-out-for-delivery'
  | 'reservation-reminder'
  | 'admin-order'
  | 'admin-reservation'

