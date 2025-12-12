/**
 * Professional Reservation Confirmation Email Template
 * Branded with Chez Amis colors and styling
 * Mobile-responsive HTML email design
 */

import type { ReservationData } from '@/lib/types/notifications'
import { format, parseISO } from 'date-fns'

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'
const RESTAURANT_PHONE = process.env.NEXT_PUBLIC_PHONE || '+233 055 703 2312'
const RESTAURANT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'chez@chezamisrestaurant.com'
const RESTAURANT_ADDRESS = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || '40 Boundary Rd, Accra, Ghana'
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamisrestaurant.com'

export function renderReservationConfirmationEmail(reservationData: ReservationData): string {
  const { customer, reservationNumber, date, time, guests, seatingPreference, occasion, specialRequests } = reservationData

  // Format date
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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reservation Confirmation - ${RESTAURANT_NAME}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1C1917 0%, #292524 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 32px; font-weight: 400; font-family: 'Georgia', serif; letter-spacing: 1px;">Chez Amis</h1>
              <p style="margin: 8px 0 0 0; color: #FAF7F2; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300;">BAR AND GRILL</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #FAF7F2;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 16px 0; color: #1C1917; font-size: 24px; font-weight: 300; font-family: 'Georgia', serif;">Thank you, ${customer.fullName}!</h2>
              <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">Your reservation has been confirmed. We look forward to welcoming you!</p>

              <!-- Reservation Number Highlight -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFFFF; border-left: 4px solid #D4AF37; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Reservation Number</p>
                    <p style="margin: 0; font-size: 28px; font-weight: 600; color: #1C1917; font-family: 'Georgia', serif;">#${reservationNumber}</p>
                  </td>
                </tr>
              </table>

              <!-- Reservation Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFFFF; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 20px 0; color: #1C1917; font-size: 18px; font-weight: 500; font-family: 'Georgia', serif;">Reservation Details</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Date:</td>
                        <td style="padding: 8px 0; color: #1C1917; font-size: 14px; font-weight: 500;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Time:</td>
                        <td style="padding: 8px 0; color: #1C1917; font-size: 14px; font-weight: 500;">${time}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Guests:</td>
                        <td style="padding: 8px 0; color: #1C1917; font-size: 14px; font-weight: 500;">${guests} ${guests === 1 ? 'guest' : 'guests'}</td>
                      </tr>
                      ${seatingPreference ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Seating:</td>
                        <td style="padding: 8px 0; color: #1C1917; font-size: 14px; font-weight: 500;">${seatingPreference}</td>
                      </tr>
                      ` : ''}
                      ${occasion ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Occasion:</td>
                        <td style="padding: 8px 0; color: #1C1917; font-size: 14px; font-weight: 500;">${occasion}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${specialRequests ? `
              <!-- Special Requests -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFF9E6; border-left: 4px solid #D4AF37; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;"><strong style="color: #1C1917;">Special Requests:</strong> ${specialRequests}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Important Information -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F0F7FF; border-left: 4px solid #D4AF37; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; color: #1C1917; font-size: 14px; font-weight: 500;">Important Information:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 13px; line-height: 1.8;">
                      <li>Please arrive 5-10 minutes before your reservation time</li>
                      <li>We hold tables for 15 minutes past the reservation time</li>
                      <li>To modify or cancel, please call us at least 2 hours in advance</li>
                      <li>Dress code: Smart casual</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td align="center" style="padding: 0;">
                    <a href="${WEBSITE_URL}/reservations" style="display: inline-block; padding: 14px 32px; background-color: #D4AF37; color: #1C1917; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 15px; letter-spacing: 0.5px;">Manage Reservation</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1C1917; padding: 40px 30px; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #D4AF37; font-size: 16px; font-weight: 400; font-family: 'Georgia', serif;">${RESTAURANT_NAME}</p>
              <p style="margin: 0 0 8px 0; color: #FAF7F2; font-size: 13px; line-height: 1.6;">${RESTAURANT_ADDRESS}</p>
              <p style="margin: 0 0 8px 0; color: #FAF7F2; font-size: 13px;">
                <a href="tel:${RESTAURANT_PHONE.replace(/\s/g, '')}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_PHONE}</a>
                <span style="color: #666; margin: 0 8px;">•</span>
                <a href="mailto:${RESTAURANT_EMAIL}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_EMAIL}</a>
              </p>
              <div style="margin: 24px 0 0 0; padding-top: 24px; border-top: 1px solid #333;">
                <p style="margin: 0 0 12px 0; color: #999; font-size: 12px;">
                  <a href="${WEBSITE_URL}/menu" style="color: #999; text-decoration: none; margin: 0 8px;">Menu</a>
                  <span style="color: #666;">•</span>
                  <a href="${WEBSITE_URL}/reservations" style="color: #999; text-decoration: none; margin: 0 8px;">Reservations</a>
                  <span style="color: #666;">•</span>
                  <a href="${WEBSITE_URL}/contact" style="color: #999; text-decoration: none; margin: 0 8px;">Contact</a>
                </p>
                <p style="margin: 0; color: #666; font-size: 11px;">© ${new Date().getFullYear()} ${RESTAURANT_NAME}. All rights reserved.</p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}




