"use client"

import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils/formatting"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CHECKOUT_PATH } from "@/lib/data/siteContact"

export function CartSidebar() {
  const router = useRouter()
  const {
    items,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getTax,
    getGrandTotal,
  } = useCart()

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getGrandTotal()

  const increaseQuantity = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      updateQuantity(itemId, item.quantity + 1)
    }
  }

  const decreaseQuantity = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(itemId, item.quantity - 1)
      } else {
        removeFromCart(itemId)
      }
    }
  }

  return (
    <aside className="sticky top-24 h-fit w-full max-w-[20rem] xl:max-w-[24rem]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4 sm:p-6 shadow-[var(--shadow-sm)]">
        <h3 className="mb-5 text-base font-display font-light text-[var(--text-primary)] md:text-lg">
          Your Selection
        </h3>

        {items.length === 0 ? (
          <div className="py-6 text-center">
            <ShoppingBag className="mx-auto mb-2 h-8 w-8 text-neutral-300" />
            <p className="text-xs text-neutral-500 font-body">Empty</p>
          </div>
        ) : (
          <>
            {/* Order Items - Cleaner */}
            <div className="mb-5 max-h-[350px] space-y-2.5 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2.5">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-neutral-100">
                    <ImageWithFallback
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-1 truncate text-xs font-medium text-[var(--text-primary)]">
                      {item.menuItem.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 md:hover:bg-green-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 md:hover:bg-green-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                      <p className="font-display text-xs font-medium text-terra-500">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Minimal */}
            <div className="space-y-1.5 border-t border-[var(--border)] pt-3">
              <div className="flex justify-between text-xs font-body">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-body">
                <span className="text-neutral-500">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-[var(--border)] pt-2 text-sm font-medium">
                <span>Total</span>
                <span className="font-display text-terra-500">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => router.push(CHECKOUT_PATH)}
                className="w-full min-h-[48px] rounded-full bg-terra-500 px-4 py-3 text-sm font-body font-medium uppercase tracking-widest text-white shadow-[var(--shadow-terra)] md:hover:bg-terra-600 transition-colors"
                aria-label="Place your order"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={() => router.push("/reservations")}
                className="w-full min-h-[48px] rounded-full border border-green-500 bg-transparent px-4 py-3 text-sm font-body font-medium uppercase tracking-widest text-green-600 md:hover:bg-green-50 transition-colors"
                aria-label="Reserve a table"
              >
                Reserve Table
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

