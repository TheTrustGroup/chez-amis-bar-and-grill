"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface GuestInformationProps {
  formData: {
    fullName?: string
    phone?: string
    email?: string
    specialRequests?: string
  }
  onFieldChange: (field: string, value: string) => void
  fieldErrors?: {
    fullName?: string
    phone?: string
    email?: string
  }
}

export function GuestInformation({ formData, onFieldChange, fieldErrors }: GuestInformationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-2">
          Your Details
        </h2>
        <p className="text-muted-foreground font-body font-light">
          We&apos;ll use this to confirm your order
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="font-body font-light text-foreground">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
            placeholder="Enter your full name"
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors?.fullName)}
            required
          />
          {fieldErrors?.fullName && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="font-body font-light text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
            placeholder="055 703 2312"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(fieldErrors?.phone)}
            required
          />
          {fieldErrors?.phone && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="font-body font-light text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => onFieldChange("email", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
            placeholder="your.email@example.com"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors?.email)}
            required
          />
          {fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="specialRequests" className="font-body font-light text-foreground">
            Special Requests
          </Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests || ""}
            onChange={(e) => onFieldChange("specialRequests", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[100px]"
            placeholder="Dietary restrictions, allergies, preferences..."
          />
          <p className="mt-2 text-sm text-muted-foreground font-body font-light">
            Please let us know about any dietary requirements or special preferences
          </p>
        </div>
      </div>
    </div>
  )
}

