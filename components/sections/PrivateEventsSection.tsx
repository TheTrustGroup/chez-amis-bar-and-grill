"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, Sparkles } from "lucide-react"

export function PrivateEventsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden" aria-labelledby="private-events-heading">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Centered Content Box */}
      <div className="relative z-10 container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 md:p-12 lg:p-16 border border-cream-200/10">
            <h2
              id="private-events-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-cream-100 mb-4 md:mb-6 text-center"
            >
              Host Your Special Occasion
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6 md:mb-8"></div>
            <p className="text-lg md:text-xl text-cream-200/90 font-body font-light leading-relaxed text-center mb-8 md:mb-10 max-w-2xl mx-auto">
              From intimate dinners to grand celebrations, our private spaces accommodate 10-100 guests. Let us create an unforgettable experience tailored to your vision.
            </p>

            {/* CTA Buttons - Premium */}
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center",
              "animate-fade-in-up"
            )} style={{ animationDelay: "0.3s" }}>
              {/* Primary CTA - Request Private Dining */}
              <Link href="/reservations" className="w-full sm:w-auto group/private">
                <Button
                  variant="premium"
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto min-w-[220px]",
                    "shadow-xl hover:shadow-2xl hover:shadow-gold-500/40",
                    "backdrop-blur-sm"
                  )}
                  aria-label="Request Private Dining"
                >
                  <Calendar className="h-5 w-5" />
                  Request Private Dining
                </Button>
              </Link>
              
              {/* Secondary CTA - View Event Packages */}
              <Link href="/private-events" className="w-full sm:w-auto group/events">
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto min-w-[220px]",
                    "border-2 border-cream-200/60 text-cream-100 bg-cream-200/5",
                    "hover:bg-cream-200/10 hover:border-cream-100 hover:shadow-lg hover:shadow-cream-200/20",
                    "backdrop-blur-sm"
                  )}
                  aria-label="View Event Packages"
                >
                  <Sparkles className="h-5 w-5" />
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

