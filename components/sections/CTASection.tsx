"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function CTASection() {
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
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
            <a
              href="tel:+233243952339"
              className="text-xl md:text-2xl font-semibold text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
              aria-label="Call us at 024 395 2339"
            >
              024 395 2339 / 050 243 2037
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/order" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-charcoal-900 hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Order Now"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/reservations" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                aria-label="Make a Reservation"
              >
                Make a Reservation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

