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
  const { items, getSubtotal, getTax, getDeliveryFee, getServiceCharge, getGrandTotal } = useCartContext()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [orderType, setOrderType] = useState<OrderType | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
  
  // Check if order type specific fields are filled
  const hasOrderTypeFields = 
    orderType === "dine-in"
      ? !!(formData.date && formData.time && formData.guests)
      : orderType === "takeaway"
      ? !!(formData.pickupTime)
      : orderType === "delivery"
      ? !!(formData.deliveryAddress && formData.deliveryTime && (formData.deliveryTime === "asap" || formData.scheduledTime))
      : false
  
  const canProceedToStep3 = canProceedToStep2 && hasOrderTypeFields
  
  // Check if all required fields are filled
  const canPlaceOrder =
    canProceedToStep3 &&
    !!formData.fullName &&
    !!formData.email &&
    !!formData.phone &&
    paymentMethod !== null

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder || isSubmitting) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Generate order ID
      const orderId = `CAG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`

      // Calculate totals using context methods for consistency
      const subtotal = getSubtotal()
      const tax = getTax()
      const deliveryFee = getDeliveryFee(orderType!)
      const serviceCharge = getServiceCharge(orderType!)
      const total = getGrandTotal(orderType!)

      // Prepare order data
      const orderData = {
        orderId,
        orderType: orderType!,
        customer: {
          fullName: formData.fullName!,
          email: formData.email!,
          phone: formData.phone!,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.menuItem.price,
          specialInstructions: item.customizations?.specialInstructions,
        })),
        orderDetails: {
          ...(orderType === "dine-in" && {
            tableNumber: formData.tableNumber,
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
          }),
          ...(orderType === "takeaway" && {
            pickupTime: formData.pickupTime,
          }),
          ...(orderType === "delivery" && {
            deliveryAddress: formData.deliveryAddress,
          }),
          specialRequests: formData.specialRequests,
        },
        payment: {
          subtotal,
          tax,
          deliveryFee,
          serviceCharge,
          total,
          method: paymentMethod!,
        },
      }

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order')
      }

      // Navigate to confirmation with notification status and order details
      // API returns notifications.customer.email.sent and notifications.customer.sms.sent
      const emailStatus = result.notifications?.customer?.email?.sent ? 'sent' : 'failed'
      const smsStatus = result.notifications?.customer?.sms?.sent ? 'sent' : 'failed'
      
      // Build URL with order details and payment totals
      const params = new URLSearchParams({
        email: emailStatus,
        sms: smsStatus,
        orderType: orderType!,
        customerName: formData.fullName!,
        // Payment totals for accurate display
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        serviceCharge: serviceCharge.toFixed(2),
        total: total.toFixed(2),
        ...(orderType === 'dine-in' && {
          tableNumber: formData.tableNumber || '',
          date: formData.date || '',
          time: formData.time || '',
          guests: formData.guests || '',
        }),
        ...(orderType === 'takeaway' && {
          pickupTime: formData.pickupTime || '',
        }),
        ...(orderType === 'delivery' && {
          deliveryAddress: formData.deliveryAddress || '',
          deliveryTime: formData.deliveryTime || 'asap',
          ...(formData.scheduledTime && { scheduledTime: formData.scheduledTime }),
        }),
      })
      
      router.push(`/order-confirmation/${orderId}?${params.toString()}`)
    } catch (error) {
      console.error('Order submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to place order. Please try again.')
      setIsSubmitting(false)
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
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

            {/* Order Summary - Shows below OrderTypeSelector on mobile, in sidebar on desktop */}
            <div className="lg:hidden">
              <OrderSummary 
                orderType={orderType} 
                onPlaceOrder={handlePlaceOrder}
                canPlaceOrder={!!canPlaceOrder}
                isSubmitting={!!isSubmitting}
              />
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

            {/* Bottom Section - Always visible */}
            <div className="pt-8 border-t border-border/50 space-y-6">
              {canProceedToStep3 && (
                <>
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
                </>
              )}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-800 font-body font-light">{submitError}</p>
                </div>
              )}

              {/* Place Order Button - Hidden on desktop (shown in OrderSummary sidebar instead) */}
              {/* On mobile, OrderSummary appears above with the button */}
              {/* On desktop, OrderSummary sidebar has the button */}
            </div>
          </div>

          {/* Right Column - Order Summary (40%, Sticky) - Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-2">
            <OrderSummary 
              orderType={orderType} 
              onPlaceOrder={handlePlaceOrder}
              canPlaceOrder={!!canPlaceOrder}
              isSubmitting={!!isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  )
}



