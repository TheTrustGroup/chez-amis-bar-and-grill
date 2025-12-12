"use client"

import { MapPin, Navigation, Phone } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function MapSection() {
  const [isHovered, setIsHovered] = useState(false)

  // Chez Amis Bar and Grill location
  const restaurantAddress = "40 Boundary Rd, Accra, Ghana"
  const googleMapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4955103223842!2d-0.14888879037757927!3d5.641201894316414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf84aa959debd3%3A0x19c03e87c6e69ecc!2sChez%20Amis%20Bar%20and%20Grill!5e0!3m2!1sen!2sgh!4v1765127088179!5m2!1sen!2sgh"

  return (
    <section className="section-padding bg-cream-50" aria-labelledby="location-heading">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="location-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-foreground mb-3"
          >
            Visit Us
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4" />
          <p className="text-base md:text-lg text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Experience exceptional dining in the heart of Accra
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* LEFT: Interactive Map */}
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] group order-2 lg:order-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Google Maps Embed */}
            <iframe
              src={googleMapsEmbed}
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
            <div className="absolute inset-0 border-2 border-gold-500/20 rounded-xl pointer-events-none"></div>

            {/* Quick action buttons over map */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <a
                href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Get directions"
              >
                <Navigation className="w-5 h-5 text-amber-600" />
              </a>
              <a
                href="tel:+233557032312"
                className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Call restaurant"
              >
                <Phone className="w-5 h-5 text-amber-600" />
              </a>
            </div>

            {/* Hover effect overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity pointer-events-none rounded-xl",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          {/* RIGHT: Location Details - Simplified to avoid duplication */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            {/* Address Card - Only address info, no duplicate contact */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg border border-border/30 hover:border-gold-500/50 transition-colors">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gold-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-light text-foreground mb-2 text-base md:text-lg">Our Address</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body font-light mb-4">
                    40 Boundary Rd<br />
                    East Legon<br />
                    Accra, Greater Accra Region<br />
                    Ghana
                  </p>
                  <a
                    href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-heading font-light text-sm transition-colors min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Landmarks - Useful location context */}
            <div className="bg-gold-500/5 rounded-lg p-4 md:p-6 border border-gold-500/20">
              <h3 className="font-display font-light text-foreground mb-3 text-base md:text-lg">Nearby Landmarks</h3>
              <ul className="space-y-3 text-sm md:text-base text-muted-foreground font-body font-light">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>5 minutes from A&C Shopping Mall</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Opposite East Legon Executive Fitness Club</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>10 minutes from Kotoka International Airport</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info Bar */}
        <div className="mt-8 md:mt-12 bg-charcoal-900 text-cream-100 rounded-lg p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="py-2">
              <p className="text-gold-400 font-heading font-medium mb-1 text-sm md:text-base">Parking Available</p>
              <p className="text-xs md:text-sm text-cream-200/70 font-body font-light">Complimentary parking</p>
            </div>
            <div className="py-2">
              <p className="text-gold-400 font-heading font-medium mb-1 text-sm md:text-base">Wheelchair Accessible</p>
              <p className="text-xs md:text-sm text-cream-200/70 font-body font-light">All facilities accessible</p>
            </div>
            <div className="py-2">
              <p className="text-gold-400 font-heading font-medium mb-1 text-sm md:text-base">Private Dining</p>
              <p className="text-xs md:text-sm text-cream-200/70 font-body font-light">Rooms available for events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
