export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  image?: string
  allergens?: string[]
  vegetarian?: boolean
  vegan?: boolean
  glutenFree?: boolean
  badges?: string[] // e.g., "Bestseller", "Spicy", "New"
  featured?: boolean
}

export type MenuCategory = 
  | "appetizers"
  | "mains"
  | "desserts"
  | "drinks"
  | "specials"

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  specialInstructions?: string
}

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
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  date: Date
  image?: string
}

