"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, Calendar, ShoppingBag, Menu as MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartContext } from "@/lib/context/CartContext"
import { CART_PATH } from "@/lib/data/siteContact"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/reservations", label: "Reserve", icon: Calendar },
  { href: CART_PATH, label: "Order", icon: ShoppingBag },
  { href: "/contact", label: "More", icon: MenuIcon },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const { getCartItemCount } = useCartContext()
  const cartItemCount = getCartItemCount()
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    // Initial check
    checkMobile()
    
    // Listen for resize
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Don't show on desktop - use CSS to hide as well for SSR safety
  if (!isMobile) {
    return null
  }

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] lg:hidden"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="safe-area-bottom pointer-events-auto mx-auto max-w-lg px-3 pb-3">
        <div
          className={cn(
            "flex h-14 items-center justify-around rounded-2xl border border-neutral-200/90 bg-neutral-50/95 px-1 shadow-xl backdrop-blur-md",
            "dark:border-white/10 dark:bg-green-900/95"
          )}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href || (item.href === "/" && pathname === "/")
            const isCart = item.href === CART_PATH
            const showCartBadge = isCart && cartItemCount > 0

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[48px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition-all duration-200",
                  "active:scale-95 active:bg-neutral-100/80 dark:active:bg-white/10",
                  isActive
                    ? "text-terra-600"
                    : "text-green-700 hover:text-terra-500 dark:text-white/85"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon className={cn("h-6 w-6", isActive && "text-terra-600")} />
                  {showCartBadge && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-terra-600 px-0.5 font-body text-[10px] font-semibold text-white">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-body font-light tracking-wide",
                    isActive ? "text-terra-600" : "text-green-700 dark:text-white/80"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
