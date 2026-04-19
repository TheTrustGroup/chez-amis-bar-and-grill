'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Check, X, Clock, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { ActionButton } from '@/components/admin/ui/ActionButton';
import { DataSectionCard } from '@/components/admin/ui/DataSectionCard';
import { FilterToolbar } from '@/components/admin/ui/FilterToolbar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';

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
  payment: {
    total: number;
  };
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Clock },
  preparing: { label: 'Preparing', color: 'bg-terra-100 text-terra-700', icon: Clock },
  ready: { label: 'Ready', color: 'bg-green-100 text-green-700', icon: Check },
  'out-for-delivery': { label: 'Out for Delivery', color: 'bg-blue-100 text-blue-700', icon: Clock },
  delivered: { label: 'Delivered', color: 'bg-neutral-200 text-neutral-700', icon: Check },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: X },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders(false);
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => fetchOrders(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async (backgroundRefresh: boolean = false) => {
    if (backgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      // Use AbortController for request cancellation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch('/api/orders/list?limit=500', {
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ API response not OK:', response.status, errorText);
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📦 API response:', { success: data.success, orderCount: data.orders?.length, total: data.total });
      }
      
      if (data.success && Array.isArray(data.orders)) {
        // Normalize orders efficiently
        const normalizedOrders = data.orders.map((order: any) => ({
          id: order.id || order.orderId,
          orderId: order.orderId || order.id,
          orderType: order.orderType || 'delivery',
          status: order.status || 'pending',
          customer: {
            fullName: order.customer?.fullName || order.customer?.name || 'Unknown',
            email: order.customer?.email || '',
            phone: order.customer?.phone || '',
          },
          payment: {
            total: order.payment?.total || 0,
            subtotal: order.payment?.subtotal || 0,
            tax: order.payment?.tax || 0,
            deliveryFee: order.payment?.deliveryFee || 0,
            serviceCharge: order.payment?.serviceCharge || 0,
          },
          createdAt: order.createdAt || new Date().toISOString(),
          updatedAt: order.updatedAt || order.createdAt || new Date().toISOString(),
        }));
        
        setOrders(normalizedOrders);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Loaded and normalized orders:', normalizedOrders.length);
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Invalid response structure:', data);
        }
        setError(data.error || 'Invalid response from server. Showing last successful data.');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timeout. Showing last successful data.');
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Error fetching orders:', err);
        }
        const message = err instanceof Error ? err.message : 'Failed to connect to server';
        setError(`${message}. Showing last successful data.`);
      }
    } finally {
      if (backgroundRefresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.orderType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Find the order in current state to get customer details
      const order = orders.find(o => o.orderId === orderId || o.id === orderId);
      
      if (!order) {
        console.error('Order not found:', orderId);
        alert('Order not found. Please refresh the page.');
        return;
      }

      console.log('📝 Updating order status:', { orderId, newStatus, customer: order.customer });

      // Prepare request with all required fields
      const updateData = {
        status: newStatus,
        customerPhone: order.customer.phone,
        customerName: order.customer.fullName,
        customerEmail: order.customer.email,
        orderType: order.orderType,
      };

      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Order status updated:', {
          orderId,
          newStatus,
          notifications: result.notification,
        });
        
        // Show success message with notification status
        const notificationStatus = result.notification?.notification;
        if (notificationStatus) {
          const emailSent = notificationStatus.email?.sent;
          const smsSent = notificationStatus.sms?.sent;
          console.log('📧 Notifications sent:', { email: emailSent, sms: smsSent });
        }
        
        // Optimistically update UI
        setOrders(prev => prev.map(o => 
          (o.orderId === orderId || o.id === orderId)
            ? { ...o, status: newStatus as Order['status'], updatedAt: new Date().toISOString() }
            : o
        ));
        
        // Refresh orders to get latest data
        setTimeout(() => fetchOrders(), 500);
      } else {
        console.error('❌ Failed to update order status:', result.error || result.message);
        alert(result.error || result.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-stack-lg">
      
      <PageHeader
        title="Orders Management"
        subtitle={isLoading ? 'Loading...' : `${orders.length} total orders`}
        actions={
          <>
            <ActionButton
              onClick={() => fetchOrders(true)}
              disabled={isLoading || isRefreshing}
              icon={<RefreshCw className={`h-4 w-4 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />}
            >
              Refresh
            </ActionButton>
            <ActionButton tone="primary" icon={<Download className="h-4 w-4" />}>
              Export Orders
            </ActionButton>
          </>
        }
      />

      {/* Error Message */}
      {error && (
        <div className="ui-panel border-red-200 bg-red-50">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <FilterToolbar>
          
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ui-control pl-11"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ui-control"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="ui-control"
          >
            <option value="all">All Types</option>
            <option value="dine-in">Dine-in</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
      </FilterToolbar>

      {/* Orders Table */}
      <DataSectionCard
        title="Orders"
        subtitle={`${filteredOrders.length} shown`}
        className="overflow-hidden"
        contentClassName="p-0"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
            <span className="ml-3 text-muted-foreground">Loading orders...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider md:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || Clock;
                const statusInfo = statusConfig[order.status] || statusConfig.pending;
                return (
                  <tr key={order.id} className="md:hover:bg-muted/20">
                    <td className="px-4 py-4 whitespace-nowrap md:px-6">
                      <div className="text-sm font-medium text-foreground">{order.orderId}</div>
                      <div className="text-xs text-muted-foreground">{order.id}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap md:px-6">
                      <div className="text-sm font-medium text-foreground">{order.customer.fullName}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap md:px-6">
                      <StatusBadge label={order.orderType} tone="neutral" className="capitalize" />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap md:px-6">
                      <div className="text-sm font-semibold text-foreground">
                        GH₵ {order.payment?.total?.toFixed(2) || '0.00'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap md:px-6">
                      <span className={`ui-status-pill ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground md:px-6">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium md:px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/orders/${order.orderId}`}>
                          <button 
                            className="rounded-md p-2 text-blue-600 transition-colors md:hover:bg-blue-50 active:bg-blue-50"
                            title="View Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        
                        {/* Status Update Dropdown */}
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus !== order.status) {
                                // Prevent changing status of delivered orders
                                if (order.status === 'delivered') {
                                  alert('Cannot change status of a delivered order.');
                                  return;
                                }
                                if (confirm(`Update order ${order.orderId} status to "${newStatus}"?`)) {
                                  updateOrderStatus(order.orderId, newStatus);
                                }
                              }
                            }}
                            disabled={order.status === 'delivered'}
                            className={`h-9 rounded-md border border-border bg-background px-3 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                              order.status === 'delivered' 
                                ? 'cursor-not-allowed opacity-60 bg-muted/40' 
                                : 'cursor-pointer md:hover:bg-muted/30 active:bg-muted/30'
                            }`}
                            title={order.status === 'delivered' ? 'Delivered orders cannot be changed' : 'Update Order Status'}
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            {order.orderType === 'delivery' && (
                              <option value="out-for-delivery">Out for Delivery</option>
                            )}
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredOrders.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No orders found</p>
              <p className="text-muted-foreground/70 text-sm mt-2">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Orders will appear here when customers place them'}
              </p>
            </div>
          )}
        </div>
        )}
      </DataSectionCard>
    </div>
  );
}

