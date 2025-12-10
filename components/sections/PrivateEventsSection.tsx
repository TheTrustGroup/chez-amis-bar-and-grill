"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PrivateEventsSection() {
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link href="/reservations" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-6 md:py-7 font-heading font-light tracking-wide border-2 border-gold-500/80 text-cream-100 hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-500 backdrop-blur-sm"
                  aria-label="Request Private Dining"
                >
                  Request Private Dining
                </Button>
              </Link>
              <Link href="/private-events" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-6 md:py-7 font-heading font-light tracking-wide border-2 border-cream-200/60 text-cream-100 hover:bg-cream-200/10 hover:border-cream-100 transition-all duration-500 backdrop-blur-sm"
                  aria-label="View Event Packages"
                >
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

