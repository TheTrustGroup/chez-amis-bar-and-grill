"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuItem } from "@/lib/data/menuData"
import { MenuItem as CartMenuItem } from "@/lib/menuData"
import { ShoppingCart, ChefHat, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/useCart"
import { useTheme } from "@/lib/context/ThemeContext"
import { formatPrice } from "@/lib/utils/formatting"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface PremiumMenuCardProps {
  item: MenuItem
  onAddToCart?: (item: MenuItem) => void
}

export function PremiumMenuCard({ item, onAddToCart }: PremiumMenuCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      // Convert MenuItem to CartMenuItem format
      const cartItem: CartMenuItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price || (item.portionSizes?.[0]?.price ?? 0),
        category: item.category,
        image: item.image || "/images/placeholders/dish-placeholder.svg",
        tags: item.tags || [],
        available: item.available !== false,
        popular: false, // Default to false if not available
        spicyLevel: item.spicyLevel,
      }
      
      addToCart(cartItem, 1)
      onAddToCart?.(item)
    } catch (error) {
      // Error is handled by toast notification
    } finally {
      setIsAdding(false)
    }
  }

  const getDisplayPrice = () => {
    if (item.portionSizes && item.portionSizes.length > 0) {
      return item.portionSizes[0].price
    }
    return item.price || 0
  }

  if (!item.available) {
    return (
      <Card className={cn(
        "flex flex-col h-full opacity-60 border",
        isDark ? "bg-charcoal-900/30 border-charcoal-800/50" : "bg-card/50 border-border/30"
      )}>
        <CardContent className="p-6">
          <div className="text-center">
            <p className={cn(
              "font-body font-light",
              isDark ? "text-cream-200/60" : "text-muted-foreground"
            )}>
              Currently unavailable
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isSignature = item.tags?.includes("signature") || item.tags?.includes("chef-special")
  const isBestseller = item.tags?.includes("bestseller")

  return (
    <Card className={cn(
      "group relative overflow-hidden flex flex-col h-full transition-all duration-700 ease-out",
      "hover:shadow-2xl hover:-translate-y-3",
      isDark 
        ? "bg-charcoal-900/50 border-charcoal-800/50 hover:border-gold-500/40"
        : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-gold-500/40",
      "hover:scale-[1.02]"
    )}>
      {/* Image Container with Premium Effects */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-charcoal-200 to-charcoal-300">
        {/* Dish Image with Fallback */}
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Premium Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isSignature && (
            <Badge 
              variant="category" 
              className={cn(
                "bg-gold-500 text-charcoal-900 shadow-lg backdrop-blur-sm",
                "flex items-center gap-1 font-semibold animate-fade-in"
              )}
            >
              <Sparkles className="h-3 w-3" />
              Signature
            </Badge>
          )}
          {isBestseller && !isSignature && (
            <Badge 
              variant="category" 
              className={cn(
                "bg-primary text-primary-foreground shadow-lg backdrop-blur-sm",
                "flex items-center gap-1 font-semibold animate-fade-in"
              )}
            >
              <ChefHat className="h-3 w-3" />
              Popular
            </Badge>
          )}
        </div>

        {/* Hover Overlay Effect */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500 z-10",
          "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
          "opacity-0 group-hover:opacity-100"
        )} />

        {/* Gold Accent Glow on Hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10",
          "bg-gradient-to-br from-gold-500/20 via-transparent to-transparent"
        )} />
      </div>

      {/* Content Section */}
      <CardContent className="flex-1 p-5 md:p-6 space-y-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn(
            "text-lg md:text-xl font-display font-light leading-tight flex-1",
            isDark ? "text-cream-100" : "text-foreground",
            "group-hover:text-gold-600 transition-colors duration-300"
          )}>
            {item.name}
          </h3>
          <div className="flex-shrink-0 text-right">
            <p className={cn(
              "text-xl md:text-2xl font-bold",
              isDark ? "text-gold-400" : "text-primary",
              "transition-colors duration-300 group-hover:text-gold-600"
            )}>
              {formatPrice(getDisplayPrice())}
            </p>
            {item.portionSizes && item.portionSizes.length > 1 && (
              <p className={cn(
                "text-xs mt-0.5",
                isDark ? "text-cream-200/60" : "text-muted-foreground"
              )}>
                From
              </p>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className={cn(
          "text-sm md:text-base font-body font-light leading-relaxed line-clamp-2",
          isDark ? "text-cream-200/80" : "text-muted-foreground"
        )}>
          {item.description}
        </p>

        {/* Tags and Dietary Info */}
        <div className="flex flex-wrap gap-2">
          {item.tags && item.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs"
            >
              {String(tag)}
            </Badge>
          ))}
          {item.dietary && item.dietary.map((diet, index) => (
            <Badge key={`diet-${index}`} variant="tag" className="text-xs">
              {diet}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Footer with Add to Cart */}
      <CardFooter className={cn(
        "flex items-center justify-between p-5 md:p-6 pt-0 border-t",
        isDark ? "border-charcoal-800/50" : "border-border/50"
      )}>
        <Button
          size="sm"
          variant="premium"
          onClick={handleAddToCart}
          disabled={isAdding || !item.available}
          className={cn(
            "font-semibold relative overflow-hidden group/btn transition-all duration-300",
            "hover:scale-105 active:scale-95 w-full",
            "shadow-lg hover:shadow-xl hover:shadow-gold-500/30"
          )}
          aria-label={`Add ${item.name} to order`}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAdding ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                Add to Order
              </>
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
