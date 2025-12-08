/**
 * Email Service for Order Confirmations
 * Uses Resend API (https://resend.com) - Free tier: 3,000 emails/month
 * Alternative: SendGrid, AWS SES, Mailgun
 */

interface OrderData {
  orderId: string
  orderType: 'dine-in' | 'takeaway' | 'delivery'
  customer: {
    fullName: string
    email: string
    phone: string
  }
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  orderDetails: {
    tableNumber?: string
    date?: string
    time?: string
    guests?: string
    pickupTime?: string
    deliveryAddress?: string
    specialRequests?: string
  }
  payment: {
    subtotal: number
    tax: number
    deliveryFee: number
    serviceCharge: number
    total: number
    method: string
  }
}

export async function sendOrderConfirmationEmail(orderData: OrderData): Promise<void> {
  // Check if email service is configured
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Email will not be sent.')
    // In development, you might want to throw an error
    // In production, you might want to log and continue
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 [DEV] Would send email to:', orderData.customer.email)
      return
    }
    throw new Error('Email service not configured')
  }

  try {
    // Format order items for email
    const itemsList = orderData.items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - GH₵ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n')

    // Format order details based on type
    let orderDetailsText = ''
    if (orderData.orderType === 'dine-in') {
      orderDetailsText = `Table: ${orderData.orderDetails.tableNumber || 'TBD'}\nDate: ${orderData.orderDetails.date || 'TBD'}\nTime: ${orderData.orderDetails.time || 'TBD'}\nGuests: ${orderData.orderDetails.guests || 'TBD'}`
    } else if (orderData.orderType === 'takeaway') {
      orderDetailsText = `Pickup Time: ${orderData.orderDetails.pickupTime || 'TBD'}`
    } else {
      orderDetailsText = `Delivery Address: ${orderData.orderDetails.deliveryAddress || 'TBD'}`
    }

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Chez Amis</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1C1917 0%, #8B1538 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">Chez Amis Bar and Grill</h1>
            <p style="color: #FAF7F2; margin: 10px 0 0 0; font-size: 14px;">Order Confirmation</p>
          </div>
          
          <div style="background: #FAF7F2; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #E5E5E5;">
            <h2 style="color: #1C1917; margin-top: 0;">Thank you, ${orderData.customer.fullName}!</h2>
            <p style="color: #666;">Your order has been confirmed and we're preparing it now.</p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #D4AF37;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1C1917;">#${orderData.orderId}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1C1917; margin-top: 0; font-size: 18px;">Order Details</h3>
              <p style="margin: 5px 0;"><strong>Type:</strong> ${orderData.orderType === 'dine-in' ? 'Dine In' : orderData.orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}</p>
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; margin: 10px 0; color: #666;">${orderDetailsText}</pre>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1C1917; margin-top: 0; font-size: 18px;">Items</h3>
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; margin: 10px 0; color: #666;">${itemsList}</pre>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1C1917; margin-top: 0; font-size: 18px;">Payment Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; color: #666;">Subtotal:</td>
                  <td style="text-align: right; padding: 5px 0; color: #1C1917;">GH₵ ${orderData.payment.subtotal.toFixed(2)}</td>
                </tr>
                ${orderData.payment.serviceCharge > 0 ? `
                <tr>
                  <td style="padding: 5px 0; color: #666;">Service Charge:</td>
                  <td style="text-align: right; padding: 5px 0; color: #1C1917;">GH₵ ${orderData.payment.serviceCharge.toFixed(2)}</td>
                </tr>
                ` : ''}
                ${orderData.payment.deliveryFee > 0 ? `
                <tr>
                  <td style="padding: 5px 0; color: #666;">Delivery Fee:</td>
                  <td style="text-align: right; padding: 5px 0; color: #1C1917;">GH₵ ${orderData.payment.deliveryFee.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 5px 0; color: #666;">VAT (15%):</td>
                  <td style="text-align: right; padding: 5px 0; color: #1C1917;">GH₵ ${orderData.payment.tax.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #D4AF37; margin-top: 10px;">
                  <td style="padding: 10px 0 5px 0; font-weight: bold; color: #1C1917;">Total:</td>
                  <td style="text-align: right; padding: 10px 0 5px 0; font-weight: bold; color: #1C1917; font-size: 18px;">GH₵ ${orderData.payment.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            
            ${orderData.orderDetails.specialRequests ? `
            <div style="background: #FFF9E6; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #D4AF37;">
              <p style="margin: 0; color: #666;"><strong>Special Requests:</strong> ${orderData.orderDetails.specialRequests}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">Questions? Contact us at <a href="mailto:chez@chezamisrestaurant.com" style="color: #D4AF37;">chez@chezamisrestaurant.com</a> or call <a href="tel:+233243952339" style="color: #D4AF37;">+233 024 395 2339</a></p>
              <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">40 Boundary Rd, Accra, Ghana</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Chez Amis <noreply@chezamis.com>',
        to: [orderData.customer.email],
        subject: `Order Confirmation #${orderData.orderId} - Chez Amis Bar and Grill`,
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`)
    }

    // Log success only in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Order confirmation email sent to:', orderData.customer.email)
    }
  } catch (error) {
    // Always log errors for debugging
    console.error('❌ Error sending order confirmation email:', error)
    throw error
  }
}


