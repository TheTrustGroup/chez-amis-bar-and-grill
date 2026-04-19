import { promises as fs } from 'fs'
import path from 'path'
import { getSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/services/supabase-server'
import type { ReservationRequest, ReservationStatus, StoredReservation } from '@/lib/types/reservations'

const STORAGE_BACKEND = (process.env.ORDER_STORAGE_BACKEND || 'file').toLowerCase()
const SUPABASE_RESERVATIONS_TABLE = 'restaurant_reservations'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'reservations.json')

interface SupabaseReservationRow {
  id: string
  reservation_number: string
  status: ReservationStatus
  customer: ReservationRequest['customer']
  date: string
  time: string
  guests: number
  seating_preference?: string | null
  occasion?: string | null
  special_requests?: string | null
  created_at: string
  updated_at: string
}

const RESERVATION_STATUSES: ReservationStatus[] = [
  'confirmed',
  'seated',
  'completed',
  'cancelled',
  'no-show',
]

function shouldUseSupabaseReservationsBackend(): boolean {
  if (IS_PRODUCTION && STORAGE_BACKEND !== 'supabase') {
    throw new Error(
      `Unsafe reservation storage backend "${STORAGE_BACKEND}" in production. Set ORDER_STORAGE_BACKEND=supabase.`
    )
  }

  if (STORAGE_BACKEND !== 'supabase') return false
  if (!hasSupabaseServerConfig() && IS_PRODUCTION) {
    throw new Error(
      'ORDER_STORAGE_BACKEND is set to supabase but Supabase server credentials are missing. Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.'
    )
  }
  return hasSupabaseServerConfig()
}

function mapSupabaseRowToStoredReservation(row: SupabaseReservationRow): StoredReservation {
  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    status: row.status,
    customer: row.customer,
    date: row.date,
    time: row.time,
    guests: row.guests,
    seatingPreference: row.seating_preference ?? undefined,
    occasion: row.occasion ?? undefined,
    specialRequests: row.special_requests ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

async function ensureStorageDir(): Promise<void> {
  await fs.mkdir(STORAGE_DIR, { recursive: true })
}

async function readReservationsFromFile(): Promise<StoredReservation[]> {
  try {
    await ensureStorageDir()
    const data = await fs.readFile(STORAGE_FILE, 'utf-8')
    const reservations = JSON.parse(data)
    return Array.isArray(reservations) ? reservations : []
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeReservationsToFile(reservations: StoredReservation[]): Promise<void> {
  await ensureStorageDir()
  const tempFile = `${STORAGE_FILE}.tmp`
  await fs.writeFile(tempFile, JSON.stringify(reservations, null, 2), 'utf-8')
  await fs.rename(tempFile, STORAGE_FILE)
}

async function saveReservationToSupabase(reservation: ReservationRequest): Promise<StoredReservation> {
  const client = getSupabaseServerClient()
  const payload = {
    reservation_number: reservation.reservationNumber,
    status: 'confirmed' as ReservationStatus,
    customer: reservation.customer,
    date: reservation.date,
    time: reservation.time,
    guests: reservation.guests,
    seating_preference: reservation.seatingPreference ?? null,
    occasion: reservation.occasion ?? null,
    special_requests: reservation.specialRequests ?? null,
  }

  const { data, error } = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .upsert(payload, { onConflict: 'reservation_number' })
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(`Supabase reservation save failed: ${error?.message || 'Unknown error'}`)
  }

  return mapSupabaseRowToStoredReservation(data as SupabaseReservationRow)
}

async function getAllReservationsFromSupabase(): Promise<StoredReservation[]> {
  const client = getSupabaseServerClient()
  const { data, error } = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase get all reservations failed: ${error.message}`)
  }

  return (data || []).map((row) => mapSupabaseRowToStoredReservation(row as SupabaseReservationRow))
}

async function getReservationsByStatusFromSupabase(status: ReservationStatus): Promise<StoredReservation[]> {
  const client = getSupabaseServerClient()
  const { data, error } = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase get reservations by status failed: ${error.message}`)
  }

  return (data || []).map((row) => mapSupabaseRowToStoredReservation(row as SupabaseReservationRow))
}

async function getReservationByNumberFromSupabase(
  reservationNumber: string
): Promise<StoredReservation | undefined> {
  const client = getSupabaseServerClient()

  const byReservationNumberResult = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .select('*')
    .eq('reservation_number', reservationNumber)
    .maybeSingle()

  if (byReservationNumberResult.error) {
    throw new Error(
      `Supabase get reservation by reservation_number failed: ${byReservationNumberResult.error.message}`
    )
  }
  if (byReservationNumberResult.data) {
    return mapSupabaseRowToStoredReservation(byReservationNumberResult.data as SupabaseReservationRow)
  }

  if (!isUuid(reservationNumber)) {
    return undefined
  }

  const byIdResult = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .select('*')
    .eq('id', reservationNumber)
    .maybeSingle()

  if (byIdResult.error) {
    throw new Error(`Supabase get reservation by id failed: ${byIdResult.error.message}`)
  }
  if (!byIdResult.data) {
    return undefined
  }

  return mapSupabaseRowToStoredReservation(byIdResult.data as SupabaseReservationRow)
}

async function updateReservationStatusInSupabase(
  reservationNumber: string,
  status: ReservationStatus
): Promise<StoredReservation | null> {
  const client = getSupabaseServerClient()
  const lookup = await getReservationByNumberFromSupabase(reservationNumber)
  if (!lookup) return null

  const { data, error } = await client
    .from(SUPABASE_RESERVATIONS_TABLE)
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', lookup.id)
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(`Supabase reservation status update failed: ${error?.message || 'Unknown error'}`)
  }

  return mapSupabaseRowToStoredReservation(data as SupabaseReservationRow)
}

async function getReservationCountsByStatusFromSupabase(): Promise<Record<ReservationStatus, number>> {
  const reservations = await getAllReservationsFromSupabase()
  const counts: Record<ReservationStatus, number> = {
    confirmed: 0,
    seated: 0,
    completed: 0,
    cancelled: 0,
    'no-show': 0,
  }

  for (const reservation of reservations) {
    counts[reservation.status] = (counts[reservation.status] || 0) + 1
  }

  return counts
}

export async function saveReservation(reservation: ReservationRequest): Promise<StoredReservation> {
  if (shouldUseSupabaseReservationsBackend()) {
    return saveReservationToSupabase(reservation)
  }

  const now = new Date().toISOString()
  const storedReservation: StoredReservation = {
    ...reservation,
    id: reservation.reservationNumber,
    status: 'confirmed',
    createdAt: now,
    updatedAt: now,
  }

  const allReservations = await readReservationsFromFile()
  const existingIndex = allReservations.findIndex(
    (entry) => entry.reservationNumber === storedReservation.reservationNumber
  )

  if (existingIndex >= 0) {
    allReservations[existingIndex] = storedReservation
  } else {
    allReservations.push(storedReservation)
  }

  await writeReservationsToFile(allReservations)
  return storedReservation
}

export async function getAllReservations(): Promise<StoredReservation[]> {
  if (shouldUseSupabaseReservationsBackend()) {
    return getAllReservationsFromSupabase()
  }

  const reservations = await readReservationsFromFile()
  return reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getReservationsByStatus(status: ReservationStatus): Promise<StoredReservation[]> {
  if (!RESERVATION_STATUSES.includes(status)) {
    return []
  }

  if (shouldUseSupabaseReservationsBackend()) {
    return getReservationsByStatusFromSupabase(status)
  }

  const reservations = await readReservationsFromFile()
  return reservations
    .filter((reservation) => reservation.status === status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getReservationByNumber(
  reservationNumber: string
): Promise<StoredReservation | undefined> {
  if (shouldUseSupabaseReservationsBackend()) {
    return getReservationByNumberFromSupabase(reservationNumber)
  }

  const reservations = await readReservationsFromFile()
  return reservations.find(
    (reservation) =>
      reservation.reservationNumber === reservationNumber || reservation.id === reservationNumber
  )
}

export async function updateReservationStatus(
  reservationNumber: string,
  status: ReservationStatus
): Promise<StoredReservation | null> {
  if (!RESERVATION_STATUSES.includes(status)) {
    return null
  }

  if (shouldUseSupabaseReservationsBackend()) {
    return updateReservationStatusInSupabase(reservationNumber, status)
  }

  const reservations = await readReservationsFromFile()
  const reservationIndex = reservations.findIndex(
    (reservation) =>
      reservation.reservationNumber === reservationNumber || reservation.id === reservationNumber
  )

  if (reservationIndex === -1) {
    return null
  }

  reservations[reservationIndex] = {
    ...reservations[reservationIndex],
    status,
    updatedAt: new Date().toISOString(),
  }

  await writeReservationsToFile(reservations)
  return reservations[reservationIndex]
}

export async function getReservationCountsByStatus(): Promise<Record<ReservationStatus, number>> {
  if (shouldUseSupabaseReservationsBackend()) {
    return getReservationCountsByStatusFromSupabase()
  }

  const reservations = await readReservationsFromFile()
  const counts: Record<ReservationStatus, number> = {
    confirmed: 0,
    seated: 0,
    completed: 0,
    cancelled: 0,
    'no-show': 0,
  }

  for (const reservation of reservations) {
    counts[reservation.status] = (counts[reservation.status] || 0) + 1
  }

  return counts
}
