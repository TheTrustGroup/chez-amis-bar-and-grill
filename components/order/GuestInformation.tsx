"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface GuestInformationProps {
  formData: {
    fullName?: string
    phone?: string
    email?: string
    specialRequests?: string
  }
  onFieldChange: (field: string, value: string) => void
}

export function GuestInformation({ formData, onFieldChange }: GuestInformationProps) {
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
          <Label htmlFor="fullName" className="font-heading font-light text-foreground">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            placeholder="Enter your full name"
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
            value={formData.phone || ""}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            placeholder="055 703 2312"
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
            value={formData.email || ""}
            onChange={(e) => onFieldChange("email", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="specialRequests" className="font-heading font-light text-foreground">
            Special Requests
          </Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests || ""}
            onChange={(e) => onFieldChange("specialRequests", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50 min-h-[100px]"
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

