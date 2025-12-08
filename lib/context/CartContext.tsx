"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { CartItem, CartContextType, CartCustomizations } from "@/lib/types/cart"
import { MenuItem } from "@/lib/menuData"
import {
  CART_STORAGE_KEY,
  CART_EXPIRY_HOURS,
  MAX_CART_ITEMS,
  MIN_QUANTITY,
  MAX_QUANTITY,
  VAT_RATE,
  FREE_DELIVERY_THRESHOLD,
  DELIVERY_FEE,
} from "@/lib/types/cart"

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartStorageData {
  items: CartItem[]
  timestamp: number
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const data: CartStorageData = JSON.parse(stored)
        const now = Date.now()
        const expiryTime = CART_EXPIRY_HOURS * 60 * 60 * 1000

        // Check if cart has expired
        if (now - data.timestamp < expiryTime) {
          setItems(data.items)
        } else {
          // Cart expired, clear it
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      }
    } catch (error) {
      // Error loading cart - clear corrupted data
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading cart from localStorage:", error)
      }
      localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      try {
        const data: CartStorageData = {
          items,
          timestamp: Date.now(),
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
        // Error saving cart - silently fail in production
        if (process.env.NODE_ENV === "development") {
          console.error("Error saving cart to localStorage:", error)
        }
      }
    }
  }, [items, isInitialized])

  // Generate unique cart item ID
  const generateCartItemId = (menuItem: MenuItem, customizations?: CartCustomizations): string => {
    const baseId = menuItem.id
    const customKey = customizations
      ? JSON.stringify({
          size: customizations.size,
          extras: customizations.extras?.sort(),
        })
      : ""
    return `${baseId}-${customKey ? btoa(customKey).slice(0, 8) : "default"}`
  }

  // Add item to cart
  const addToCart = useCallback(
    (menuItem: MenuItem, quantity: number = 1, customizations?: CartCustomizations) => {
      // Validation
      if (!menuItem.available) {
        throw new Error(`${menuItem.name} is currently unavailable`)
      }

      if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
        throw new Error(`Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY}`)
      }

      setItems((prevItems) => {
        // Check if we're at max cart items
        const currentTotalItems = prevItems.reduce((sum, item) => sum + item.quantity, 0)
        if (currentTotalItems + quantity > MAX_CART_ITEMS) {
          throw new Error(
            `Cart limit reached. Maximum ${MAX_CART_ITEMS} items allowed. You have ${currentTotalItems} items.`
          )
        }

        const cartItemId = generateCartItemId(menuItem, customizations)
        const existingItemIndex = prevItems.findIndex((item) => item.id === cartItemId)

        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          const existingItem = prevItems[existingItemIndex]
          const newQuantity = Math.min(existingItem.quantity + quantity, MAX_QUANTITY)
          const newItems = [...prevItems]
          newItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            subtotal: menuItem.price * newQuantity,
          }
          return newItems
        } else {
          // New item
          const newItem: CartItem = {
            id: cartItemId,
            menuItem,
            quantity,
            customizations,
            subtotal: menuItem.price * quantity,
          }
          return [...prevItems, newItem]
        }
      })
    },
    []
  )

  // Remove item from cart
  const removeFromCart = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }, [])

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < MIN_QUANTITY) {
      removeFromCart(itemId)
      return
    }

    if (quantity > MAX_QUANTITY) {
      throw new Error(`Maximum quantity is ${MAX_QUANTITY}`)
    }

    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === itemId)
      if (itemIndex === -1) return prevItems

      const item = prevItems[itemIndex]
      const newItems = [...prevItems]
      newItems[itemIndex] = {
        ...item,
        quantity,
        subtotal: item.menuItem.price * quantity,
      }
      return newItems
    })
  }, [removeFromCart])

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  // Get cart subtotal
  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.subtotal, 0)
  }, [items])

  // Get tax amount
  const getTax = useCallback(() => {
    return getSubtotal() * VAT_RATE
  }, [getSubtotal])

  // Get delivery fee
  const getDeliveryFee = useCallback(() => {
    const subtotal = getSubtotal()
    return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  }, [getSubtotal])

  // Get grand total
  const getGrandTotal = useCallback(() => {
    return getSubtotal() + getTax() + getDeliveryFee()
  }, [getSubtotal, getTax, getDeliveryFee])

  // Get cart total (alias for grand total for backward compatibility)
  const getCartTotal = useCallback(() => {
    return getGrandTotal()
  }, [getGrandTotal])

  // Get total item count
  const getCartItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  // Check if item is in cart
  const isItemInCart = useCallback(
    (itemId: string) => {
      return items.some((item) => item.menuItem.id === itemId)
    },
    [items]
  )

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getSubtotal,
    getTax,
    getDeliveryFee,
    getGrandTotal,
    isItemInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}



