"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MapPin, UtensilsCrossed, ShoppingBag, Truck } from "lucide-react"
import { useCartContext } from "@/lib/context/CartContext"
import { OrderType } from "@/components/order/OrderTypeSelector"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { items, clearCart, getSubtotal, getTax, getDeliveryFee, getGrandTotal } = useCartContext()
  const [isAnimating, setIsAnimating] = useState(true)
  const orderId = params.orderId as string

  // Simulate order data (in production, fetch from API)
  const [orderData] = useState({
    orderType: "dine-in" as OrderType,
    customerName: "Sarah Mensah",
    expectedTime: "7:30 PM",
    tableNumber: "12",
    deliveryAddress: null as string | null,
    pickupTime: null as string | null,
  })

  useEffect(() => {
    // Clear cart after successful order
    const timer = setTimeout(() => {
      clearCart()
    }, 1000)

    // Animation
    const animTimer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(animTimer)
    }
  }, [clearCart])

  const getOrderTypeIcon = () => {
    switch (orderData.orderType) {
      case "dine-in":
        return UtensilsCrossed
      case "takeaway":
        return ShoppingBag
      case "delivery":
        return Truck
      default:
        return Clock
    }
  }

  const getNextSteps = () => {
    switch (orderData.orderType) {
      case "dine-in":
        return {
          title: "We look forward to welcoming you",
          description: `Your table is reserved for ${orderData.expectedTime}. We'll see you soon!`,
        }
      case "takeaway":
        return {
          title: "We'll notify you when ready",
          description: `Your order will be ready for pickup at ${orderData.pickupTime || orderData.expectedTime}.`,
        }
      case "delivery":
        return {
          title: "We're preparing your order",
          description: "Your feast is being prepared and will arrive at your door in 35-45 minutes.",
        }
      default:
        return {
          title: "Order confirmed",
          description: "We're preparing your order now.",
        }
    }
  }

  const nextSteps = getNextSteps()
  const OrderIcon = getOrderTypeIcon()

  const subtotal = getSubtotal()
  const tax = getTax()
  const deliveryFee = getDeliveryFee()
  const serviceCharge = orderData.orderType === "dine-in" ? subtotal * 0.1 : 0
  const total = getGrandTotal() + serviceCharge

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container-custom max-w-3xl">
        <div className="text-center space-y-8">
          {/* Success Animation */}
          <div className="flex justify-center">
            <div
              className={`relative transition-all duration-500 ${
                isAnimating ? "scale-110" : "scale-100"
              }`}
            >
              <div
                className={`w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center transition-opacity duration-500 ${
                  isAnimating ? "opacity-100" : "opacity-100"
                }`}
              >
                <CheckCircle2
                  className={`h-12 w-12 text-gold-600 transition-all duration-500 ${
                    isAnimating ? "scale-0" : "scale-100"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground">
              Thank You, {orderData.customerName}!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light">
              Your order has been confirmed
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-cream-50 rounded-lg p-6 border border-border/30">
            <p className="text-sm text-muted-foreground font-body font-light mb-2">
              Order Number
            </p>
            <p className="text-2xl font-display font-light text-foreground">
              #{orderId}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-cream-50 rounded-lg p-6 md:p-8 border border-border/30 text-left space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
              <OrderIcon className="h-5 w-5 text-gold-600" />
              <div>
                <p className="text-sm text-muted-foreground font-body font-light">
                  Order Type
                </p>
                <p className="font-display font-light text-foreground">
                  {orderData.orderType === "dine-in"
                    ? "Dine In"
                    : orderData.orderType === "takeaway"
                    ? "Takeaway"
                    : "Delivery"}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              {orderData.orderType === "dine-in" && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground font-body font-light">
                      Table {orderData.tableNumber}
                    </p>
                    <p className="font-body font-light text-foreground">
                      Expected arrival: {orderData.expectedTime}
                    </p>
                  </div>
                </div>
              )}

              {orderData.orderType === "delivery" && orderData.deliveryAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground font-body font-light">
                      Delivery Address
                    </p>
                    <p className="font-body font-light text-foreground">
                      {orderData.deliveryAddress}
                    </p>
                  </div>
                </div>
              )}

              {orderData.orderType === "takeaway" && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground font-body font-light">
                      Pickup Time
                    </p>
                    <p className="font-body font-light text-foreground">
                      {orderData.pickupTime || orderData.expectedTime}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="pt-4 border-t border-border/30 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body font-light">Subtotal</span>
                <span className="font-body font-light">GH₵ {subtotal.toFixed(2)}</span>
              </div>
              {serviceCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-body font-light">
                    Service Charge
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
                <span className="text-muted-foreground font-body font-light">VAT</span>
                <span className="font-body font-light">GH₵ {tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-border/30 flex justify-between text-lg">
                <span className="font-display font-light text-foreground">Total</span>
                <span className="font-display font-light text-foreground">
                  GH₵ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-cream-50 rounded-lg p-6 md:p-8 border border-border/30">
            <h2 className="text-xl md:text-2xl font-display font-light text-foreground mb-3">
              What&apos;s Next?
            </h2>
            <p className="text-muted-foreground font-body font-light mb-4">
              {nextSteps.title}
            </p>
            <p className="text-sm text-muted-foreground font-body font-light">
              {nextSteps.description}
            </p>
            <p className="text-sm text-muted-foreground font-body font-light mt-4">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/menu">
              <Button
                variant="outline"
                size="lg"
                className="font-heading font-light tracking-wide border-gold-500/60 w-full sm:w-auto"
              >
                Back to Menu
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              className="font-heading font-light tracking-wide w-full sm:w-auto"
              disabled
            >
              Track Order
              <span className="ml-2 text-xs text-muted-foreground">(Coming soon)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



