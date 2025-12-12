"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/components/ui/error-message"
import { venues } from "./VenueCard"

export function EventRequestForm() {
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    alternateDate: "",
    guests: "",
    spacePreference: "",
    budgetRange: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    additionalDetails: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) return

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
      // Submit to API route
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send event request')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          eventType: "",
          date: "",
          alternateDate: "",
          guests: "",
          spacePreference: "",
          budgetRange: "",
          name: "",
          email: "",
          phone: "",
          company: "",
          additionalDetails: "",
        })
      }, 5000)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Event request submission error:', error)
      }
      setError(error instanceof Error ? error.message : 'Failed to send event request. Please try again or call us directly.')
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.eventType &&
    formData.date &&
    formData.guests &&
    formData.name &&
    formData.email &&
    formData.phone

  if (isSubmitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-gold-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-light text-foreground">
          Thank You for Your Event Request
        </h3>
        <p className="text-muted-foreground font-body font-light">
          We&apos;ve received your event request and will contact you within 24 hours to discuss your event.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-display font-light text-foreground mb-4">
          Plan Your Event
        </h3>
        <div className="w-20 h-px bg-gold-500 mb-4"></div>
        <p className="text-muted-foreground font-body font-light mb-6 md:mb-8">
          Tell us about your vision, and we&apos;ll create a proposal tailored to your needs
        </p>
      </div>

      {/* Event Type */}
      <div>
        <Label htmlFor="eventType" className="font-heading font-light text-foreground mb-3 block">
          Event Type
        </Label>
        <select
          id="eventType"
          value={formData.eventType}
          onChange={(e) => handleFieldChange("eventType", e.target.value)}
          className="w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
          required
        >
          <option value="">Select event type</option>
          <option value="corporate">Corporate Event</option>
          <option value="wedding">Wedding & Reception</option>
          <option value="birthday">Birthday Celebration</option>
          <option value="anniversary">Anniversary</option>
          <option value="holiday">Holiday Party</option>
          <option value="shower">Bridal/Baby Shower</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="font-heading font-light text-foreground mb-3 block">
            Preferred Date
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleFieldChange("date", e.target.value)}
            className="border-border/50 focus:border-gold-500/50"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label htmlFor="alternateDate" className="font-heading font-light text-foreground mb-3 block">
            Alternate Date (Optional)
          </Label>
          <Input
            id="alternateDate"
            type="date"
            value={formData.alternateDate}
            onChange={(e) => handleFieldChange("alternateDate", e.target.value)}
            className="border-border/50 focus:border-gold-500/50"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      {/* Number of Guests */}
      <div>
        <Label htmlFor="guests" className="font-heading font-light text-foreground mb-3 block">
          Number of Guests
        </Label>
        <Input
          id="guests"
          type="number"
          value={formData.guests}
          onChange={(e) => handleFieldChange("guests", e.target.value)}
          className="border-border/50 focus:border-gold-500/50"
          placeholder="Expected number of guests"
          min="10"
          max="100"
          required
        />
      </div>

      {/* Space Preference */}
      <div>
        <Label htmlFor="spacePreference" className="font-heading font-light text-foreground mb-3 block">
          Space Preference
        </Label>
        <select
          id="spacePreference"
          value={formData.spacePreference}
          onChange={(e) => handleFieldChange("spacePreference", e.target.value)}
          className="w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
        >
          <option value="">No preference</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} ({venue.capacity})
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <Label htmlFor="budgetRange" className="font-heading font-light text-foreground mb-3 block">
          Budget Range (Optional)
        </Label>
        <select
          id="budgetRange"
          value={formData.budgetRange}
          onChange={(e) => handleFieldChange("budgetRange", e.target.value)}
          className="w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
        >
          <option value="">Prefer not to specify</option>
          <option value="under-5000">Under GH₵ 5,000</option>
          <option value="5000-10000">GH₵ 5,000 - 10,000</option>
          <option value="10000-20000">GH₵ 10,000 - 20,000</option>
          <option value="20000-50000">GH₵ 20,000 - 50,000</option>
          <option value="over-50000">Over GH₵ 50,000</option>
        </select>
      </div>

      {/* Contact Information */}
      <div className="pt-6 border-t border-border/50">
        <h4 className="text-xl font-display font-light text-foreground mb-6">
          Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="company" className="font-heading font-light text-foreground">
              Company/Organization (Optional)
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
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
            <Label htmlFor="phone" className="font-heading font-light text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              placeholder="055 703 2312"
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <Label htmlFor="additionalDetails" className="font-heading font-light text-foreground mb-3 block">
          Additional Details
        </Label>
        <Textarea
          id="additionalDetails"
          value={formData.additionalDetails}
          onChange={(e) => handleFieldChange("additionalDetails", e.target.value)}
          className="border-border/50 focus:border-gold-500/50 min-h-[120px]"
          placeholder="Tell us about your vision, special requirements, dietary needs, or any questions you have..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="pt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          size="lg"
          className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-base md:text-lg px-8 py-3 md:py-4 min-h-[48px] md:min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Request Proposal"}
        </Button>
        <p className="mt-3 text-xs md:text-sm text-muted-foreground font-body font-light text-center">
          We&apos;ll respond within 24 hours with a customized proposal
        </p>
      </div>
    </form>
  )
}

