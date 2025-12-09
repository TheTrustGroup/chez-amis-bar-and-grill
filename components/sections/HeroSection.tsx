"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Star } from "lucide-react"
import { QuickActions } from "@/components/mobile/QuickActions"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Check if window is available (SSR safety)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToNext = () => {
    if (typeof document !== "undefined") {
      const nextSection = document.querySelector("section:not(:first-of-type)")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section 
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "min-h-screen",
        isMobile && "mobile-hero"
      )}
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Gradient - Elegant fallback that works perfectly */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        
        {/* Dark Overlay - rgba(0, 0, 0, 0.6) for text readability */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true"></div>
      </div>

      {/* Centered Content - Proper spacing to avoid header overlap */}
      <div className={cn(
        "relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-[1200px]",
        "w-full",
        // Mobile: Add top padding to account for fixed header (80px) + extra spacing
        isMobile ? "pt-24 pb-8" : "py-20 md:py-32",
        // Ensure content doesn't overlap when scrolling
        "flex flex-col items-center justify-center"
      )}>
        <div
          className={cn(
            "text-center transition-all duration-1000 ease-out w-full",
            "flex flex-col items-center justify-center",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          )}
        >
          {/* Restaurant Name "Chez Amis" - Fixed at top, won't overlap */}
          <h1 
            className={cn(
              "font-display font-normal text-white tracking-wide",
              // Mobile: Smaller size with proper spacing
              isMobile ? "mb-2 text-4xl sm:text-5xl" : "mb-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
              // Ensure it stays in place
              "relative z-10"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            Chez Amis
          </h1>

          {/* Decorative Gold Line Divider */}
          <div className="flex items-center justify-center mb-3 md:mb-4" aria-hidden="true">
            <div className="h-px w-[100px] bg-gold-500"></div>
          </div>

          {/* Subtitle "BAR AND GRILL" */}
          <p 
            className={cn(
              "font-heading font-light tracking-[0.3em] uppercase",
              // Mobile: Reduced spacing
              isMobile ? "mb-6 text-xs sm:text-sm" : "mb-10 md:mb-12 text-sm md:text-base lg:text-lg",
              "text-gold-400",
              "drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]",
              "relative z-10"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            BAR AND GRILL
          </p>

          {/* Tagline "An Intimate Culinary Journey" - Proper spacing after branding */}
          <h2 
            className={cn(
              "font-display font-light text-white max-w-3xl mx-auto",
              // Mobile: Proper spacing and sizing
              isMobile ? "mb-3 text-lg sm:text-xl" : "mb-4 md:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl",
              "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]",
              "relative z-10"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            An Intimate Culinary Journey
          </h2>

          {/* Description "Where passion meets palate..." */}
          <p 
            className={cn(
              "font-body font-light text-gray-200 max-w-2xl mx-auto leading-relaxed",
              // Mobile: Proper spacing
              isMobile ? "mb-6 text-sm sm:text-base" : "mb-8 md:mb-10 text-base md:text-lg lg:text-xl",
              "drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
              "relative z-10"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            Where passion meets palate in the heart of Accra
          </p>

          {/* CTA Buttons - Proper spacing */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 items-center justify-center w-full",
              // Mobile: Reduced spacing
              isMobile ? "mb-6" : "mb-8 md:mb-10",
              "animate-fade-in-up",
              "relative z-10"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            {/* Primary Button - Reserve a Table */}
            <Link href="/reservations" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={cn(
                  "h-14 min-w-[200px] w-full sm:w-auto",
                  "border-2 border-gold-400 text-gold-400",
                  "bg-transparent hover:bg-gold-400 hover:text-gray-900",
                  "px-8 py-4 text-base md:text-lg font-heading font-medium",
                  "uppercase tracking-wide rounded-md",
                  "transition-all duration-300 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-transparent",
                  "active:scale-95"
                )}
                aria-label="Reserve a Table"
              >
                Reserve a Table
              </Button>
            </Link>

            {/* Secondary Button - Order for Delivery */}
            <Link href="/order-summary" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={cn(
                  "h-14 min-w-[200px] w-full sm:w-auto",
                  "border-2 border-white text-white",
                  "bg-transparent hover:bg-white hover:text-gray-900",
                  "px-8 py-4 text-base md:text-lg font-heading font-medium",
                  "uppercase tracking-wide rounded-md",
                  "transition-all duration-300 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent",
                  "active:scale-95"
                )}
                aria-label="Order for Delivery"
              >
                Order for Delivery
              </Button>
            </Link>
          </div>

          {/* Operating Hours Text - Proper spacing, won't overlap */}
          <div 
            className={cn(
              "px-4 w-full",
              // Mobile: Proper spacing
              isMobile ? "mb-5" : "mb-6 md:mb-8",
              "relative z-10"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center leading-relaxed">
              <span className="block sm:inline">Walk-ins welcome</span>
              <span className="hidden sm:inline"> | </span>
              <span className="block sm:inline mt-1 sm:mt-0">We&apos;re now open 24/7</span>
            </p>
          </div>

          {/* Mobile Quick Actions - Proper spacing */}
          {isMobile && (
            <div className={cn(
              "w-full",
              "mb-5",
              "relative z-10"
            )}>
              <QuickActions variant="hero" />
            </div>
          )}

          {/* Mobile Social Proof Banner - Proper spacing, won't overlap */}
          {isMobile && (
            <div className={cn(
              "w-full mt-4",
              // Extra bottom margin to prevent overlap with next section
              "mb-8",
              "relative z-10"
            )}>
              <div className="bg-black/30 backdrop-blur-md border-t border-cream-200/10 rounded-t-lg">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex flex-col items-center justify-center gap-2 text-cream-200/90">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5" aria-label="5 star rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-gold-500 text-gold-500"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-heading font-light whitespace-nowrap">
                        Rated Accra&apos;s finest
                      </span>
                    </div>
                    
                    {/* Guest Count */}
                    <span className="text-xs font-body font-light whitespace-nowrap">
                      2,500+ satisfied guests
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <button
        onClick={scrollToNext}
        className={cn(
          "hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10",
          "flex-col items-center gap-3 text-gold-400",
          "hover:text-gold-300 transition-all duration-500",
          "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2",
          "group animate-bounce"
        )}
        aria-label="Scroll to explore"
      >
        <span className="text-xs md:text-sm font-heading font-light tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Scroll to explore
        </span>
        <ChevronDown className="h-6 w-6 md:h-7 md:w-7 opacity-70" aria-hidden="true" />
      </button>

      {/* Desktop Social Proof Banner */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="bg-black/30 backdrop-blur-md border-t border-cream-200/10">
            <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4 lg:py-5">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-6 text-cream-200/90">
                {/* Star Rating */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex gap-0.5 sm:gap-1" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 fill-gold-500 text-gold-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-heading font-light whitespace-nowrap">
                    Rated Accra&apos;s finest
                  </span>
                </div>
                
                {/* Divider */}
                <div className="hidden sm:block h-4 w-px bg-cream-200/20" aria-hidden="true"></div>
                
                {/* Guest Count */}
                <span className="text-xs sm:text-sm md:text-base font-body font-light whitespace-nowrap">
                  2,500+ satisfied guests
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
