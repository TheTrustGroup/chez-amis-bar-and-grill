'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Check, Printer } from 'lucide-react';

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
  }, [orderId]);

  const updateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh order details
        fetchOrderDetails();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-amber-600 hover:text-amber-700"
        >
          ← Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order {order.orderId}
            </h1>
            <p className="text-gray-600 mt-1">{order.id}</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <Printer className="w-4 h-4" />
          Print Receipt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Update */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['pending', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className={`px-4 py-2 border-2 rounded-md font-medium capitalize transition-colors ${
                    order.status === status
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-500 hover:bg-amber-50'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      {item.specialInstructions && (
                        <p className="text-xs text-amber-600 mt-1">Note: {item.specialInstructions}</p>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </div>

            {/* Totals */}
            {order.payment && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">GH₵ {order.payment.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                {order.payment.deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">GH₵ {order.payment.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {order.payment.serviceCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Charge</span>
                    <span className="font-medium">GH₵ {order.payment.serviceCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span className="font-medium">GH₵ {order.payment.tax?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-amber-700">GH₵ {order.payment.total?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Payment Method</span>
                  <span>{order.payment.method || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          {order.orderDetails?.specialRequests && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">Special Instructions</h3>
              <p className="text-yellow-800">{order.orderDetails.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="space-y-6">
          
          {/* Customer Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium text-gray-900">{order.customer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                  <Phone className="w-4 h-4" />
                  {order.customer.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <a href={`mailto:${order.customer.email}`} className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                  <Mail className="w-4 h-4" />
                  {order.customer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Type</p>
                <p className="font-medium text-gray-900 capitalize">{order.orderType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>
              {order.orderType === 'delivery' && order.orderDetails?.deliveryAddress && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-900">{order.orderDetails.deliveryAddress}</span>
                  </div>
                </div>
              )}
              {order.orderType === 'dine-in' && order.orderDetails?.tableNumber && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Table Number</p>
                  <p className="font-medium text-gray-900">Table {order.orderDetails.tableNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

