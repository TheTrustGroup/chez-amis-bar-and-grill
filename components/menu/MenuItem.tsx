"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Leaf, Wheat, Flame } from "lucide-react"
import {
  type MenuItem as MenuItemData,
  resolveMenuItemUnitPrice,
  dietaryLabelList,
} from "@/lib/data/menuData"
import { useCart } from "@/lib/hooks/useCart"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  item: MenuItemData
}

export function MenuItem({ item }: MenuItemProps) {
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)
  const { addToCart } = useCart()

  const handleSelect = () => {
    addToCart(item, 1, selectedPortion ? { size: selectedPortion } : undefined)
  }

  const getDietaryIcon = (label: string) => {
    const lower = label.toLowerCase()
    if (lower.includes("vegetarian")) return <Leaf className="h-3.5 w-3.5" />
    if (lower.includes("gluten")) return <Wheat className="h-3.5 w-3.5" />
    if (lower.includes("spicy")) return <Flame className="h-3.5 w-3.5" />
    return null
  }

  const labels = dietaryLabelList(item.dietary)
  const displayPrice = resolveMenuItemUnitPrice(
    item,
    selectedPortion ? { size: selectedPortion } : undefined,
  )

  return (
    <div className="group py-10 md:py-12 border-b border-terra-500/20 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative w-full md:w-[200px] h-[200px] rounded-lg overflow-hidden border border-border/30 md:group-hover:shadow-elegant transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-900">
              {/* In production, use Next.js Image */}
              {/* <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 md:group-hover:scale-105"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-200/20 font-display text-lg">
                {item.name}
              </div>
            </div>
            {/* Gold tint on hover */}
            <div className="absolute inset-0 bg-terra-500/0 md:group-hover:bg-terra-500/10 transition-colors duration-500"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Header with name and dietary icons */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-display font-light text-foreground mb-2">
                {item.name}
              </h3>
              {item.featured && (
                <span className="inline-block text-xs font-body font-light tracking-widest uppercase text-terra-600 mb-2">
                  Chef&apos;s Recommendation
                </span>
              )}
            </div>
            {/* Dietary Icons */}
            {labels.length > 0 && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {labels.map((diet) => (
                  <div
                    key={diet}
                    className="text-muted-foreground md:group-hover:text-terra-600 transition-colors"
                    title={diet}
                  >
                    {getDietaryIcon(diet)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
            {item.description}
          </p>

          {/* Preparation method */}
          {item.preparation && (
            <p className="text-sm text-muted-foreground/80 font-body font-light italic">
              {item.preparation}
            </p>
          )}

          {/* Pairing suggestion */}
          {item.pairingSuggestion && (
            <p className="text-sm text-muted-foreground font-body font-light">
              <span className="font-medium">Pairing:</span> {item.pairingSuggestion}
            </p>
          )}

          {/* Portion size and price */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              {item.portionSizes && item.portionSizes.length > 0 && (
                <select
                  value={selectedPortion ?? item.portionSizes[0]?.size ?? ""}
                  onChange={(e) => setSelectedPortion(e.target.value)}
                  className="text-sm font-body font-light border border-border/50 rounded-sm px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-1"
                >
                  {item.portionSizes.map((p) => (
                    <option key={p.size} value={p.size}>
                      {p.size}
                    </option>
                  ))}
                </select>
              )}
              <span className="text-xl md:text-2xl font-display font-light text-foreground">
                GH₵ {displayPrice.toFixed(2)}
              </span>
            </div>

            {/* Select Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelect}
              className="font-body font-light tracking-wide border-terra-500/60 text-foreground md:hover:bg-terra-500/10 md:hover:border-terra-500 transition-all duration-300"
              aria-label={`Select ${item.name}`}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



