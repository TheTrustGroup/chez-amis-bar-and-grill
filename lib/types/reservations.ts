export type ReservationStatus = 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show'

export interface ReservationRequest {
  reservationNumber: string
  customer: {
    fullName: string
    email: string
    phone: string
  }
  date: string
  time: string
  guests: number
  seatingPreference?: string
  occasion?: string
  specialRequests?: string
}

export interface StoredReservation extends ReservationRequest {
  id: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}
