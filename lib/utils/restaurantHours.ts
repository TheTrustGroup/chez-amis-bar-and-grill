/**
 * Restaurant hours — aligned with public messaging (24/7) and JSON-LD.
 */

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

/**
 * JSON-LD: 24-hour service (matches on-site “Open 24/7” copy).
 * See https://schema.org/OpeningHoursSpecification
 */
export const openingHoursSpecificationSchema = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...DAYS],
    opens: '00:00',
    closes: '24:00',
  },
]

/**
 * Check if restaurant is currently open (24/7 → always true in local time).
 */
export function isRestaurantOpen(): boolean {
  return true
}

/**
 * Display string for UI / metadata.
 */
export function getRestaurantHours(): string {
  return '24 hours, 7 days a week'
}

/**
 * Legacy status helper — kept for any UI that still branches on open/closed.
 */
export function getRestaurantStatus(): { text: string; isOpen: boolean; color: string } {
  return {
    text: 'Open Now',
    isOpen: true,
    color: 'green',
  }
}
