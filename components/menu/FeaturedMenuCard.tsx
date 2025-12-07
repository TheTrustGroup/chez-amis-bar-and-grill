"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuItem } from "@/lib/menuData"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/useCart"

interface FeaturedMenuCardProps {
  item: MenuItem
  onAddToCart?: (item: MenuItem) => void
}

export function FeaturedMenuCard({ item, onAddToCart }: FeaturedMenuCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      addToCart(item, 1)
      onAddToCart?.(item)
    } catch (error) {
      // Error is handled by toast notification
    } finally {
      setIsAdding(false)
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-charcoal-200 to-charcoal-300">
        {/* Placeholder Image - in production, use Next.js Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-charcoal-200 flex items-center justify-center">
          <div className="text-4xl">🍽️</div>
        </div>
        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Badges */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {item.tags.map((tag, index) => (
              <Badge
                key={index}
                variant={tag === "Bestseller" ? "category" : tag === "New" ? "tag" : "outline"}
                className="bg-white/90 text-charcoal-900 hover:bg-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300",
            "bg-white/90 hover:bg-white shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isFavorite && "bg-primary/20"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-primary text-primary" : "text-charcoal-700"
            )}
          />
        </button>

        {/* Image Zoom Effect */}
        <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-500">
          {/* In production, replace with: */}
          {/* <Image
            src={item.image || "/images/placeholder-food.jpg"}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 text-foreground">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>
        
        {/* Dietary Badges */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags
              .filter((tag) => ["Vegetarian", "Vegan", "Gluten-free"].includes(tag))
              .map((tag, index) => (
                <Badge key={index} variant="tag" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>
        )}
      </CardContent>

      {/* Footer with Price and Add to Cart */}
      <CardFooter className="flex items-center justify-between p-4 md:p-6 pt-0 border-t">
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-bold text-primary">
            GH₵ {item.price.toFixed(2)}
          </span>
        </div>
        <Button
          size="sm"
          variant="accent"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="font-semibold"
          aria-label={`Add ${item.name} to order`}
        >
          {isAdding ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Order
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

