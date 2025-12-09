"use client"

import { Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
      {/* Reach Us */}
      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-gold-500/30 transition-all duration-500 h-full flex flex-col">
        <CardContent className="p-6 md:p-8 lg:p-10 space-y-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gold-500/10 flex-shrink-0">
              <Phone className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-light text-foreground">
              Reach Us
            </h3>
          </div>

          <div className="space-y-6 flex-1">
            {/* Phone */}
            <div>
              <p className="text-sm text-muted-foreground font-body font-light mb-2">Phone</p>
              <div className="space-y-1">
                <a
                  href="tel:+233243952339"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  024 395 2339
                </a>
                <a
                  href="tel:+233502432037"
                  className="block text-base md:text-lg text-foreground font-body font-light hover:text-gold-600 transition-colors"
                >
                  050 243 2037
                </a>
              </div>
              <p className="mt-3">
                <a
                  href="tel:+233243952339"
                  className="inline-flex items-center gap-2 text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors min-h-[44px]"
                >
                  Call us
                </a>
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground font-body font-light">Email</p>
              </div>
              <div className="space-y-2 mb-3">
                <a
                  href="mailto:chez@chezamisrestaurant.com"
                  className="block text-base text-foreground font-body font-light hover:text-gold-600 transition-colors break-words"
                >
                  chez@chezamisrestaurant.com
                </a>
              </div>
              <p>
                <a
                  href="mailto:chez@chezamisrestaurant.com"
                  className="inline-flex items-center gap-2 text-sm font-heading font-light tracking-wide text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors min-h-[44px]"
                >
                  Send email
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours */}
      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-gold-500/30 transition-all duration-500 h-full flex flex-col">
        <CardContent className="p-6 md:p-8 lg:p-10 space-y-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gold-500/10 flex-shrink-0">
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

