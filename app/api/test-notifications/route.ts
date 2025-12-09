import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/services/email.service'
import { sendSMS } from '@/lib/services/sms.service'
import type { OrderData, ReservationData } from '@/lib/types/notifications'

/**
 * Test endpoint for notifications
 * POST /api/test-notifications
 * Body: { type: 'email' | 'sms' | 'both', testType: 'order' | 'reservation' }
 */
export async function POST(request: NextRequest) {
  try {
    const { type = 'both', testType = 'order' } = await request.json()

    // Create test data
    const testOrderData: OrderData = {
      orderId: 'CAG-TEST-1234',
      orderType: 'delivery',
      customer: {
        fullName: 'Test Customer',
        email: process.env.TEST_EMAIL || 'test@example.com',
        phone: process.env.TEST_PHONE || '+233024395239',
      },
      items: [
        {
          id: '1',
          name: 'Attieke with Grilled Tilapia',
          quantity: 2,
          price: 85,
        },
        {
          id: '2',
          name: 'Jollof Rice with Chicken',
          quantity: 1,
          price: 45,
        },
      ],
      orderDetails: {
        deliveryAddress: '123 Test Street, Accra',
        estimatedTime: '35-45 minutes',
        specialRequests: 'Extra spicy pepper sauce',
      },
      payment: {
        subtotal: 215,
        tax: 32.25,
        deliveryFee: 10,
        serviceCharge: 0,
        total: 257.25,
        method: 'Mobile Money',
      },
    }

    const testReservationData: ReservationData = {
      reservationNumber: 'RES-TEST-5678',
      customer: {
        fullName: 'Test Customer',
        email: process.env.TEST_EMAIL || 'test@example.com',
        phone: process.env.TEST_PHONE || '+233024395239',
      },
      date: new Date().toISOString(),
      time: '7:00 PM',
      guests: 4,
      seatingPreference: 'Window seat',
      occasion: 'Birthday',
      specialRequests: 'Need cake service',
    }

    const results: {
      email: { sent: boolean; error: string | null }
      sms: { sent: boolean; error: string | null }
    } = {
      email: { sent: false, error: null },
      sms: { sent: false, error: null },
    }

    // Test email
    if (type === 'email' || type === 'both') {
      try {
        const testData = testType === 'order' ? testOrderData : testReservationData
        await sendEmail({
          to: testData.customer.email,
          subject: `Test ${testType === 'order' ? 'Order' : 'Reservation'} Notification - Chez Amis`,
          template: testType === 'order' ? 'order-confirmation' : 'reservation-confirmation',
          data: testData,
        })
        results.email.sent = true
      } catch (error) {
        results.email.error = error instanceof Error ? error.message : 'Unknown error'
      }
    }

    // Test SMS
    if (type === 'sms' || type === 'both') {
      try {
        const testData = testType === 'order' ? testOrderData : testReservationData
        await sendSMS({
          to: testData.customer.phone,
          template: testType === 'order' ? 'order-confirmation' : 'reservation-confirmation',
          data: testData,
        })
        results.sms.sent = true
      } catch (error) {
        results.sms.error = error instanceof Error ? error.message : 'Unknown error'
      }
    }

    return NextResponse.json({
      success: true,
      message: `Test ${type} notification sent`,
      testType,
      results,
      note: 'Check your email inbox and phone for test notifications',
    })
  } catch (error) {
    console.error('Test notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send test notification', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for quick test
 */
export async function GET() {
  return NextResponse.json({
    message: 'Test notifications endpoint',
    usage: 'POST /api/test-notifications',
    body: {
      type: 'email | sms | both (default: both)',
      testType: 'order | reservation (default: order)',
    },
    example: {
      type: 'both',
      testType: 'order',
    },
  })
}

