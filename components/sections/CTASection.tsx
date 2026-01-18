"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, UtensilsCrossed, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-primary z-0">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRWMjZoNHY4aC00em0wIDE2di04aDR2OGgtNHpNMjAgMzRWMjZoNHY4aC00em0wIDE2di04aDR2OGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 md:mb-6"
          >
            Ready to Experience Exceptional Dining?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            Order online now or reserve your table today
          </p>

          {/* Phone Number */}
          <div className="flex flex-col items-center gap-3 mb-8 md:mb-10">
            <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
              <span className="text-xl md:text-2xl font-semibold text-white">Call Us</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <a
                href="tel:+233557032312"
                className="text-lg md:text-xl font-semibold text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                aria-label="Call us at 055 703 2312"
              >
                055 703 2312
              </a>
              <span className="text-white/60">•</span>
              <a
                href="tel:+233557032335"
                className="text-lg md:text-xl font-semibold text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                aria-label="Call us at 055 703 2335"
              >
                055 703 2335
              </a>
              <span className="text-white/60">•</span>
            <a
              href="tel:+233243952339"
                className="text-lg md:text-xl font-semibold text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
              aria-label="Call us at 024 395 2339"
            >
                024 395 2339
              </a>
              <span className="text-white/60">•</span>
              <a
                href="tel:+233502432037"
                className="text-lg md:text-xl font-semibold text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                aria-label="Call us at 050 243 2037"
              >
                050 243 2037
            </a>
            </div>
          </div>

          {/* CTA Buttons - Premium Primary CTAs */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.3s" }}>
            {/* Primary CTA - Order Now */}
            <Link href="/order-summary" className="w-full sm:w-auto group/order">
              <Button
                variant="premium"
                size="lg"
                className={cn(
                  "w-full sm:w-auto min-w-[200px]",
                  "shadow-xl hover:shadow-2xl hover:shadow-gold-500/40"
                )}
                aria-label="Order Now"
              >
                <UtensilsCrossed className="h-5 w-5" />
                Order Now
              </Button>
            </Link>
            
            {/* Secondary CTA - Make Reservation */}
            <Link href="/reservations" className="w-full sm:w-auto group/reserve">
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full sm:w-auto min-w-[200px]",
                  "border-2 border-white/80 text-white bg-white/5 backdrop-blur-md",
                  "hover:bg-white/15 hover:border-white hover:shadow-xl hover:shadow-white/20"
                )}
                aria-label="Make a Reservation"
              >
                <Calendar className="h-5 w-5" />
                Make a Reservation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

