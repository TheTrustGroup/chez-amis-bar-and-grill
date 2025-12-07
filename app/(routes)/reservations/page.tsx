"use client"

import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Clock, XCircle, Users } from "lucide-react"

export default function ReservationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900">
          {/* In production, use Next.js Image */}
          {/* <Image
            src="/images/dining-room.jpg"
            alt="Elegant dining room"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-4xl">
            Elegant Dining Room
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-cream-100 mb-4">
            Reserve Your Table
          </h1>
          <p className="text-lg md:text-xl text-cream-200/90 font-body font-light">
            An unforgettable dining experience awaits
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Reservation Form Card */}
          <div className="bg-background rounded-lg border border-border/30 p-6 md:p-8 lg:p-12 shadow-soft">
            <ReservationForm />
          </div>

          {/* Reservation Policies */}
          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-display font-light text-foreground mb-6">
              Reservation Policies
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-light text-foreground mb-1">
                    Reservations held for 15 minutes
                  </p>
                  <p className="text-sm text-muted-foreground font-body font-light">
                    Please arrive on time. We may release your table if you&apos;re more than 15
                    minutes late.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-light text-foreground mb-1">
                    Cancellation policy: 24 hours notice
                  </p>
                  <p className="text-sm text-muted-foreground font-body font-light">
                    Please cancel or modify your reservation at least 24 hours in advance to avoid
                    any charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-light text-foreground mb-1">
                    Groups of 8+: deposit required
                  </p>
                  <p className="text-sm text-muted-foreground font-body font-light">
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



