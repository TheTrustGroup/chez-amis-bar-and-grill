"use client"

import Link from "next/link"
import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SelectionItem } from "./SelectionItem"
import { useCartContext } from "@/lib/context/CartContext"
import { cn } from "@/lib/utils"

interface SelectionDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function SelectionDrawer({ isOpen, onClose }: SelectionDrawerProps) {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const total = getGrandTotal()

  const handlePlaceOrder = () => {
    // Close drawer and navigate to place-order page for complete checkout
    // place-order has order type selection, customer info, and payment
    onClose()
    if (typeof window !== "undefined") {
      window.location.href = "/place-order"
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-elegant z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="selection-drawer-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h2
              id="selection-drawer-title"
              className="text-2xl font-display font-light text-foreground"
            >
              Your Selection
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-sm hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              aria-label="Close selection drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-cream-50 flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-display font-light text-foreground mb-2">
                  Your selection is empty
                </h3>
                <p className="text-muted-foreground font-body font-light mb-6 max-w-xs">
                  Explore our menu to begin your culinary journey
                </p>
                <Link href="/menu" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="font-heading font-light tracking-wide border-gold-500/60"
                  >
                    View Menu
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Items List */}
                <div>
                  {items.map((item) => (
                    <SelectionItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                {/* Info Message */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground font-body font-light">
                    Select order type, provide details, and payment information on the checkout page.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Order Summary */}
          {items.length > 0 && (
            <div className="border-t border-border/50 bg-cream-50 p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-body font-light">Subtotal</span>
                  <span className="font-body font-light">GH₵ {subtotal.toFixed(2)}</span>
                </div>
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
                <div className="pt-2 border-t border-border/30 flex justify-between">
                  <span className="text-lg font-display font-light text-foreground">Total</span>
                  <span className="text-lg font-display font-light text-foreground">
                    GH₵ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Link href="/menu" onClick={onClose} className="block">
                  <Button
                    variant="ghost"
                    className="w-full font-heading font-light tracking-wide text-muted-foreground hover:text-foreground"
                  >
                    Continue Browsing Menu
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

