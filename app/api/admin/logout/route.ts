import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/logout
 * Admin logout endpoint
 */
export async function POST() {
  try {
    await destroySession()

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

