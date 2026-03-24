import { NextRequest, NextResponse } from 'next/server'
import { sendHtmlEmail } from '@/lib/services/email.service'

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

    if (!formData.eventType || !formData.date || !formData.guests || !formData.name || !formData.email || !formData.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'

    const { renderEventRequestEmail } = await import('@/lib/templates/emails/event-request')
    const html = renderEventRequestEmail(formData)

    try {
      await sendHtmlEmail({
        to: adminEmail,
        subject: `New Event Request: ${formData.eventType} - ${formData.name}`,
        html,
        replyTo: formData.email,
      })
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 [DEV] Would send event request to:', adminEmail)
        return NextResponse.json({ success: true, message: 'Event request received (dev mode)' })
      }
      throw e
    }

    return NextResponse.json({
      success: true,
      message: 'Event request sent successfully',
    })
  } catch (error) {
    console.error('Event request processing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process event request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
