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
            "nav-page-heading md:text-5xl tracking-tight mb-4 md:mb-6",
            "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Reserve Your Table
          </h1>
          <div className="w-20 md:w-28 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-4 md:mb-6 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "nav-page-subheading max-w-3xl mx-auto text-white/90 md:text-lg",
            "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            Book your table in seconds
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="mx-auto max-w-lg w-full">
            <div className={cn(
            "ui-card-compact p-6 sm:p-8 transition-all duration-300",
            isDark 
              ? "bg-green-600/50 border-green-700/50" 
              : "bg-card"
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

          {/* Reservation Policies */}
          <div className={cn(
            "ui-card-compact mt-8 md:mt-10 space-y-3 p-5 md:p-6 transition-colors duration-300",
            isDark ? "bg-green-600/30 border-green-700/50" : "bg-card"
          )}>
            <h3 className={cn(
              "text-base md:text-lg font-display font-light mb-2 transition-colors duration-300",
              isDark ? "text-white" : "text-foreground"
            )}>
              Reservation Policies
            </h3>
            <div id="reservation-policies" className="space-y-2">
              <p className={cn("flex items-center gap-2 text-sm font-body font-light", isDark ? "text-white/80" : "text-muted-foreground")}>
                <Clock className="h-4 w-4 text-terra-600" />
                Tables are held for 15 minutes.
              </p>
              <p className={cn("flex items-center gap-2 text-sm font-body font-light", isDark ? "text-white/80" : "text-muted-foreground")}>
                <XCircle className="h-4 w-4 text-terra-600" />
                Cancellations need 24 hours notice.
              </p>
              <p className={cn("flex items-center gap-2 text-sm font-body font-light", isDark ? "text-white/80" : "text-muted-foreground")}>
                <Users className="h-4 w-4 text-terra-600" />
                Groups of 8+ may require a deposit.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}



