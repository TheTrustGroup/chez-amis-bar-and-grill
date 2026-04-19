"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartContext } from "@/lib/context/CartContext"
import { scrollToElement } from "@/lib/utils/smoothScroll"
import {
  trackCartOpen,
  trackReservationClick,
} from "@/lib/analytics"
import { CHECKOUT_PATH, PRIMARY_PHONE, buildWhatsAppLink } from "@/lib/data/siteContact"
import { primaryNavigation } from "@/lib/data/navigation"

const navLinkClass =
  "font-body text-sm font-medium whitespace-nowrap text-foreground/70 md:hover:text-foreground transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-terra-500 after:transition-all after:duration-300 md:hover:after:w-full aria-[current=page]:after:w-full aria-[current=page]:text-foreground"

const HEADER_TONE = "balanced" as const

const solidHeaderToneStyles = {
  soft: "bg-[#fdfaf7]/94 border-b border-terra-500/14 shadow-[0_1px_0_rgba(194,122,73,0.12)]",
  balanced:
    "bg-[#fbf8f4]/95 border-b border-terra-500/20 shadow-[0_1px_0_rgba(194,122,73,0.18)]",
  rich: "bg-[#f8f2ea]/96 border-b border-terra-500/30 shadow-[0_1px_0_rgba(194,122,73,0.24)]",
}

const accentLineToneStyles = {
  soft: "via-terra-400/42",
  balanced: "via-terra-400/55",
  rich: "via-terra-500/62",
}

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemCount } = useCartContext()
  const cartCount = getCartItemCount()
  const isHomeTop = pathname === "/" && !isScrolled && !isMobileMenuOpen

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
      window.dispatchEvent(
        new CustomEvent("mobile-menu-visibility", {
          detail: { open: true },
        })
      )
    } else {
      document.body.classList.remove("menu-open")
      const scrollY = document.body.style.top
      document.body.style.top = ""
      document.body.style.touchAction = ""
      window.dispatchEvent(
        new CustomEvent("mobile-menu-visibility", {
          detail: { open: false },
        })
      )
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
      }
    }
    return () => {
      document.body.classList.remove("menu-open")
      document.body.style.top = ""
      document.body.style.touchAction = ""
      window.dispatchEvent(
        new CustomEvent("mobile-menu-visibility", {
          detail: { open: false },
        })
      )
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

  const mobileMenuItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: cartCount > 0 ? CHECKOUT_PATH : "/menu", label: cartCount > 0 ? "Checkout" : "Order" },
    { href: "/private-events", label: "Private Events" },
    { href: "/contact", label: "Contact" },
    { href: "/more", label: "More" },
  ]

  const headerBg = cn(
    "transition-all duration-300",
    isHomeTop
      ? "bg-transparent border-b border-white/20"
      : cn("backdrop-blur-md", solidHeaderToneStyles[HEADER_TONE])
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
          "h-16 md:h-[72px]",
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
              <span
                className={cn(
                  "font-display text-2xl font-light tracking-wide leading-none whitespace-nowrap transition-colors duration-300",
                  isHomeTop ? "text-white" : "text-foreground"
                )}
              >
                Chez Amis
              </span>
              <span
                className={cn(
                  "hidden sm:block text-[10px] font-body tracking-[0.2em] uppercase leading-none mt-0.5 whitespace-nowrap transition-colors duration-300",
                  isHomeTop ? "text-white/80" : "text-muted-foreground"
                )}
              >
                Bar &amp; Grill
              </span>
            </Link>

            <nav
              className="hidden md:flex items-center gap-6 lg:gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {primaryNavigation.map((item) => {
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
                    className={cn(
                      navLinkClass,
                      isHomeTop &&
                        "text-white/85 md:hover:text-white after:bg-white aria-[current=page]:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
              <Link
                href="/cart"
                className={cn(
                  "relative hidden md:inline-flex h-12 w-12 items-center justify-center rounded-md",
                  isHomeTop
                    ? "text-white/90 md:hover:text-white md:hover:bg-white/10 active:bg-white/10"
                    : "text-foreground/70 md:hover:text-foreground md:hover:bg-muted active:bg-muted",
                  "transition-colors"
                )}
                aria-label="View cart"
                onClick={() => trackCartOpen("header")}
              >
                <ShoppingBag className="h-5 w-5" aria-hidden />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[1rem] h-4 px-0.5 rounded-full bg-terra-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/reservations"
                className={cn(
                  "hidden md:inline-flex items-center gap-2 font-body font-medium tracking-wide uppercase text-xs px-5 py-2.5 rounded-full flex-shrink-0 transition-all duration-200 whitespace-nowrap",
                  isHomeTop
                    ? "bg-white/12 text-white border border-white/35 md:hover:bg-white/20 active:bg-white/20"
                    : "bg-terra-500 text-white md:hover:bg-terra-600 active:bg-terra-700"
                )}
                onClick={() => trackReservationClick("header_desktop")}
              >
                Reserve a Table
              </Link>

              <button
                type="button"
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-md transition-colors md:hidden",
                  isHomeTop
                    ? "text-white md:hover:bg-white/10 active:bg-white/10"
                    : "text-foreground md:hover:bg-muted active:bg-muted"
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
        {!isHomeTop ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent",
              accentLineToneStyles[HEADER_TONE]
            )}
            aria-hidden="true"
          />
        ) : null}

      </header>

      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[120] bg-background flex flex-col px-6 pt-[4.75rem] pb-6 gap-6"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute top-2 right-3 flex h-11 w-11 items-center justify-center text-foreground md:hover:bg-muted active:bg-muted rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-col gap-0 overflow-y-auto flex-1">
            {mobileMenuItems.map((item) => {
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
                  className="font-display text-3xl font-light text-foreground md:hover:text-terra-500 transition-colors py-2 border-b border-border/60"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-border/60">
            <div className="flex items-center gap-3">
              <a
                href={`tel:${PRIMARY_PHONE.tel}`}
                className="ui-link-row flex-1 justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Call
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-link-row flex-1 justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
