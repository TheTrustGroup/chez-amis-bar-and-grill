"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

/**
 * Hook for scroll-triggered animations
 * Uses Intersection Observer to trigger animations at 70% visibility
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.7, // Trigger at 70% visibility
    triggerOnce = true,
    rootMargin = "0px",
  } = options

  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin: rootMargin as any, // Framer Motion accepts string for margin
  })

  return {
    ref,
    isInView,
  }
}

/**
 * Hook for parallax effect
 */
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const parallax = scrolled * speed

      setOffset(parallax)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return {
    ref,
    offset,
  }
}

/**
 * Hook for smooth scroll to element
 */
export function useSmoothScroll() {
  const scrollTo = (elementId: string, offset: number = 0) => {
    if (typeof window === "undefined") return

    const element = document.getElementById(elementId)
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return { scrollTo }
}

/**
 * Hook for page load progress
 */
export function usePageProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100

      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return progress
}

