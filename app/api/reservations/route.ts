import { NextRequest, NextResponse } from 'next/server'
import { sendReservationConfirmation, sendAdminNotification } from '@/lib/services/notification.service'
import type { ReservationData } from '@/lib/types/notifications'
import { saveReservation } from '@/lib/services/reservation-storage'
import type { ReservationRequest } from '@/lib/types/reservations'
import { reservationRequestSchema } from '@/lib/api-schemas'
import {
  checkRateLimit,
  getIdempotencyReplay,
  setIdempotencyReplay,
} from '@/lib/server/api-security'
import { logInfo, logWarn } from '@/lib/server/logger'
import { enqueueFailedNotification } from '@/lib/services/notification-outbox'

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  const idempotencyKey = request.headers.get('idempotency-key')
  try {
    const rateLimit = await checkRateLimit(request, 'api:reservations:create', 30, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait and try again.',
          retryAt: new Date(rateLimit.resetAt).toISOString(),
        },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const replay = getIdempotencyReplay('reservations:create', idempotencyKey)
    if (replay) {
      return NextResponse.json(replay.body, {
        status: replay.status,
        headers: { 'x-idempotent-replay': 'true', 'x-request-id': requestId },
      })
    }

    const parsed = reservationRequestSchema.safeParse(await request.json())
    if (!parsed.success) {
      const body = {
        error: 'Invalid reservation payload',
        details: parsed.error.flatten(),
      }
      setIdempotencyReplay('reservations:create', idempotencyKey, { status: 400, body })
      return NextResponse.json(body, { status: 400, headers: { 'x-request-id': requestId } })
    }
    const reservationData: ReservationRequest = parsed.data

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

    const requestedDate = new Date(`${reservationData.date}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (Number.isNaN(requestedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid reservation date' },
        { status: 400 }
      )
    }

    if (requestedDate < today) {
      return NextResponse.json(
        { error: 'Reservation date cannot be in the past' },
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

    const savedReservation = await saveReservation(reservationData)
    logInfo({
      event: 'reservation.save.success',
      route: '/api/reservations',
      requestId,
      metadata: { reservationNumber: reservationData.reservationNumber },
    })

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

    if (!customerNotifications.email.sent) {
      await enqueueFailedNotification({
        eventType: 'reservation_customer_notification',
        channel: 'email',
        recipient: reservationData.customer.email,
        payload: {
          template: 'reservation-confirmation',
          subject: `Reservation Confirmation #${reservationData.reservationNumber} - Chez Amis Bar and Grill`,
          data: notificationData as unknown as Record<string, unknown>,
        },
        errorMessage: customerNotifications.email.error || undefined,
      })
    }
    if (!customerNotifications.sms.sent) {
      await enqueueFailedNotification({
        eventType: 'reservation_customer_notification',
        channel: 'sms',
        recipient: reservationData.customer.phone,
        payload: {
          template: 'reservation-confirmation',
          data: notificationData as unknown as Record<string, unknown>,
        },
        errorMessage: customerNotifications.sms.error || undefined,
      })
    }
    if (!adminNotifications.email.sent) {
      await enqueueFailedNotification({
        eventType: 'reservation_admin_notification',
        channel: 'email',
        recipient: process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com',
        payload: {
          template: 'admin-reservation',
          subject: 'New Reservation - Chez Amis',
          data: notificationData as unknown as Record<string, unknown>,
        },
        errorMessage: adminNotifications.email.error || undefined,
      })
    }
    if (!adminNotifications.sms.sent) {
      await enqueueFailedNotification({
        eventType: 'reservation_admin_notification',
        channel: 'sms',
        recipient: process.env.ADMIN_PHONE || process.env.NEXT_PUBLIC_PHONE || '+233557032312',
        payload: {
          template: 'admin-reservation',
          data: notificationData as unknown as Record<string, unknown>,
        },
        errorMessage: adminNotifications.sms.error || undefined,
      })
    }

    // Return success even if notifications fail (reservation is still confirmed)
    const responseBody = {
      success: true,
      reservationNumber: reservationData.reservationNumber,
      message: 'Reservation confirmed successfully',
      reservation: savedReservation,
      notifications: {
        customer: customerNotifications,
        admin: adminNotifications,
      },
    }
    setIdempotencyReplay('reservations:create', idempotencyKey, { status: 200, body: responseBody })
    return NextResponse.json(responseBody, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    logWarn({
      event: 'reservation.create.error',
      route: '/api/reservations',
      requestId,
      metadata: { message: error instanceof Error ? error.message : 'Unknown error' },
    })
    return NextResponse.json(
      { error: 'Failed to process reservation', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}


