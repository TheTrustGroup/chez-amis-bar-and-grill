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
  /** When false, skip max-w-screen-xl inner (full-bleed content). Default true except hero. */
  containWidth?: boolean
}

/**
 * Sections follow the 3-layer rule: structure (flex-col → md:flex-row),
 * spacing (mobile + md: only), overflow-hidden on the section shell.
 */
export function SectionWrapper({
  children,
  id,
  className,
  variant = "default",
  animateOnScroll = true,
  animationDelay = 0,
  background = "transparent",
  containWidth,
}: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const shouldContain =
    containWidth ?? (variant !== "hero")

  useEffect(() => {
    if (!animateOnScroll) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [animateOnScroll])

  const backgroundClasses = {
    light: isDark ? "bg-green-700" : "bg-background",
    dark: isDark ? "bg-green-600" : "bg-green-600",
    gradient: isDark
      ? "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      : "bg-gradient-to-br from-neutral-50 via-background to-neutral-100",
    transparent: "bg-transparent",
  }

  const variantClasses = {
    default: "section-shell",
    /** Full-bleed; override min-height via className (e.g. min-h-[40vh] or min-h-screen) */
    hero: "relative flex w-full items-center justify-center overflow-hidden",
    featured: cn(
      "section-shell bg-gradient-to-br from-terra-500/5 via-transparent to-green-500/5"
    ),
    testimonial: "section-shell",
  }

  const content = shouldContain ? (
    <div className="section-shell-inner">{children}</div>
  ) : (
    children
  )

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
      {content}
    </section>
  )
}
