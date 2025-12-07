"use client"

import Link from "next/link"
import { SelectionItem } from "@/components/order/SelectionItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { useCartContext } from "@/lib/context/CartContext"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const total = getGrandTotal()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-light mb-4">Your Selection</h1>
          <p className="text-muted-foreground text-lg font-body font-light">
            Review your items before placing your order
          </p>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display font-light">
                <ShoppingBag className="h-5 w-5" />
                Your Selection is Empty
              </CardTitle>
              <CardDescription className="font-body font-light">
                Explore our menu to begin your culinary journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full font-heading font-light tracking-wide">View Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
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
              <Card>
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
                  <Link href="/order-summary">
                    <Button className="w-full font-heading font-light tracking-wide" size="lg">
                      Place Order
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
  )
}
