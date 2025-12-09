"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In production, this would submit to your email service
    // In production, this would send to your API

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h4 className="text-lg font-display font-light text-cream-100 mb-2">
          Join our table
        </h4>
        <p className="text-sm text-cream-200/70 font-body font-light mb-4">
          Exclusive offers and culinary updates
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-sm text-gold-400 font-body font-light">
          Thank you for subscribing! Check your email to confirm.
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="flex-1 bg-charcoal-800/50 border-charcoal-700 text-cream-100 placeholder:text-cream-200/40 focus:border-gold-500/50 focus:ring-gold-500/20 font-body min-h-[44px]"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gold-500 text-charcoal-900 hover:bg-gold-600 active:bg-gold-700 font-heading font-light tracking-wide px-6 min-h-[44px] touch-manipulation"
          >
            {isSubmitting ? "..." : "Subscribe"}
          </Button>
        </div>
      )}
    </form>
  )
}

