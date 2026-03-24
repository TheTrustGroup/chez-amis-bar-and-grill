"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, Package } from "lucide-react"

export function PrivateEventsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[340px] sm:min-h-[420px] md:min-h-[560px] flex items-center justify-center overflow-hidden py-8 md:py-16" aria-labelledby="private-events-heading">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-green-900"></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Centered Content Box */}
      <div className="relative z-10 section-shell-inner">
        <div className="max-w-3xl mx-auto px-1 sm:px-0">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-5 sm:p-8 md:p-12 border border-neutral-100/10">
            <h2
              id="private-events-heading"
              className="text-2xl sm:text-3xl md:section-title text-white mb-3 md:mb-6 text-center font-display font-light"
            >
              Host Your Special Occasion
            </h2>
            <div className="w-16 sm:w-20 h-px bg-terra-500 mx-auto mb-4 md:mb-8"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-body font-light leading-relaxed text-center mb-6 md:mb-10 max-w-2xl mx-auto">
              From intimate dinners to grand celebrations, our private spaces accommodate 10-100 guests. Let us create an unforgettable experience tailored to your vision.
            </p>

            {/* CTA Buttons - Premium */}
            <div className={cn(
              "flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center",
              "animate-fade-in-up"
            )} style={{ animationDelay: "0.3s" }}>
              <Link href="/reservations" className="w-full sm:w-auto group/private">
                <Button
                  variant="premium"
                  size="default"
                  className={cn(
                    "w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px]",
                    "shadow-xl hover:shadow-2xl hover:shadow-terra-500/40",
                    "backdrop-blur-sm md:text-base"
                  )}
                  aria-label="Request Private Dining"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  Request Private Dining
                </Button>
              </Link>

              <Link href="/private-events" className="w-full sm:w-auto group/events">
                <Button
                  size="default"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px]",
                    "border-2 border-neutral-100/60 text-white bg-neutral-100/5",
                    "hover:bg-neutral-100/10 hover:border-neutral-50 hover:shadow-lg hover:shadow-neutral-100/20",
                    "backdrop-blur-sm md:text-base"
                  )}
                  aria-label="View Event Packages"
                >
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  View Event Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

