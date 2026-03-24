import { NextRequest, NextResponse } from 'next/server'
import { sendHtmlEmail } from '@/lib/services/email.service'

export interface ContactFormRequest {
  name: string
  email: string
  phone?: string
  reason: string
  message: string
}

/**
 * Contact Form API Route
 * Forwards all contact form messages to chez@chezamisrestaurant.com
 */
export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormRequest = await request.json()

    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'

    const { renderContactMessageEmail } = await import('@/lib/templates/emails/contact-message')
    const html = renderContactMessageEmail(formData)

    try {
      await sendHtmlEmail({
        to: adminEmail,
        subject: `New Contact Form Message: ${formData.reason} - ${formData.name}`,
        html,
        replyTo: formData.email,
      })
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 [DEV] Would send contact form message to:', adminEmail)
        return NextResponse.json({ success: true, message: 'Message received (dev mode)' })
      }
      throw e
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact form processing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process message',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
