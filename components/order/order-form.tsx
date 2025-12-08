"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { orderFormSchema, type OrderFormData } from "@/lib/validations"
import { CartItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderFormProps {
  cartItems: CartItem[]
}

export function OrderForm({ cartItems }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      items: cartItems.map((item) => ({
        id: item.id,
        menuItem: {
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
        },
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
      })),
    },
  })

  const total = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  )

  const onSubmit = async (data: OrderFormData) => {
    // In production, this would send the data to an API
    alert("Order placed successfully! We'll contact you shortly.")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Please provide your contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerInfo.name">Full Name</Label>
              <Input
                id="customerInfo.name"
                {...register("customerInfo.name")}
                placeholder="John Doe"
              />
              {errors.customerInfo?.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.customerInfo.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerInfo.email">Email</Label>
              <Input
                id="customerInfo.email"
                type="email"
                {...register("customerInfo.email")}
                placeholder="john@example.com"
              />
              {errors.customerInfo?.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.customerInfo.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerInfo.phone">Phone</Label>
              <Input
                id="customerInfo.phone"
                type="tel"
                {...register("customerInfo.phone")}
                placeholder="(555) 123-4567"
              />
              {errors.customerInfo?.phone && (
                <p className="text-sm text-destructive mt-1">
                  {errors.customerInfo.phone.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
            <CardDescription>
              Where should we deliver your order?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerInfo.address.street">Street Address</Label>
              <Input
                id="customerInfo.address.street"
                {...register("customerInfo.address.street")}
                placeholder="123 Main Street"
              />
              {errors.customerInfo?.address?.street && (
                <p className="text-sm text-destructive mt-1">
                  {errors.customerInfo.address.street.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerInfo.address.city">City</Label>
                <Input
                  id="customerInfo.address.city"
                  {...register("customerInfo.address.city")}
                  placeholder="City"
                />
                {errors.customerInfo?.address?.city && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.customerInfo.address.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customerInfo.address.state">State</Label>
                <Input
                  id="customerInfo.address.state"
                  {...register("customerInfo.address.state")}
                  placeholder="State"
                />
                {errors.customerInfo?.address?.state && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.customerInfo.address.state.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="customerInfo.address.zipCode">ZIP Code</Label>
              <Input
                id="customerInfo.address.zipCode"
                {...register("customerInfo.address.zipCode")}
                placeholder="12345"
              />
              {errors.customerInfo?.address?.zipCode && (
                <p className="text-sm text-destructive mt-1">
                  {errors.customerInfo.address.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerInfo.deliveryInstructions">
                Delivery Instructions (Optional)
              </Label>
              <Textarea
                id="customerInfo.deliveryInstructions"
                {...register("customerInfo.deliveryInstructions")}
                placeholder="Leave at door, ring bell, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.quantity}x {item.menuItem.name}
                </span>
                <span>
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${(total * 1.08 + 5).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </Button>
    </form>
  )
}

