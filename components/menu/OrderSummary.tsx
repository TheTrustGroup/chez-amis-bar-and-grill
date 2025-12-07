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
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-serif text-gray-900 mb-4">Your Selection</h3>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">Your selection is empty</p>
          </div>
        ) : (
          <>
            {/* Order Items */}
            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.menuItem.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-amber-700">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <Button
                onClick={() => router.push("/place-order")}
                className="w-full bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors font-medium"
              >
                Place Order
              </Button>
              <Button
                onClick={() => router.push("/reservations")}
                variant="outline"
                className="w-full border-2 border-amber-500 text-amber-700 py-3 rounded-md hover:bg-amber-50 transition-colors font-medium"
              >
                Reserve a Table
              </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

