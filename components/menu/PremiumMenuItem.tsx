"use client"

import { useState } from "react"
import { Clock, Wine } from "lucide-react"
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
      <div className="flex gap-6 items-start">
        {/* Item Image */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
          {isVisible && (
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="128px"
              priority={false}
            />
          )}
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            {item.tags?.includes("signature") && (
              <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded font-medium">
                Signature
              </span>
            )}
            {item.tags?.includes("chef-special") && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
                Chef&apos;s Special
              </span>
            )}
            {item.tags?.includes("new") && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            {item.tags?.includes("house-favorite") && (
              <span className="bg-burgundy-600 text-white text-xs px-2 py-1 rounded">
                House Favorite
              </span>
            )}
          </div>
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-xl font-serif text-gray-900 mb-1">
                {item.name}
                {/* Dietary Icons */}
                <span className="ml-2 inline-flex gap-1">
                  {item.dietary?.includes("vegetarian") && (
                    <span className="text-green-600" title="Vegetarian">
                      🌱
                    </span>
                  )}
                  {item.dietary?.includes("gluten-free") && (
                    <span className="text-amber-600" title="Gluten-Free">
                      🌾
                    </span>
                  )}
                  {item.spicyLevel && item.spicyLevel > 0 && (
                    <span
                      className="text-red-500 text-xs font-medium"
                      title={`Spicy Level ${item.spicyLevel}`}
                    >
                      Spicy
                    </span>
                  )}
                </span>
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-medium text-gray-900">
                {formatPrice(getDisplayPrice())}
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3 font-light">
            {item.description}
          </p>

          {/* Additional Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {item.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.preparationTime}
              </span>
            )}
            {item.pairingSuggestion && (
              <span className="flex items-center gap-1">
                <Wine className="w-3 h-3" />
                Pairs with: {item.pairingSuggestion}
              </span>
            )}
          </div>

          {/* Portion Sizes (if applicable) */}
          {item.portionSizes && item.portionSizes.length > 0 && (
            <div className="flex gap-2 mt-3">
              {item.portionSizes.map((portion) => (
                <button
                  key={portion.size}
                  onClick={() =>
                    setSelectedPortion(
                      selectedPortion === portion.size ? null : portion.size
                    )
                  }
                  className={cn(
                    "text-xs px-3 py-1 border rounded-full transition-colors",
                    selectedPortion === portion.size
                      ? "border-amber-500 text-amber-700 bg-amber-50"
                      : "border-gray-300 hover:border-amber-500 hover:text-amber-700"
                  )}
                >
                  {portion.size} - {formatPrice(portion.price)}
                </button>
              ))}
            </div>
          )}

          {/* Add to Order Button */}
          <Button
            onClick={handleAddToOrderClick}
            disabled={item.available === false}
            aria-label={`Add ${item.name} to order`}
            aria-pressed={false}
            className={cn(
              "mt-4 px-6 py-2 border-2 rounded-md transition-all duration-200",
              item.available !== false
                ? "border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            )}
          >
            {item.available !== false ? "Add to Order" : "Currently Unavailable"}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </article>
  )
}

