"use client"

import Link from "next/link"
import { OrderForm } from "@/components/order/order-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCartContext } from "@/lib/context/CartContext"

export default function OrderPage() {
  const { items } = useCartContext()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      <section className="section-shell">
        <div className="section-shell-inner">
        <div className="max-w-4xl mx-auto">
          <div className="text-center section-heading-margin">
            <h1 className="hero-title tracking-tight text-neutral-900 dark:text-white mb-4">
              Place Your Order
            </h1>
            <p className="text-muted-foreground text-lg font-body font-light">
              Fill out your information and we&apos;ll prepare your order
            </p>
          </div>

          {items.length === 0 ? (
            <Card className="rounded-sm border border-border/30 bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display font-light">
                  <ShoppingCart className="h-5 w-5 shrink-0" aria-hidden />
                  Your Selection is Empty
                </CardTitle>
                <CardDescription className="font-body font-light">
                  Add items from our menu to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/menu">
                  <Button className="w-full min-h-[48px] font-body font-light tracking-wide">Browse Menu</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <OrderForm cartItems={items} />
          )}
        </div>
        </div>
      </section>
    </div>
  )
}
