/**
 * Admin Order Notification Email Template
 * Notifies restaurant staff of new orders
 */

import type { OrderData } from '@/lib/types/notifications'

const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Chez Amis Bar and Grill'
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamisrestaurant.com'

export function renderAdminOrderEmail(orderData: OrderData): string {
  const { customer, items, orderDetails, payment, orderId, orderType } = orderData

  const orderTypeDisplay = {
    'dine-in': 'Dine In',
    'takeaway': 'Takeaway',
    'delivery': 'Delivery',
  }[orderType] || orderType

  const itemsList = items
    .map((item) => `${item.quantity}x ${item.name} - GH₵ ${(item.price * item.quantity).toFixed(2)}`)
    .join('<br>')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - ${RESTAURANT_NAME}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #1C1917; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #D4AF37; margin: 0;">New Order Received</h1>
  </div>
  
  <div style="background: #FAF7F2; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #D4AF37;">
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase;">Order Number</p>
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1C1917;">#${orderId}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Customer Information</h3>
      <p><strong>Name:</strong> ${customer.fullName}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Order Details</h3>
      <p><strong>Type:</strong> ${orderTypeDisplay}</p>
      ${orderType === 'dine-in' && orderDetails.tableNumber ? `<p><strong>Table:</strong> ${orderDetails.tableNumber}</p>` : ''}
      ${orderType === 'dine-in' && orderDetails.time ? `<p><strong>Time:</strong> ${orderDetails.time}</p>` : ''}
      ${orderType === 'takeaway' && orderDetails.pickupTime ? `<p><strong>Pickup Time:</strong> ${orderDetails.pickupTime}</p>` : ''}
      ${orderType === 'delivery' && orderDetails.deliveryAddress ? `<p><strong>Delivery Address:</strong> ${orderDetails.deliveryAddress}</p>` : ''}
      ${orderDetails.specialRequests ? `<p><strong>Special Requests:</strong> ${orderDetails.specialRequests}</p>` : ''}
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #1C1917; margin-top: 0;">Items</h3>
      <div style="color: #666;">${itemsList}</div>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 6px;">
      <h3 style="color: #1C1917; margin-top: 0;">Total</h3>
      <p style="font-size: 20px; font-weight: bold; color: #1C1917;">GH₵ ${payment.total.toFixed(2)}</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}


