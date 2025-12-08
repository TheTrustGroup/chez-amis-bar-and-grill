import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmationEmail } from '@/lib/services/email'
import { sendOrderConfirmationSMS } from '@/lib/services/sms'

export interface OrderRequest {
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

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderRequest = await request.json()

    // Validate required fields
    if (!orderData.customer?.email || !orderData.customer?.phone || !orderData.customer?.fullName) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Send confirmation emails and SMS in parallel
    const [emailResult, smsResult] = await Promise.allSettled([
      sendOrderConfirmationEmail(orderData),
      sendOrderConfirmationSMS(orderData),
    ])

    // Log results (in production, save to database)
    const results = {
      orderId: orderData.orderId,
      emailSent: emailResult.status === 'fulfilled',
      smsSent: smsResult.status === 'fulfilled',
      emailError: emailResult.status === 'rejected' ? (emailResult.reason as Error).message : null,
      smsError: smsResult.status === 'rejected' ? (smsResult.reason as Error).message : null,
    }

    // Return success even if one notification fails (order is still placed)
    return NextResponse.json({
      success: true,
      orderId: orderData.orderId,
      message: 'Order placed successfully',
      notifications: {
        email: {
          sent: results.emailSent,
          error: results.emailError,
        },
        sms: {
          sent: results.smsSent,
          error: results.smsError,
        },
      },
    })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

