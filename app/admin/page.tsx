'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

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
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
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
        // Fetch orders
        const ordersResponse = await fetch('/api/orders/list');
        const ordersData = await ordersResponse.json();
        const allOrders = ordersData.orders || [];

        // Calculate today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter today's orders
        const todayOrders = allOrders.filter((order: Order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= today;
        });

        // Calculate revenue
        const revenue = todayOrders.reduce((sum: number, order: Order) => {
          return sum + (order.payment?.total || 0);
        }, 0);

        // Calculate average order value
        const avgOrderValue = todayOrders.length > 0 ? revenue / todayOrders.length : 0;

        setOrders(todayOrders.slice(0, 3)); // Show 3 most recent
        setStats({
          totalOrdersToday: todayOrders.length,
          activeReservations: 0, // TODO: Fetch from reservations API
          revenueToday: revenue,
          avgOrderValue: avgOrderValue,
        });

        // TODO: Fetch reservations when API is available
        setReservations([]);
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
      change: '+4',
      changeType: 'positive',
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
    id: reservation.id,
    customer: reservation.customerName,
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-semibold mb-2">Welcome back, Admin!</h1>
        <p className="text-amber-100">Here&apos;s what&apos;s happening with your restaurant today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-amber-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders & Upcoming Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Link 
                      key={order.id} 
                      href={`/admin/orders/${order.id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer block"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'ready'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.customer} • {order.type}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{order.total}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/admin/orders">
                  <button className="mt-4 w-full py-2 text-center text-amber-600 hover:text-amber-700 font-medium text-sm">
                    View All Orders →
                  </button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Reservations</h2>
          </div>
          <div className="p-6">
            {upcomingReservations.length > 0 ? (
              <>
                <div className="space-y-4">
                  {upcomingReservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{reservation.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {reservation.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{reservation.customer}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {reservation.date} at {reservation.time} • {reservation.guests} guests
                        </p>
                      </div>
                      <div>
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/admin/reservations">
                  <button className="mt-4 w-full py-2 text-center text-amber-600 hover:text-amber-700 font-medium text-sm">
                    View All Reservations →
                  </button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming reservations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/orders">
            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <ShoppingBag className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Orders</p>
            </button>
          </Link>
          <Link href="/admin/reservations">
            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <Calendar className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Reservations</p>
            </button>
          </Link>
          <Link href="/admin/menu">
            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Manage Menu</p>
            </button>
          </Link>
          <Link href="/admin/settings">
            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <CheckCircle className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Settings</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

