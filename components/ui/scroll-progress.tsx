"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    updateScrollProgress() // Initial call

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 z-[9999]",
        "transition-all duration-150 ease-out",
        "origin-left"
      )}
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
        transformOrigin: "left",
      }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
