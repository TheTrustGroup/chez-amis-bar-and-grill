"use client"

import { Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
      {/* Reach Us */}
      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-6 md:p-8 space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-lg bg-gold-500/10 flex-shrink-0">
              <Phone className="h-5 w-5 md:h-6 md:w-6 text-gold-600" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-light text-foreground">
              Reach Us
            </h3>
          </div>

          <div className="space-y-5 flex-1">
            {/* Phone */}
            <div>
              <p className="text-xs md:text-sm text-muted-foreground font-body font-light mb-2 uppercase tracking-wide">Phone</p>
              <div className="space-y-2 mb-4">
                <a
                  href="tel:+233557032312"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  +233 055 703 2312
                </a>
                <a
                  href="tel:+233557032335"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  +233 055 703 2335
                </a>
                <a
                  href="tel:+233243952339"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  +233 024 395 2339
                </a>
                <a
                  href="tel:+233502432037"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  +233 050 243 2037
                </a>
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-xs md:text-sm text-muted-foreground font-body font-light uppercase tracking-wide">Email</p>
              </div>
              <a
                href="mailto:chez@chezamisrestaurant.com"
                className="block text-base text-foreground font-body font-light hover:text-gold-600 transition-colors break-words mb-4"
              >
                chez@chezamisrestaurant.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours */}
      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-6 md:p-8 space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-lg bg-gold-500/10 flex-shrink-0">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-gold-600" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-light text-foreground">
              Hours
            </h3>
          </div>

          <div className="space-y-3 text-base md:text-lg text-foreground font-body font-light flex-1">
            <div>
              <p className="text-muted-foreground mb-2">We&apos;re Open</p>
              <p className="text-2xl md:text-3xl text-gold-600 font-display font-light">24/7</p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground font-body font-light italic pt-4 border-t border-border/30 mt-auto">
            Always here to serve you
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

