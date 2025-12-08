import { NextRequest, NextResponse } from 'next/server'
import { sendReservationConfirmation, sendAdminNotification } from '@/lib/services/notification.service'
import type { ReservationData } from '@/lib/types/notifications'

export interface ReservationRequest {
  reservationNumber: string
  customer: {
    fullName: string
    email: string
    phone: string
  }
  date: string // ISO date string
  time: string // e.g., "7:00 PM"
  guests: number
  seatingPreference?: string
  occasion?: string
  specialRequests?: string
}

export async function POST(request: NextRequest) {
  try {
    const reservationData: ReservationRequest = await request.json()

    // Validate required fields
    if (!reservationData.customer?.email || !reservationData.customer?.phone || !reservationData.customer?.fullName) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    if (!reservationData.date || !reservationData.time || !reservationData.guests) {
      return NextResponse.json(
        { error: 'Missing required reservation details' },
        { status: 400 }
      )
    }

    // Convert to ReservationData format
    const notificationData: ReservationData = {
      reservationNumber: reservationData.reservationNumber,
      customer: reservationData.customer,
      date: reservationData.date,
      time: reservationData.time,
      guests: reservationData.guests,
      seatingPreference: reservationData.seatingPreference,
      occasion: reservationData.occasion,
      specialRequests: reservationData.specialRequests,
    }

    // Send customer confirmation and admin notification in parallel
    const [customerResult, adminResult] = await Promise.allSettled([
      sendReservationConfirmation(notificationData),
      sendAdminNotification('reservation', notificationData),
    ])

    // Log results
    const customerNotifications = customerResult.status === 'fulfilled' 
      ? customerResult.value 
      : { email: { sent: false, error: (customerResult.reason as Error).message }, sms: { sent: false, error: (customerResult.reason as Error).message } }

    const adminNotifications = adminResult.status === 'fulfilled'
      ? adminResult.value
      : { email: { sent: false, error: (adminResult.reason as Error).message }, sms: { sent: false, error: (adminResult.reason as Error).message } }

    // Return success even if notifications fail (reservation is still confirmed)
    return NextResponse.json({
      success: true,
      reservationNumber: reservationData.reservationNumber,
      message: 'Reservation confirmed successfully',
      notifications: {
        customer: customerNotifications,
        admin: adminNotifications,
      },
    })
  } catch (error) {
    console.error('Reservation processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process reservation', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

