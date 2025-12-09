"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Truck, Package, XCircle, AlertCircle } from "lucide-react"

type OrderStatus = "preparing" | "ready" | "out-for-delivery" | "delivered" | "cancelled"
type OrderType = "dine-in" | "takeaway" | "delivery"

export default function OrderStatusPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState("")
  const [status, setStatus] = useState<OrderStatus>("preparing")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [orderType, setOrderType] = useState<OrderType>("delivery")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Load order data if orderId is provided in URL
  useEffect(() => {
    const urlOrderId = searchParams.get('orderId')
    if (urlOrderId) {
      setOrderId(urlOrderId)
      loadOrderData(urlOrderId)
    }
  }, [searchParams])

  const loadOrderData = async (id: string) => {
    setIsLoadingOrder(true)
    try {
      const response = await fetch('/api/orders/list')
      const data = await response.json()
      
      if (data.success && data.orders) {
        const order = data.orders.find((o: any) => o.orderId === id || o.id === id)
        if (order) {
          setCustomerName(order.customer.fullName)
          setCustomerPhone(order.customer.phone)
          setCustomerEmail(order.customer.email)
          setOrderType(order.orderType)
          setStatus(order.status || 'pending')
        }
      }
    } catch (err) {
      console.error('Error loading order:', err)
    } finally {
      setIsLoadingOrder(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          customerPhone,
          customerName,
          customerEmail,
          orderType,
          estimatedTime: status === "out-for-delivery" ? estimatedTime : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update order status")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-5 h-5" />
      case "ready":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "out-for-delivery":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "delivered":
        return <Package className="w-5 h-5 text-gray-600" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
    }
  }

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return "Preparing"
      case "ready":
        return "Ready"
      case "out-for-delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-light text-foreground mb-2">
            Update Order Status
          </h1>
          <p className="text-muted-foreground font-body font-light">
            Update order status and send customer notifications
          </p>
        </div>

        {/* Form Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display font-light">Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order ID */}
              <div>
                <Label htmlFor="orderId" className="font-heading font-light">
                  Order ID *
                </Label>
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="CAG-1234"
                  required
                  className="mt-2"
                />
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status" className="font-heading font-light">
                  Status *
                </Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full mt-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                  required
                >
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="font-heading font-light">
                    Customer Name *
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="customerPhone" className="font-heading font-light">
                    Customer Phone *
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+2330243952339"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customerEmail" className="font-heading font-light">
                  Customer Email *
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="customer@example.com"
                  required
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1 font-body font-light">
                  Required for email notifications
                </p>
              </div>

              {/* Order Type */}
              <div>
                <Label htmlFor="orderType" className="font-heading font-light">
                  Order Type *
                </Label>
                <select
                  id="orderType"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                  className="w-full mt-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                  required
                >
                  <option value="dine-in">Dine In</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              {/* Estimated Time (for out-for-delivery) */}
              {status === "out-for-delivery" && (
                <div>
                  <Label htmlFor="estimatedTime" className="font-heading font-light">
                    Estimated Delivery Time
                  </Label>
                  <Input
                    id="estimatedTime"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="30-40 minutes"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-heading font-light tracking-wide bg-gold-500 text-foreground hover:bg-gold-600 min-h-[48px]"
              >
                {isSubmitting ? "Updating..." : "Update Order Status"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-heading font-medium text-red-900">Error</p>
                  <p className="text-sm text-red-700 font-body font-light">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Result */}
        {result && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="font-display font-light flex items-center gap-2">
                {getStatusIcon(result.status)}
                Status Updated Successfully
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground font-body font-light mb-1">
                  Order ID
                </p>
                <p className="text-lg font-heading font-medium">{result.orderId}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground font-body font-light mb-1">
                  New Status
                </p>
                <p className="text-lg font-heading font-medium">
                  {getStatusLabel(result.status)}
                </p>
              </div>

              {/* Notification Status */}
              {result.notification && (
                <div className="pt-4 border-t border-green-200">
                  <p className="text-sm font-heading font-medium mb-3">Notification Status</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body font-light">Email</span>
                      <span
                        className={`text-sm font-heading font-medium ${
                          result.notification.email.sent ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.notification.email.sent ? "✅ Sent" : "❌ Failed"}
                      </span>
                    </div>
                    {result.notification.email.error && (
                      <p className="text-xs text-red-600 font-body font-light pl-4">
                        {result.notification.email.error}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body font-light">SMS</span>
                      <span
                        className={`text-sm font-heading font-medium ${
                          result.notification.sms.sent ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.notification.sms.sent ? "✅ Sent" : "❌ Failed"}
                      </span>
                    </div>
                    {result.notification.sms.error && (
                      <p className="text-xs text-red-600 font-body font-light pl-4">
                        {result.notification.sms.error}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-display font-light">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm font-body font-light text-muted-foreground">
            <p>
              <strong className="text-foreground">1. Enter Order Details:</strong> Fill in the order ID and customer information.
            </p>
            <p>
              <strong className="text-foreground">2. Select Status:</strong> Choose the new order status from the dropdown.
            </p>
            <p>
              <strong className="text-foreground">3. Update Status:</strong> Click &quot;Update Order Status&quot; to send notifications to the customer.
            </p>
            <p>
              <strong className="text-foreground">Note:</strong> Customers will receive email and/or SMS notifications based on the status selected.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

