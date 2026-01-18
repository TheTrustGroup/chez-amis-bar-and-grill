/**
 * Smooth scroll utility for anchor links with proper offset handling
 * Ensures smooth scrolling between sections with header offset
 */

export interface SmoothScrollOptions {
  offset?: number
  behavior?: ScrollBehavior
  duration?: number
}

const DEFAULT_OFFSET = 100 // Default offset for fixed header
const DEFAULT_DURATION = 800 // Default animation duration in ms

/**
 * Smooth scroll to an element by ID
 */
export function scrollToElement(
  elementId: string,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === "undefined") return

  const { offset = DEFAULT_OFFSET, behavior = "smooth" } = options
  const element = document.getElementById(elementId)

  if (!element) {
    console.warn(`Element with id "${elementId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  const scrollPosition = Math.max(0, offsetPosition)

  if (behavior === "smooth" && options.duration) {
    // Custom smooth scroll with duration control
    smoothScrollTo(scrollPosition, options.duration)
  } else {
    // Native smooth scroll
    window.scrollTo({
      top: scrollPosition,
      behavior,
    })
  }
}

/**
 * Smooth scroll to a selector (e.g., "#section", ".class")
 */
export function scrollToSelector(
  selector: string,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === "undefined") return

  const element = document.querySelector(selector)
  if (!element || !(element instanceof HTMLElement)) {
    console.warn(`Element with selector "${selector}" not found`)
    return
  }

  const { offset = DEFAULT_OFFSET, behavior = "smooth" } = options
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  const scrollPosition = Math.max(0, offsetPosition)

  if (behavior === "smooth" && options.duration) {
    smoothScrollTo(scrollPosition, options.duration)
  } else {
    window.scrollTo({
      top: scrollPosition,
      behavior,
    })
  }
}

/**
 * Custom smooth scroll implementation with duration control
 * Uses easing function for smooth animation
 */
function smoothScrollTo(target: number, duration: number): void {
  const start = window.pageYOffset
  const distance = target - start
  let startTime: number | null = null

  // Easing function (ease-in-out-cubic)
  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const eased = easeInOutCubic(progress)

    window.scrollTo(0, start + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Handle anchor link clicks with smooth scroll
 * Call this on anchor link click events
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  options: SmoothScrollOptions = {}
): void {
  const href = e.currentTarget.getAttribute("href")
  if (!href || !href.startsWith("#")) return

  e.preventDefault()
  const elementId = href.substring(1) // Remove the #
  scrollToElement(elementId, options)
}

/**
 * Initialize smooth scroll for all anchor links on the page
 */
export function initSmoothScroll(options: SmoothScrollOptions = {}): () => void {
  if (typeof window === "undefined") return () => {}

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest("a[href^='#']") as HTMLAnchorElement
    if (!anchor) return

    const href = anchor.getAttribute("href")
    if (!href || href === "#") return

    e.preventDefault()
    const elementId = href.substring(1)
    scrollToElement(elementId, options)
  }

  document.addEventListener("click", handleClick)
  return () => document.removeEventListener("click", handleClick)
}
