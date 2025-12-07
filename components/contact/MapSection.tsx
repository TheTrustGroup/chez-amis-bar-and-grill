"use client"

import { MapPin, Navigation, Phone, Clock } from "lucide-react"
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
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="location-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Visit Us
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto mb-4" />
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Experience exceptional dining in the heart of Accra
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: Interactive Map */}
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group"
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

            {/* Floating "Open Now" indicator */}
            <div className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 shadow-lg z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-foreground">Open Now</span>
              </div>
            </div>

            {/* Quick action buttons over map */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <a
                href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
                aria-label="Get directions"
              >
                <Navigation className="w-5 h-5 text-amber-600" />
              </a>
              <a
                href="tel:+233243952339"
                className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
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

          {/* RIGHT: Location Details */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-border/30 hover:border-gold-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-light text-foreground mb-2 text-lg">Our Address</h3>
                  <p className="text-muted-foreground leading-relaxed font-body font-light">
                    40 Boundary Rd<br />
                    East Legon<br />
                    Accra, Greater Accra Region<br />
                    Ghana
                  </p>
                  <a
                    href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-gold-600 hover:text-gold-700 font-heading font-light text-sm transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-border/30 hover:border-gold-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-light text-foreground mb-3 text-lg">Opening Hours</h3>
                  <div className="space-y-2 text-sm font-body font-light">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily</span>
                      <span className="font-medium text-foreground">9:30 AM - 12:00 AM</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <span className="inline-flex items-center gap-2 text-green-600 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                      Open Now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-border/30 hover:border-gold-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-light text-foreground mb-2 text-lg">Contact Us</h3>
                  <div className="space-y-2 text-sm font-body font-light">
                    <a
                      href="tel:+233243952339"
                      className="block text-muted-foreground hover:text-gold-600 transition-colors"
                    >
                      +233 024 395 2339
                    </a>
                    <a
                      href="tel:+233502432037"
                      className="block text-muted-foreground hover:text-gold-600 transition-colors"
                    >
                      +233 050 243 2037
                    </a>
                    <a
                      href="mailto:info@chezamis.com"
                      className="block text-muted-foreground hover:text-gold-600 transition-colors"
                    >
                      info@chezamis.com
                    </a>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:+233243952339"
                      className="flex-1 bg-gold-500 text-white text-center py-2 px-4 rounded-md hover:bg-gold-600 transition-colors text-sm font-heading font-light"
                    >
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/233243952339"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-gold-500 text-gold-700 text-center py-2 px-4 rounded-md hover:bg-gold-50 transition-colors text-sm font-heading font-light"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="bg-gold-500/5 rounded-lg p-6 border border-gold-500/20">
              <h3 className="font-display font-light text-foreground mb-3 text-sm">Nearby Landmarks</h3>
              <ul className="space-y-2 text-sm text-muted-foreground font-body font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                  5 minutes from A&C Shopping Mall
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                  Opposite East Legon Executive Fitness Club
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                  10 minutes from Kotoka International Airport
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info Bar */}
        <div className="mt-12 bg-charcoal-900 text-cream-100 rounded-lg p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gold-400 font-heading font-medium mb-1">Parking Available</p>
              <p className="text-sm text-cream-200/70 font-body font-light">Complimentary parking</p>
            </div>
            <div>
              <p className="text-gold-400 font-heading font-medium mb-1">Wheelchair Accessible</p>
              <p className="text-sm text-cream-200/70 font-body font-light">All facilities accessible</p>
            </div>
            <div>
              <p className="text-gold-400 font-heading font-medium mb-1">Private Dining</p>
              <p className="text-sm text-cream-200/70 font-body font-light">Rooms available for events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
