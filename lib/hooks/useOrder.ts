"use client"

import { useCart } from "@/lib/hooks/useCart"
import type { MenuItem } from "@/lib/data/menuData"
import { CartCustomizations } from "@/lib/types/cart"

export function useOrder() {
  const { addToCart, items, getSubtotal, getTax, getGrandTotal } = useCart()

  const handleAddToOrder = (
    item: MenuItem,
    quantity: number = 1,
    customizations?: CartCustomizations
  ) => {
    addToCart(item, quantity, customizations)
  }

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getGrandTotal()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    handleAddToOrder,
    subtotal,
    tax,
    total,
    itemCount,
  }
}

