"use client"

import { MapPin } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function MapSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="section-padding bg-background" aria-label="Location map">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-light text-foreground mb-4">
            Find Us
          </h2>
          <p className="text-lg text-muted-foreground font-body font-light">
            We&apos;re located in the heart of Accra&apos;s Food District
          </p>
        </div>

        <div
          className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-border/30"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Embedded Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.2!3d5.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMDAuMCJOIDDCsDEyJzAwLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890123!5m2!1sen!2sgh&q=40+Boundary+Rd+Accra"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Chez Amis Bar and Grill Location"
          />

          {/* Custom Info Card (appears on hover) */}
          <div
            className={cn(
              "absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-elegant border border-border/30 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold-500/10 flex-shrink-0">
                <MapPin className="h-5 w-5 text-gold-600" />
              </div>
              <div>
                <h3 className="font-display font-light text-foreground mb-1">
                  Chez Amis Bar and Grill
                </h3>
                <p className="text-sm text-muted-foreground font-body font-light mb-2">
                  40 Boundary Rd<br />
                  Accra, Ghana
                </p>
                <a
                  href="https://maps.google.com/?q=123+Culinary+Avenue+Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

