"use client"

import { UtensilsCrossed, ShoppingBag, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

export type OrderType = "dine-in" | "takeaway" | "delivery"

interface OrderTypeSelectorProps {
  selectedType: OrderType | null
  onSelect: (type: OrderType) => void
}

const orderTypes = [
  {
    id: "dine-in" as OrderType,
    icon: UtensilsCrossed,
    title: "Reserve & Dine",
    description: "Join us in our elegant dining room",
  },
  {
    id: "takeaway" as OrderType,
    icon: ShoppingBag,
    title: "Order for Pickup",
    description: "We'll have your order ready when you arrive",
  },
  {
    id: "delivery" as OrderType,
    icon: Truck,
    title: "Delivered to Your Door",
    description: "Fresh from our kitchen to your table",
  },
]

export function OrderTypeSelector({ selectedType, onSelect }: OrderTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-2">
          How would you like to enjoy your meal?
        </h2>
        <p className="text-muted-foreground font-body font-light">
          We&apos;re delighted to serve you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {orderTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "group relative p-6 md:p-8 rounded-lg border-2 transition-all duration-300 text-left",
                "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
                isSelected
                  ? "border-gold-500 bg-gold-500/5"
                  : "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5"
              )}
            >
              <div className="flex flex-col items-start gap-4">
                <div
                  className={cn(
                    "p-3 rounded-lg transition-colors",
                    isSelected ? "bg-gold-500/10" : "bg-muted/50 group-hover:bg-gold-500/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 md:h-7 md:w-7 transition-colors",
                      isSelected ? "text-gold-600" : "text-muted-foreground group-hover:text-gold-600"
                    )}
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-body font-light">
                    {type.description}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}



