"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/components/ui/error-message"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function ContactForm() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
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

    setIsSubmitting(true)
    setError(null)

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
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact form submission error:', error)
      }
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again or call us directly.')
      setIsSubmitting(false)
    }
  }

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
          "text-2xl md:text-3xl font-display font-light transition-colors duration-300",
          isDark ? "text-cream-100" : "text-foreground"
        )}>
          Thank You for Reaching Out
        </h3>
        <p className={cn(
          "text-base md:text-lg font-body font-light max-w-md mx-auto transition-colors duration-300",
          isDark ? "text-cream-200/80" : "text-muted-foreground"
        )}>
          We&apos;ve received your message and will respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div className="group">
          <Label 
            htmlFor="name" 
            className={cn(
              "font-heading font-medium mb-2 block transition-colors duration-300",
              "group-focus-within:text-gold-600",
              isDark ? "text-cream-200/90" : "text-foreground"
            )}
          >
            Your Name <span className="text-gold-600">*</span>
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
          />
        </div>

        <div className="group">
          <Label 
            htmlFor="email" 
            className={cn(
              "font-heading font-medium mb-2 block transition-colors duration-300",
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
          />
        </div>
      </div>

      <div className="group">
        <Label 
          htmlFor="phone" 
          className={cn(
            "font-heading font-medium mb-2 block transition-colors duration-300",
            "group-focus-within:text-gold-600",
            isDark ? "text-cream-200/90" : "text-foreground"
          )}
        >
          Phone <span className="text-muted-foreground font-normal">(Optional)</span>
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
        />
      </div>

      <div className="group">
        <Label 
          htmlFor="reason" 
          className={cn(
            "font-heading font-medium mb-2 block transition-colors duration-300",
            "group-focus-within:text-gold-600",
            isDark ? "text-cream-200/90" : "text-foreground"
          )}
        >
          Reason for Contacting <span className="text-gold-600">*</span>
        </Label>
        <select
          id="reason"
          value={formData.reason}
          onChange={(e) => handleFieldChange("reason", e.target.value)}
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
          <option value="">Select a reason</option>
          <option value="general">General Inquiry</option>
          <option value="reservation">Reservation Question</option>
          <option value="private-event">Private Event</option>
          <option value="feedback">Feedback</option>
          <option value="catering">Catering Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="group">
        <Label 
          htmlFor="message" 
          className={cn(
            "font-heading font-medium mb-2 block transition-colors duration-300",
            "group-focus-within:text-gold-600",
            isDark ? "text-cream-200/90" : "text-foreground"
          )}
        >
          Your Message <span className="text-gold-600">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleFieldChange("message", e.target.value)}
          className={cn(
            "rounded-lg border min-h-[140px] md:min-h-[150px] resize-none transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:border-gold-500/50",
            isDark
              ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40 focus:bg-charcoal-900/70"
              : "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background"
          )}
          placeholder="Tell us how we can help you..."
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="pt-2">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
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
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
        <p className={cn(
          "mt-3 text-xs md:text-sm font-body font-light text-center transition-colors duration-300",
          isDark ? "text-cream-200/60" : "text-muted-foreground"
        )}>
          We typically respond within 24 hours
        </p>
      </div>
    </form>
  )
}

