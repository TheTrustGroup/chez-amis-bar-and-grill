"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuItem, dietaryLabelList } from "@/lib/data/menuData"
import { ShoppingCart, ChefHat, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/useCart"
import { useTheme } from "@/lib/context/ThemeContext"
import { formatPrice } from "@/lib/utils/formatting"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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
      
      addToCart(item, 1)
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
        isDark ? "bg-green-600/30 border-green-700/50" : "bg-card/50 border-border/30"
      )}>
        <CardContent className="p-6">
          <div className="text-center">
            <p className={cn(
              "font-body font-light",
              isDark ? "text-white/60" : "text-muted-foreground"
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
      "group relative overflow-hidden flex flex-col h-full rounded-sm transition-all duration-500 ease-out",
      "md:hover:shadow-2xl md:hover:-translate-y-2",
      isDark 
        ? "bg-green-600/50 border-green-700/50 md:hover:border-terra-500/40"
        : "bg-card/50 backdrop-blur-sm border-border/50 md:hover:border-terra-500/40",
      "md:hover:scale-[1.01]"
    )}>
      {/* Image Container with Premium Effects */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-gradient-to-br from-neutral-200 to-neutral-300">
        {/* Dish Image with Fallback */}
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Premium Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isSignature && (
            <Badge 
              variant="category" 
              className={cn(
                "bg-terra-500 text-neutral-900 shadow-lg backdrop-blur-sm",
                "flex items-center gap-1 font-semibold animate-fade-in"
              )}
            >
              <Award className="h-3 w-3" />
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
          "opacity-0 md:group-hover:opacity-100"
        )} />

        {/* Gold Accent Glow on Hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10",
          "bg-gradient-to-br from-terra-500/20 via-transparent to-transparent"
        )} />
      </div>

      {/* Content Section */}
      <CardContent className="flex-1 p-5 md:p-6 space-y-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn(
            "text-lg md:text-xl font-display font-light leading-tight flex-1",
            isDark ? "text-white" : "text-foreground",
            "md:group-hover:text-terra-600 transition-colors duration-300"
          )}>
            {item.name}
          </h3>
          <div className="flex-shrink-0 text-right">
            <p className={cn(
              "text-xl md:text-2xl font-bold",
              isDark ? "text-terra-400" : "text-terra-600",
              "transition-colors duration-300 md:group-hover:text-terra-500"
            )}>
              {formatPrice(getDisplayPrice())}
            </p>
            {item.portionSizes && item.portionSizes.length > 1 && (
              <p className={cn(
                "text-xs mt-0.5",
                isDark ? "text-white/60" : "text-muted-foreground"
              )}>
                From
              </p>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className={cn(
          "text-sm md:text-base font-body font-light leading-relaxed line-clamp-2",
          isDark ? "text-white/80" : "text-muted-foreground"
        )}>
          {item.description}
        </p>

        {item.featured && (
          <p className="flex items-center gap-2 text-sm font-display italic text-green-700 dark:text-white/90">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-terra-500" aria-hidden />
            Chef&apos;s selection
          </p>
        )}

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
          {dietaryLabelList(item.dietary).map((diet, index) => (
            <Badge key={`diet-${index}`} variant="tag" className="text-xs">
              {diet}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Footer with Add to Cart */}
      <CardFooter className={cn(
        "flex items-center justify-between p-5 md:p-6 pt-0 border-t",
        isDark ? "border-green-700/50" : "border-border/50"
      )}>
        <Button
          size="sm"
          variant="premium"
          onClick={handleAddToCart}
          disabled={isAdding || !item.available}
          className={cn(
            "font-semibold relative overflow-hidden group/btn transition-all duration-300",
            "active:scale-95 w-full min-h-[48px]",
            "shadow-md md:hover:shadow-lg md:hover:shadow-terra-500/20"
          )}
          aria-label={`Add ${item.name} to order`}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full md:group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAdding ? (
              <>
                <LoadingSpinner size="md" className="mr-2 text-white" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 transition-transform duration-300 md:group-hover/btn:scale-110" />
                Add to Order
              </>
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
