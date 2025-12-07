/**
 * Framer Motion Animation Variants
 * 
 * Reusable animation variants for consistent animations
 */

import { Variants } from "framer-motion"
import { transitions, prefersReducedMotion } from "./transitions"

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.1,
        },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: prefersReducedMotion() ? { duration: 0.01 } : { duration: 0.3 },
  },
}

// Fade in + slide up
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Fade in
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Stagger children
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
  },
}

// Stagger children (faster)
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          staggerChildren: 0.05,
          delayChildren: 0.05,
        },
  },
}

// Button hover
export const buttonHover = {
  scale: prefersReducedMotion() ? 1 : 1.02,
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Button tap
export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Card hover
export const cardHover = {
  y: prefersReducedMotion() ? 0 : -5,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Card tap
export const cardTap = {
  scale: 0.98,
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Menu item hover
export const menuItemHover = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Image zoom
export const imageZoom: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.05,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Scale in
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Bounce in
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
  },
}

// Rotate in
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Shake animation (for errors)
export const shake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: "easeInOut",
        },
  },
}

// Fade out + slide left (for removing items)
export const fadeOutLeft: Variants = {
  exit: {
    opacity: 0,
    x: -20,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Number flip animation
export const numberFlip: Variants = {
  initial: {
    rotateX: 0,
  },
  animate: {
    rotateX: [0, -90, 0],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.4,
          ease: "easeInOut",
        },
  },
}

// Checkmark animation
export const checkmark: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.5,
          ease: "easeInOut",
        },
  },
}

// Underline slide in
export const underlineSlide: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "100%",
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        },
  },
}

// Parallax variants
export const parallax: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: prefersReducedMotion() ? 0 : [0, -20],
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
}

// Loading spinner
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

// Pulse animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
  },
}

// Shimmer effect (for skeleton loaders)
export const shimmer: Variants = {
  animate: {
    x: ["-100%", "100%"],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        },
  },
}

// Confetti (subtle)
export const confetti: Variants = {
  hidden: {
    opacity: 0,
    y: 0,
    rotate: 0,
  },
  visible: {
    opacity: [0, 1, 0],
    y: -50,
    rotate: 360,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 1,
          ease: "easeOut",
        },
  },
}

// Badge bounce
export const badgeBounce: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: [0, 1.2, 1],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
  },
}

// Mobile menu stagger
export const mobileMenuStagger: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.1,
        },
  },
}

// Text gradient animation
export const textGradient: Variants = {
  animate: {
    backgroundPosition: ["0%", "100%"],
    transition: prefersReducedMotion()
      ? { duration: 0.01 }
      : {
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        },
  },
}

