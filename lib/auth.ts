/**
 * Authentication Utilities
 * Simple password-based authentication for admin dashboard
 */

import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'chezamis_admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChezAmis2024!Secure' // Change this in production!
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

/**
 * Simple password comparison (in production, use bcrypt)
 */
function comparePassword(input: string, stored: string): boolean {
  return input === stored
}

/**
 * Create a session token
 */
function createSessionToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}`
}

/**
 * Verify login credentials
 */
export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && comparePassword(password, ADMIN_PASSWORD)
}

/**
 * Create admin session
 */
export async function createSession(): Promise<string> {
  const token = createSessionToken()
  const cookieStore = await cookies()
  
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  })

  return token
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE_NAME)
    return !!session
  } catch {
    return false
  }
}

/**
 * Destroy admin session (logout)
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

