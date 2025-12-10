"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          reason: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error('Contact form submission error:', error)
      setIsSubmitting(false)
      alert('Failed to send message. Please try again or call us directly.')
    }
  }

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
          Thank You for Reaching Out
        </h3>
        <p className="text-muted-foreground font-body font-light">
          We&apos;ve received your message and will respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <Label htmlFor="name" className="font-heading font-light text-foreground mb-2 block">
            Your Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="border-border/50 focus:border-gold-500/50"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="font-heading font-light text-foreground mb-2 block">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="border-border/50 focus:border-gold-500/50"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="font-heading font-light text-foreground mb-2 block">
          Phone <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleFieldChange("phone", e.target.value)}
          className="border-border/50 focus:border-gold-500/50"
              placeholder="024 395 2339"
        />
      </div>

      <div>
        <Label htmlFor="reason" className="font-heading font-light text-foreground mb-2 block">
          Reason for Contacting
        </Label>
        <select
          id="reason"
          value={formData.reason}
          onChange={(e) => handleFieldChange("reason", e.target.value)}
          className="w-full h-12 md:h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1 min-h-[44px]"
          required
        >
          <option value="">Select a reason</option>
          <option value="general">General Inquiry</option>
          <option value="reservation">Reservation Question</option>
          <option value="private-event">Private Event</option>
          <option value="feedback">Feedback</option>
          <option value="catering">Catering Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="font-heading font-light text-foreground mb-2 block">
          Your Message
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleFieldChange("message", e.target.value)}
          className="border-border/50 focus:border-gold-500/50 min-h-[140px] md:min-h-[150px] resize-none"
          placeholder="Tell us how we can help you..."
          required
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 min-h-[48px] md:min-h-[52px] text-base md:text-lg"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        <p className="mt-3 text-xs md:text-sm text-muted-foreground font-body font-light text-center">
          We typically respond within 24 hours
        </p>
      </div>
    </form>
  )
}

