/**
 * SMS Service - Professional SMS Delivery
 * Uses Twilio API for reliable SMS delivery (supports Ghana +233)
 */

import type { SMSTemplate, OrderData, ReservationData } from '@/lib/types/notifications'
import {
  getOrderConfirmationSMS,
  getReservationConfirmationSMS,
  getOrderReadySMS,
  getOrderOutForDeliverySMS,
  getReservationReminderSMS,
  getAdminOrderSMS,
  getAdminReservationSMS,
} from '@/lib/templates/sms/notifications'

interface SendSMSParams {
  to: string
  template: SMSTemplate
  data: OrderData | ReservationData | any
}

/**
 * Format phone number for Twilio (Ghana format: +233XXXXXXXXX)
 */
function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('0')) {
    cleaned = '233' + cleaned.substring(1)
  }
  
  if (!cleaned.startsWith('233')) {
    cleaned = '233' + cleaned
  }
  
  return '+' + cleaned
}

export async function sendSMS({ to, template, data }: SendSMSParams): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 [DEV] Would send SMS to:', to, 'Template:', template)
      return
    }
    throw new Error('SMS service not configured')
  }

  try {
    const toNumber = formatPhoneNumber(to)

    // Get SMS message based on template
    let message: string
    switch (template) {
      case 'order-confirmation':
        message = getOrderConfirmationSMS(data as OrderData)
        break
      case 'reservation-confirmation':
        message = getReservationConfirmationSMS(data as ReservationData)
        break
      case 'order-ready':
        message = getOrderReadySMS(data)
        break
      case 'order-out-for-delivery':
        message = getOrderOutForDeliverySMS(data)
        break
      case 'reservation-reminder':
        message = getReservationReminderSMS(data as ReservationData)
        break
      case 'admin-order':
        message = getAdminOrderSMS(data as OrderData)
        break
      case 'admin-reservation':
        message = getAdminReservationSMS(data as ReservationData)
        break
      default:
        throw new Error(`Unknown SMS template: ${template}`)
    }

    // Send SMS using Twilio API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: toNumber,
          Body: message,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to send SMS: ${error.message || 'Unknown error'}`)
    }

    const result = await response.json()
    console.log('✅ SMS sent successfully:', template, 'to', toNumber, 'SID:', result.sid)
  } catch (error) {
    console.error('❌ Error sending SMS:', error)
    throw error
  }
}

