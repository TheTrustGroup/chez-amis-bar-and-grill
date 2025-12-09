/**
 * Order Status Update Email Templates
 * Professional emails for order status changes
 */

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'
const RESTAURANT_PHONE = process.env.NEXT_PUBLIC_PHONE || '+233 024 395 2339'
const RESTAURANT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'chez@chezamisrestaurant.com'
const RESTAURANT_ADDRESS = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || '40 Boundary Rd, Accra, Ghana'
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamisrestaurant.com'

export interface OrderStatusUpdateData {
  orderId: string
  customerName: string
  orderType: 'dine-in' | 'takeaway' | 'delivery'
  status: 'preparing' | 'ready' | 'out-for-delivery'
  estimatedTime?: string
}

/**
 * Order In Progress Email Template
 */
export function renderOrderInProgressEmail(data: OrderStatusUpdateData): string {
  const { orderId, customerName, orderType } = data
  const firstName = customerName.split(' ')[0]

  const orderTypeDisplay = {
    'dine-in': 'Dine In',
    'takeaway': 'Takeaway',
    'delivery': 'Delivery',
  }[orderType] || orderType

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order In Progress - ${RESTAURANT_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
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
              <h2 style="margin: 0 0 16px 0; color: #1C1917; font-size: 24px; font-weight: 300; font-family: 'Georgia', serif;">Hi ${firstName}!</h2>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">Great news! Your ${orderTypeDisplay.toLowerCase()} order <strong>#${orderId}</strong> is now being prepared in our kitchen.</p>
              
              <!-- Status Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFF9E6; border-left: 4px solid #D4AF37; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Status</p>
                    <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1C1917;">🔄 Preparing Your Order</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 30px 0; color: #666; font-size: 14px; line-height: 1.6;">Our chefs are working hard to prepare your meal with care. We'll notify you as soon as it's ready!</p>

              <!-- Order Info -->
              <div style="background-color: #FFFFFF; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; text-transform: uppercase;">Order Number</p>
                <p style="margin: 0; font-size: 24px; font-weight: 600; color: #1C1917;">#${orderId}</p>
              </div>

              <!-- Contact Info -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 0;">Questions? Contact us at <a href="mailto:${RESTAURANT_EMAIL}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_EMAIL}</a> or call <a href="tel:${RESTAURANT_PHONE}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_PHONE}</a></p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * Order Ready Email Template
 */
export function renderOrderReadyEmail(data: OrderStatusUpdateData): string {
  const { orderId, customerName, orderType } = data
  const firstName = customerName.split(' ')[0]

  const actionText = orderType === 'takeaway' 
    ? 'ready for pickup' 
    : orderType === 'delivery' 
    ? 'ready and will be delivered soon' 
    : 'ready'

  const instructionText = orderType === 'takeaway'
    ? 'Please come to the restaurant to pick up your order.'
    : orderType === 'delivery'
    ? 'Your order will be delivered to you shortly.'
    : 'Your order is ready at your table.'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Ready - ${RESTAURANT_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
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
              <h2 style="margin: 0 0 16px 0; color: #1C1917; font-size: 24px; font-weight: 300; font-family: 'Georgia', serif;">Hi ${firstName}!</h2>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">Great news! Your order <strong>#${orderId}</strong> is ${actionText}!</p>
              
              <!-- Status Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #E8F5E9; border-left: 4px solid #4CAF50; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Status</p>
                    <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1C1917;">✅ Order Ready</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 30px 0; color: #666; font-size: 14px; line-height: 1.6;">${instructionText}</p>

              <!-- Order Info -->
              <div style="background-color: #FFFFFF; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; text-transform: uppercase;">Order Number</p>
                <p style="margin: 0; font-size: 24px; font-weight: 600; color: #1C1917;">#${orderId}</p>
              </div>

              <!-- Contact Info -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 0;">Questions? Contact us at <a href="mailto:${RESTAURANT_EMAIL}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_EMAIL}</a> or call <a href="tel:${RESTAURANT_PHONE}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_PHONE}</a></p>
                <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">${RESTAURANT_ADDRESS}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * Order Out for Delivery Email Template
 */
export function renderOrderOutForDeliveryEmail(data: OrderStatusUpdateData): string {
  const { orderId, customerName, estimatedTime } = data
  const firstName = customerName.split(' ')[0]

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Out for Delivery - ${RESTAURANT_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
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
              <h2 style="margin: 0 0 16px 0; color: #1C1917; font-size: 24px; font-weight: 300; font-family: 'Georgia', serif;">Hi ${firstName}!</h2>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">Your order <strong>#${orderId}</strong> is on its way to you!</p>
              
              <!-- Status Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #E3F2FD; border-left: 4px solid #2196F3; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Status</p>
                    <p style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600; color: #1C1917;">🚚 Out for Delivery</p>
                    <p style="margin: 0; font-size: 14px; color: #666;">Expected arrival: <strong>${estimatedTime || '30-40 minutes'}</strong></p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 30px 0; color: #666; font-size: 14px; line-height: 1.6;">Our delivery team is on the way! Please ensure someone is available to receive your order.</p>

              <!-- Order Info -->
              <div style="background-color: #FFFFFF; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; text-transform: uppercase;">Order Number</p>
                <p style="margin: 0; font-size: 24px; font-weight: 600; color: #1C1917;">#${orderId}</p>
              </div>

              <!-- Contact Info -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 0;">Track your order: Call <a href="tel:${RESTAURANT_PHONE}" style="color: #D4AF37; text-decoration: none;">${RESTAURANT_PHONE}</a></p>
                <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">${RESTAURANT_ADDRESS}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

