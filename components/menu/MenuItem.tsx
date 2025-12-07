"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Leaf, Wheat, Flame } from "lucide-react"
import { ExtendedMenuItem } from "@/lib/menuDataExtended"
import { useCart } from "@/lib/hooks/useCart"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  item: ExtendedMenuItem
}

export function MenuItem({ item }: MenuItemProps) {
  const [selectedPortion, setSelectedPortion] = useState<"regular" | "small" | "large">("regular")
  const { addToCart } = useCart()

  const getPrice = () => {
    if (item.portionSize) {
      return item.portionSize[selectedPortion] || item.price
    }
    return item.price
  }

  const handleSelect = () => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        description: item.description,
        price: getPrice(),
        category: item.category,
        image: item.image,
        tags: item.dietary,
        available: item.available,
      },
      1
    )
  }

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case "vegetarian":
        return <Leaf className="h-3.5 w-3.5" />
      case "gluten-free":
        return <Wheat className="h-3.5 w-3.5" />
      case "spicy":
        return <Flame className="h-3.5 w-3.5" />
      default:
        return null
    }
  }

  return (
    <div className="group py-10 md:py-12 border-b border-gold-500/20 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative w-full md:w-[200px] h-[200px] rounded-lg overflow-hidden border border-border/30 group-hover:shadow-elegant transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
              {/* In production, use Next.js Image */}
              {/* <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-lg">
                {item.name}
              </div>
            </div>
            {/* Gold tint on hover */}
            <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500"></div>
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
              {item.chefRecommended && (
                <span className="inline-block text-xs font-heading font-light tracking-widest uppercase text-gold-600 mb-2">
                  Chef&apos;s Recommendation
                </span>
              )}
              {item.seasonal && (
                <span className="inline-block text-xs font-heading font-light tracking-widest uppercase text-sage-600 mb-2 ml-3">
                  Seasonal
                </span>
              )}
            </div>
            {/* Dietary Icons */}
            {item.dietary.length > 0 && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.dietary.map((diet) => (
                  <div
                    key={diet}
                    className="text-muted-foreground group-hover:text-gold-600 transition-colors"
                    title={diet.charAt(0).toUpperCase() + diet.slice(1)}
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
              {item.portionSize && (
                <select
                  value={selectedPortion}
                  onChange={(e) =>
                    setSelectedPortion(e.target.value as "regular" | "small" | "large")
                  }
                  className="text-sm font-body font-light border border-border/50 rounded-sm px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                >
                  {item.portionSize.small && <option value="small">Small</option>}
                  <option value="regular">Regular</option>
                  {item.portionSize.large && <option value="large">Large</option>}
                </select>
              )}
              <span className="text-xl md:text-2xl font-display font-light text-foreground">
                GH₵ {getPrice().toFixed(2)}
              </span>
            </div>

            {/* Select Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelect}
              className="font-heading font-light tracking-wide border-gold-500/60 text-foreground hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-300"
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



