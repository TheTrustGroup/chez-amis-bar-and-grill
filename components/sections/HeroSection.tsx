"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { QuickActions } from "@/components/mobile/QuickActions"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import { trackMenuClick, trackReservationClick } from "@/lib/analytics"

const HERO_VIDEO_SRC =
  "/media/videos/filtered-b59b103f-f34d-4b58-a62d-c66524ad5ace.mp4"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [videoBgFailed, setVideoBgFailed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  // Fallback chain — only paths that exist under public/ (see scripts/audit-assets.mjs)
  const imagePaths = [
    "/media/images/img-8209.jpg",
    "/media/images/img-7189.jpg",
    "/media/images/img-6740.jpg",
    "/media/images/img-8021.jpg",
    "/images/placeholders/restaurant-placeholder.svg",
  ]
  const [currentImagePath, setCurrentImagePath] = useState(imagePaths[0])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const onMotionChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener("change", onMotionChange)

    const timer = setTimeout(() => setIsVisible(true), 100)

    setIsMobile(window.innerWidth < 768)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      mq.removeEventListener("change", onMotionChange)
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Enhanced Parallax scroll effect
  useEffect(() => {
    if (isMobile || prefersReducedMotion || !parallaxRef.current) return

    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.5 // Increased parallax speed for more sophistication
      parallaxRef.current.style.transform = `translateY(${rate}px) scale(1.05)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile, prefersReducedMotion])

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
        "relative flex items-center justify-center overflow-hidden text-center",
        "min-h-[85vh] sm:min-h-screen",
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
          {/* Optional full-bleed video; falls back to stills */}
          {!prefersReducedMotion && !videoBgFailed && (
            <video
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/media/images/img-8209.jpg"
              aria-hidden
              onLoadedData={() => setImageLoaded(true)}
              onError={() => setVideoBgFailed(true)}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}

          {!imageError && (
            <Image
              src={currentImagePath}
              alt="Chez Amis Bar and Grill elegant dining room with warm ambiance"
              fill
              priority
              quality={90}
              className={cn(
                "object-cover object-center relative z-0",
                !videoBgFailed || prefersReducedMotion ? "opacity-100" : "opacity-0",
              )}
              sizes="100vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                const currentIndex = imagePaths.indexOf(currentImagePath)
                if (currentIndex < imagePaths.length - 1) {
                  setCurrentImagePath(imagePaths[currentIndex + 1])
                } else {
                  setImageError(true)
                  setImageLoaded(false)
                }
              }}
            />
          )}
          
          {/* Base scrim while media loads */}
          <div className={cn(
            "absolute inset-0 z-0 transition-opacity duration-1000",
            imageLoaded ? "opacity-0" : "opacity-100",
            isDark 
              ? "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
              : "bg-gradient-to-br from-green-600 via-green-700 to-green-800"
          )} />
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
        "relative z-10 section-shell-inner max-w-[1200px]",
        "w-full",
        // Mobile: Add top padding to account for fixed header (80px) + extra spacing
        isMobile ? "pt-24 pb-20" : "py-20 md:py-32",
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
              isMobile && "hidden",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            <p className={cn(
              "font-body font-light tracking-[0.2em] uppercase",
              isMobile ? "text-xs sm:text-sm" : "text-sm md:text-base",
              "text-terra-400/90",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            )}>
              Welcome to
            </p>
          </div>

          {/* Restaurant Name "Chez Amis" - Elegant Typography */}
          <h1 
            className={cn(
              "hero-title text-white tracking-wide mb-3 md:mb-4",
              "transition-all duration-1000 ease-out",
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
            <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-terra-500 to-transparent shadow-lg shadow-terra-500/50" />
          </div>

          {/* Subtitle "BAR AND GRILL" */}
          <p 
            className={cn(
              "font-body font-light tracking-[0.25em] uppercase mb-6 md:mb-8",
              isMobile && "hidden",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-xs sm:text-sm" : "text-sm md:text-base lg:text-lg",
              "text-terra-300/90",
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
              isMobile ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
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
              isMobile && "hidden",
              "transition-all duration-1000 ease-out",
              isMobile ? "text-sm sm:text-base px-4" : "text-base md:text-lg lg:text-xl px-6",
              isDark ? "text-white/90" : "text-gray-100",
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            Where passion meets palate in the heart of Accra. Experience exceptional flavors and warm hospitality.
          </p>

          {/* Primary + secondary CTAs */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full",
              "transition-all duration-1000 ease-out",
              isMobile ? "mb-5 px-4" : "mb-8 md:mb-10 px-6",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              href="/reservations"
              className={cn(
                "inline-flex items-center justify-center min-h-[44px] w-full max-w-sm sm:w-auto",
                "bg-green-600 text-neutral-50 md:hover:bg-green-700",
                "tracking-widest uppercase text-xs font-body",
                "px-8 py-4 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2 focus:ring-offset-black/40",
                "shadow-lg md:hover:shadow-xl",
              )}
              onClick={() => trackReservationClick("hero")}
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className={cn(
                isMobile
                  ? "inline-flex items-center justify-center min-h-[44px] w-full max-w-sm text-white/90 underline underline-offset-4"
                  : "inline-flex items-center justify-center min-h-[44px] w-full max-w-sm sm:w-auto border-2 border-white/80 text-white bg-transparent md:hover:bg-white/10",
                "tracking-widest uppercase text-xs font-body",
                isMobile ? "px-4 py-2.5" : "px-8 py-4",
                "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2 focus:ring-offset-black/40",
              )}
              onClick={() => trackMenuClick("hero")}
            >
              Explore Our Menu
            </Link>
          </div>

          {/* Operating Hours Text - Proper spacing, won't overlap */}
          <div
            className={cn(
              "relative z-10 flex w-full flex-col items-center justify-center px-4",
              isMobile ? "hidden" : "mb-6 md:mb-8"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            <p className="max-w-md text-balance text-center text-white/70 font-body text-sm tracking-widest uppercase">
              Walk-ins welcome &nbsp;·&nbsp; Open 24/7
            </p>
          </div>

          {/* Mobile Quick Actions - Proper spacing */}
          {isMobile && (
            <div className={cn(
              "w-full",
              "hidden",
              "relative z-10"
            )}>
              <QuickActions variant="hero" />
            </div>
          )}

          {/* Mobile Social Proof Banner - Proper spacing, won't overlap */}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToNext}
        className={cn(
          "absolute left-1/2 z-10 hidden -translate-x-1/2 transform flex-col items-center gap-3 text-terra-400 md:flex",
          "bottom-[calc(7rem+env(safe-area-inset-bottom,0px))] md:bottom-24",
          "md:hover:text-terra-300 transition-all duration-500",
          "focus:outline-none focus:ring-2 focus:ring-terra-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2",
          "group"
        )}
        aria-label="Scroll to explore"
      >
        <span className="hidden text-xs font-body font-light tracking-widest uppercase opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 md:inline md:text-sm">
          Scroll to explore
        </span>
        <ChevronDown className="h-6 w-6 md:h-7 md:w-7 opacity-70" aria-hidden="true" />
      </button>

    </section>
  )
}
