"use client"

import { useState } from "react"
import Link from "next/link"
import { OrderForm } from "@/components/order/order-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"

export default function OrderPage() {
  const [cartItems, setCartItems] = useState<any[]>([])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Place Your Order</h1>
          <p className="text-muted-foreground text-lg">
            Fill out your information and we&apos;ll prepare your order
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart is Empty
              </CardTitle>
              <CardDescription>
                Add items from our menu to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full">Browse Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <OrderForm cartItems={cartItems} />
        )}
      </div>
    </div>
  )
}

