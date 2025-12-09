"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/lib/context/CartContext"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#experience", label: "Experience" },
  { href: "/#private-dining", label: "Private Dining" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemCount } = useCartContext()
  const cartItemCount = getCartItemCount()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle escape key to close mobile menu
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
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    }
  }

  return (
    <>
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
      >
        Skip to content
      </a>

      {/* Main Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          "h-20 md:h-24",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="container mx-auto px-6 md:px-12 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo Section (Left) */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="Chez Amis Bar and Grill - Home"
            >
              <div className="flex flex-col">
                {/* Decorative element */}
                <div className="h-0.5 w-8 bg-gold-500 mb-1 group-hover:w-12 transition-all duration-300" aria-hidden="true"></div>
                <span
                  className={cn(
                    "text-2xl md:text-3xl font-display font-light tracking-wide transition-colors",
                    isScrolled ? "text-foreground" : "text-white"
                  )}
                >
                  Chez Amis
                </span>
                <span
                  className={cn(
                    "text-xs font-heading font-light tracking-widest uppercase transition-colors",
                    isScrolled ? "text-muted-foreground" : "text-cream-200/80"
                  )}
                >
                  BAR AND GRILL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Center/Right) */}
            <nav
              className="hidden lg:flex items-center gap-8 xl:gap-10"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
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
                      "group relative text-sm md:text-base font-heading font-medium transition-colors duration-250",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm px-2 py-1",
                      isActive
                        ? isScrolled
                          ? "text-foreground"
                          : "text-white"
                        : isScrolled
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-white/90 hover:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {/* Gold underline animation on hover */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gold-500 transition-all duration-250 ease-in-out",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Your Selection Link - Icon Only */}
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/order-summary"
                  }
                }}
                className={cn(
                  "hidden lg:flex items-center justify-center transition-colors duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm px-2 py-1 min-h-[44px] min-w-[44px]",
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/90 hover:text-white"
                )}
                aria-label={`Your selection${cartItemCount > 0 ? ` (${cartItemCount} items)` : ""}`}
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  {cartItemCount > 0 && (
                    <span
                      className={cn(
                        "absolute -top-2 -right-2 text-xs font-body font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                        isScrolled
                          ? "text-white bg-gold-500"
                          : "text-white bg-gold-500"
                      )}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Reserve a Table Button - Desktop */}
              <Link href="/reservations" className="hidden lg:block">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "font-heading font-light tracking-wide border-2 transition-all duration-300 min-h-[44px]",
                    "px-4 py-2",
                    isScrolled
                      ? "border-gold-500/80 text-foreground hover:bg-gold-500/10 hover:border-gold-500"
                      : "border-white/60 text-white hover:bg-white/10 hover:border-white"
                  )}
                  aria-label="Reserve a Table"
                >
                  Reserve a Table
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden transition-colors duration-300 min-h-[44px] min-w-[44px]",
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
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
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 lg:hidden animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <nav
              id="mobile-menu"
              className={cn(
                "fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 lg:hidden",
                "flex flex-col items-center justify-center",
                "animate-fade-in"
              )}
              role="navigation"
              aria-label="Mobile navigation"
            >
              {/* Close Button - Top Right */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>

              {/* Centered Navigation Links */}
              <div className="flex flex-col items-center gap-8 md:gap-12 px-6">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
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
                      className={cn(
                        "text-2xl font-heading font-light tracking-wide text-white",
                        "transition-all duration-300 hover:text-gold-500 active:text-gold-400",
                        "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm px-6 py-4 min-h-[56px] touch-manipulation",
                        isActive && "text-gold-500"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {item.label}
                    </Link>
                  )
                })}

                {/* Mobile Actions */}
                <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-white/10 w-full max-w-xs">
                  {/* Your Selection */}
                  <Link
                    href="/order-summary"
                    className="flex items-center gap-3 text-white/90 hover:text-white active:text-white/80 transition-colors min-h-[56px] px-4 py-3 rounded-lg hover:bg-white/5 active:bg-white/10 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Your selection${cartItemCount > 0 ? ` (${cartItemCount} items)` : ""}`}
                  >
                    <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                    <span className="font-heading font-light tracking-wide text-lg">
                      Your Selection
                    </span>
                    {cartItemCount > 0 && (
                      <span className="text-sm font-body font-light px-2 py-1 rounded text-white/70 bg-white/10 ml-1">
                        ({cartItemCount})
                      </span>
                    )}
                  </Link>

                  {/* Reserve Button */}
                  <Link href="/reservations" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-heading font-light tracking-wide border-2 border-white/60 text-white hover:bg-white/10 hover:border-white active:bg-white/20 active:border-white/80 transition-all duration-300 min-h-[56px] text-lg touch-manipulation"
                      aria-label="Reserve a Table"
                    >
                      Reserve a Table
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  )
}
