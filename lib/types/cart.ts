import { MenuItem } from "@/lib/menuData"

export interface CartCustomizations {
  size?: string
  extras?: string[]
  specialInstructions?: string
}

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  customizations?: CartCustomizations
  subtotal: number
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (
    item: MenuItem,
    quantity?: number,
    customizations?: CartCustomizations
  ) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getDeliveryFee: () => number
  getGrandTotal: () => number
  isItemInCart: (itemId: string) => boolean
}

export const CART_STORAGE_KEY = "chez-amis-cart"
export const CART_EXPIRY_HOURS = 24
export const MAX_CART_ITEMS = 50
export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99
export const VAT_RATE = 0.15 // 15% VAT
export const FREE_DELIVERY_THRESHOLD = 100 // Free delivery for orders over GH₵ 100
export const DELIVERY_FEE = 10 // GH₵ 10 delivery fee



