"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Navigation, Calendar, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import { PHONE_LINES, SITE_ADDRESS_LINES } from "@/lib/data/siteContact"

export function VisitUsSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section className={cn(
      "section-shell transition-colors duration-300",
      isDark ? "bg-green-700/50" : "bg-background"
    )} aria-labelledby="visit-heading">
      <div className="section-shell-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
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
            <div className="absolute inset-0 border-2 border-terra-500/20 rounded-lg pointer-events-none"></div>
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

          <div className="space-y-8 md:space-y-10">
            <div>
              <h2
                id="visit-heading"
                className="section-title text-foreground mb-4"
              >
                We&apos;re Ready to Welcome You
              </h2>
              <div className="w-20 h-px bg-terra-500 mb-6"></div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-6 w-6 text-terra-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-body font-light text-foreground mb-2">
                    Address
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
                    {SITE_ADDRESS_LINES[0]}<br />
                    {SITE_ADDRESS_LINES[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-6 w-6 text-terra-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-body font-light text-foreground mb-2">
                    Phone
                  </h3>
                  <div className="space-y-4">
                    {PHONE_LINES.map((p) => (
                      <a
                        key={p.id}
                        href={`tel:${p.tel}`}
                        className="flex items-start gap-3 group"
                      >
                        <Phone className="w-4 h-4 text-terra-500 mt-0.5 flex-shrink-0" aria-hidden />
                        <div>
                          <p className="text-xs text-neutral-400 uppercase tracking-widest font-body">
                            {p.label}
                          </p>
                          <p className="text-base md:text-lg text-neutral-800 font-body group-hover:text-terra-500 transition-colors">
                            {p.display}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-terra-500 flex-shrink-0" aria-hidden />
                  <div>
                    <p className="font-body text-sm text-neutral-500 uppercase tracking-widest">
                      Hours
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                        Open now
                      </span>
                      <span className="font-body text-neutral-800 text-sm">
                        24 hours, 7 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "flex flex-col sm:flex-row gap-4 md:gap-6 pt-6",
              "animate-fade-in-up"
            )} style={{ animationDelay: "0.4s" }}>
              <Link href="/reservations" className="flex-1 sm:flex-none group/reserve">
                <Button
                  variant="premium"
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto min-w-[200px]",
                    "shadow-xl hover:shadow-2xl hover:shadow-terra-500/40"
                  )}
                  aria-label="Make a Reservation"
                >
                  <Calendar className="h-5 w-5" />
                  Make a Reservation
                </Button>
              </Link>

              <Link href="/menu" className="flex-1 sm:flex-none group/order">
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto min-w-[200px]",
                    "border-2",
                    isDark
                      ? "border-terra-500/50 text-white bg-terra-500/5 hover:bg-terra-500/10 hover:border-terra-500/80 hover:shadow-lg hover:shadow-terra-500/20"
                      : "border-terra-500/60 text-foreground bg-transparent hover:bg-terra-500/5 hover:border-terra-500/80 hover:shadow-lg"
                  )}
                  aria-label="Browse menu to order"
                >
                  <UtensilsCrossed className="h-5 w-5" />
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
