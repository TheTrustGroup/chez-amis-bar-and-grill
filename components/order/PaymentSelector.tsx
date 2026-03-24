"use client"

import { CreditCard, Wallet, Banknote } from "lucide-react"
import { cn } from "@/lib/utils"
import { PAYMENT_ON_DELIVERY_ONLY } from "@/lib/config/payments"

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
    description: "Cash or card when you arrive, pick up, or when your order is delivered",
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
  if (PAYMENT_ON_DELIVERY_ONLY) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 font-display text-2xl font-light text-foreground md:text-3xl">
            Payment
          </h2>
          <p className="font-body font-light text-muted-foreground">
            Pay on delivery or when you collect — cash or card. Online payment will be available
            here soon.
          </p>
        </div>

        <div
          className={cn(
            "rounded-lg border-2 border-terra-500/40 bg-terra-500/5 p-6",
            "text-left"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-lg bg-terra-500/10 p-3">
              <Banknote className="h-5 w-5 text-terra-600" aria-hidden />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-display text-lg font-light text-foreground">
                Pay when you receive your order
              </h3>
              <p className="text-sm font-body font-light text-muted-foreground">
                No charge is made online. Our team may confirm your order by phone or message. You
                pay the driver or at the restaurant—whichever applies to your order type.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-2xl font-light text-foreground md:text-3xl">
          Payment Method
        </h2>
        <p className="font-body font-light text-muted-foreground">
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
              type="button"
              onClick={() => onSelect(method.id)}
              className={cn(
                "group w-full rounded-lg border-2 p-6 text-left transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2",
                isSelected
                  ? "border-terra-500 bg-terra-500/5"
                  : "border-border/50 hover:border-terra-500/50 hover:bg-terra-500/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-3 transition-colors",
                    isSelected ? "bg-terra-500/10" : "bg-muted/50 group-hover:bg-terra-500/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isSelected ? "text-terra-600" : "text-muted-foreground group-hover:text-terra-600"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-display text-lg font-light text-foreground">
                    {method.title}
                  </h3>
                  <p className="font-body text-sm font-light text-muted-foreground">
                    {method.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-terra-500" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedMethod === "card" && (
        <div className="border-t border-border/50 pt-4">
          <p className="font-body text-sm font-light text-muted-foreground">
            Your payment is secure and encrypted
          </p>
        </div>
      )}
    </div>
  )
}



