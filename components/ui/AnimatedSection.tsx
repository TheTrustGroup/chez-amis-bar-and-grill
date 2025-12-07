"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations/variants"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: boolean
  variant?: "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn"
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  stagger = false,
  variant = "fadeInUp",
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-20%",
  })

  const variants = {
    fadeInUp,
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    },
  }

  const selectedVariant = variants[variant]

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className={cn(className)}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      className={cn(className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  )
}



