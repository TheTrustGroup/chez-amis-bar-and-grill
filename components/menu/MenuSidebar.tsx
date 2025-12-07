"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Wheat, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { menuCategories } from "@/lib/menuDataExtended"
import { useCartContext } from "@/lib/context/CartContext"

interface MenuSidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  onDietaryFilterChange?: (dietary: string) => void
  activeDietaryFilter?: string
}

export function MenuSidebar({
  activeCategory,
  onCategoryChange,
  onDietaryFilterChange,
  activeDietaryFilter,
}: MenuSidebarProps) {
  const { getCartItemCount, getSubtotal } = useCartContext()
  const itemCount = getCartItemCount()
  const subtotal = getSubtotal()

  return (
    <aside className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
      <div className="space-y-8">
        {/* Categories */}
        <nav className="space-y-1" aria-label="Menu categories">
          {menuCategories.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full text-left flex items-center gap-3 px-4 py-3 transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm",
                  isActive
                    ? "text-gold-600 font-heading font-medium"
                    : "text-muted-foreground hover:text-foreground font-heading font-light"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Decorative bullet */}
                <span
                  className={cn(
                    "h-1 w-1 rounded-full transition-all duration-300",
                    isActive ? "bg-gold-500" : "bg-muted-foreground/30"
                  )}
                />
                <span className="text-sm tracking-wide">{category.label}</span>
                {/* Active indicator line */}
                {isActive && (
                  <span className="ml-auto h-0.5 w-8 bg-gold-500" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Dietary Filters */}
        {onDietaryFilterChange && (
          <div className="pt-6 border-t border-border/50">
            <h3 className="text-xs font-heading font-light tracking-widest uppercase text-muted-foreground mb-4 px-4">
              Dietary Preferences
            </h3>
            <div className="space-y-2">
              {[
                { id: "vegetarian", icon: Leaf, label: "Vegetarian" },
                { id: "gluten-free", icon: Wheat, label: "Gluten Free" },
                { id: "spicy", icon: Flame, label: "Spicy" },
              ].map((filter) => {
                const Icon = filter.icon
                const isActive = activeDietaryFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    onClick={() =>
                      onDietaryFilterChange(isActive ? "" : filter.id)
                    }
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm",
                      isActive
                        ? "text-gold-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-body font-light">{filter.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Your Selection Summary */}
        {itemCount > 0 && (
          <div className="pt-6 border-t border-border/50">
            <div className="bg-cream-50 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-heading font-light tracking-wide text-foreground mb-2">
                  Your Selection
                </h3>
                <p className="text-xs text-muted-foreground font-body">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
                <p className="text-lg font-display font-light text-foreground mt-2">
                  GH₵ {subtotal.toFixed(2)}
                </p>
              </div>
              <Link href="/cart" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-heading font-light tracking-wide border-gold-500/60 text-foreground hover:bg-gold-500/10"
                >
                  Review Order
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}



