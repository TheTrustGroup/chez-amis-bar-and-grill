/**
 * Admin Reservation Notification Email Template
 * Notifies restaurant staff of new reservations
 */

import type { ReservationData } from '@/lib/types/notifications'
import { format, parseISO } from 'date-fns'

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'

export function renderAdminReservationEmail(reservationData: ReservationData): string {
  const { customer, reservationNumber, date, time, guests, seatingPreference, occasion, specialRequests } = reservationData

  let formattedDate = date
  try {
    formattedDate = format(parseISO(date), 'EEEE, MMMM d, yyyy')
  } catch {
    formattedDate = date
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Reservation - ${RESTAURANT_NAME}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #1C1917; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #D4AF37; margin: 0;">New Reservation Received</h1>
  </div>
  
  <div style="background: #FAF7F2; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #D4AF37;">
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase;">Reservation Number</p>
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1C1917;">#${reservationNumber}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Customer Information</h3>
      <p><strong>Name:</strong> ${customer.fullName}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Reservation Details</h3>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Guests:</strong> ${guests} ${guests === 1 ? 'guest' : 'guests'}</p>
      ${seatingPreference ? `<p><strong>Seating Preference:</strong> ${seatingPreference}</p>` : ''}
      ${occasion ? `<p><strong>Occasion:</strong> ${occasion}</p>` : ''}
      ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
    </div>
  </div>
</body>
</html>
  `.trim()
}


