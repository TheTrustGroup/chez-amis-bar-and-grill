import { NextRequest, NextResponse } from 'next/server'

export interface EventRequestFormRequest {
  eventType: string
  date: string
  alternateDate?: string
  guests: string
  spacePreference?: string
  budgetRange?: string
  name: string
  email: string
  phone: string
  company?: string
  additionalDetails?: string
}

/**
 * Event Request Form API Route
 * Forwards all event request messages to chez@chezamisrestaurant.com
 */
export async function POST(request: NextRequest) {
  try {
    const formData: EventRequestFormRequest = await request.json()

    // Validate required fields
    if (!formData.eventType || !formData.date || !formData.guests || !formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email to business email using Resend
    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = 'chez@chezamisrestaurant.com'

    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 [DEV] Would send event request to:', adminEmail)
        console.log('📧 [DEV] Event request from:', formData.name, formData.email)
        return NextResponse.json({ success: true, message: 'Event request received (dev mode)' })
      }
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Render email HTML
    const { renderEventRequestEmail } = await import('@/lib/templates/emails/event-request')
    const html = renderEventRequestEmail(formData)

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Chez Amis <noreply@chezamisrestaurant.com>',
        to: [adminEmail],
        replyTo: formData.email, // Allow direct reply to customer
        subject: `New Event Request: ${formData.eventType} - ${formData.name}`,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Error sending event request email:', error)
      return NextResponse.json(
        { error: 'Failed to send event request', message: error.message || 'Unknown error' },
        { status: 500 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Event request sent successfully to:', adminEmail)
    }

    return NextResponse.json({
      success: true,
      message: 'Event request sent successfully',
    })
  } catch (error) {
    console.error('Event request processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process event request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

