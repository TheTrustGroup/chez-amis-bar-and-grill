"use client"

import Link from "next/link"
import { SelectionItem } from "@/components/order/SelectionItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { useCartContext } from "@/lib/context/CartContext"
import { CHECKOUT_PATH } from "@/lib/data/siteContact"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const total = getGrandTotal()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      <section className="section-shell">
        <div className="section-shell-inner">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="nav-page-heading text-neutral-900 dark:text-white mb-2">
              Your Selection
            </h1>
            <p className="nav-page-subheading">
              Update items and checkout.
            </p>
          </div>

        {items.length === 0 ? (
          <Card className="ui-card-compact dark:bg-green-600/40 dark:border-green-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display font-light">
                <ShoppingBag className="h-5 w-5 shrink-0" aria-hidden />
                Your Selection is Empty
              </CardTitle>
              <CardDescription className="font-body font-light">
                Add items from the menu to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full min-h-[48px] font-body font-light tracking-wide">View Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-gap-section">
            <div className="ui-card-compact lg:col-span-2 space-y-0 px-4 md:px-6 dark:bg-green-600/40 dark:border-green-700/50">
              {items.map((item) => (
                <SelectionItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="ui-card-compact lg:sticky lg:top-[calc(72px+1rem)] dark:bg-green-600/40 dark:border-green-700/50">
                <CardHeader>
                  <CardTitle className="font-display font-light">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body font-light">Subtotal</span>
                    <span className="font-body font-light">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-body font-light">Delivery Fee</span>
                      <span className="font-body font-light">GH₵ {deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body font-light">VAT (15%)</span>
                    <span className="font-body font-light">GH₵ {tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-display font-light text-lg">
                    <span>Total</span>
                    <span>GH₵ {total.toFixed(2)}</span>
                  </div>
                  <Link href={CHECKOUT_PATH}>
                    <Button className="w-full min-h-[48px] font-body font-light tracking-wide" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        </div>
        </div>
      </section>
    </div>
  )
}
