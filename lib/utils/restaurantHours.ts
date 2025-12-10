/**
 * Restaurant Hours Utility
 * Checks if restaurant is currently open based on hours: 9:30 AM - 12:00 AM (midnight)
 */

const OPENING_HOUR = 9
const OPENING_MINUTE = 30
const CLOSING_HOUR = 0 // 12:00 AM (midnight)
const CLOSING_MINUTE = 0

/**
 * Check if restaurant is currently open
 * Hours: 9:30 AM - 12:00 AM (midnight)
 */
export function isRestaurantOpen(): boolean {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour * 60 + currentMinute // Convert to minutes for easier comparison

  // Opening time: 9:30 AM = 9 * 60 + 30 = 570 minutes
  const openingTime = OPENING_HOUR * 60 + OPENING_MINUTE // 570 minutes

  // Closing time: 12:00 AM (midnight) = 0 * 60 + 0 = 0 minutes
  // But we need to handle it as end of day (24:00 = 1440 minutes)
  const closingTime = CLOSING_HOUR === 0 ? 24 * 60 : CLOSING_HOUR * 60 + CLOSING_MINUTE // 1440 minutes

  // If current time is between opening and closing (including midnight)
  if (currentTime >= openingTime && currentTime < closingTime) {
    return true
  }

  // Handle edge case: if it's past midnight but before closing (shouldn't happen with 12 AM closing)
  // But if closing was later (e.g., 2 AM), we'd check: currentTime < closingTime
  return false
}

/**
 * Get restaurant hours as formatted string
 */
export function getRestaurantHours(): string {
  return '9:30 AM - 12:00 AM'
}

/**
 * Get current status text
 */
export function getRestaurantStatus(): { text: string; isOpen: boolean; color: string } {
  const isOpen = isRestaurantOpen()
  return {
    text: isOpen ? 'Open Now' : 'Closed',
    isOpen,
    color: isOpen ? 'green' : 'red',
  }
}


