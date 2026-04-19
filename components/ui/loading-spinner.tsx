"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const spinnerSizeMap: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "h-3.5 w-3.5 border-[1.5px]",
  md: "h-4 w-4 border-2",
  lg: "h-5 w-5 border-2",
}

/**
 * Premium ring spinner with a soft center pulse.
 * Keeps motion subtle and legible across dark/light surfaces.
 */
export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  return (
    <span className="relative inline-flex items-center justify-center" aria-hidden="true">
      <span
        className={cn(
          "inline-flex animate-spin rounded-full border-current border-t-transparent opacity-90",
          spinnerSizeMap[size],
          className
        )}
      />
      <span className="absolute h-1 w-1 rounded-full bg-current/70" />
    </span>
  )
}

