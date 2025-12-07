"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExtendedMenuItem } from "@/lib/menuDataExtended"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/useCart"

interface MobileMenuCardProps {
  item: ExtendedMenuItem
}

export function MobileMenuCard({ item }: MobileMenuCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToOrder = () => {
    // Convert ExtendedMenuItem to MenuItem format
    const menuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      tags: item.dietary || [],
      available: item.available,
      popular: item.chefRecommended,
    }
    addToCart(menuItem, 1, {})
    // Haptic feedback (if supported)
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className="bg-background border border-cream-200 rounded-lg overflow-hidden shadow-soft">
      <div
        className="flex items-start gap-3 p-4 active:bg-cream-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
        aria-expanded={isExpanded}
      >
        {/* Image */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-md overflow-hidden border border-cream-200">
          <Image
            src={item.image || "/images/placeholder-food.jpg"}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base font-medium text-foreground leading-tight mb-1">
                {item.name}
              </h3>
              <p className="font-display text-lg font-light text-gold-600">
                GH₵ {item.price.toFixed(2)}
              </p>
            </div>
            <button
              className={cn(
                "p-1 rounded-full transition-colors flex-shrink-0",
                "active:bg-cream-200",
                isExpanded ? "text-gold-600" : "text-muted-foreground"
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-cream-200 animate-fade-in">
          {item.description && (
            <p className="text-sm text-muted-foreground font-body font-light leading-relaxed pt-3">
              {item.description}
            </p>
          )}

          {item.dietary && item.dietary.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.dietary.map((diet, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs font-body font-light bg-cream-50 border border-cream-200 text-muted-foreground"
                >
                  {diet}
                </span>
              ))}
            </div>
          )}

          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToOrder()
            }}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading font-light tracking-wide h-12"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Order
          </Button>
        </div>
      )}
    </div>
  )
}

