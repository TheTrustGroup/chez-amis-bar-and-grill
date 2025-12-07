"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CartItem as CartItemType } from "@/lib/types"
import { Plus, Minus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.menuItem.price * item.quantity

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              {item.menuItem.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              ${item.menuItem.price.toFixed(2)} each
            </p>
            {item.specialInstructions && (
              <p className="text-xs text-muted-foreground italic">
                Note: {item.specialInstructions}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-lg font-bold">${subtotal.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



