"use client"

import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Clock, XCircle, Users } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/layout/PageIntro"

export default function ReservationsPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      <PageIntro title="Reserve Your Table" description="Book your table in seconds." />

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



