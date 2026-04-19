"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { formatPrice } from "@/lib/utils/formatting"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CHECKOUT_PATH } from "@/lib/data/siteContact"

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

  useEffect(() => {
    document.body.classList.toggle("mobile-cart-open", isOpen)
    window.dispatchEvent(
      new CustomEvent("mobile-cart-visibility", {
        detail: { open: isOpen },
      })
    )

    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
        document.body.classList.remove("mobile-cart-open")
        window.dispatchEvent(
          new CustomEvent("mobile-cart-visibility", {
            detail: { open: false },
          })
        )
      }
    }

    return () => {
      document.body.classList.remove("mobile-cart-open")
      window.dispatchEvent(
        new CustomEvent("mobile-cart-visibility", {
          detail: { open: false },
        })
      )
    }
  }, [isOpen])

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
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[110] bg-black/50 lg:hidden"
          aria-label="Close cart overlay"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[120] flex max-h-[80vh] flex-col rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          "pb-[max(1rem,env(safe-area-inset-bottom))]",
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-cart-title"
      >
        <div className="w-10 h-1 shrink-0 rounded-full bg-neutral-200 mx-auto mt-3" aria-hidden />

        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h2 id="mobile-cart-title" className="text-lg font-display font-light text-[var(--text-primary)]">
            Your Selection
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full md:hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6 text-neutral-700" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="mx-auto mb-3 h-12 w-12 text-neutral-300" />
              <p className="text-sm text-neutral-500 font-body">Your selection is empty</p>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-[var(--border)]">
                      <ImageWithFallback
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-medium text-[var(--text-primary)]">
                        {item.menuItem.name}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-200 md:hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="w-10 text-center font-body text-base font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-200 md:hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="font-display text-sm font-medium text-terra-500">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 space-y-2 border-t border-[var(--border)] pt-4">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-neutral-500">Tax (15%)</span>
                  <span className="font-medium text-[var(--text-primary)]">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-[var(--border)] pt-2 font-body text-base font-semibold">
                  <span>Total</span>
                  <span className="font-display text-terra-500">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={() => {
                    router.push(CHECKOUT_PATH)
                    onClose()
                  }}
                  className="w-full bg-terra-500 text-white md:hover:bg-terra-600 active:bg-terra-700 min-h-[48px] shadow-[var(--shadow-terra)]"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
