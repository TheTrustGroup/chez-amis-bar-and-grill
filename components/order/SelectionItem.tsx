"use client"

import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/lib/types/cart"
import { cn } from "@/lib/utils"

interface SelectionItemProps {
  item: CartItem
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export function SelectionItem({ item, onUpdateQuantity, onRemove }: SelectionItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    } else {
      onRemove(item.id)
    }
  }

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  return (
    <div className="py-6 border-b border-gold-500/20 last:border-b-0">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-border/30 bg-gradient-to-br from-charcoal-900 to-burgundy-900">
            {/* In production, use Next.js Image */}
            {/* <Image
              src={item.menuItem.image || "/images/placeholder.jpg"}
              alt={item.menuItem.name}
              width={80}
              height={80}
              className="object-cover"
            /> */}
            <div className="w-full h-full flex items-center justify-center text-cream-200/20 text-xs">
              {item.menuItem.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-base md:text-lg font-display font-light text-foreground mb-1">
                {item.menuItem.name}
              </h4>
              {item.customizations && (
                <div className="text-sm text-muted-foreground font-body font-light space-y-0.5">
                  {item.customizations.size && (
                    <p>Size: {item.customizations.size}</p>
                  )}
                  {item.customizations.extras && item.customizations.extras.length > 0 && (
                    <p>Extras: {item.customizations.extras.join(", ")}</p>
                  )}
                  {item.customizations.specialInstructions && (
                    <p className="italic">Note: {item.customizations.specialInstructions}</p>
                  )}
                </div>
              )}
              <p className="text-sm md:text-base font-display font-light text-gold-600 mt-2">
                GH₵ {item.subtotal.toFixed(2)}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-body font-light">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Remove Link */}
          <button
            onClick={() => onRemove(item.id)}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground font-body font-light underline underline-offset-2 transition-colors"
            aria-label={`Remove ${item.menuItem.name}`}
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  )
}



