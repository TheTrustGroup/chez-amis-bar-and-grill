import { NextRequest, NextResponse } from 'next/server'
import {
  getAllReservations,
  getReservationCountsByStatus,
  getReservationsByStatus,
} from '@/lib/services/reservation-storage'
import type { ReservationStatus } from '@/lib/types/reservations'
import { checkRateLimit } from '@/lib/server/api-security'
import { logWarn } from '@/lib/server/logger'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const VALID_STATUSES: ReservationStatus[] = ['confirmed', 'seated', 'completed', 'cancelled', 'no-show']

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  try {
    const rateLimit = await checkRateLimit(request, 'api:reservations:list', 180, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const requestedStatus = searchParams.get('status')
    const date = searchParams.get('date')
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 1000)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    let reservations =
      requestedStatus && VALID_STATUSES.includes(requestedStatus as ReservationStatus)
        ? await getReservationsByStatus(requestedStatus as ReservationStatus)
        : await getAllReservations()

    if (date) {
      reservations = reservations.filter((reservation) => reservation.date === date)
    }

    const total = reservations.length
    const paginatedReservations =
      limit > 0 ? reservations.slice(Math.max(offset, 0), Math.max(offset, 0) + limit) : reservations
    const counts = await getReservationCountsByStatus()

    const response = NextResponse.json({
      success: true,
      reservations: paginatedReservations,
      counts,
      total,
      pagination: {
        offset,
        limit,
        hasMore: offset + limit < total,
      },
    })

    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('X-Total-Count', total.toString())
    response.headers.set('X-Request-Id', requestId)
    return response
  } catch (error) {
    logWarn({
      event: 'reservation.list.error',
      route: '/api/reservations/list',
      requestId,
      metadata: { message: error instanceof Error ? error.message : 'Unknown error' },
    })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reservations' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}
