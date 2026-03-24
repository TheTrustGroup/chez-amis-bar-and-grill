"use client"

import { useState } from "react"
import { MenuItem } from "@/lib/data/menuData"
import { useOrder } from "@/lib/hooks/useOrder"
import { useLazyLoad } from "@/lib/hooks/useLazyLoad"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { formatPrice } from "@/lib/utils/formatting"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/context/ThemeContext"

interface PremiumMenuItemProps {
  item: MenuItem
}

export function PremiumMenuItem({ item }: PremiumMenuItemProps) {
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)
  const { handleAddToOrder } = useOrder()
  const { elementRef, isVisible } = useLazyLoad<HTMLDivElement>()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

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

    handleAddToOrder(item, 1, customizations)
  }

  return (
    <article ref={elementRef} className={cn(
      "group relative p-6 md:p-8 rounded-xl transition-all duration-500",
      "hover:shadow-lg hover:-translate-y-1",
      isDark 
        ? "bg-green-600/30 border border-green-700/50 hover:border-terra-500/40"
        : "bg-card/50 border border-border/30 hover:border-terra-500/40"
    )}>
      <div className="flex gap-4 md:gap-6 items-start">
        {/* Item Image - Premium with hover effects */}
        <div className={cn(
          "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-500 md:h-28 md:w-28",
          "shadow-md group-hover:shadow-xl",
          "border border-terra-500/20 group-hover:border-terra-500/40",
          isDark ? "bg-green-700" : "bg-gray-100"
        )}>
          {isVisible && (
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 80px, 112px"
              priority={false}
            />
          )}
          {/* Premium badge - signature dishes */}
          {item.tags?.includes("signature") && (
            <div className="absolute top-2 right-2 z-10">
              <span className={cn(
                "bg-terra-500 text-neutral-900 text-xs px-2 py-1 rounded-md font-semibold shadow-lg",
                "flex items-center gap-1"
              )}>
                <span>⭐</span> Signature
              </span>
            </div>
          )}
        </div>

        {/* Item Details - Premium Typography */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-lg md:text-xl font-display font-light leading-tight transition-colors duration-300",
                "group-hover:text-terra-600",
                isDark ? "text-white" : "text-foreground"
              )}>
                {item.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={cn(
                "text-lg md:text-xl font-bold transition-colors duration-300",
                "group-hover:text-terra-600",
                isDark ? "text-terra-400" : "text-primary",
                "whitespace-nowrap"
              )}>
                {formatPrice(getDisplayPrice())}
              </p>
            </div>
          </div>

          <p className={cn(
            "text-sm md:text-base leading-relaxed mb-4 font-body font-light",
            isDark ? "text-white/80" : "text-muted-foreground"
          )}>
            {item.description}
          </p>

          {/* Portion Sizes - Premium */}
          {item.portionSizes && item.portionSizes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {item.portionSizes.map((portion) => (
                <button
                  key={portion.size}
                  onClick={() =>
                    setSelectedPortion(
                      selectedPortion === portion.size ? null : portion.size
                    )
                  }
                  className={cn(
                    "text-xs px-3 py-2 border-2 rounded-lg transition-all duration-300 min-h-[36px] touch-manipulation font-medium",
                    "hover:scale-105 active:scale-95",
                    selectedPortion === portion.size
                      ? "border-terra-500 text-terra-700 bg-terra-50 shadow-md"
                      : isDark
                      ? "border-green-700 text-white/70 hover:border-terra-500/50 hover:bg-green-700/50"
                      : "border-border text-muted-foreground hover:border-terra-500/50 hover:bg-muted/50"
                  )}
                  aria-label={`Select ${portion.size} size`}
                >
                  {portion.size} - {formatPrice(portion.price)}
                </button>
              ))}
            </div>
          )}

          {/* Add to Order Button - Premium */}
          <Button
            onClick={handleAddToOrderClick}
            disabled={item.available === false}
            variant="premium"
            size="sm"
            aria-label={`Add ${item.name} to order`}
            className={cn(
              "mt-2 font-semibold transition-all duration-300",
              "hover:scale-105 active:scale-95",
              "shadow-lg hover:shadow-xl hover:shadow-terra-500/30"
            )}
          >
            {item.available !== false ? "Add to Order" : "Unavailable"}
          </Button>
        </div>
      </div>

      {/* Premium Divider */}
      <div className={cn(
        "mt-8 md:mt-10 h-px transition-colors duration-300",
        isDark ? "bg-green-700/50" : "bg-border/50"
      )} />
    </article>
  )
}

