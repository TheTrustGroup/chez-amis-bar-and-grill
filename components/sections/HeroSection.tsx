"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Star, Calendar, UtensilsCrossed } from "lucide-react"
import { QuickActions } from "@/components/mobile/QuickActions"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  // Try multiple image paths as fallback
  const imagePaths = [
    "/media/images/restaurant/interior/hero-restaurant-interior.jpg",
    "/media/images/restaurant/interior/restaurant-interior-001.jpg",
    "/media/images/IMG_8209.jpg",
    "/media/images/restaurant/ambiance/hero-ambiance.jpg",
  ]
  const [currentImagePath, setCurrentImagePath] = useState(imagePaths[0])

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Check if window is available (SSR safety)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      window.addEventListener("resize", handleResize)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("resize", handleResize)
      }
    }
    return () => clearTimeout(timer)
  }, [])

  // Enhanced Parallax scroll effect
  useEffect(() => {
    if (isMobile || !parallaxRef.current) return

    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.5 // Increased parallax speed for more sophistication
      parallaxRef.current.style.transform = `translateY(${rate}px) scale(1.05)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

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
      {/* High-Resolution Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Parallax Background Layer */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 will-change-transform transition-opacity duration-1000"
          style={{ 
            transform: "translateZ(0)",
            opacity: imageLoaded ? 1 : 0
          }}
        >
          {/* High-resolution background image with fallback */}
          {!imageError && (
            <Image
              src={currentImagePath}
              alt="Chez Amis Bar and Grill elegant dining room with warm ambiance"
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                const currentIndex = imagePaths.indexOf(currentImagePath)
                if (currentIndex < imagePaths.length - 1) {
                  // Try next image path
                  setCurrentImagePath(imagePaths[currentIndex + 1])
                } else {
                  // All images failed, use gradient fallback
                  setImageError(true)
                  setImageLoaded(false)
                }
              }}
            />
          )}
          
          {/* Fallback gradient - shows while image loads or if image fails */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            imageLoaded ? "opacity-0" : "opacity-100",
            isDark 
              ? "bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"
              : "bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-800"
          )} />
          
          {/* Animated gradient overlay for subtle movement */}
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            style={{ animationDuration: "8s" }} 
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-burgundy-500/10 animate-pulse" />
          </div>
        </div>
        
        {/* Elegant Overlay - Adaptive for light/dark mode */}
        <div 
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-500",
            isDark ? "bg-black/70" : "bg-black/65"
          )} 
          aria-hidden="true"
        />
        
        {/* Gradient overlay for depth and text readability */}
        <div 
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-500",
            isDark 
              ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              : "bg-gradient-to-t from-black/75 via-black/35 to-transparent"
          )} 
          aria-hidden="true"
        />
        
        {/* Subtle vignette effect */}
        <div 
          className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-transparent to-black/20"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)"
          }}
          aria-hidden="true"
        />
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
            "text-center w-full",
            "flex flex-col items-center justify-center",
            "relative z-10"
          )}
        >
          {/* Welcome Message - Elegant Typography with Entrance Animation */}
          <div
            className={cn(
              "mb-4 md:mb-6 transition-all duration-1000 ease-out",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            <p className={cn(
              "font-heading font-light tracking-[0.2em] uppercase",
              isMobile ? "text-xs sm:text-sm" : "text-sm md:text-base",
              "text-gold-400/90",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            )}>
              Welcome to
            </p>
          </div>

          {/* Restaurant Name "Chez Amis" - Elegant Typography */}
          <h1 
            className={cn(
              "font-display font-light text-white tracking-wide mb-3 md:mb-4",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-5xl sm:text-6xl md:text-7xl" : "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
              "drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            Chez Amis
          </h1>

          {/* Decorative Gold Line Divider - Animated */}
          <div 
            className={cn(
              "flex items-center justify-center mb-4 md:mb-5 transition-all duration-1000 ease-out",
              isVisible 
                ? "opacity-100 scale-x-100" 
                : "opacity-0 scale-x-0"
            )}
            style={{ animationDelay: "0.3s" }}
            aria-hidden="true"
          >
            <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent shadow-lg shadow-gold-500/50" />
          </div>

          {/* Subtitle "BAR AND GRILL" */}
          <p 
            className={cn(
              "font-heading font-light tracking-[0.25em] uppercase mb-6 md:mb-8",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-xs sm:text-sm" : "text-sm md:text-base lg:text-lg",
              "text-gold-300/90",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            BAR AND GRILL
          </p>

          {/* Tagline - Elegant Typography */}
          <h2 
            className={cn(
              "font-display font-light text-white max-w-4xl mx-auto mb-4 md:mb-6",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
              "leading-tight",
              "drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            An Intimate Culinary Journey
          </h2>

          {/* Description - Refined Typography */}
          <p 
            className={cn(
              "font-body font-light max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-sm sm:text-base px-4" : "text-base md:text-lg lg:text-xl px-6",
              isDark ? "text-cream-100/90" : "text-gray-100",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            Where passion meets palate in the heart of Accra. Experience exceptional flavors and warm hospitality.
          </p>

          {/* Primary CTA Buttons - Stunning Entrance Animation */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center w-full",
              "transition-all duration-1000 ease-out",
              isMobile ? "mb-6 px-4" : "mb-8 md:mb-10 px-6",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.7s" }}
          >
            {/* Primary CTA - Reserve Now */}
            <Link href="/reservations" className="w-full sm:w-auto group/reserve">
              <Button
                variant="premium"
                size="lg"
                className={cn(
                  "h-14 md:h-16 min-w-[220px] w-full sm:w-auto",
                  "uppercase tracking-wider",
                  "shadow-xl hover:shadow-2xl hover:shadow-gold-500/40",
                  "hover:scale-110 active:scale-95"
                )}
                aria-label="Reserve Now"
              >
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                Reserve Now
              </Button>
            </Link>

            {/* Secondary CTA - Explore Menu */}
            <Link href="/menu" className="w-full sm:w-auto group/explore">
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "h-14 md:h-16 min-w-[220px] w-full sm:w-auto",
                  "border-2 text-white uppercase tracking-wider",
                  isDark 
                    ? "border-cream-200/80 bg-cream-200/10 backdrop-blur-md hover:bg-cream-200/20 hover:border-cream-200 hover:shadow-xl hover:shadow-cream-200/20"
                    : "border-white/90 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white hover:shadow-xl hover:shadow-white/30",
                  "hover:scale-110 active:scale-95"
                )}
                aria-label="Explore Menu"
              >
                <UtensilsCrossed className="h-5 w-5 md:h-6 md:w-6" />
                Explore Menu
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
              <span className="inline">Walk-ins welcome</span>
              <span className="inline"> | </span>
              <span className="inline">We&apos;re Open 24/7</span>
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
