'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Check, Printer } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';

interface Order {
  id: string;
  orderId: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }>;
  payment: {
    subtotal: number;
    tax: number;
    deliveryFee: number;
    serviceCharge: number;
    total: number;
    method: string;
  };
  createdAt: string;
  orderDetails: {
    tableNumber?: string;
    deliveryAddress?: string;
    specialRequests?: string;
  };
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch('/api/orders/list');
      const data = await response.json();
      if (response.ok && data.orders) {
        const foundOrder = data.orders.find((o: Order) => o.orderId === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const updateStatus = async (newStatus: string) => {
    if (!order) return;
    
    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          customerPhone: order.customer.phone,
          customerName: order.customer.fullName,
          customerEmail: order.customer.email,
          orderType: order.orderType,
          estimatedTime: newStatus === 'out-for-delivery' ? '30-40 minutes' : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage({
          type: 'success',
          text: `Order status updated to ${newStatus}. ${data.notification?.email?.sent ? 'Email sent.' : ''} ${data.notification?.sms?.sent ? 'SMS sent.' : ''}`,
        });
        // Refresh order details
        await fetchOrderDetails();
        // Clear message after 5 seconds
        setTimeout(() => setUpdateMessage(null), 5000);
      } else {
        setUpdateMessage({
          type: 'error',
          text: data.error || 'Failed to update order status',
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setUpdateMessage({
        type: 'error',
        text: 'Failed to update order status. Please try again.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Order not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-terra-700 hover:text-terra-800"
        >
          ← Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="ui-stack-lg">
      
      {/* Header */}
      <PageHeader
        title={`Order ${order.orderId}`}
        subtitle={order.id}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40">
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        
        {/* Order Details */}
        <div className="ui-stack-md lg:col-span-2">
          
          {/* Status Update */}
          <div className="ui-panel">
            <h2 className="mb-4 text-base font-semibold text-foreground">Update Status</h2>
            
            {/* Status Update Message */}
            {updateMessage && (
              <div className={`mb-4 p-3 rounded-md ${
                updateMessage.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <p className="text-sm">{updateMessage.text}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
              {['pending', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={isUpdating || order.status === status}
                  className={`h-11 rounded-md border px-3 text-sm font-medium capitalize transition-colors ${
                    order.status === status
                      ? 'border-terra-500 bg-terra-50 text-terra-700 cursor-default'
                      : isUpdating
                      ? 'border-border text-muted-foreground cursor-not-allowed'
                      : 'border-border hover:border-terra-400 hover:bg-terra-50'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
            
            {/* Notification Info */}
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Customers will receive email and SMS notifications when status changes to:
                <br />• <strong>Preparing</strong> - Email notification
                <br />• <strong>Ready</strong> - Email + SMS (for takeaway/delivery)
                <br />• <strong>Out for Delivery</strong> - Email + SMS (for delivery orders)
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="ui-panel">
            <h2 className="mb-4 text-base font-semibold text-foreground">Order Items</h2>
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex items-start justify-between border-b border-border py-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      {item.specialInstructions && (
                        <p className="text-xs text-amber-600 mt-1">Note: {item.specialInstructions}</p>
                      )}
                    </div>
                    <p className="font-semibold text-foreground">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No items found</p>
              )}
            </div>

            {/* Totals */}
            {order.payment && (
              <div className="mt-6 space-y-2 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">GH₵ {order.payment.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                {order.payment.deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">GH₵ {order.payment.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {order.payment.serviceCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Charge</span>
                    <span className="font-medium">GH₵ {order.payment.serviceCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (15%)</span>
                  <span className="font-medium">GH₵ {order.payment.tax?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-terra-700">GH₵ {order.payment.total?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Payment Method</span>
                  <span>{order.payment.method || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          {order.orderDetails?.specialRequests && (
            <div className="ui-panel border-yellow-200 bg-yellow-50">
              <h3 className="font-semibold text-yellow-900 mb-2">Special Instructions</h3>
              <p className="text-yellow-800">{order.orderDetails.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="ui-stack-md">
          
          {/* Customer Details */}
          <div className="ui-panel">
            <h2 className="mb-4 text-base font-semibold text-foreground">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{order.customer.fullName}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Phone</p>
                <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                  <Phone className="w-4 h-4" />
                  {order.customer.phone}
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${order.customer.email}`} className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                  <Mail className="w-4 h-4" />
                  {order.customer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="ui-panel">
            <h2 className="mb-4 text-base font-semibold text-foreground">Order Information</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Order Type</p>
                <p className="font-medium capitalize text-foreground">{order.orderType}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Order Date</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>
              {order.orderType === 'delivery' && order.orderDetails?.deliveryAddress && (
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Delivery Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{order.orderDetails.deliveryAddress}</span>
                  </div>
                </div>
              )}
              {order.orderType === 'dine-in' && order.orderDetails?.tableNumber && (
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Table Number</p>
                  <p className="font-medium text-foreground">Table {order.orderDetails.tableNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

