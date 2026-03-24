"use client"

import { Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PHONE_LINES, SITE_EMAIL } from "@/lib/data/siteContact"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-gap-section max-w-4xl mx-auto">
      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-terra-500/30 transition-all duration-300 h-full flex flex-col">
        <CardContent className="card-padding space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-lg bg-terra-500/10 flex-shrink-0">
              <Phone className="h-5 w-5 md:h-6 md:w-6 text-terra-600" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-light text-foreground">
              Reach Us
            </h3>
          </div>

          <div className="space-y-5 flex-1">
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
                    <p className="text-neutral-800 font-body group-hover:text-terra-500 transition-colors">
                      {p.display}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-xs md:text-sm text-muted-foreground font-body font-light uppercase tracking-wide">
                  Email
                </p>
              </div>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="block text-base text-foreground font-body font-light hover:text-terra-600 transition-colors break-all mb-4"
              >
                {SITE_EMAIL}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/30 bg-background hover:shadow-elegant hover:border-terra-500/30 transition-all duration-300 h-full flex flex-col">
        <CardContent className="card-padding space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-lg bg-terra-500/10 flex-shrink-0">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-terra-600" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-light text-foreground">
              Hours
            </h3>
          </div>

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

          <p className="text-xs md:text-sm text-muted-foreground font-body font-light italic pt-4 border-t border-border/30 mt-auto">
            Always here to serve you
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
