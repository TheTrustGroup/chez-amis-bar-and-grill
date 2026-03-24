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

  // Order summary page doesn't have order type yet, so show base totals
  // Delivery fee and service charge will be calculated on place-order page
  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = 0 // Not shown until order type is selected
  const total = getSubtotal() + getTax() // Base total without delivery/service charge

  const handleProceedToCheckout = () => {
    // Redirect to place-order page for complete checkout
    // place-order has order type selection, customer info, and payment
    router.push('/place-order')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-green-700 transition-colors section-padding-sm">
        <div className="section-shell-inner w-full max-w-md text-center">
          <h1 className="hero-title tracking-tight text-neutral-900 dark:text-white mb-4">
            Your Selection is Empty
          </h1>
          <p className="text-muted-foreground font-body font-light mb-8 prose-readable mx-auto">
            Explore our menu to begin your culinary journey
          </p>
          <Link href="/menu">
            <Button
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] font-body font-light tracking-wide border-terra-500/60 sm:w-auto"
            >
              View Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Header */}
      <section className="w-full overflow-hidden border-b border-border/50 bg-neutral-50 dark:bg-green-600/40 section-padding-sm">
        <div className="section-shell-inner">
          <h1 className="hero-title tracking-tight text-neutral-900 dark:text-white mb-2">
            Review Your Selection
          </h1>
          <p className="text-lg text-muted-foreground font-body font-light">
            Review your items before proceeding to checkout
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-shell-inner">
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-gap-section">
          {/* Main Content - Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="section-title text-neutral-900 dark:text-white mb-6">
                Selected Items ({items.length})
              </h2>
              <div className="rounded-sm border border-border/30 bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 card-padding">
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
                  className="min-h-[48px] font-body font-light tracking-wide border-terra-500/60"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar - Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-sm border border-border/30 bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 card-padding space-y-6 shadow-sm">
              <h2 className="text-xl font-display font-light text-neutral-900 dark:text-white">
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
                className="w-full min-h-[48px] font-body font-light tracking-wide bg-foreground text-background hover:bg-foreground/90"
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
      </section>
    </div>
  )
}

