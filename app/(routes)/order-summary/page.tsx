"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SelectionItem } from "@/components/order/SelectionItem"
import { useCartContext } from "@/lib/context/CartContext"
import { ArrowRight, ShoppingBag } from "lucide-react"

export default function OrderSummaryPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const total = getGrandTotal()

  const handleProceedToCheckout = () => {
    // Redirect to place-order page for complete checkout
    // place-order has order type selection, customer info, and payment
    router.push('/place-order')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-light text-foreground mb-4">
            Your Selection is Empty
          </h1>
          <p className="text-muted-foreground font-body font-light mb-8">
            Explore our menu to begin your culinary journey
          </p>
          <Link href="/menu">
            <Button
              variant="outline"
              size="lg"
              className="font-heading font-light tracking-wide border-gold-500/60"
            >
              View Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-cream-50 border-b border-border/50 py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-light text-foreground mb-2">
            Review Your Selection
          </h1>
          <p className="text-lg text-muted-foreground font-body font-light">
            Review your items before proceeding to checkout
          </p>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content - Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-display font-light text-foreground mb-6">
                Selected Items ({items.length})
              </h2>
              <div className="bg-background rounded-lg border border-border/30 divide-y divide-border/30">
                {items.map((item) => (
                  <SelectionItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="pt-6">
              <Link href="/menu">
                <Button
                  variant="outline"
                  className="font-heading font-light tracking-wide border-gold-500/60"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar - Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-cream-50 rounded-lg p-6 border border-border/30 space-y-6">
              <h2 className="text-xl font-display font-light text-foreground">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
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
                <div className="pt-4 border-t border-border/30 flex justify-between">
                  <span className="text-xl font-display font-light text-foreground">Total</span>
                  <span className="text-xl font-display font-light text-foreground">
                    GH₵ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleProceedToCheckout}
                className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground font-body font-light text-center">
                You&apos;ll select order type, provide details, and payment on the next page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

