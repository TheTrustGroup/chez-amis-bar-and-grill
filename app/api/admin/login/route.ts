import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/auth'
import { checkRateLimit } from '@/lib/server/api-security'

export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/login
 * Admin login endpoint
 */
export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  try {
    const rate = await checkRateLimit(request, 'api:admin:login', 20, 60_000)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait and try again.' },
        { status: 429, headers: { 'x-request-id': requestId } }
      )
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400, headers: { 'x-request-id': requestId } }
      )
    }

    // Verify credentials
    const isValid = verifyCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401, headers: { 'x-request-id': requestId } }
      )
    }

    // Create session
    await createSession()

    return NextResponse.json({
      success: true,
      message: 'Login successful',
    }, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to process login', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'x-request-id': requestId } }
    )
  }
}

/**
 * GET /api/admin/login
 * Check if user is logged in
 */
export async function GET() {
  const { isAuthenticated } = await import('@/lib/auth')
  const authenticated = await isAuthenticated()

  return NextResponse.json({
    authenticated,
  })
}

