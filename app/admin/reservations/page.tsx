'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, Phone, Mail, Users, Clock, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { ActionButton } from '@/components/admin/ui/ActionButton';
import { FilterToolbar } from '@/components/admin/ui/FilterToolbar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';

interface Reservation {
  id: string;
  reservationNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  guests: number;
  seatingPreference?: string;
  occasion?: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
  createdAt: string;
  updatedAt: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations(false);
    const interval = setInterval(() => fetchReservations(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async (backgroundRefresh: boolean = false) => {
    if (backgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch('/api/reservations/list?limit=500', {
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !Array.isArray(data.reservations)) {
        throw new Error(data.error || 'Invalid reservations response');
      }

      const normalizedReservations: Reservation[] = data.reservations.map((reservation: any) => ({
        id: reservation.id || reservation.reservationNumber,
        reservationNumber: reservation.reservationNumber || reservation.id,
        customer: {
          fullName: reservation.customer?.fullName || reservation.customer?.name || 'Guest',
          email: reservation.customer?.email || '',
          phone: reservation.customer?.phone || '',
        },
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests || 1,
        seatingPreference: reservation.seatingPreference || undefined,
        occasion: reservation.occasion || undefined,
        specialRequests: reservation.specialRequests || undefined,
        status: reservation.status || 'confirmed',
        createdAt: reservation.createdAt || new Date().toISOString(),
        updatedAt: reservation.updatedAt || reservation.createdAt || new Date().toISOString(),
      }));

      setReservations(normalizedReservations);
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        setError('Request timeout. Showing last successful data.');
      } else {
        const message = fetchError instanceof Error ? fetchError.message : 'Failed to fetch reservations';
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

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = 
      reservation.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customer.phone.includes(searchQuery) ||
      reservation.reservationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesDate = !dateFilter || reservation.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateStatus = async (reservationNumber: string, newStatus: Reservation['status']) => {
    try {
      const response = await fetch(`/api/reservations/${reservationNumber}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update reservation status');
      }

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.reservationNumber === reservationNumber
            ? {
                ...reservation,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : reservation
        )
      );
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Failed to update reservation status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-stack-lg">
      
      <PageHeader
        title="Reservations Management"
        subtitle={isLoading ? 'Loading reservations...' : `${reservations.length} total reservations`}
        actions={
          <ActionButton
            onClick={() => fetchReservations(true)}
            disabled={isLoading || isRefreshing}
            icon={<RefreshCw className={`h-4 w-4 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </ActionButton>
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by customer name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ui-control pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ui-control"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="seated">Seated</option>
            <option value="no-show">No-show</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="ui-control"
          />
      </FilterToolbar>

      {/* Reservations Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <div key={reservation.id} className="ui-panel ui-stack-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{reservation.customer.fullName}</h3>
                  <p className="text-xs text-muted-foreground">Reservation #{reservation.reservationNumber}</p>
                </div>
                <StatusBadge
                  label={reservation.status}
                  tone={
                    reservation.status === 'confirmed'
                      ? 'success'
                      : reservation.status === 'seated'
                        ? 'info'
                        : reservation.status === 'cancelled'
                          ? 'danger'
                          : reservation.status === 'completed'
                            ? 'neutral'
                            : 'warning'
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(reservation.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{reservation.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${reservation.customer.phone}`} className="text-amber-600 md:hover:text-amber-700 active:text-amber-700">
                    {reservation.customer.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${reservation.customer.email}`} className="truncate text-amber-600 md:hover:text-amber-700 active:text-amber-700">
                    {reservation.customer.email}
                  </a>
                </div>

                {reservation.specialRequests && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-md">
                    <p className="text-xs font-medium text-amber-900 mb-1">Special Requests:</p>
                    <p className="text-xs text-amber-800">{reservation.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <select
                  value={reservation.status}
                  onChange={(event) => {
                    const newStatus = event.target.value as Reservation['status'];
                    if (newStatus !== reservation.status) {
                      updateStatus(reservation.reservationNumber, newStatus);
                    }
                  }}
                  disabled={reservation.status === 'cancelled' || reservation.status === 'completed'}
                  className={`ui-control ${
                    reservation.status === 'cancelled' || reservation.status === 'completed'
                      ? 'cursor-not-allowed opacity-60 bg-muted/40'
                      : 'cursor-pointer bg-background md:hover:bg-muted/30 active:bg-muted/30'
                  }`}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No-show</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reservations found</p>
          </div>
        )}
      </div>
    </div>
  );
}

