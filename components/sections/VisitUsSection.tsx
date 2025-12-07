"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"

export function VisitUsSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="visit-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Map or Location Image */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
              {/* In production, use embedded map or Next.js Image */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=..."
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-2xl">
                Location Map
              </div>
            </div>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Right: Contact Information */}
          <div className="space-y-8 md:space-y-10">
            <h2
              id="visit-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground"
            >
              We&apos;re Ready to Welcome You
            </h2>

            <div className="space-y-6 md:space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-light text-foreground mb-2">
                    Address
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
                    40 Boundary Rd<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-light text-foreground mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+233243952339"
                    className="text-base md:text-lg text-muted-foreground font-body font-light hover:text-foreground transition-colors"
                  >
                    024 395 2339 / 050 243 2037
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Clock className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-light text-foreground mb-2">
                    Hours
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
                    Monday - Sunday<br />
                    9:30 AM - 12:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/reservations" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-6 md:py-7 font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 transition-all duration-500"
                  aria-label="Make a Reservation"
                >
                  Make a Reservation
                </Button>
              </Link>
              <Link href="/order" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-6 md:py-7 font-heading font-light tracking-wide border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-500"
                  aria-label="Order Takeaway"
                >
                  Order Takeaway
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

