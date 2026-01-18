"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  variant?: "default" | "hero" | "featured" | "testimonial"
  animateOnScroll?: boolean
  animationDelay?: number
  background?: "light" | "dark" | "gradient" | "transparent"
}

/**
 * Section wrapper component for consistent styling and animations
 * Provides modular structure with theme-aware backgrounds and subtle animations
 */
export function SectionWrapper({
  children,
  id,
  className,
  variant = "default",
  animateOnScroll = true,
  animationDelay = 0,
  background = "transparent",
}: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!animateOnScroll || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Unobserve after animation triggers
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [animateOnScroll])

  // Background variants
  const backgroundClasses = {
    light: isDark ? "bg-charcoal-950" : "bg-background",
    dark: isDark ? "bg-charcoal-900" : "bg-charcoal-900",
    gradient: isDark
      ? "bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"
      : "bg-gradient-to-br from-cream-100 via-background to-cream-200",
    transparent: "bg-transparent",
  }

  // Variant-specific classes
  const variantClasses = {
    default: "section-padding",
    hero: "min-h-screen flex items-center justify-center",
    featured: "section-padding bg-gradient-to-br from-gold-500/5 via-transparent to-burgundy-500/5",
    testimonial: "section-padding",
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative transition-colors duration-300",
        backgroundClasses[background],
        variantClasses[variant],
        animateOnScroll && !isVisible && "opacity-0 translate-y-8",
        animateOnScroll && isVisible && "opacity-100 translate-y-0",
        "transition-all duration-700 ease-out",
        className
      )}
      style={{
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {children}
    </section>
  )
}
