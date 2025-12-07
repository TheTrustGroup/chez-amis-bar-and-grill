import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const orderFormSchema = z.object({
  customerInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.object({
      street: z.string().min(5, "Street address must be at least 5 characters"),
      city: z.string().min(2, "City must be at least 2 characters"),
      state: z.string().min(2, "State must be at least 2 characters"),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
    }),
    deliveryInstructions: z.string().optional(),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      menuItem: z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
      }),
      quantity: z.number().min(1),
      specialInstructions: z.string().optional(),
    })
  ).min(1, "Cart cannot be empty"),
})

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type OrderFormData = z.infer<typeof orderFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>

