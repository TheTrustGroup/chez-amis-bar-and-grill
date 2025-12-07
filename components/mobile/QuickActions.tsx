"use client"

import Link from "next/link"
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuickActionsProps {
  variant?: "hero" | "floating" | "inline"
  className?: string
}

export function QuickActions({ variant = "inline", className }: QuickActionsProps) {
  const actions = [
    {
      label: "Call Now",
      icon: Phone,
      href: "tel:+233243952339",
      action: "call",
      className: "bg-gold-600 text-cream-100 hover:bg-gold-700",
    },
    {
      label: "Get Directions",
      icon: MapPin,
      href: "https://maps.google.com/?q=40+Boundary+Rd+Accra+Ghana",
      action: "directions",
      className: "bg-charcoal-900 text-cream-100 hover:bg-charcoal-800",
    },
    {
      label: "View Hours",
      icon: Clock,
      href: "/contact#hours",
      action: "hours",
      className: "bg-cream-200 text-charcoal-900 hover:bg-cream-300",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/233243952339",
      action: "whatsapp",
      className: "bg-green-600 text-white hover:bg-green-700",
    },
  ]

  if (variant === "floating") {
    return (
      <div className={cn("fixed bottom-20 left-0 right-0 z-40 px-4 lg:hidden safe-area-bottom", className)}>
        <div className="flex gap-2 max-w-md mx-auto">
          <a
            href="tel:+233243952339"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold-600 text-cream-100 font-heading font-light tracking-wide shadow-lg active:scale-95 transition-transform"
            aria-label="Call us now"
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm">Call Now</span>
          </a>
          <a
            href="https://wa.me/233243952339"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 text-white font-heading font-light tracking-wide shadow-lg active:scale-95 transition-transform"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">WhatsApp</span>
          </a>
        </div>
      </div>
    )
  }

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-wrap gap-3 justify-center mt-6", className)}>
        {actions.slice(0, 3).map((action) => {
          const Icon = action.icon
          return (
            <a
              key={action.action}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-light tracking-wide text-sm shadow-soft",
                "active:scale-95 transition-transform",
                action.className
              )}
              aria-label={action.label}
            >
              <Icon className="h-4 w-4" />
              <span>{action.label}</span>
            </a>
          )
        })}
      </div>
    )
  }

  // Inline variant
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <a
            key={action.action}
            href={action.href}
            target={action.href.startsWith("http") ? "_blank" : undefined}
            rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-light tracking-wide text-sm shadow-soft min-h-[44px]",
              "active:scale-95 transition-transform",
              action.className
            )}
            aria-label={action.label}
          >
            <Icon className="h-4 w-4" />
            <span>{action.label}</span>
          </a>
        )
      })}
    </div>
  )
}

