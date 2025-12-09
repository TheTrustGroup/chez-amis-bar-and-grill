"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, Truck, Package, XCircle, RefreshCw, AlertCircle, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

interface Order {
  id: string
  orderId: string
  orderType: 'dine-in' | 'takeaway' | 'delivery'
  status: 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled'
  customer: {
    fullName: string
    email: string
    phone: string
  }
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  orderDetails: {
    tableNumber?: string
    date?: string
    time?: string
    guests?: string
    pickupTime?: string
    deliveryAddress?: string
    specialRequests?: string
  }
  payment: {
    subtotal: number
    tax: number
    deliveryFee: number
    serviceCharge: number
    total: number
    method: string
  }
  createdAt: string
  updatedAt: string
}

interface OrdersCount {
  pending: number
  preparing: number
  ready: number
  'out-for-delivery': number
  delivered: number
  cancelled: number
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [counts, setCounts] = useState<OrdersCount | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (status?: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const url = status 
        ? `/api/orders/list?status=${status}`
        : '/api/orders/list'
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch orders')
      }

      setOrders(data.orders || [])
      setCounts(data.counts || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders(selectedStatus || undefined)
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchOrders(selectedStatus || undefined)
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedStatus])

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'preparing':
        return <UtensilsCrossed className="w-5 h-5 text-blue-600" />
      case 'ready':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'out-for-delivery':
        return <Truck className="w-5 h-5 text-purple-600" />
      case 'delivered':
        return <Package className="w-5 h-5 text-gray-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'preparing':
        return 'Preparing'
      case 'ready':
        return 'Ready'
      case 'out-for-delivery':
        return 'Out for Delivery'
      case 'delivered':
        return 'Delivered'
      case 'cancelled':
        return 'Cancelled'
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'out-for-delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatOrderType = (type: Order['orderType']) => {
    switch (type) {
      case 'dine-in':
        return 'Dine In'
      case 'takeaway':
        return 'Takeaway'
      case 'delivery':
        return 'Delivery'
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-light text-foreground mb-2">
              Orders Dashboard
            </h1>
            <p className="text-muted-foreground font-body font-light">
              View and manage all customer orders
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => fetchOrders(selectedStatus || undefined)}
              variant="outline"
              className="font-heading font-light"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Link href="/admin/order-status">
              <Button className="font-heading font-light bg-gold-500 text-foreground hover:bg-gold-600">
                Update Status
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Filter Tabs */}
        {counts && (
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedStatus(null)}
              className={cn(
                "px-4 py-2 rounded-lg font-heading font-light transition-all",
                selectedStatus === null
                  ? "bg-gold-500 text-foreground"
                  : "bg-white border border-border/50 hover:bg-cream-100"
              )}
            >
              All ({orders.length})
            </button>
            {(['pending', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-heading font-light transition-all flex items-center gap-2",
                  selectedStatus === status
                    ? "bg-gold-500 text-foreground"
                    : "bg-white border border-border/50 hover:bg-cream-100"
                )}
              >
                {getStatusIcon(status)}
                {getStatusLabel(status)} ({counts[status] || 0})
              </button>
            ))}
          </div>
        )}

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

        {/* Loading State */}
        {isLoading && orders.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body font-light">Loading orders...</p>
          </div>
        )}

        {/* Orders List */}
        {!isLoading && orders.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body font-light">
                No orders found{selectedStatus ? ` with status "${getStatusLabel(selectedStatus as Order['status'])}"` : ''}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Orders Grid */}
        {!isLoading && orders.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display font-light text-xl mb-1">
                        Order #{order.orderId}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-body font-light">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-heading font-medium border",
                      getStatusColor(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusLabel(order.status)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div>
                    <p className="text-sm font-heading font-medium mb-1">Customer</p>
                    <p className="text-sm font-body font-light">{order.customer.fullName}</p>
                    <p className="text-xs text-muted-foreground font-body font-light">
                      {order.customer.phone} • {order.customer.email}
                    </p>
                  </div>

                  {/* Order Type */}
                  <div>
                    <p className="text-sm font-heading font-medium mb-1">Order Type</p>
                    <p className="text-sm font-body font-light">{formatOrderType(order.orderType)}</p>
                    {order.orderType === 'dine-in' && order.orderDetails.tableNumber && (
                      <p className="text-xs text-muted-foreground font-body font-light">
                        Table {order.orderDetails.tableNumber}
                      </p>
                    )}
                    {order.orderType === 'delivery' && order.orderDetails.deliveryAddress && (
                      <p className="text-xs text-muted-foreground font-body font-light">
                        {order.orderDetails.deliveryAddress}
                      </p>
                    )}
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-sm font-heading font-medium mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm font-body font-light">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-muted-foreground">
                            GH₵{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  {order.orderDetails.specialRequests && (
                    <div>
                      <p className="text-sm font-heading font-medium mb-1">Special Requests</p>
                      <p className="text-xs text-muted-foreground font-body font-light">
                        {order.orderDetails.specialRequests}
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="font-heading font-medium">Total</span>
                      <span className="text-lg font-heading font-medium">
                        GH₵{order.payment.total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body font-light mt-1">
                      Payment: {order.payment.method}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4">
                    <Link href={`/admin/order-status?orderId=${order.orderId}`}>
                      <Button
                        variant="outline"
                        className="w-full font-heading font-light"
                      >
                        Update Status
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

