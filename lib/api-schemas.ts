import { z } from 'zod'

export const orderRequestSchema = z.object({
  orderId: z.string().min(3),
  orderType: z.enum(['dine-in', 'takeaway', 'delivery']),
  customer: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
  }),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        quantity: z.number().int().positive(),
        price: z.number().nonnegative(),
        specialInstructions: z.string().max(400).optional(),
      })
    )
    .min(1),
  orderDetails: z.object({
    tableNumber: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    guests: z.string().optional(),
    pickupTime: z.string().optional(),
    deliveryAddress: z.string().optional(),
    specialRequests: z.string().optional(),
  }),
  payment: z.object({
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    deliveryFee: z.number().nonnegative(),
    serviceCharge: z.number().nonnegative(),
    total: z.number().nonnegative(),
    method: z.string().min(1),
  }),
})

export const reservationRequestSchema = z.object({
  reservationNumber: z.string().min(3),
  customer: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
  }),
  date: z.string().min(8),
  time: z.string().min(1),
  guests: z.number().int().positive(),
  seatingPreference: z.string().max(120).optional(),
  occasion: z.string().max(120).optional(),
  specialRequests: z.string().max(500).optional(),
})
