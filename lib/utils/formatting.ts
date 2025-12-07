/**
 * Formatting Utilities
 * Centralized formatting functions for prices, text, etc.
 */

/**
 * Format price in Ghana Cedis
 */
export function formatPrice(price: number): string {
  return `GH₵ ${price.toFixed(2)}`
}

/**
 * Format price without currency symbol (for calculations)
 */
export function formatPriceNumber(price: number): string {
  return price.toFixed(2)
}

/**
 * Capitalize first letter of each word
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format Ghana phone numbers
  if (cleaned.startsWith('233')) {
    return `+233 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

