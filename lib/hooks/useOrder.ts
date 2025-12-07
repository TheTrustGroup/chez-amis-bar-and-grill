"use client"

import { useCart } from "@/lib/hooks/useCart"
import { MenuItem } from "@/lib/data/menuData"
import { CartCustomizations } from "@/lib/types/cart"
import { MenuItem as CartMenuItem } from "@/lib/menuData"

export function useOrder() {
  const { addToCart, items, getSubtotal, getTax, getGrandTotal } = useCart()

  const handleAddToOrder = (
    item: MenuItem | CartMenuItem,
    quantity: number = 1,
    customizations?: CartCustomizations
  ) => {
    // Convert MenuItem to the format expected by cart
    const cartItem: CartMenuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: 'price' in item ? (item.price || (item as any).portionSizes?.[0]?.price || 0) : item.price,
      category: item.category,
      image: item.image || "/images/placeholder-dish.jpg",
      tags: 'tags' in item ? (item.tags || []) : [],
      available: item.available !== false,
      popular: false,
      spicyLevel: 'spicyLevel' in item ? item.spicyLevel : undefined,
    }

    addToCart(cartItem, quantity, customizations)
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

