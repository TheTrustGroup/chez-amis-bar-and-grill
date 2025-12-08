"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MapPin, UtensilsCrossed, ShoppingBag, Truck, Mail, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import { useCartContext } from "@/lib/context/CartContext"
import { OrderType } from "@/components/order/OrderTypeSelector"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, clearCart, getSubtotal, getTax, getDeliveryFee, getServiceCharge, getGrandTotal } = useCartContext()
  const [isAnimating, setIsAnimating] = useState(true)
  const orderId = params.orderId as string
  
  // Get notification status and order details from URL params
  const emailStatus = searchParams.get('email')
  const smsStatus = searchParams.get('sms')
  
  // Get order data from URL parameters (passed from place-order page)
  const orderTypeParam = searchParams.get('orderType') as OrderType | null
  const customerNameParam = searchParams.get('customerName')
  const tableNumberParam = searchParams.get('tableNumber')
  const dateParam = searchParams.get('date')
  const timeParam = searchParams.get('time')
  const guestsParam = searchParams.get('guests')
  const pickupTimeParam = searchParams.get('pickupTime')
  const deliveryAddressParam = searchParams.get('deliveryAddress')
  const deliveryTimeParam = searchParams.get('deliveryTime')
  const scheduledTimeParam = searchParams.get('scheduledTime')

  // Format time for display
  const formatTime = useCallback((timeString: string | null): string => {
    if (!timeString) return ''
    // If it's already formatted (e.g., "7:30 PM"), return as is
    if (timeString.includes('PM') || timeString.includes('AM')) return timeString
    // If it's in HH:MM format, convert to readable format
    try {
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      return `${displayHour}:${minutes} ${ampm}`
    } catch {
      return timeString
    }
  }, [])

  // Format date for display
  const formatDate = useCallback((dateString: string | null): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return dateString
    }
  }, [])

  // Format datetime-local to time
  const formatDateTimeToTime = useCallback((dateTimeString: string | null): string => {
    if (!dateTimeString) return ''
    try {
      const date = new Date(dateTimeString)
      return formatTime(date.toTimeString().slice(0, 5))
    } catch {
      return dateTimeString
    }
  }, [formatTime])

  // Build order data from URL parameters using useMemo
  const orderData = useMemo(() => {
    const orderType = (orderTypeParam || "dine-in") as OrderType
    
    // Get expected time based on order type
    let expectedTime = 'Soon'
    if (orderType === 'dine-in' && timeParam) {
      expectedTime = formatTime(timeParam)
    } else if (orderType === 'takeaway' && pickupTimeParam) {
      expectedTime = formatDateTimeToTime(pickupTimeParam)
    } else if (orderType === 'delivery') {
      if (deliveryTimeParam === 'scheduled' && scheduledTimeParam) {
        expectedTime = formatDateTimeToTime(scheduledTimeParam)
      } else {
        expectedTime = '35-45 minutes'
      }
    }

    return {
      orderType,
      customerName: customerNameParam || "Guest",
      expectedTime,
      tableNumber: tableNumberParam || null,
      date: dateParam ? formatDate(dateParam) : null,
      time: timeParam ? formatTime(timeParam) : null,
      guests: guestsParam || null,
      deliveryAddress: deliveryAddressParam || null,
      pickupTime: pickupTimeParam ? formatDateTimeToTime(pickupTimeParam) : null,
      deliveryTime: deliveryTimeParam || null,
      scheduledTime: scheduledTimeParam ? formatDateTimeToTime(scheduledTimeParam) : null,
    }
  }, [
    orderTypeParam,
    customerNameParam,
    tableNumberParam,
    dateParam,
    timeParam,
    guestsParam,
    pickupTimeParam,
    deliveryAddressParam,
    deliveryTimeParam,
    scheduledTimeParam,
    formatTime,
    formatDate,
    formatDateTimeToTime,
  ])

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
          description: orderData.time 
            ? `Your table is reserved for ${orderData.time}${orderData.date ? ` on ${orderData.date}` : ''}. We'll see you soon!`
            : "We'll see you soon!",
        }
      case "takeaway":
        return {
          title: "We'll notify you when ready",
          description: orderData.pickupTime
            ? `Your order will be ready for pickup at ${orderData.pickupTime}. We'll send you a notification when it's ready.`
            : "We'll prepare your order and notify you when it's ready for pickup.",
        }
      case "delivery":
        return {
          title: "We're preparing your order",
          description: orderData.deliveryTime === 'scheduled' && orderData.scheduledTime
            ? `Your order is scheduled for delivery at ${orderData.scheduledTime}. We'll notify you when it's on the way.`
            : "Your feast is being prepared and will arrive at your door in 35-45 minutes. We'll send you a notification when it's on the way.",
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

  // Get payment totals from URL params (passed from place-order page)
  // This ensures accuracy even if cart is cleared
  const subtotalParam = searchParams.get('subtotal')
  const taxParam = searchParams.get('tax')
  const deliveryFeeParam = searchParams.get('deliveryFee')
  const serviceChargeParam = searchParams.get('serviceCharge')
  const totalParam = searchParams.get('total')

  // Use URL params if available (accurate), otherwise fall back to cart context
  const subtotal = subtotalParam ? parseFloat(subtotalParam) : getSubtotal()
  const tax = taxParam ? parseFloat(taxParam) : getTax()
  const deliveryFee = deliveryFeeParam ? parseFloat(deliveryFeeParam) : getDeliveryFee(orderData.orderType)
  const serviceCharge = serviceChargeParam ? parseFloat(serviceChargeParam) : getServiceCharge(orderData.orderType)
  const total = totalParam ? parseFloat(totalParam) : getGrandTotal(orderData.orderType)

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

            {/* Order Details - Dynamic based on order type */}
            <div className="space-y-4">
              {orderData.orderType === "dine-in" && (
                <>
                  {orderData.date && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          Date
                        </p>
                        <p className="font-body font-light text-foreground">
                          {orderData.date}
                        </p>
                      </div>
                    </div>
                  )}
                  {orderData.time && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          Time
                        </p>
                        <p className="font-body font-light text-foreground">
                          {orderData.time}
                        </p>
                      </div>
                    </div>
                  )}
                  {orderData.guests && (
                    <div className="flex items-start gap-3">
                      <UtensilsCrossed className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          Number of Guests
                        </p>
                        <p className="font-body font-light text-foreground">
                          {orderData.guests} {parseInt(orderData.guests) === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                    </div>
                  )}
                  {orderData.tableNumber && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          Table Number
                        </p>
                        <p className="font-body font-light text-foreground">
                          Table {orderData.tableNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {orderData.orderType === "delivery" && (
                <>
                  {orderData.deliveryAddress && (
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
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground font-body font-light">
                        Delivery Time
                      </p>
                      <p className="font-body font-light text-foreground">
                        {orderData.deliveryTime === 'scheduled' && orderData.scheduledTime
                          ? `Scheduled for ${orderData.scheduledTime}`
                          : 'ASAP (35-45 minutes)'}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {orderData.orderType === "takeaway" && (
                <>
                  {orderData.pickupTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          Pickup Time
                        </p>
                        <p className="font-body font-light text-foreground">
                          {orderData.pickupTime}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground font-body font-light">
                        Pickup Location
                      </p>
                      <p className="font-body font-light text-foreground">
                        Chez Amis Bar and Grill
                      </p>
                    </div>
                  </div>
                </>
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
            {/* Notification Status */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                {emailStatus === 'sent' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-muted-foreground font-body font-light">
                      Confirmation email sent to your email address
                    </span>
                  </>
                ) : emailStatus === 'failed' ? (
                  <>
                    <XCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-muted-foreground font-body font-light">
                      Email confirmation could not be sent, but your order is confirmed
                    </span>
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground font-body font-light">
                      Confirmation email will be sent shortly
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                {smsStatus === 'sent' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-muted-foreground font-body font-light">
                      Confirmation SMS sent to your phone
                    </span>
                  </>
                ) : smsStatus === 'failed' ? (
                  <>
                    <XCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-muted-foreground font-body font-light">
                      SMS confirmation could not be sent, but your order is confirmed
                    </span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground font-body font-light">
                      Confirmation SMS will be sent shortly
                    </span>
                  </>
                )}
              </div>
            </div>
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



