import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Ghana format: accepts various formats)
 */
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  // Check if it's a valid Ghana phone number (9-10 digits after country code, or 9-10 digits local)
  // Accepts: 0557032312, +233557032312, 233557032312, etc.
  return cleaned.length >= 9 && cleaned.length <= 13
}

/**
 * Format phone number for display
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  // Format Ghana numbers: 055 703 2312
  if (cleaned.startsWith('233')) {
    const local = cleaned.slice(3)
    if (local.length === 9) {
      return `+233 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
    }
  } else if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  return phone
}

