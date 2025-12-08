"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OrderTypeSelector, type OrderType } from "@/components/order/OrderTypeSelector"
import { OrderTypeFields } from "@/components/order/OrderTypeFields"
import { GuestInformation } from "@/components/order/GuestInformation"
import { PaymentSelector, type PaymentMethod } from "@/components/order/PaymentSelector"
import { OrderSummary } from "@/components/order/OrderSummary"
import { useCartContext } from "@/lib/context/CartContext"
import { Shield, Lock } from "lucide-react"

export default function PlaceOrderPage() {
  const router = useRouter()
  const { items } = useCartContext()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [orderType, setOrderType] = useState<OrderType | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrderTypeSelect = (type: OrderType) => {
    setOrderType(type)
    setCurrentStep(2)
  }

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method)
  }

  const canProceedToStep2 = orderType !== null
  const canProceedToStep3 =
    canProceedToStep2 &&
    (orderType === "dine-in"
      ? formData.date && formData.time && formData.guests
      : orderType === "takeaway"
      ? formData.pickupTime && formData.phone
      : formData.deliveryAddress && formData.phone)
  const canPlaceOrder =
    canProceedToStep3 &&
    formData.fullName &&
    formData.email &&
    paymentMethod !== null

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return

    // Generate order ID
    const orderId = `CAG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    // In production, this would submit to your backend

    // Navigate to confirmation
    router.push(`/order-confirmation/${orderId}`)
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
          <Button
            variant="outline"
            size="lg"
            className="font-heading font-light tracking-wide border-gold-500/60"
            onClick={() => router.push("/menu")}
          >
            View Menu
          </Button>
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
            Place Your Order
          </h1>
          <p className="text-lg text-muted-foreground font-body font-light">
            We&apos;re delighted to serve you
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Order Form (60%) */}
          <div className="lg:col-span-3 space-y-12">
            {/* Step 1: Order Type */}
            <div>
              <OrderTypeSelector
                selectedType={orderType}
                onSelect={handleOrderTypeSelect}
              />
              {orderType && (
                <OrderTypeFields
                  orderType={orderType}
                  formData={formData}
                  onFieldChange={handleFieldChange}
                />
              )}
            </div>

            {/* Step 2: Guest Information */}
            {canProceedToStep2 && (
              <div>
                <GuestInformation
                  formData={formData}
                  onFieldChange={handleFieldChange}
                />
              </div>
            )}

            {/* Step 3: Payment Method */}
            {canProceedToStep3 && (
              <div>
                <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={handlePaymentSelect}
                />
              </div>
            )}

            {/* Bottom Section */}
            {canProceedToStep3 && (
              <div className="pt-8 border-t border-border/50 space-y-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-body font-light">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment</span>
                  <span className="text-border">•</span>
                  <Lock className="h-4 w-4" />
                  <span>SSL encrypted</span>
                </div>

                <p className="text-sm text-muted-foreground font-body font-light">
                  By placing this order, you agree to our{" "}
                  <a
                    href="/terms"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    terms of service
                  </a>
                </p>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={!canPlaceOrder}
                  size="lg"
                  className="w-full md:w-auto min-w-[200px] font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-7"
                >
                  Place Order
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (40%, Sticky) */}
          <div className="lg:col-span-2">
            <OrderSummary orderType={orderType} />
          </div>
        </div>
      </div>
    </div>
  )
}



