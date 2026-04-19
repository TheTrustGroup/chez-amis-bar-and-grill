"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OrderTypeSelector, type OrderType } from "@/components/order/OrderTypeSelector"
import { OrderTypeFields } from "@/components/order/OrderTypeFields"
import { GuestInformation } from "@/components/order/GuestInformation"
import { PaymentSelector, type PaymentMethod } from "@/components/order/PaymentSelector"
import { OrderSummary } from "@/components/order/OrderSummary"
import { useCartContext } from "@/lib/context/CartContext"
import { PAYMENT_ON_DELIVERY_ONLY } from "@/lib/config/payments"
import { Shield, Lock, Banknote, MessageCircle, CheckCircle2 } from "lucide-react"
import { buildWhatsAppLink } from "@/lib/data/siteContact"

export default function PlaceOrderPage() {
  const router = useRouter()
  const { items, getSubtotal, getTax, getDeliveryFee, getServiceCharge, getGrandTotal } = useCartContext()
  const [orderType, setOrderType] = useState<OrderType | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(() =>
    PAYMENT_ON_DELIVERY_ONLY ? "pay-later" : null
  )
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const step1Ref = useRef<HTMLDivElement | null>(null)
  const step2Ref = useRef<HTMLDivElement | null>(null)
  const step3Ref = useRef<HTMLDivElement | null>(null)
  const step4Ref = useRef<HTMLDivElement | null>(null)

  const handleFieldChange = (field: string, value: string) => {
    setSubmitError(null)
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrderTypeSelect = (type: OrderType) => {
    setOrderType(type)
    setSubmitError(null)
    if (type === "delivery" && !formData.deliveryTime) {
      setFormData((prev) => ({ ...prev, deliveryTime: "asap" }))
    }
  }

  const handlePaymentSelect = (method: PaymentMethod) => {
    setFieldErrors((prev) => {
      if (!prev.paymentMethod) return prev
      const next = { ...prev }
      delete next.paymentMethod
      return next
    })
    setPaymentMethod(method)
  }

  const canProceedToStep2 = orderType !== null
  
  // Check if order-type specific fields are complete
  const hasOrderTypeFields = 
    orderType === "dine-in"
      ? !!(formData.date && formData.time && formData.guests)
      : orderType === "takeaway"
      ? !!(formData.pickupTime)
      : orderType === "delivery"
      ? !!(formData.deliveryAddress && formData.deliveryTime && (formData.deliveryTime === "asap" || (formData.deliveryTime === "scheduled" && formData.scheduledTime)))
      : false
  
  const canProceedToStep3 = canProceedToStep2 && hasOrderTypeFields
  
  const hasGuestDetails = !!formData.fullName && !!formData.email && !!formData.phone
  const canProceedToStep4 = canProceedToStep3 && hasGuestDetails && paymentMethod !== null
  const canPlaceOrder = canProceedToStep4
  const stepChecklist = [
    { id: 1, label: "Order type", done: canProceedToStep2 },
    { id: 2, label: "Order details", done: hasOrderTypeFields },
    { id: 3, label: "Customer details", done: hasGuestDetails },
    { id: 4, label: "Payment method", done: paymentMethod !== null },
  ]

  const whatsappFallbackLink = buildWhatsAppLink(
    `Hello Chez Amis, I'd like to confirm my order from the website.\n\nName: ${formData.fullName || "Guest"}\nPhone: ${formData.phone || "N/A"}\nItems: ${items.length}\nEstimated total: GH₵ ${getGrandTotal(orderType || undefined).toFixed(2)}`
  )

  useEffect(() => {
    if (canProceedToStep3 && window.innerWidth < 1024) {
      step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [canProceedToStep3])

  useEffect(() => {
    if (canProceedToStep4 && window.innerWidth < 1024) {
      step4Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [canProceedToStep4])

  const focusInvalidField = (field: string | null) => {
    if (!field) return
    window.setTimeout(() => {
      let el: HTMLElement | null = null
      if (field === "orderType") {
        el = document.querySelector('[data-order-type-button="true"]')
      } else if (field === "paymentMethod") {
        el = document.querySelector('[data-payment-method-button="true"]')
      } else if (field === "deliveryTime") {
        el = document.getElementById("deliveryTime-asap") || document.querySelector('input[name="deliveryTime"]')
      } else {
        el = document.getElementById(field)
      }
      el?.focus()
    }, 220)
  }

  const validateBeforeSubmit = () => {
    const errors: Record<string, string> = {}

    if (!orderType) {
      errors.orderType = "Select how you want to receive your order."
      return { valid: false, errors, firstStep: 1 as const, firstInvalidField: "orderType" }
    }

    if (orderType === "dine-in") {
      if (!formData.date) errors.date = "Select your preferred date."
      if (!formData.time) errors.time = "Select your preferred time."
      if (!formData.guests) errors.guests = "Select number of guests."
    }

    if (orderType === "takeaway" && !formData.pickupTime) {
      errors.pickupTime = "Choose a pickup time."
    }

    if (orderType === "delivery") {
      if (!formData.deliveryAddress) errors.deliveryAddress = "Enter a delivery address."
      if (!formData.deliveryTime) errors.deliveryTime = "Choose a delivery time."
      if (formData.deliveryTime === "scheduled" && !formData.scheduledTime) {
        errors.scheduledTime = "Select a scheduled delivery time."
      }
    }

    if (Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0] ?? null
      return { valid: false, errors, firstStep: 1 as const, firstInvalidField }
    }

    if (!formData.fullName) errors.fullName = "Enter your full name."
    if (!formData.email) errors.email = "Enter your email."
    if (!formData.phone) errors.phone = "Enter your phone number."

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address."
    }

    if (formData.phone) {
      const phoneCleaned = formData.phone.replace(/\D/g, "")
      if (phoneCleaned.length < 9) {
        errors.phone = "Please enter a valid phone number."
      }
    }

    if (Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0] ?? null
      return { valid: false, errors, firstStep: 2 as const, firstInvalidField }
    }

    if (!paymentMethod) {
      errors.paymentMethod = "Select a payment option to continue."
      return { valid: false, errors, firstStep: 3 as const, firstInvalidField: "paymentMethod" }
    }

    return { valid: true, errors, firstStep: 4 as const, firstInvalidField: null }
  }

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder || isSubmitting) return
    const validation = validateBeforeSubmit()
    if (!validation.valid) {
      setFieldErrors(validation.errors)
      if (validation.firstStep === 1) step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      if (validation.firstStep === 2) step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      if (validation.firstStep === 3) step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      focusInvalidField(validation.firstInvalidField)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setFieldErrors({})

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
          price: Number((item.subtotal / item.quantity).toFixed(2)),
          specialInstructions: item.customizations?.specialInstructions || item.specialInstructions,
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
            deliveryTime: formData.deliveryTime,
            scheduledTime: formData.scheduledTime,
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
          'x-request-id': crypto.randomUUID(),
          'idempotency-key': `${orderId}-${formData.email || "guest"}`,
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json().catch(() => ({} as Record<string, unknown>))

      if (!response.ok) {
        throw new Error((result as { error?: string }).error || 'Failed to place order')
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Order submission error:', error)
      }
      setSubmitError(error instanceof Error ? error.message : 'Failed to place order. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-green-700 transition-colors section-padding-sm">
        <div className="section-shell-inner w-full max-w-md text-center">
          <h1 className="nav-page-heading md:text-4xl tracking-tight text-neutral-900 dark:text-white mb-3">
            Your Selection is Empty
          </h1>
          <p className="nav-page-subheading text-muted-foreground mb-7 prose-readable mx-auto">
            Explore our menu to begin your culinary journey
          </p>
          <Button
            variant="outline"
            size="lg"
            className="w-full min-h-[48px] font-body font-light tracking-wide border-terra-500/60 sm:w-auto"
            onClick={() => router.push("/menu")}
          >
            View Menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Header */}
      <section className="w-full overflow-hidden border-b border-border/50 bg-neutral-50 dark:bg-green-600/40 section-padding-sm">
        <div className="section-shell-inner">
          <h1 className="nav-page-heading md:text-4xl tracking-tight text-neutral-900 dark:text-white mb-1">
            Place Your Order
          </h1>
          <p className="nav-page-subheading text-muted-foreground">
            We&apos;re delighted to serve you
          </p>
          <div className="mt-5 hidden lg:flex items-center gap-2">
            {stepChecklist.map((step) => (
              <div
                key={step.id}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5"
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    step.done ? "bg-terra-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.done ? "✓" : step.id}
                </span>
                <span className="text-xs font-body text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-gap-section">
          {/* Left Column - Order Form (60%) */}
          <div className="lg:col-span-3 space-y-10">
            {/* Step 1: Order Type */}
            <div ref={step1Ref} className="ui-card-compact p-5 md:p-6 dark:bg-green-600/40 dark:border-green-700/50">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-terra-500/50 text-xs font-medium text-terra-600">1</span>
                <p className="text-sm font-body font-medium tracking-wide text-muted-foreground uppercase">Order Type</p>
              </div>
              {fieldErrors.orderType && (
                <p className="mb-3 text-xs text-red-600 dark:text-red-300">{fieldErrors.orderType}</p>
              )}
              <OrderTypeSelector
                selectedType={orderType}
                onSelect={handleOrderTypeSelect}
              />
              {orderType && (
                <OrderTypeFields
                  orderType={orderType}
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  fieldErrors={fieldErrors}
                />
              )}
            </div>

            {/* Order Summary - Mobile */}
            <div className="lg:hidden">
              <OrderSummary orderType={orderType} />
            </div>

            {/* Step 2: Guest Information */}
            {canProceedToStep2 && (
              <div ref={step2Ref} className="ui-card-compact p-5 md:p-6 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-terra-500/50 text-xs font-medium text-terra-600">2</span>
                  <p className="text-sm font-body font-medium tracking-wide text-muted-foreground uppercase">Customer Details</p>
                </div>
                <GuestInformation
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  fieldErrors={fieldErrors}
                />
              </div>
            )}

            {/* Step 3: Payment Method */}
            {canProceedToStep3 && (
              <div ref={step3Ref} className="ui-card-compact p-5 md:p-6 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-terra-500/50 text-xs font-medium text-terra-600">3</span>
                  <p className="text-sm font-body font-medium tracking-wide text-muted-foreground uppercase">Payment</p>
                </div>
                <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={handlePaymentSelect}
                />
                {fieldErrors.paymentMethod && (
                  <p className="mt-3 text-xs text-red-600 dark:text-red-300">{fieldErrors.paymentMethod}</p>
                )}
              </div>
            )}

            {/* Step 4: Final Review */}
            <div ref={step4Ref} className="ui-card-compact p-5 md:p-6 dark:bg-green-600/40 dark:border-green-700/50">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-terra-500/50 text-xs font-medium text-terra-600">4</span>
                <p className="text-sm font-body font-medium tracking-wide text-muted-foreground uppercase">Review & Place Order</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2 rounded-md border border-border/60 bg-background/60 p-4 sm:grid-cols-2">
                  {stepChecklist.map((step) => (
                    <div key={step.id} className="flex items-center gap-2 text-sm">
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                          step.done ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.done ? "✓" : step.id}
                      </span>
                      <span className={step.done ? "text-foreground" : "text-muted-foreground"}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="ui-card-compact border-border/40 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-terra-600" />
                    <p className="text-sm text-muted-foreground font-body font-light">
                      Confirm your order details, then place your order as the final step.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body font-light">
                  {PAYMENT_ON_DELIVERY_ONLY ? (
                    <>
                      <Banknote className="h-4 w-4 shrink-0" aria-hidden />
                      <span>No online payment. Pay when you receive your order.</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 shrink-0" aria-hidden />
                      <span>Secure payment</span>
                      <span className="text-border" aria-hidden>
                        •
                      </span>
                      <Lock className="h-4 w-4 shrink-0" aria-hidden />
                      <span>SSL encrypted</span>
                    </>
                  )}
                </div>

                <p className="mb-3 text-sm text-muted-foreground font-body font-light">
                  Need help confirming payment? Use WhatsApp and our team will assist right away.
                </p>
                <a
                  href={whatsappFallbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-green-500/40 px-4 py-2 text-sm font-body font-medium text-green-700 transition-colors md:hover:bg-green-500/10 active:bg-green-500/10 dark:text-green-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  Confirm on WhatsApp
                </a>

                <div className="rounded-md border border-border/60 bg-background/60 p-4 text-sm font-body">
                  <p className="text-muted-foreground">Final check</p>
                  <p className="mt-1 text-foreground">
                    {formData.fullName || "Guest"} • {formData.phone || "No phone"} •{" "}
                    {orderType ? orderType.replace("-", " ") : "No order type selected"}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground font-body font-light">
                By placing this order, you agree to our{" "}
                <a
                  href="/terms"
                  className="underline underline-offset-2 md:hover:text-foreground transition-colors"
                >
                  terms of service
                </a>
              </p>

              {submitError && (
                <div
                  role="alert"
                  className="rounded-sm border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 p-4 mt-4"
                >
                  <p className="text-sm text-red-800 dark:text-red-200 font-body font-light">{submitError}</p>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!canPlaceOrder || isSubmitting}
                  size="lg"
                  className="w-full font-body font-light tracking-wide bg-foreground text-background md:hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed text-lg px-8 py-7 shadow-lg md:hover:shadow-xl transition-all"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
                {!canPlaceOrder && (
                  <p className="text-xs text-muted-foreground font-body font-light text-center px-2">
                    Complete all required details above before placing your order.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (40%, Sticky) - Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-2">
            <OrderSummary orderType={orderType} />
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}



