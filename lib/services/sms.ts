/**
 * SMS Service for Order Confirmations
 * Uses Twilio API (https://www.twilio.com) - Supports Ghana (+233)
 * Alternative: AWS SNS, MessageBird, Vonage
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
  }>
  orderDetails: {
    tableNumber?: string
    date?: string
    time?: string
    guests?: string
    pickupTime?: string
    deliveryAddress?: string
  }
  payment: {
    total: number
  }
}

/**
 * Format phone number for Twilio (Ghana format: +233XXXXXXXXX)
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')
  
  // If starts with 0, replace with 233
  if (cleaned.startsWith('0')) {
    cleaned = '233' + cleaned.substring(1)
  }
  
  // If doesn't start with country code, add it
  if (!cleaned.startsWith('233')) {
    cleaned = '233' + cleaned
  }
  
  // Add + prefix
  return '+' + cleaned
}

export async function sendOrderConfirmationSMS(orderData: OrderData): Promise<void> {
  // Check if SMS service is configured
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio credentials not configured. SMS will not be sent.')
    // In development, you might want to throw an error
    // In production, you might want to log and continue
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 [DEV] Would send SMS to:', orderData.customer.phone)
      return
    }
    throw new Error('SMS service not configured')
  }

  try {
    // Format phone number
    const toNumber = formatPhoneNumber(orderData.customer.phone)

    // Create SMS message based on order type
    let orderDetails = ''
    if (orderData.orderType === 'dine-in') {
      orderDetails = `Table ${orderData.orderDetails.tableNumber || 'TBD'}, ${orderData.orderDetails.time || 'TBD'}`
    } else if (orderData.orderType === 'takeaway') {
      orderDetails = `Pickup: ${orderData.orderDetails.pickupTime || 'TBD'}`
    } else {
      orderDetails = 'Delivery order'
    }

    // Create concise SMS message (SMS limit: 160 characters, but we'll use 320 for longer messages)
    const message = `Chez Amis: Order #${orderData.orderId} confirmed! ${orderDetails}. Total: GH₵${orderData.payment.total.toFixed(2)}. We'll notify you when ready. Thank you!`

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
    console.log('✅ Order confirmation SMS sent to:', toNumber, 'Message SID:', result.sid)
  } catch (error) {
    console.error('❌ Error sending order confirmation SMS:', error)
    throw error
  }
}

