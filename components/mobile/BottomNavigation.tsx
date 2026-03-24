"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, Calendar, ShoppingBag, Menu as MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartContext } from "@/lib/context/CartContext"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/reservations", label: "Reserve", icon: Calendar },
  { href: "/order-summary", label: "Order", icon: ShoppingBag },
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
      className="fixed bottom-0 left-0 right-0 z-[90] bg-neutral-50 border-t border-neutral-100 shadow-lg lg:hidden safe-area-bottom"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
          const isOrderPage = item.href === "/order-summary" && cartItemCount > 0

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-h-[48px] min-w-[60px] px-2 py-2 rounded-lg transition-all duration-200",
                "active:bg-neutral-100 active:scale-95",
                isActive
                  ? "text-terra-600"
                  : "text-green-700 hover:text-terra-500"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon className={cn("h-6 w-6", isActive && "text-terra-600")} />
                {isOrderPage && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-terra-600 text-white text-[10px] flex items-center justify-center font-body font-semibold">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-body font-light tracking-wide",
                  isActive ? "text-terra-600" : "text-green-700"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
