"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { formatPrice } from "@/lib/utils/formatting"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileCartProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileCart({ isOpen, onClose }: MobileCartProps) {
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
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-serif text-gray-900">Your Selection</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">Your selection is empty</p>
              </div>
            ) : (
              <>
                {/* Order Items */}
                <div className="space-y-3 mb-6">
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
                <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
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
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      router.push("/place-order")
                      onClose()
                    }}
                    className="w-full bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors font-medium"
                  >
                    Place Order
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/reservations")
                      onClose()
                    }}
                    variant="outline"
                    className="w-full border-2 border-amber-500 text-amber-700 py-3 rounded-md hover:bg-amber-50 transition-colors font-medium"
                  >
                    Reserve a Table
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

