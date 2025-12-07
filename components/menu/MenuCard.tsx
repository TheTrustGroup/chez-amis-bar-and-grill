"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuItem } from "@/lib/menuData"
import { ShoppingCart, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/hooks/useCart"

interface MenuCardProps {
  item: MenuItem
  onAddToCart?: (item: MenuItem) => void
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
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

  if (!item.available) {
    return (
      <Card className="flex flex-col h-full opacity-60">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Currently unavailable</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-charcoal-200 to-charcoal-300">
        {/* Placeholder Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-charcoal-200 flex items-center justify-center">
          <div className="text-5xl">🍽️</div>
        </div>
        
        {/* Popular Badge */}
        {item.popular && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="category" className="bg-primary text-primary-foreground">
              <ChefHat className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}

        {/* Image Zoom Effect */}
        <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-500">
          {/* In production, use Next.js Image */}
          {/* <Image
            src={item.image}
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
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <Badge
                key={index}
                variant={
                  tag === "Vegetarian" || tag === "Vegan" || tag === "Gluten-free"
                    ? "tag"
                    : tag === "Spicy"
                    ? "destructive"
                    : "outline"
                }
                className="text-xs"
              >
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
          disabled={isAdding || !item.available}
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

