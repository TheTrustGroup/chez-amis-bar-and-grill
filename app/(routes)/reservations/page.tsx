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
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      {/* Hero Section - Premium */}
      <section className={cn(
        "relative flex min-h-[40vh] items-center justify-center overflow-hidden md:min-h-[45vh]",
        "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "hero-title tracking-tight mb-6 md:mb-8",
            "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Reserve Your Table
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light leading-relaxed max-w-3xl mx-auto",
            "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            An unforgettable dining experience awaits
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="mx-auto max-w-lg w-full">
            <div className={cn(
            "rounded-[var(--radius-lg)] border bg-white p-6 sm:p-8 shadow-[var(--shadow-md)] transition-all duration-300",
            isDark 
              ? "bg-green-600/50 border-green-700/50" 
              : "border-[var(--border)]"
          )}>
            <p
              className={cn(
                "mb-6 rounded-[var(--radius-md)] border px-4 py-3 text-center text-sm font-body leading-relaxed text-terra-600",
                isDark
                  ? "border-terra-500/30 bg-terra-500/5 text-terra-200"
                  : "border-terra-200 bg-terra-50",
              )}
              role="note"
            >
              For parties of 8 or more, please call us so we can confirm seating and arrangements.
            </p>
            <ReservationForm />
            </div>

          {/* Reservation Policies - Premium */}
          <div className={cn(
            "mt-10 md:mt-12 space-y-5 transition-colors duration-300",
            isDark ? "bg-green-600/30 rounded-xl p-6 md:p-8" : "bg-transparent"
          )}>
            <h3 className={cn(
              "text-lg md:text-xl font-display font-light mb-5 transition-colors duration-300",
              isDark ? "text-white" : "text-foreground"
            )}>
              Reservation Policies
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-terra-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-terra-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-white" : "text-foreground"
                  )}>
                    Reservations held for 15 minutes
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-white/70" : "text-muted-foreground"
                  )}>
                    Please arrive on time. We may release your table if you&apos;re more than 15
                    minutes late.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-terra-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-terra-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-white" : "text-foreground"
                  )}>
                    Cancellation policy: 24 hours notice
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-white/70" : "text-muted-foreground"
                  )}>
                    Please cancel or modify your reservation at least 24 hours in advance to avoid
                    any charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 group">
                <div className={cn(
                  "p-2 rounded-lg bg-terra-500/10 flex-shrink-0 mt-0.5 transition-all duration-300",
                  "group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-terra-600" />
                </div>
                <div>
                  <p className={cn(
                    "font-body font-medium mb-1.5 text-sm md:text-base transition-colors duration-300",
                    isDark ? "text-white" : "text-foreground"
                  )}>
                    Groups of 8+: deposit required
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-white/70" : "text-muted-foreground"
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
      </section>
    </div>
  )
}



