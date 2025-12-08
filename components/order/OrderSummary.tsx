"use client"

import Link from "next/link"
import { SelectionItem } from "./SelectionItem"
import { useCartContext } from "@/lib/context/CartContext"
import { OrderType } from "./OrderTypeSelector"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OrderSummaryProps {
  orderType: OrderType | null
  onPlaceOrder?: () => void
  canPlaceOrder?: boolean
  isSubmitting?: boolean
}

export function OrderSummary({ orderType, onPlaceOrder, canPlaceOrder = false, isSubmitting = false }: OrderSummaryProps) {
  const { items, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const serviceCharge = orderType === "dine-in" ? subtotal * 0.1 : 0
  const total = getGrandTotal() + serviceCharge

  const getOrderTypeLabel = () => {
    switch (orderType) {
      case "dine-in":
        return "Dine In"
      case "takeaway":
        return "Takeaway"
      case "delivery":
        return "Delivery"
      default:
        return null
    }
  }

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="bg-cream-50 rounded-lg p-6 md:p-8 border border-border/30 space-y-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-light text-foreground mb-4">
            Your Order
          </h2>
          {orderType && (
            <Badge
              variant="outline"
              className="font-heading font-light tracking-wide border-gold-500/60 text-gold-600"
            >
              {getOrderTypeLabel()}
            </Badge>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-muted-foreground font-body font-light">
            Your selection is empty
          </p>
        ) : (
          <>
            {/* Items List - Read-only, elegant */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-border/20 last:border-b-0">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border/30 bg-gradient-to-br from-charcoal-900 to-burgundy-900">
                    {/* In production, use Next.js Image */}
                    <div className="w-full h-full flex items-center justify-center text-cream-200/20 text-xs">
                      {item.menuItem.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-display font-light text-foreground mb-1">
                      {item.menuItem.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body font-light">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-display font-light text-gold-600 mt-1">
                      GH₵ {item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-border/30 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body font-light">Subtotal</span>
                <span className="font-body font-light">GH₵ {subtotal.toFixed(2)}</span>
              </div>
              {serviceCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-body font-light">
                    Service Charge (10%)
                  </span>
                  <span className="font-body font-light">GH₵ {serviceCharge.toFixed(2)}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-body font-light">Delivery Fee</span>
                  <span className="font-body font-light">GH₵ {deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body font-light">VAT (15%)</span>
                <span className="font-body font-light">GH₵ {tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-border/30 flex justify-between">
                <span className="text-lg font-display font-light text-foreground">Total</span>
                <span className="text-lg font-display font-light text-foreground">
                  GH₵ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="flex items-center gap-2 pt-4 border-t border-border/30">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-body font-light">
                Ready in 35-45 minutes
              </p>
            </div>

            {/* Place Order Button - Prominent, always visible */}
            {onPlaceOrder && (
              <div className="pt-4 space-y-3">
                <Button
                  onClick={onPlaceOrder}
                  disabled={!canPlaceOrder || isSubmitting}
                  size="lg"
                  className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
                {!canPlaceOrder && (
                  <p className="text-xs text-muted-foreground font-body font-light text-center px-2">
                    Complete all fields above to place your order
                  </p>
                )}
              </div>
            )}

            {/* Modify Order Link */}
            {onPlaceOrder && (
              <Link
                href="/menu"
                className="block text-center text-sm text-muted-foreground hover:text-foreground font-body font-light underline underline-offset-2 transition-colors pt-2"
              >
                Modify Order
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}



