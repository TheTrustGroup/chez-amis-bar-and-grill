import { NextRequest, NextResponse } from 'next/server'

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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
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
        console.log('📧 [DEV] Would send contact form message to:', adminEmail)
        console.log('📧 [DEV] Message from:', formData.name, formData.email)
        return NextResponse.json({ success: true, message: 'Message received (dev mode)' })
      }
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Render email HTML
    const { renderContactMessageEmail } = await import('@/lib/templates/emails/contact-message')
    const html = renderContactMessageEmail(formData)

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
        subject: `New Contact Form Message: ${formData.reason} - ${formData.name}`,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Error sending contact form email:', error)
      return NextResponse.json(
        { error: 'Failed to send message', message: error.message || 'Unknown error' },
        { status: 500 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Contact form message sent successfully to:', adminEmail)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact form processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process message', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

