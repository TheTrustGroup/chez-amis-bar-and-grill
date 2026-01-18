"use client"

import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Clock, XCircle, Users } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

export default function ReservationsPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-charcoal-950" : "bg-background"
    )}>
      {/* Hero Section - Premium */}
      <section className={cn(
        "relative h-[40vh] md:h-[45vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-display font-light mb-6 md:mb-8",
            "text-cream-100 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Reserve Your Table
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-gold-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light leading-relaxed max-w-3xl mx-auto",
            "text-cream-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            An unforgettable dining experience awaits
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Reservation Form Card - Premium */}
          <div className={cn(
            "rounded-xl border p-6 md:p-8 lg:p-10 shadow-lg transition-all duration-300",
            isDark 
              ? "bg-charcoal-900/50 border-charcoal-800/50" 
              : "bg-cream-50 border-border/30"
          )}>
            <ReservationForm />
          </div>

          {/* Reservation Policies - Premium */}
          <div className={cn(
            "mt-10 md:mt-12 space-y-5 transition-colors duration-300",
            isDark ? "bg-charcoal-900/30 rounded-xl p-6 md:p-8" : "bg-transparent"
          )}>
            <h3 className={cn(
              "text-lg md:text-xl font-display font-light mb-5 transition-colors duration-300",
              isDark ? "text-cream-100" : "text-foreground"
            )}>
              Reservation Policies
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-cream-100" : "text-foreground"
                  )}>
                    Reservations held for 15 minutes
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-cream-200/70" : "text-muted-foreground"
                  )}>
                    Please arrive on time. We may release your table if you&apos;re more than 15
                    minutes late.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-cream-100" : "text-foreground"
                  )}>
                    Cancellation policy: 24 hours notice
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-cream-200/70" : "text-muted-foreground"
                  )}>
                    Please cancel or modify your reservation at least 24 hours in advance to avoid
                    any charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-gold-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-cream-100" : "text-foreground"
                  )}>
                    Groups of 8+: deposit required
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-cream-200/70" : "text-muted-foreground"
                  )}>
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



