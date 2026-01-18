"use client"

import { useCallback } from "react"
import { scrollToElement, scrollToSelector as scrollToSelectorUtil, SmoothScrollOptions } from "@/lib/utils/smoothScroll"

/**
 * Hook for smooth scrolling to elements
 * Provides consistent smooth scroll behavior across the app
 */
export function useSmoothScroll() {
  const scrollTo = useCallback(
    (elementId: string, options?: SmoothScrollOptions) => {
      scrollToElement(elementId, options)
    },
    []
  )

  const scrollToSelector = useCallback(
    (selector: string, options?: SmoothScrollOptions) => {
      scrollToSelectorUtil(selector, options)
    },
    []
  )

  return { scrollTo, scrollToSelector }
}
