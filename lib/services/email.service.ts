/**
 * Email Service - Professional Email Delivery
 * Uses Resend API for reliable email delivery
 */

import type { EmailTemplate, OrderData, ReservationData } from '@/lib/types/notifications'
import { renderOrderConfirmationEmail } from '@/lib/templates/emails/order-confirmation'
import { renderReservationConfirmationEmail } from '@/lib/templates/emails/reservation-confirmation'
import { renderAdminOrderEmail } from '@/lib/templates/emails/admin-order'
import { renderAdminReservationEmail } from '@/lib/templates/emails/admin-reservation'

interface SendEmailParams {
  to: string
  subject: string
  template: EmailTemplate
  data: OrderData | ReservationData
}

export async function sendEmail({ to, subject, template, data }: SendEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 [DEV] Would send email to:', to, 'Template:', template)
      return
    }
    throw new Error('Email service not configured')
  }

  try {
    // Render email HTML based on template
    let html: string
    switch (template) {
      case 'order-confirmation':
        html = renderOrderConfirmationEmail(data as OrderData)
        break
      case 'reservation-confirmation':
        html = renderReservationConfirmationEmail(data as ReservationData)
        break
      case 'admin-order':
        html = renderAdminOrderEmail(data as OrderData)
        break
      case 'admin-reservation':
        html = renderAdminReservationEmail(data as ReservationData)
        break
      default:
        throw new Error(`Unknown email template: ${template}`)
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Chez Amis <noreply@chezamisrestaurant.com>',
        to: [to],
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`)
    }

    console.log('✅ Email sent successfully:', template, 'to', to)
  } catch (error) {
    console.error('❌ Error sending email:', error)
    throw error
  }
}

