"use client"

import { useCallback } from "react"
import { useCartContext } from "@/lib/context/CartContext"
import { MenuItem } from "@/lib/menuData"
import { CartCustomizations } from "@/lib/types/cart"

// Toast notification system
interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

let toastListeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

function addToast(message: string, type: Toast["type"] = "success", duration = 3000) {
  const id = Math.random().toString(36).substring(7)
  const newToast: Toast = { id, message, type, duration }
  toasts = [...toasts, newToast]
  toastListeners.forEach((listener) => listener(toasts))

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  return id
}

function removeToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id)
  toastListeners.forEach((listener) => listener(toasts))
}

export function useToast() {
  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    toastListeners.push(listener)
    listener(toasts)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  return {
    subscribe,
    addToast,
    removeToast,
  }
}

// Enhanced useCart hook with toast notifications
export function useCart() {
  const cart = useCartContext()

  const addToCartWithToast = useCallback(
    (item: MenuItem, quantity: number = 1, customizations?: CartCustomizations) => {
      try {
        cart.addToCart(item, quantity, customizations)
        addToast(`${item.name} added to cart`, "success")
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to add item to cart"
        addToast(message, "error")
        throw error
      }
    },
    [cart]
  )

  const removeFromCartWithToast = useCallback(
    (itemId: string) => {
      const item = cart.items.find((i) => i.id === itemId)
      cart.removeFromCart(itemId)
      if (item) {
        addToast(`${item.menuItem.name} removed from cart`, "info")
      }
    },
    [cart]
  )

  const updateQuantityWithToast = useCallback(
    (itemId: string, quantity: number) => {
      try {
        const item = cart.items.find((i) => i.id === itemId)
        cart.updateQuantity(itemId, quantity)
        if (item && quantity === 0) {
          addToast(`${item.menuItem.name} removed from cart`, "info")
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update quantity"
        addToast(message, "error")
        throw error
      }
    },
    [cart]
  )

  const clearCartWithToast = useCallback(() => {
    cart.clearCart()
    addToast("Cart cleared", "info")
  }, [cart])

  return {
    ...cart,
    addToCart: addToCartWithToast,
    removeFromCart: removeFromCartWithToast,
    updateQuantity: updateQuantityWithToast,
    clearCart: clearCartWithToast,
  }
}

// Export toast functions for use in components
export { addToast, removeToast }



