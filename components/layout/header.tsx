"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCartContext } from "@/lib/context/CartContext"
import { scrollToElement } from "@/lib/utils/smoothScroll"
import {
  trackCartOpen,
  trackOrderClick,
  trackReservationClick,
} from "@/lib/analytics"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/private-events", label: "Private Dining" },
  { href: "/contact", label: "Contact" },
]

const navLinkClass =
  "font-body text-sm tracking-widest uppercase whitespace-nowrap text-white/80 hover:text-white transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-terra-400 after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:after:w-full aria-[current=page]:text-white"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemCount } = useCartContext()
  const cartCount = getCartItemCount()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY
      document.body.classList.add("menu-open")
      document.body.style.top = `-${scrollY}px`
      document.body.style.touchAction = "none"
    } else {
      document.body.classList.remove("menu-open")
      const scrollY = document.body.style.top
      document.body.style.top = ""
      document.body.style.touchAction = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
      }
    }
    return () => {
      document.body.classList.remove("menu-open")
      document.body.style.top = ""
      document.body.style.touchAction = ""
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToElement(href.substring(1), { offset: 100 })
      setIsMobileMenuOpen(false)
    }
  }

  const headerBg = cn(
    "transition-all duration-300",
    isScrolled
      ? "bg-green-900/95 backdrop-blur-md shadow-lg"
      : isHome
        ? "bg-transparent"
        : "bg-green-800"
  )

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terra-500 focus:text-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300",
          "h-16 md:h-20",
          headerBg
        )}
        role="banner"
      >
        <div className="section-shell-inner h-full">
          <div className="flex h-full items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0"
              aria-label="Chez Amis Bar and Grill - Home"
            >
              <span className="font-display text-2xl font-light tracking-wide text-white leading-none whitespace-nowrap">
                Chez Amis
              </span>
              <span className="hidden sm:block text-[10px] font-body tracking-[0.2em] uppercase text-white/50 leading-none mt-0.5 whitespace-nowrap">
                Bar &amp; Grill
              </span>
            </Link>

            <nav
              className="hidden md:flex items-center gap-6 lg:gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href === "/" && pathname === "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }
                    }}
                    className={navLinkClass}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <Link
                href="/cart"
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                aria-label="View cart"
                onClick={() => trackCartOpen("header")}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-terra-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/reservations"
                className="hidden md:inline-flex items-center gap-2 bg-terra-500 text-white font-body font-medium tracking-widest uppercase text-xs px-5 py-2.5 rounded-full flex-shrink-0 hover:bg-terra-600 transition-all duration-200 shadow-sm whitespace-nowrap"
                onClick={() => trackReservationClick("header_desktop")}
              >
                Reserve a Table
              </Link>

              <button
                type="button"
                className={cn(
                  "md:hidden flex items-center justify-center w-12 h-12 rounded-md text-white hover:bg-white/10 transition-colors",
                  "-mr-2"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-50 bg-green-900 flex flex-col px-6 pt-20 pb-8 gap-8"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-col gap-0 overflow-y-auto flex-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href === "/" && pathname === "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        handleNavClick(item.href)
                      } else {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className="font-display text-3xl font-light text-white hover:text-terra-300 transition-colors py-2 border-b border-white/10"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="mt-auto flex flex-col gap-0 pt-4">
              <Link
                href="/reservations"
                className="btn-primary w-full text-center"
                onClick={() => {
                  trackReservationClick("header_mobile_overlay")
                  setIsMobileMenuOpen(false)
                }}
              >
                Reserve a Table
              </Link>
              <Link
                href="/order"
                className="btn-accent w-full text-center mt-3"
                onClick={() => {
                  trackOrderClick("header_mobile_overlay")
                  setIsMobileMenuOpen(false)
                }}
              >
                Order Delivery
              </Link>
              <div className="flex justify-center pt-6 border-t border-white/10 mt-6">
                <ThemeToggle className="text-white/80 hover:text-white" />
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
