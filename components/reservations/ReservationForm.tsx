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
import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export function ReservationForm() {
  const router = useRouter()
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

  const handleFieldChange = (field: string, value: string | SeatingPreference | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate reservation number
    const reservationNumber = generateReservationNumber()

    // In production, this would submit to your backend
    if (process.env.NODE_ENV === "development") {
      console.log("Reservation submitted:", {
        ...formData,
        reservationNumber,
      })
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to confirmation
    router.push(`/reservations/confirmation?number=${reservationNumber}`)
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Date & Time Selection */}
      <div>
        <h3 className="text-xl font-display font-light text-foreground mb-6">
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
        <Label htmlFor="partySize" className="font-heading font-light text-foreground mb-3 block">
          Number of Guests
        </Label>
        <select
          id="partySize"
          value={formData.partySize}
          onChange={(e) => handleFieldChange("partySize", e.target.value)}
          className="w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
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
          <p className="mt-2 text-sm text-muted-foreground font-body font-light">
            For parties of 12 or more, please{" "}
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
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
        <Label htmlFor="occasion" className="font-heading font-light text-foreground mb-3 block">
          Special Occasion (Optional)
        </Label>
        <select
          id="occasion"
          value={formData.occasion}
          onChange={(e) => handleFieldChange("occasion", e.target.value)}
          className="w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
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
          <div className="mt-4">
            <Label
              htmlFor="specialOccasionRequest"
              className="font-heading font-light text-foreground mb-2 block"
            >
              We&apos;d love to make it special! Any requests?
            </Label>
            <Textarea
              id="specialOccasionRequest"
              value={formData.specialOccasionRequest}
              onChange={(e) => handleFieldChange("specialOccasionRequest", e.target.value)}
              className="border-border/50 focus:border-gold-500/50 min-h-[80px]"
              placeholder="Cake, decorations, special menu items..."
            />
          </div>
        )}
      </div>

      {/* Guest Information */}
      <div className="pt-6 border-t border-border/50">
        <h3 className="text-xl font-display font-light text-foreground mb-6">
          Your Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-heading font-light text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="font-heading font-light text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              placeholder="024 395 2339"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="font-heading font-light text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              required
            />
          </div>

          <div>
            <Label htmlFor="specialRequests" className="font-heading font-light text-foreground">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleFieldChange("specialRequests", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50 min-h-[100px]"
              placeholder="Dietary restrictions, accessibility needs, or any other preferences..."
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          size="lg"
          className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-7"
        >
          {isSubmitting ? "Confirming..." : "Confirm Reservation"}
        </Button>
      </div>

      {/* Alternative Booking Options */}
      <div className="pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground font-body font-light mb-4 text-center">
          Prefer to book another way?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+233243952339"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-sm font-body font-light"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
          <a
            href="https://wa.me/233243952339"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-sm font-body font-light"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Reservation
          </a>
        </div>
      </div>
    </form>
  )
}
