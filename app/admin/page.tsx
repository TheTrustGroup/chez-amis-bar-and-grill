'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { StatCard } from '@/components/admin/ui/StatCard';

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
}

interface Reservation {
  id: string;
  reservationNumber: string;
  customer: {
    fullName: string;
  };
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
  createdAt: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState({
    totalOrdersToday: 0,
    activeReservations: 0,
    revenueToday: 0,
    avgOrderValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, reservationsResponse] = await Promise.all([
          fetch('/api/orders/list?limit=200', { cache: 'no-store' }),
          fetch('/api/reservations/list?limit=200', { cache: 'no-store' }),
        ]);
        const ordersData = await ordersResponse.json();
        const reservationsData = await reservationsResponse.json();
        const allOrders = (ordersData.orders || []) as Order[];
        const allReservations = (reservationsData.reservations || []) as Reservation[];

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayOrders = allOrders.filter((order) => new Date(order.createdAt) >= today);
        const activeReservations = allReservations.filter((reservation) => {
          const reservationDate = new Date(`${reservation.date}T00:00:00`);
          return (
            reservationDate >= today &&
            reservationDate < tomorrow &&
            (reservation.status === 'confirmed' || reservation.status === 'seated')
          );
        });

        const revenue = todayOrders.reduce((sum, order) => sum + (order.payment?.total || 0), 0);
        const avgOrderValue = todayOrders.length > 0 ? revenue / todayOrders.length : 0;

        setOrders(todayOrders.slice(0, 3));
        setReservations(
          activeReservations
            .sort((a, b) => a.time.localeCompare(b.time))
            .slice(0, 3)
        );
        setStats({
          totalOrdersToday: todayOrders.length,
          activeReservations: activeReservations.length,
          revenueToday: revenue,
          avgOrderValue: avgOrderValue,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      name: 'Total Orders Today',
      value: stats.totalOrdersToday.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingBag,
    },
    {
      name: 'Active Reservations',
      value: stats.activeReservations.toString(),
      change: 'today',
      changeType: 'neutral',
      icon: Calendar,
    },
    {
      name: 'Revenue Today',
      value: `GH₵ ${stats.revenueToday.toFixed(2)}`,
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Avg. Order Value',
      value: `GH₵ ${stats.avgOrderValue.toFixed(2)}`,
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentOrders = orders.map((order) => ({
    id: order.orderId,
    customer: order.customer.fullName,
    type: order.orderType,
    total: `GH₵ ${order.payment?.total?.toFixed(2) || '0.00'}`,
    status: order.status,
    time: new Date(order.createdAt).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  }));

  const upcomingReservations = reservations.map((reservation) => ({
    id: reservation.reservationNumber,
    customer: reservation.customer.fullName,
    date: new Date(reservation.date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric' 
    }),
    time: reservation.time,
    guests: reservation.guests,
    status: reservation.status,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-stack-lg">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Live operations overview for orders and reservations."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.name}
            label={stat.name}
            value={stat.value}
            icon={stat.icon}
            trend={stat.change}
            trendTone={stat.changeType as 'positive' | 'neutral'}
          />
        ))}
      </div>

      {/* Recent Orders & Upcoming Reservations */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        
        {/* Recent Orders */}
        <div className="ui-panel p-0">
          <div className="border-b border-border p-4 md:p-5">
            <h2 className="text-base font-semibold text-foreground">Recent Orders</h2>
          </div>
          <div className="p-4 md:p-5">
            {recentOrders.length > 0 ? (
              <>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <Link 
                      key={order.id} 
                      href={`/admin/orders/${order.id}`}
                      className="block rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{order.id}</span>
                            <span className={`ui-status-pill ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'ready'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                          <p className="text-sm text-muted-foreground">{order.customer} • {order.type}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        <p className="font-semibold text-foreground">{order.total}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/admin/orders">
                  <button className="mt-4 w-full rounded-md border border-border py-2 text-center text-sm font-medium text-terra-700 hover:bg-muted/40">
                    View All Orders →
                  </button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="ui-panel p-0">
          <div className="border-b border-border p-4 md:p-5">
            <h2 className="text-base font-semibold text-foreground">Upcoming Reservations</h2>
          </div>
          <div className="p-4 md:p-5">
            {upcomingReservations.length > 0 ? (
              <>
                <div className="space-y-3">
                  {upcomingReservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{reservation.id}</span>
                          <span className={`ui-status-pill ${
                            reservation.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : reservation.status === 'seated'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-amber-100 text-amber-800'
                          }`}>
                            {reservation.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{reservation.customer}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reservation.date} at {reservation.time} • {reservation.guests} guests
                        </p>
                      </div>
                      <div>
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/admin/reservations">
                  <button className="mt-4 w-full rounded-md border border-border py-2 text-center text-sm font-medium text-terra-700 hover:bg-muted/40">
                    View All Reservations →
                  </button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming reservations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ui-panel">
        <h2 className="mb-4 text-base font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Link href="/admin/orders">
            <button className="w-full rounded-lg border border-border p-4 transition-colors hover:border-terra-400 hover:bg-terra-50">
              <ShoppingBag className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">View Orders</p>
            </button>
          </Link>
          <Link href="/admin/reservations">
            <button className="w-full rounded-lg border border-border p-4 transition-colors hover:border-terra-400 hover:bg-terra-50">
              <Calendar className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">View Reservations</p>
            </button>
          </Link>
          <Link href="/admin/menu">
            <button className="w-full rounded-lg border border-border p-4 transition-colors hover:border-terra-400 hover:bg-terra-50">
              <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Manage Menu</p>
            </button>
          </Link>
          <Link href="/admin/settings">
            <button className="w-full rounded-lg border border-border p-4 transition-colors hover:border-terra-400 hover:bg-terra-50">
              <CheckCircle className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Settings</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

