"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCartContext } from "@/lib/context/CartContext"
import { useTheme } from "@/lib/context/ThemeContext"
import { scrollToElement } from "@/lib/utils/smoothScroll"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Experience" },
  { href: "/private-events", label: "Private Dining" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemCount } = useCartContext()
  const { resolvedTheme } = useTheme()
  const cartItemCount = getCartItemCount()
  const isDark = resolvedTheme === "dark"

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
      // Store current scroll position
      const scrollY = window.scrollY
      // Add class to body
      document.body.classList.add("menu-open")
      // Prevent body scroll and maintain scroll position
      document.body.style.top = `-${scrollY}px`
      // Prevent iOS bounce scroll
      document.body.style.touchAction = "none"
    } else {
      // Remove class from body
      document.body.classList.remove("menu-open")
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.top = ""
      document.body.style.touchAction = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    }
    return () => {
      // Cleanup
      document.body.classList.remove("menu-open")
      document.body.style.top = ""
      document.body.style.touchAction = ""
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
      scrollToElement(href.substring(1), { offset: 100 })
      setIsMobileMenuOpen(false)
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
          "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-out",
          "h-20 md:h-24",
          // Sticky behavior with backdrop blur
          isScrolled
            ? isDark
              ? "bg-charcoal-950/95 dark:bg-charcoal-950/95 backdrop-blur-xl shadow-2xl border-b border-charcoal-800/50"
              : "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100/50 dark:border-charcoal-800/50"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="container mx-auto px-6 md:px-12 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo Section (Left) - Perfectly aligned and scaled */}
            <Link
              href="/"
              className="flex items-center group relative"
              aria-label="Chez Amis Bar and Grill - Home"
            >
              <div className="flex flex-col items-start justify-center">
                {/* Decorative gold line - animated on hover */}
                <div 
                  className={cn(
                    "h-0.5 bg-gold-500 mb-1.5 transition-all duration-500 ease-out",
                    "w-8 md:w-10 group-hover:w-12 md:group-hover:w-16",
                    "shadow-sm group-hover:shadow-gold-500/50"
                  )} 
                  aria-hidden="true"
                />
                {/* Main logo text - responsive sizing */}
                <span
                  className={cn(
                    "font-display font-light tracking-wide transition-all duration-300",
                    "text-xl sm:text-2xl md:text-3xl lg:text-[2rem]",
                    "leading-tight",
                    isScrolled 
                      ? isDark 
                        ? "text-cream-100" 
                        : "text-foreground"
                      : "text-white drop-shadow-lg"
                  )}
                >
                  Chez Amis
                </span>
                {/* Subtitle - perfectly aligned */}
                <span
                  className={cn(
                    "font-heading font-light tracking-[0.15em] uppercase transition-all duration-300",
                    "text-[0.625rem] sm:text-xs md:text-[0.7rem]",
                    "leading-tight mt-0.5",
                    isScrolled
                      ? isDark
                        ? "text-cream-200/70"
                        : "text-muted-foreground"
                      : "text-cream-200/80 drop-shadow-md"
                  )}
                >
                  BAR AND GRILL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Center/Right) - Evenly spaced with premium hover animations */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8"
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
                      "group relative text-sm font-heading font-medium transition-all duration-300 ease-out",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm px-3 py-2",
                      "hover:scale-105 active:scale-95",
                      // Light mode colors
                      !isDark && isScrolled && isActive && "text-foreground",
                      !isDark && isScrolled && !isActive && "text-muted-foreground hover:text-foreground",
                      !isDark && !isScrolled && isActive && "text-white",
                      !isDark && !isScrolled && !isActive && "text-white/90 hover:text-white",
                      // Dark mode colors
                      isDark && isScrolled && isActive && "text-cream-100",
                      isDark && isScrolled && !isActive && "text-cream-200/70 hover:text-cream-100",
                      isDark && !isScrolled && isActive && "text-white",
                      isDark && !isScrolled && !isActive && "text-white/90 hover:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {/* Premium gold underline animation */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 transition-all duration-500 ease-out",
                        "shadow-sm group-hover:shadow-gold-500/50",
                        isActive 
                          ? "w-full opacity-100" 
                          : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                      )}
                      aria-hidden="true"
                    />
                    {/* Subtle background glow on hover */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-sm bg-gold-500/0 group-hover:bg-gold-500/5 transition-all duration-300 -z-10",
                        isActive && "bg-gold-500/5"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right Side Actions - Premium CTAs */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              {/* Theme Toggle */}
              <ThemeToggle
                className={cn(
                  "transition-all duration-300 hover:scale-110 active:scale-95",
                  isScrolled
                    ? isDark
                      ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              />
              
              {/* Order Delivery Button - Premium CTA */}
              <Link href="/order-summary" className="hidden lg:block group/order">
                <Button
                  variant="premium"
                  size="sm"
                  className={cn(
                    "font-heading font-semibold tracking-wide transition-all duration-300 min-h-[44px]",
                    "px-4 py-2 relative overflow-hidden",
                    "hover:scale-105 active:scale-95",
                    "shadow-lg hover:shadow-xl hover:shadow-gold-500/30"
                  )}
                  aria-label="Order for Delivery"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4" />
                    Order Delivery
                  </span>
                  {/* Shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover/order:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </Link>

              {/* Cart Icon with Badge */}
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/order-summary"
                  }
                }}
                className={cn(
                  "hidden lg:flex items-center justify-center transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 py-1 min-h-[44px] min-w-[44px]",
                  "hover:scale-110 active:scale-95",
                  isScrolled
                    ? isDark
                      ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-label={`Your selection${cartItemCount > 0 ? ` (${cartItemCount} items)` : ""}`}
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {cartItemCount > 0 && (
                    <span
                      className={cn(
                        "absolute -top-2 -right-2 text-xs font-body font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                        "text-white bg-gold-500 shadow-lg animate-badge-bounce",
                        "ring-2 ring-background"
                      )}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Reserve a Table Button - Premium CTA */}
              <Link href="/reservations" className="hidden lg:block group/reserve">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "font-heading font-semibold tracking-wide border-2 transition-all duration-300 min-h-[44px]",
                    "px-4 py-2 relative overflow-hidden",
                    "hover:scale-105 active:scale-95",
                    isScrolled
                      ? isDark
                        ? "border-gold-500/80 text-cream-100 hover:bg-gold-500/10 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/20"
                        : "border-gold-500/80 text-foreground hover:bg-gold-500/10 hover:border-gold-500 hover:shadow-lg"
                      : "border-white/80 text-white hover:bg-white/10 hover:border-white hover:shadow-xl"
                  )}
                  aria-label="Reserve a Table"
                >
                  <span className="relative z-10">Reserve a Table</span>
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 translate-x-[-100%] group-hover/reserve:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </Button>
              </Link>

              {/* Mobile Menu Button - Premium animation */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden relative",
                  "min-h-[44px] min-w-[44px]",
                  "transition-all duration-300 ease-out",
                  "hover:scale-110 active:scale-95",
                  "will-change-transform",
                  isScrolled
                    ? isDark
                      ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50 active:bg-charcoal-800/70"
                      : "text-foreground hover:bg-muted/50 active:bg-muted/80"
                    : "text-white hover:bg-white/10 active:bg-white/20"
                )}
                style={{
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)",
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="relative inline-flex items-center justify-center w-6 h-6">
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                      "will-change-transform",
                      isMobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    )}
                    style={{
                      transform: "translateZ(0)",
                      WebkitTransform: "translateZ(0)",
                    }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                      "will-change-transform",
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    )}
                    style={{
                      transform: "translateZ(0)",
                      WebkitTransform: "translateZ(0)",
                    }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Premium Full Screen Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with smooth fade */}
            <div
              className={cn(
                "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
                isDark 
                  ? "bg-charcoal-950/98 backdrop-blur-2xl" 
                  : "bg-gray-900/98 backdrop-blur-2xl"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu - Smooth slide in animation */}
            <nav
              id="mobile-menu"
              className={cn(
                "fixed inset-0 z-[70] lg:hidden",
                "flex flex-col items-center justify-center",
                "overflow-y-auto overscroll-contain",
                "-webkit-overflow-scrolling: touch",
                "animate-fade-in",
                isDark 
                  ? "bg-charcoal-950/98 backdrop-blur-2xl" 
                  : "bg-gray-900/98 backdrop-blur-2xl"
              )}
              role="navigation"
              aria-label="Mobile navigation"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {/* Close Button - Top Right */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:bg-white/10 active:bg-white/20 transition-colors min-h-[44px] min-w-[44px] z-10 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>

              {/* Centered Navigation Links - Premium animations */}
              <div className="flex flex-col items-center gap-6 md:gap-8 px-6 py-20 w-full max-w-md mx-auto">
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
                        "group relative text-2xl font-heading font-light tracking-wide text-white",
                        "transition-all duration-500 ease-out animate-fade-in-up",
                        "hover:text-gold-400 active:text-gold-500 active:scale-95",
                        "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-6 py-4 min-h-[56px] touch-manipulation w-full text-center",
                        isActive && "text-gold-400"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        animationDelay: `${index * 0.08}s`,
                      }}
                    >
                      {item.label}
                      {/* Gold underline for active/hover */}
                      <span
                        className={cn(
                          "absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 transition-all duration-500",
                          isActive ? "w-3/4 opacity-100" : "w-0 group-hover:w-3/4 opacity-0 group-hover:opacity-100"
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  )
                })}

                {/* Mobile Actions - Premium CTAs */}
                <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-white/20 w-full max-w-xs">
                  {/* Order Delivery Button - Prominent CTA */}
                  <Link 
                    href="/order-summary" 
                    className="w-full group/order" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="premium"
                      size="lg"
                      className="w-full font-heading font-semibold tracking-wide transition-all duration-300 min-h-[56px] text-lg touch-manipulation relative overflow-hidden hover:scale-105 active:scale-95 shadow-xl"
                      aria-label="Order for Delivery"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <UtensilsCrossed className="h-5 w-5" />
                        Order Delivery
                        {cartItemCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-sm font-bold">
                            {cartItemCount}
                          </span>
                        )}
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover/order:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </Button>
                  </Link>

                  {/* Reserve a Table Button */}
                  <Link 
                    href="/reservations" 
                    className="w-full group/reserve" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-heading font-semibold tracking-wide border-2 border-white/80 text-white hover:bg-white/10 hover:border-white active:bg-white/20 active:border-white/80 transition-all duration-300 min-h-[56px] text-lg touch-manipulation relative overflow-hidden hover:scale-105 active:scale-95"
                      aria-label="Reserve a Table"
                    >
                      <span className="relative z-10">Reserve a Table</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 translate-x-[-100%] group-hover/reserve:translate-x-[100%] transition-transform duration-700 ease-in-out" />
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
