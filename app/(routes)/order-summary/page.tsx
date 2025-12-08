"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectionItem } from "@/components/order/SelectionItem"
import { useCartContext } from "@/lib/context/CartContext"
import { Phone, Clock } from "lucide-react"

type OrderType = "dine-in" | "takeaway" | "delivery"

export default function OrderSummaryPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()
  const [orderType, setOrderType] = useState<OrderType>("dine-in")
  const [tableNumber, setTableNumber] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const serviceCharge = orderType === "dine-in" ? subtotal * 0.1 : 0
  const total = getGrandTotal() + serviceCharge

  const handlePlaceOrder = () => {
    // Redirect to place-order page with pre-filled order type
    // The place-order page has all necessary fields (customer info, payment) and proper order submission
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
            Your Selection
          </h1>
          <p className="text-lg text-muted-foreground font-body font-light">
            Review and complete your order
          </p>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Items List */}
            <div>
              <h2 className="text-2xl font-display font-light text-foreground mb-6">
                Selected Items
              </h2>
              <div className="bg-background rounded-lg border border-border/30">
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

            {/* Order Type Selection */}
            <div>
              <h2 className="text-2xl font-display font-light text-foreground mb-6">
                Order Type
              </h2>
              <div className="space-y-4">
                {[
                  { id: "dine-in", label: "Dine In" },
                  { id: "takeaway", label: "Takeaway" },
                  { id: "delivery", label: "Delivery" },
                ].map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value={type.id}
                      checked={orderType === type.id}
                      onChange={(e) => setOrderType(e.target.value as OrderType)}
                      className="w-5 h-5 text-gold-500 focus:ring-gold-500"
                    />
                    <span className="text-lg font-body font-light">{type.label}</span>
                  </label>
                ))}
              </div>

              {/* Table Number (Dine In) */}
              {orderType === "dine-in" && (
                <div className="mt-6">
                  <label className="block text-sm font-heading font-light text-foreground mb-2">
                    Table Number (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="border-border/50 focus:border-gold-500/50"
                  />
                </div>
              )}

              {/* Pickup Time (Takeaway) */}
              {orderType === "takeaway" && (
                <div className="mt-6">
                  <label className="block text-sm font-heading font-light text-foreground mb-2">
                    Preferred Pickup Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="border-border/50 focus:border-gold-500/50"
                  />
                </div>
              )}

              {/* Delivery Address */}
              {orderType === "delivery" && (
                <div className="mt-6">
                  <label className="block text-sm font-heading font-light text-foreground mb-2">
                    Delivery Address <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="border-border/50 focus:border-gold-500/50 min-h-[100px]"
                    required
                  />
                </div>
              )}
            </div>

            {/* Special Request */}
            <div>
              <h2 className="text-2xl font-display font-light text-foreground mb-6">
                Special Requests
              </h2>
              <Textarea
                placeholder="Add any special requests or dietary requirements..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="border-border/50 focus:border-gold-500/50 min-h-[120px]"
              />
            </div>

            {/* Help Section */}
            <div className="bg-cream-50 rounded-lg p-6 border border-border/30">
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-light text-foreground mb-2">
                    Need help?
                  </h3>
                  <p className="text-sm text-muted-foreground font-body font-light mb-3">
                    Call us at{" "}
                    <a
                      href="tel:+233243952339"
                      className="text-foreground hover:text-gold-600 underline underline-offset-2"
                    >
                      024 395 2339 / 050 243 2037
                    </a>
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-body font-light">
                    <Clock className="h-4 w-4" />
                    <span>Estimated preparation time: 30-45 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
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
                  <span className="text-xl font-display font-light text-foreground">Total</span>
                  <span className="text-xl font-display font-light text-foreground">
                    GH₵ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90"
                size="lg"
                disabled={orderType === "delivery" && !deliveryAddress}
              >
                Complete Selection
              </Button>

              <Link href="/menu">
                <Button
                  variant="ghost"
                  className="w-full font-heading font-light tracking-wide text-muted-foreground hover:text-foreground"
                >
                  Continue Browsing Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

