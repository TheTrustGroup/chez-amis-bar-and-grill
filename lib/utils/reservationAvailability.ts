export interface TimeSlot {
  time: string
  available: boolean
  label: string
}

export interface ReservationAvailability {
  date: string
  slots: TimeSlot[]
}

// Lunch time slots
export const lunchSlots: TimeSlot[] = [
  { time: "12:00", available: true, label: "12:00 PM" },
  { time: "12:30", available: true, label: "12:30 PM" },
  { time: "13:00", available: true, label: "1:00 PM" },
  { time: "13:30", available: true, label: "1:30 PM" },
  { time: "14:00", available: true, label: "2:00 PM" },
]

// Dinner time slots
export const dinnerSlots: TimeSlot[] = [
  { time: "18:00", available: true, label: "6:00 PM" },
  { time: "18:30", available: true, label: "6:30 PM" },
  { time: "19:00", available: true, label: "7:00 PM" },
  { time: "19:30", available: true, label: "7:30 PM" },
  { time: "20:00", available: true, label: "8:00 PM" },
  { time: "20:30", available: true, label: "8:30 PM" },
  { time: "21:00", available: true, label: "9:00 PM" },
]

// Check if a date is in the past
export function isDatePast(date: string): boolean {
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return selectedDate < today
}

// Get time slots for a specific date
export function getTimeSlotsForDate(date: string): TimeSlot[] {
  const selectedDate = new Date(date)
  const hour = selectedDate.getHours()
  const dayOfWeek = selectedDate.getDay()

  // Restaurant hours: Lunch 12-2 PM, Dinner 6-9 PM
  // Closed on Mondays (example)
  if (dayOfWeek === 1) {
    return []
  }

  // Determine if it's lunch or dinner time
  // For simplicity, we'll show both lunch and dinner slots
  // In production, this would check actual availability from backend
  return [...lunchSlots, ...dinnerSlots]
}

// Check if a specific time slot is available
export function isTimeSlotAvailable(date: string, time: string): boolean {
  // In production, this would check against actual reservations
  // For now, simulate some unavailable slots
  const unavailableSlots: Record<string, string[]> = {
    // Example: Some slots booked for today
  }

  const dateKey = date
  const bookedSlots = unavailableSlots[dateKey] || []

  return !bookedSlots.includes(time)
}

// Generate reservation number
export function generateReservationNumber(): string {
  const prefix = "RES"
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${prefix}-${year}-${random}`
}



