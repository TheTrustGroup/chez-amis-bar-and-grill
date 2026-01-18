"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DateTimePicker } from "./DateTimePicker"
import { SeatingSelector, type SeatingPreference } from "./SeatingSelector"
import { generateReservationNumber } from "@/lib/utils/reservationAvailability"
import { ErrorMessage } from "@/components/ui/error-message"
import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function ReservationForm() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: "",
    seating: null as SeatingPreference | null,
    occasion: "",
    specialOccasionRequest: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFieldChange = (field: string, value: string | SeatingPreference | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) return
    
    // Validate form
    if (!isFormValid) {
      setError("Please fill in all required fields")
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate phone
    const phoneCleaned = formData.phone.replace(/\D/g, '')
    if (phoneCleaned.length < 9) {
      setError("Please enter a valid phone number")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Generate reservation number
      const reservationNumber = generateReservationNumber()

      // Submit to API route
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationNumber,
          customer: {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.partySize),
          seatingPreference: formData.seating,
          occasion: formData.occasion || undefined,
          specialRequests: formData.specialRequests || formData.specialOccasionRequest || undefined,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit reservation')
      }

      // Show success message before redirecting
      setIsSubmitted(true)
      setIsSubmitting(false)
      
      // Navigate to confirmation after a brief delay
      setTimeout(() => {
        router.push(`/reservations/confirmation?number=${reservationNumber}`)
      }, 2000)
    } catch (error) {
      // Handle any errors
      if (process.env.NODE_ENV === 'development') {
        console.error("Reservation submission error:", error)
      }
      setError(error instanceof Error ? error.message : "Failed to submit reservation. Please try again or call us directly.")
      setIsSubmitting(false)
    }
  }

  // Success confirmation message
  if (isSubmitted) {
    return (
      <div className={cn(
        "text-center py-12 md:py-16 space-y-6 animate-fade-in",
        isDark ? "bg-charcoal-900/30 rounded-xl" : "bg-cream-50/50 rounded-xl"
      )}>
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-500",
          "bg-gold-500/10 border-2 border-gold-500/30",
          "animate-scale-in"
        )}>
          <CheckCircle2 className="w-10 h-10 text-gold-600" />
        </div>
        <h3 className={cn(
          "text-2xl md:text-3xl font-display font-light",
          isDark ? "text-cream-100" : "text-foreground"
        )}>
          Reservation Confirmed!
        </h3>
        <p className={cn(
          "text-base md:text-lg font-body font-light max-w-md mx-auto",
          isDark ? "text-cream-200/80" : "text-muted-foreground"
        )}>
          Your reservation has been successfully submitted. You&apos;ll receive a confirmation email shortly.
        </p>
        <p className={cn(
          "text-sm font-body font-light",
          isDark ? "text-cream-200/60" : "text-muted-foreground"
        )}>
          Redirecting to confirmation page...
        </p>
      </div>
    )
  }

  const isFormValid =
    formData.date &&
    formData.time &&
    formData.partySize &&
    formData.seating &&
    formData.name &&
    formData.phone &&
    formData.email

  const partySizeNum = parseInt(formData.partySize) || 0
  const showLargePartyNote = partySizeNum >= 12
  const showSpecialOccasionRequest =
    formData.occasion === "birthday" || formData.occasion === "anniversary"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      {/* Date & Time Selection */}
      <div>
        <h3 className={cn(
          "text-lg md:text-xl font-display font-light mb-5 transition-colors duration-300",
          isDark ? "text-cream-100" : "text-foreground"
        )}>
          Date & Time
        </h3>
        <DateTimePicker
          selectedDate={formData.date}
          selectedTime={formData.time}
          onDateChange={(date) => handleFieldChange("date", date)}
          onTimeChange={(time) => handleFieldChange("time", time)}
        />
      </div>

      {/* Party Size */}
      <div>
        <Label 
          htmlFor="partySize" 
          className={cn(
            "font-heading font-medium mb-2.5 block text-sm md:text-base transition-colors duration-300",
            "peer-focus-within:text-gold-600",
            isDark ? "text-cream-200/90" : "text-foreground"
          )}
        >
          Number of Guests <span className="text-gold-600">*</span>
        </Label>
        <select
          id="partySize"
          value={formData.partySize}
          onChange={(e) => handleFieldChange("partySize", e.target.value)}
          className={cn(
            "w-full h-12 md:h-10 rounded-lg border px-3 py-2 text-base md:text-sm",
            "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
            "transition-all duration-300 min-h-[44px] touch-manipulation",
            isDark
              ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 focus:bg-charcoal-900/70"
              : "bg-background border-border/50 text-foreground focus:bg-background"
          )}
          required
        >
          <option value="">Select number of guests</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {showLargePartyNote && (
          <p className={cn(
            "mt-2 text-sm font-body font-light transition-colors duration-300",
            isDark ? "text-cream-200/70" : "text-muted-foreground"
          )}>
            For parties of 12 or more, please{" "}
            <Link
              href="/contact"
              className={cn(
                "underline underline-offset-2 transition-colors duration-300",
                isDark ? "text-gold-400 hover:text-gold-300" : "text-gold-600 hover:text-gold-700"
              )}
            >
              contact us
            </Link>{" "}
            for special arrangements.
          </p>
        )}
      </div>

      {/* Seating Preference */}
      <div>
        <SeatingSelector
          selectedSeating={formData.seating}
          onSelect={(seating) => handleFieldChange("seating", seating)}
          partySize={partySizeNum}
        />
      </div>

      {/* Occasion */}
      <div>
        <Label 
          htmlFor="occasion" 
          className={cn(
            "font-heading font-medium mb-2.5 block text-sm md:text-base transition-colors duration-300",
            isDark ? "text-cream-200/90" : "text-foreground"
          )}
        >
          Special Occasion <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <select
          id="occasion"
          value={formData.occasion}
          onChange={(e) => handleFieldChange("occasion", e.target.value)}
          className={cn(
            "w-full h-12 md:h-10 rounded-lg border px-3 py-2 text-base md:text-sm",
            "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
            "transition-all duration-300 min-h-[44px] touch-manipulation",
            isDark
              ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 focus:bg-charcoal-900/70"
              : "bg-background border-border/50 text-foreground focus:bg-background"
          )}
        >
          <option value="">None</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business Dinner</option>
          <option value="date-night">Date Night</option>
          <option value="celebration">Celebration</option>
          <option value="other">Other</option>
        </select>
        {showSpecialOccasionRequest && (
          <div className="mt-4 animate-fade-in">
            <Label
              htmlFor="specialOccasionRequest"
              className={cn(
                "font-heading font-medium mb-2 block text-sm md:text-base transition-colors duration-300",
                isDark ? "text-cream-200/90" : "text-foreground"
              )}
            >
              We&apos;d love to make it special! Any requests?
            </Label>
            <Textarea
              id="specialOccasionRequest"
              value={formData.specialOccasionRequest}
              onChange={(e) => handleFieldChange("specialOccasionRequest", e.target.value)}
              className={cn(
                "rounded-lg border min-h-[100px] resize-none transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
                isDark
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
                  : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
              )}
              placeholder="Cake, decorations, special menu items..."
            />
          </div>
        )}
      </div>

      {/* Guest Information */}
      <div className={cn(
        "pt-6 border-t transition-colors duration-300",
        isDark ? "border-charcoal-800/50" : "border-border/50"
      )}>
        <h3 className={cn(
          "text-lg md:text-xl font-display font-light mb-5 transition-colors duration-300",
          isDark ? "text-cream-100" : "text-foreground"
        )}>
          Your Information
        </h3>
        <div className="space-y-5">
          <div className="group">
            <Label 
              htmlFor="name" 
              className={cn(
                "font-heading font-medium mb-2 block text-sm md:text-base transition-colors duration-300",
                "group-focus-within:text-gold-600",
                isDark ? "text-cream-200/90" : "text-foreground"
              )}
            >
              Full Name <span className="text-gold-600">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className={cn(
                "rounded-lg border transition-all duration-300 min-h-[44px]",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
                isDark
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
                  : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
              )}
              required
              aria-label="Enter your full name"
            />
          </div>

          <div className="group">
            <Label 
              htmlFor="phone" 
              className={cn(
                "font-heading font-medium mb-2 block text-sm md:text-base transition-colors duration-300",
                "group-focus-within:text-gold-600",
                isDark ? "text-cream-200/90" : "text-foreground"
              )}
            >
              Phone Number <span className="text-gold-600">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className={cn(
                "rounded-lg border transition-all duration-300 min-h-[44px]",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
                isDark
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
                  : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
              )}
              placeholder="055 703 2312"
              required
              aria-label="Enter your phone number"
            />
          </div>

          <div className="group">
            <Label 
              htmlFor="email" 
              className={cn(
                "font-heading font-medium mb-2 block text-sm md:text-base transition-colors duration-300",
                "group-focus-within:text-gold-600",
                isDark ? "text-cream-200/90" : "text-foreground"
              )}
            >
              Email Address <span className="text-gold-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={cn(
                "rounded-lg border transition-all duration-300 min-h-[44px]",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
                isDark
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
                  : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
              )}
              required
              aria-label="Enter your email address"
            />
          </div>

          <div className="group">
            <Label 
              htmlFor="specialRequests" 
              className={cn(
                "font-heading font-medium mb-2 block text-sm md:text-base transition-colors duration-300",
                "group-focus-within:text-gold-600",
                isDark ? "text-cream-200/90" : "text-foreground"
              )}
            >
              Special Requests <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleFieldChange("specialRequests", e.target.value)}
              className={cn(
                "rounded-lg border min-h-[100px] resize-none transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
                isDark
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
                  : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
              )}
              placeholder="Dietary restrictions, accessibility needs, or any other preferences..."
              aria-label="Enter any special requests"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="pt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {/* Submit Button - Premium */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          variant="premium"
          size="lg"
          className={cn(
            "w-full font-heading font-semibold tracking-wide text-base md:text-lg",
            "px-8 py-3 md:py-4 min-h-[52px] md:min-h-[56px]",
            "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            "shadow-xl hover:shadow-2xl hover:shadow-gold-500/30",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Confirming...
            </span>
          ) : (
            "Confirm Reservation"
          )}
        </Button>
        <p className={cn(
          "mt-3 text-xs md:text-sm font-body font-light text-center transition-colors duration-300",
          isDark ? "text-cream-200/60" : "text-muted-foreground"
        )}>
          You&apos;ll receive a confirmation email shortly
        </p>
      </div>

      {/* Alternative Booking Options */}
      <div className={cn(
        "pt-5 border-t transition-colors duration-300",
        isDark ? "border-charcoal-800/50" : "border-border/50"
      )}>
        <p className={cn(
          "text-xs md:text-sm font-body font-light mb-4 text-center transition-colors duration-300",
          isDark ? "text-cream-200/70" : "text-muted-foreground"
        )}>
          Prefer to book another way?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+233557032312"
            className={cn(
              "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300",
              "text-sm font-body font-medium min-h-[44px] touch-manipulation",
              "hover:scale-105 active:scale-95",
              isDark
                ? "border-charcoal-700/50 text-cream-200/70 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                : "border-border/50 text-foreground hover:border-gold-500/50 hover:bg-gold-500/5"
            )}
            aria-label="Call us to make a reservation"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
          <a
            href="https://wa.me/233557032312"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300",
              "text-sm font-body font-medium min-h-[44px] touch-manipulation",
              "hover:scale-105 active:scale-95",
              isDark
                ? "border-charcoal-700/50 text-cream-200/70 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                : "border-border/50 text-foreground hover:border-gold-500/50 hover:bg-gold-500/5"
            )}
            aria-label="Reserve via WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </form>
  )
}
