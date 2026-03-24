import type { MenuItem } from '@/lib/data/menuData'
import type { CartItem } from '@/lib/types/cart'

export type { MenuItem }

export interface Order {
  id: string
  items: CartItem[]
  customerInfo: CustomerInfo
  total: number
  status: OrderStatus
  createdAt: Date
  estimatedDelivery?: Date
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  deliveryInstructions?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled'

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  date: Date
  image?: string
}
