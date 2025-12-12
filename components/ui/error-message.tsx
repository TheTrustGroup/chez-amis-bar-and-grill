"use client"

import { AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
  className?: string
}

export function ErrorMessage({ message, onDismiss, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm text-red-800 font-body font-light">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-600 hover:text-red-800 transition-colors"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

