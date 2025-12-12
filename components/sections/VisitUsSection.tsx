"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"

export function VisitUsSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="visit-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Google Map */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4955103223842!2d-0.14888879037757927!3d5.641201894316414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf84aa959debd3%3A0x19c03e87c6e69ecc!2sChez%20Amis%20Bar%20and%20Grill!5e0!3m2!1sen!2sgh!4v1765127088179!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chez Amis Bar and Grill Location - 40 Boundary Rd, Accra"
              aria-label="Google Maps showing Chez Amis restaurant location"
              className="absolute inset-0"
            />
            {/* Elegant border overlay */}
            <div className="absolute inset-0 border-2 border-gold-500/20 rounded-lg pointer-events-none"></div>
            {/* Quick action button */}
            <a
              href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors z-10"
              aria-label="Get directions"
            >
              <Navigation className="w-5 h-5 text-amber-600" />
            </a>
          </div>

          {/* Right: Contact Information */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <h2
                id="visit-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
              >
                We&apos;re Ready to Welcome You
              </h2>
              <div className="w-20 h-px bg-gold-500 mb-6"></div>
            </div>

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
                  <div className="space-y-1">
                    <a
                      href="tel:+233557032312"
                      className="block text-base md:text-lg text-muted-foreground font-body font-light hover:text-foreground transition-colors"
                    >
                      055 703 2312
                    </a>
                    <a
                      href="tel:+233557032335"
                      className="block text-base md:text-lg text-muted-foreground font-body font-light hover:text-foreground transition-colors"
                    >
                      055 703 2335
                    </a>
                    <a
                      href="tel:+233243952339"
                      className="block text-base md:text-lg text-muted-foreground font-body font-light hover:text-foreground transition-colors"
                    >
                      024 395 2339
                    </a>
                    <a
                      href="tel:+233502432037"
                      className="block text-base md:text-lg text-muted-foreground font-body font-light hover:text-foreground transition-colors"
                    >
                      050 243 2037
                    </a>
                  </div>
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
                    We&apos;re Open 24/7
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
