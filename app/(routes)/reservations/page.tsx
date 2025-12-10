"use client"

import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Clock, XCircle, Users } from "lucide-react"

export default function ReservationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[40vh] min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-cream-100 mb-4">
            Reserve Your Table
          </h1>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-cream-200/90 font-body font-light max-w-2xl mx-auto">
            An unforgettable dining experience awaits
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Reservation Form Card */}
          <div className="bg-cream-50 rounded-lg border border-border/30 p-6 md:p-8 lg:p-10 shadow-sm">
            <ReservationForm />
          </div>

          {/* Reservation Policies */}
          <div className="mt-10 md:mt-12 space-y-5">
            <h3 className="text-lg md:text-xl font-display font-light text-foreground mb-5">
              Reservation Policies
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground mb-1.5 text-sm md:text-base">
                    Reservations held for 15 minutes
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-body font-light leading-relaxed">
                    Please arrive on time. We may release your table if you&apos;re more than 15
                    minutes late.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5">
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground mb-1.5 text-sm md:text-base">
                    Cancellation policy: 24 hours notice
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-body font-light leading-relaxed">
                    Please cancel or modify your reservation at least 24 hours in advance to avoid
                    any charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground mb-1.5 text-sm md:text-base">
                    Groups of 8+: deposit required
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-body font-light leading-relaxed">
                    Large parties require a deposit to secure the reservation. We&apos;ll contact
                    you after booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



