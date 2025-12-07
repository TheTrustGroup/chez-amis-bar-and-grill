/**
 * Reusable Animation Transitions
 * 
 * Subtle, elegant, and purposeful animations
 * Respects prefers-reduced-motion
 */

export const transitions = {
  // Fast transitions (200ms)
  fast: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] as const, // ease-in-out
  },

  // Standard transitions (300ms)
  standard: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const,
  },

  // Smooth transitions (500ms)
  smooth: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1] as const,
  },

  // Slow transitions (700ms)
  slow: {
    duration: 0.7,
    ease: [0.4, 0, 0.2, 1] as const,
  },

  // Spring animations
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },

  // Gentle spring
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 25,
  },

  // Bounce effect
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Get transition with reduced motion support
 */
export function getTransition(
  transition: typeof transitions[keyof typeof transitions],
  fallback?: typeof transitions[keyof typeof transitions]
) {
  if (prefersReducedMotion()) {
    return fallback || { duration: 0.01 }
  }
  return transition
}

