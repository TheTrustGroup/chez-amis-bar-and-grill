"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {/* Visit Us */}
      <Card className="border-0 bg-background hover:shadow-elegant transition-all duration-500">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gold-500/10">
              <MapPin className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-light text-foreground">
              Visit Us
            </h3>
          </div>

          <div className="space-y-2 text-base text-foreground font-body font-light leading-relaxed">
            <p>40 Boundary Rd</p>
            <p>Accra, Ghana</p>
          </div>

          <Link
            href="https://maps.google.com/?q=40+Boundary+Rd+Accra+Ghana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors"
          >
            Get Directions
          </Link>

          {/* Exterior Photo */}
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden mt-6 border border-border/30">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
              {/* In production, use Next.js Image */}
              {/* <Image
                src="/images/restaurant-exterior.jpg"
                alt="Chez Amis exterior"
                fill
                className="object-cover"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-lg">
                Restaurant Exterior
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reach Us */}
      <Card className="border-0 bg-background hover:shadow-elegant transition-all duration-500">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gold-500/10">
              <Phone className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-light text-foreground">
              Reach Us
            </h3>
          </div>

          <div className="space-y-6">
            {/* Phone */}
            <div>
              <p className="text-sm text-muted-foreground font-body font-light mb-2">Phone</p>
              <a
                href="tel:+233243952339"
                className="text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
              >
                024 395 2339
              </a>
              <p className="text-sm text-muted-foreground font-body font-light mt-1">
                050 243 2037
              </p>
              <p className="mt-1">
                <a
                  href="tel:+233243952339"
                  className="text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors"
                >
                  Call us
                </a>
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground font-body font-light">Email</p>
              </div>
              <div className="space-y-2">
                <a
                  href="mailto:info@chezamis.com"
                  className="block text-base text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  info@chezamis.com
                </a>
                <a
                  href="mailto:reservations@chezamis.com"
                  className="block text-base text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  reservations@chezamis.com
                </a>
              </div>
              <p className="mt-2">
                <a
                  href="mailto:info@chezamis.com"
                  className="text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors"
                >
                  Send email
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours */}
      <Card className="border-0 bg-background hover:shadow-elegant transition-all duration-500">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gold-500/10">
              <Clock className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-light text-foreground">
              Hours
            </h3>
          </div>

          <div className="space-y-3 text-base text-foreground font-body font-light">
            <div>
              <p className="font-medium mb-1">Daily</p>
              <p>9:30 AM - 12:00 AM</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-body font-light italic pt-4 border-t border-border/30">
            Closed on major holidays
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

