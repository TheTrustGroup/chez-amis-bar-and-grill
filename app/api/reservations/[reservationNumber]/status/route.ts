import { NextRequest, NextResponse } from 'next/server'
import {
  getReservationByNumber,
  updateReservationStatus,
} from '@/lib/services/reservation-storage'
import type { ReservationStatus } from '@/lib/types/reservations'
import { checkRateLimit } from '@/lib/server/api-security'
import { logWarn } from '@/lib/server/logger'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const VALID_STATUSES: ReservationStatus[] = ['confirmed', 'seated', 'completed', 'cancelled', 'no-show']

export async function POST(
  request: NextRequest,
  { params }: { params: { reservationNumber: string } }
) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  try {
    const rateLimit = await checkRateLimit(request, 'api:reservations:status', 120, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const reservationNumber = params.reservationNumber
    const body = (await request.json()) as { status?: ReservationStatus }
    const status = body.status

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400, headers: { 'x-request-id': requestId } }
      )
    }

    const existingReservation = await getReservationByNumber(reservationNumber)
    if (!existingReservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404, headers: { 'x-request-id': requestId } })
    }

    if (existingReservation.status === 'cancelled' || existingReservation.status === 'completed') {
      return NextResponse.json(
        { error: `Cannot change status of a ${existingReservation.status} reservation` },
        { status: 400, headers: { 'x-request-id': requestId } }
      )
    }

    const updatedReservation = await updateReservationStatus(reservationNumber, status)
    if (!updatedReservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404, headers: { 'x-request-id': requestId } })
    }

    return NextResponse.json({
      success: true,
      reservationNumber: updatedReservation.reservationNumber,
      status: updatedReservation.status,
      reservation: updatedReservation,
      message: `Reservation status updated to ${updatedReservation.status}`,
    }, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    logWarn({
      event: 'reservation.status.error',
      route: '/api/reservations/[reservationNumber]/status',
      requestId,
      metadata: { message: error instanceof Error ? error.message : 'Unknown error' },
    })
    return NextResponse.json(
      { error: 'Failed to update reservation status' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}
