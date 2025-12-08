/**
 * Contact Form Message Email Template
 * Forwards contact form submissions to business email
 */

export interface ContactMessageData {
  name: string
  email: string
  phone?: string
  reason: string
  message: string
}

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamisrestaurant.com'

const reasonLabels: Record<string, string> = {
  general: 'General Inquiry',
  reservation: 'Reservation Question',
  'private-event': 'Private Event',
  feedback: 'Feedback',
  catering: 'Catering Request',
  other: 'Other',
}

export function renderContactMessageEmail(data: ContactMessageData): string {
  const { name, email, phone, reason, message } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Message - ${RESTAURANT_NAME}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #1C1917; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #D4AF37; margin: 0;">New Contact Form Message</h1>
  </div>
  
  <div style="background: #FAF7F2; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
      ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone.replace(/\s/g, '')}" style="color: #D4AF37;">${phone}</a></p>` : ''}
      <p><strong>Reason:</strong> ${reasonLabels[reason] || reason}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px;">
      <h3 style="color: #1C1917; margin-top: 0;">Message</h3>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #D4AF37;">
        <p style="margin: 0; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">
        This message was submitted through the contact form on ${WEBSITE_URL}
      </p>
      <p style="margin-top: 10px;">
        <a href="mailto:${email}" style="background: #D4AF37; color: #1C1917; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
          Reply to ${name}
        </a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

