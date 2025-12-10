/**
 * Event Request Form Email Template
 * Forwards event request submissions to business email
 */

export interface EventRequestData {
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

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamisrestaurant.com'

export function renderEventRequestEmail(data: EventRequestData): string {
  const { eventType, date, alternateDate, guests, spacePreference, budgetRange, name, email, phone, company, additionalDetails } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Event Request - ${RESTAURANT_NAME}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #1C1917; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #D4AF37; margin: 0;">New Event Request</h1>
  </div>
  
  <div style="background: #FAF7F2; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Event Details</h3>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
      ${alternateDate ? `<p><strong>Alternate Date:</strong> ${alternateDate}</p>` : ''}
      <p><strong>Number of Guests:</strong> ${guests}</p>
      ${spacePreference ? `<p><strong>Space Preference:</strong> ${spacePreference}</p>` : ''}
      ${budgetRange ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>` : ''}
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${phone.replace(/\s/g, '')}" style="color: #D4AF37;">${phone}</a></p>
    </div>
    
    ${additionalDetails ? `
    <div style="background: white; padding: 20px; border-radius: 6px;">
      <h3 style="color: #1C1917; margin-top: 0;">Additional Details</h3>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #D4AF37;">
        <p style="margin: 0; white-space: pre-wrap;">${additionalDetails.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    ` : ''}
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">
        This event request was submitted through ${WEBSITE_URL}
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


