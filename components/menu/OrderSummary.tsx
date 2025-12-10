"use client"

import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils/formatting"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function OrderSummary() {
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
    <aside className="sticky top-24 h-fit">
      <div className="bg-gray-50 rounded-lg p-5 md:p-6 border border-gray-200 shadow-sm">
        <h3 className="text-base md:text-lg font-display font-light text-gray-900 mb-5">Your Selection</h3>

        {items.length === 0 ? (
          <div className="text-center py-6">
            <ShoppingBag className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="text-xs text-gray-500">Empty</p>
          </div>
        ) : (
          <>
            {/* Order Items - Cleaner */}
            <div className="space-y-2.5 mb-5 max-h-[350px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2.5">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                    <ImageWithFallback
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate mb-1">
                      {item.menuItem.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <p className="text-xs font-medium text-gray-900">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Minimal */}
            <div className="border-t border-gray-200 pt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2 mt-2">
                <span>Total</span>
                <span className="text-amber-700">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons - Minimal */}
            <div className="mt-5 space-y-2.5">
              <button
                onClick={() => router.push("/place-order")}
                className="w-full bg-amber-500 text-white py-2.5 md:py-3 rounded-md text-sm md:text-base hover:bg-amber-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
                aria-label="Place your order"
              >
                Place Order
              </button>
              <button
                onClick={() => router.push("/reservations")}
                className="w-full border border-amber-500 text-amber-700 py-2.5 md:py-3 rounded-md text-sm md:text-base hover:bg-amber-50 transition-all duration-200 font-medium min-h-[44px]"
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

