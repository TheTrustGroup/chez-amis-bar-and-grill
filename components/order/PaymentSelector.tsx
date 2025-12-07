"use client"

import { CreditCard, Wallet, Banknote } from "lucide-react"
import { cn } from "@/lib/utils"

export type PaymentMethod = "pay-later" | "mobile-money" | "card"

interface PaymentSelectorProps {
  selectedMethod: PaymentMethod | null
  onSelect: (method: PaymentMethod) => void
}

const paymentMethods = [
  {
    id: "pay-later" as PaymentMethod,
    icon: Banknote,
    title: "Pay at Restaurant / On Delivery",
    description: "Cash or card payment when you arrive or receive your order",
  },
  {
    id: "mobile-money" as PaymentMethod,
    icon: Wallet,
    title: "Mobile Money",
    description: "MTN, Vodafone, or AirtelTigo",
  },
  {
    id: "card" as PaymentMethod,
    icon: CreditCard,
    title: "Pay Now",
    description: "Visa or Mastercard",
  },
]

export function PaymentSelector({ selectedMethod, onSelect }: PaymentSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-2">
          Payment Method
        </h2>
        <p className="text-muted-foreground font-body font-light">
          Choose how you&apos;d like to pay
        </p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          const isSelected = selectedMethod === method.id
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={cn(
                "group w-full p-6 rounded-lg border-2 transition-all duration-300 text-left",
                "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
                isSelected
                  ? "border-gold-500 bg-gold-500/5"
                  : "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "p-3 rounded-lg transition-colors flex-shrink-0",
                    isSelected ? "bg-gold-500/10" : "bg-muted/50 group-hover:bg-gold-500/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isSelected ? "text-gold-600" : "text-muted-foreground group-hover:text-gold-600"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-light text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body font-light">
                    {method.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0 mt-2" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedMethod === "card" && (
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-body font-light">
            Your payment is secure and encrypted
          </p>
        </div>
      )}
    </div>
  )
}



