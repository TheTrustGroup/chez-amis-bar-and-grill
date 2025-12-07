"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, MapPin, Users, UtensilsCrossed, Sun, Wine } from "lucide-react"
import { cn } from "@/lib/utils"

function ReservationConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reservationNumber = searchParams.get("number") || "RES-2024-0000"
  const [isAnimating, setIsAnimating] = useState(true)

  // Simulate reservation data (in production, fetch from API using reservation number)
  const [reservationData] = useState({
    name: "Sarah Mensah",
    date: "2024-12-25",
    time: "19:00",
    partySize: 4,
    seating: "main-dining" as "main-dining" | "outdoor" | "bar" | "private",
    occasion: "anniversary",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getSeatingLabel = () => {
    switch (reservationData.seating) {
      case "main-dining":
        return "Main Dining Room"
      case "outdoor":
        return "Outdoor Terrace"
      case "bar":
        return "Bar Area"
      case "private":
        return "Private Room"
      default:
        return "Main Dining Room"
    }
  }

  const getSeatingIcon = () => {
    switch (reservationData.seating) {
      case "main-dining":
        return UtensilsCrossed
      case "outdoor":
        return Sun
      case "bar":
        return Wine
      default:
        return UtensilsCrossed
    }
  }

  const SeatingIcon = getSeatingIcon()

  // Generate calendar links
  const startDate = new Date(`${reservationData.date}T${reservationData.time}`)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours later

  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reservation at Chez Amis&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=Reservation for ${reservationData.partySize} guests at Chez Amis Bar and Grill&location=40 Boundary Rd, Accra, Ghana`

  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=Reservation at Chez Amis&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=Reservation for ${reservationData.partySize} guests at Chez Amis Bar and Grill&location=40 Boundary Rd, Accra, Ghana`

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container-custom max-w-3xl">
        <div className="text-center space-y-8">
          {/* Success Animation */}
          <div className="flex justify-center">
            <div
              className={cn(
                "relative transition-all duration-500",
                isAnimating ? "scale-110" : "scale-100"
              )}
            >
              <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center">
                <CheckCircle2
                  className={cn(
                    "h-12 w-12 text-gold-600 transition-all duration-500",
                    isAnimating ? "scale-0" : "scale-100"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground">
              Reservation Confirmed!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light">
              Thank you, {reservationData.name}. We look forward to welcoming you.
            </p>
          </div>

          {/* Reservation Number */}
          <div className="bg-cream-50 rounded-lg p-6 border border-border/30">
            <p className="text-sm text-muted-foreground font-body font-light mb-2">
              Reservation Number
            </p>
            <p className="text-2xl font-display font-light text-foreground">
              #{reservationNumber}
            </p>
          </div>

          {/* Reservation Details */}
          <div className="bg-cream-50 rounded-lg p-6 md:p-8 border border-border/30 text-left space-y-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-body font-light">Date & Time</p>
                <p className="font-display font-light text-foreground">
                  {formatDate(reservationData.date)}
                </p>
                <p className="font-body font-light text-foreground">
                  {formatTime(reservationData.time)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-body font-light">Party Size</p>
                <p className="font-display font-light text-foreground">
                  {reservationData.partySize} {reservationData.partySize === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <SeatingIcon className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-body font-light">
                  Table Location
                </p>
                <p className="font-display font-light text-foreground">{getSeatingLabel()}</p>
              </div>
            </div>

            {reservationData.occasion && (
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground font-body font-light">Occasion</p>
                  <p className="font-display font-light text-foreground capitalize">
                    {reservationData.occasion.replace("-", " ")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Add to Calendar */}
          <div className="bg-cream-50 rounded-lg p-6 border border-border/30">
            <h3 className="text-lg font-display font-light text-foreground mb-4">
              Add to Calendar
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-sm font-body font-light text-center"
              >
                Google Calendar
              </a>
              <a
                href={outlookCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-sm font-body font-light text-center"
              >
                Outlook
              </a>
              <a
                href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${formatDateForCalendar(startDate)}%0ADTEND:${formatDateForCalendar(endDate)}%0ASUMMARY:Reservation at Chez Amis%0ADESCRIPTION:Reservation for ${reservationData.partySize} guests%0ALOCATION:40 Boundary Rd, Accra, Ghana%0AEND:VEVENT%0AEND:VCALENDAR`}
                download="chef-amis-reservation.ics"
                className="px-4 py-2 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-sm font-body font-light text-center"
              >
                Apple Calendar
              </a>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="bg-cream-50 rounded-lg p-6 border border-border/30">
            <p className="text-sm text-muted-foreground font-body font-light">
              A confirmation email has been sent to your email address with all the details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/menu">
              <Button
                variant="outline"
                size="lg"
                className="font-heading font-light tracking-wide border-gold-500/60 w-full sm:w-auto"
              >
                Back to Menu
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              className="font-heading font-light tracking-wide w-full sm:w-auto"
              onClick={() => router.push("/reservations")}
            >
              Modify Reservation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="font-heading font-light tracking-wide text-muted-foreground hover:text-destructive w-full sm:w-auto"
            >
              Cancel Reservation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReservationConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground font-body font-light">Loading...</p>
          </div>
        </div>
      }
    >
      <ReservationConfirmationContent />
    </Suspense>
  )
}

