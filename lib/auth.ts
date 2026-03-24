/**
 * Authentication Utilities
 * Simple password-based authentication for admin dashboard
 */

import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'chezamis_admin'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

function comparePassword(input: string, stored: string): boolean {
  return input === stored
}

function createSessionToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}`
}

/**
 * Set ADMIN_PASSWORD in .env.local — no default.
 */
export function verifyCredentials(username: string, password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    throw new Error(
      'ADMIN_PASSWORD must be set in environment. Set ADMIN_PASSWORD in .env.local — no default.',
    )
  }
  return username === ADMIN_USERNAME && comparePassword(password, adminPassword)
}

export async function createSession(): Promise<string> {
  const token = createSessionToken()
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })

  return token
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE_NAME)
    return !!session
  } catch {
    return false
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
