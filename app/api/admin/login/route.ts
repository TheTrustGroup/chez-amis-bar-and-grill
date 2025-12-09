import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/login
 * Admin login endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Verify credentials
    const isValid = verifyCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create session
    await createSession()

    return NextResponse.json({
      success: true,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to process login', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
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

