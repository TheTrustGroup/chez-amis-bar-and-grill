"use client"

import { useState } from "react"
import { MenuItem } from "@/lib/data/menuData"
import { useOrder } from "@/lib/hooks/useOrder"
import { useLazyLoad } from "@/lib/hooks/useLazyLoad"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { formatPrice } from "@/lib/utils/formatting"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MenuItem as CartMenuItem } from "@/lib/menuData"

interface PremiumMenuItemProps {
  item: MenuItem
}

export function PremiumMenuItem({ item }: PremiumMenuItemProps) {
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)
  const { handleAddToOrder } = useOrder()
  const { elementRef, isVisible } = useLazyLoad<HTMLDivElement>()

  const getDisplayPrice = () => {
    if (item.portionSizes && item.portionSizes.length > 0) {
      if (selectedPortion) {
        const portion = item.portionSizes.find((p) => p.size === selectedPortion)
        return portion?.price || item.portionSizes[0].price
      }
      return item.portionSizes[0].price
    }
    return item.price || 0
  }

  const handleAddToOrderClick = () => {
    const customizations = selectedPortion
      ? { size: selectedPortion }
      : undefined

    // Convert MenuItem to cart format
    const cartItem: CartMenuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: getDisplayPrice(),
      category: item.category,
      image: item.image || "/images/placeholder-dish.jpg",
      tags: item.tags || [],
      available: item.available !== false,
      popular: false,
      spicyLevel: item.spicyLevel,
    }

    handleAddToOrder(cartItem, 1, customizations)
  }

  return (
    <article ref={elementRef} className="group relative">
      <div className="flex gap-5 items-start">
        {/* Item Image - Smaller, cleaner */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          {isVisible && (
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="96px"
              priority={false}
            />
          )}
          {/* Minimal badge - only show signature */}
          {item.tags?.includes("signature") && (
            <div className="absolute top-1 right-1">
              <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                ★
              </span>
            </div>
          )}
        </div>

        {/* Item Details - Cleaner */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-display font-light text-gray-900 mb-0.5">
                {item.name}
              </h3>
              {/* Minimal dietary indicators */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                {item.dietary?.includes("vegetarian") && (
                  <span title="Vegetarian">🌱</span>
                )}
                {item.dietary?.includes("gluten-free") && (
                  <span title="Gluten-Free">GF</span>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-medium text-gray-900">
                {formatPrice(getDisplayPrice())}
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3 font-body font-light">
            {item.description}
          </p>

          {/* Portion Sizes - Minimal */}
          {item.portionSizes && item.portionSizes.length > 0 && (
            <div className="flex gap-2 mt-2 mb-3">
              {item.portionSizes.map((portion) => (
                <button
                  key={portion.size}
                  onClick={() =>
                    setSelectedPortion(
                      selectedPortion === portion.size ? null : portion.size
                    )
                  }
                  className={cn(
                    "text-xs px-2.5 py-1 border rounded transition-colors",
                    selectedPortion === portion.size
                      ? "border-amber-500 text-amber-700 bg-amber-50"
                      : "border-gray-200 hover:border-amber-400 text-gray-600"
                  )}
                >
                  {portion.size} - {formatPrice(portion.price)}
                </button>
              ))}
            </div>
          )}

          {/* Add to Order Button - Minimal */}
          <button
            onClick={handleAddToOrderClick}
            disabled={item.available === false}
            aria-label={`Add ${item.name} to order`}
            className={cn(
              "mt-3 text-sm px-4 py-2 border rounded transition-all duration-200",
              item.available !== false
                ? "border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            )}
          >
            {item.available !== false ? "Add to Order" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Minimal Divider */}
      <div className="mt-6 h-px bg-gray-100" />
    </article>
  )
}

