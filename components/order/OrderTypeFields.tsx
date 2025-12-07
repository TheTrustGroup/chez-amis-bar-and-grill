"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { OrderType } from "./OrderTypeSelector"
import { Label } from "@/components/ui/label"

interface OrderTypeFieldsProps {
  orderType: OrderType
  formData: {
    date?: string
    time?: string
    guests?: string
    tablePreference?: string
    specialOccasion?: string
    pickupTime?: string
    phone?: string
    deliveryAddress?: string
    deliveryTime?: "asap" | "scheduled"
    scheduledTime?: string
  }
  onFieldChange: (field: string, value: string) => void
}

export function OrderTypeFields({
  orderType,
  formData,
  onFieldChange,
}: OrderTypeFieldsProps) {
  if (orderType === "dine-in") {
    return (
      <div className="space-y-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="font-heading font-light text-foreground">
              Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date || ""}
              onChange={(e) => onFieldChange("date", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              required
            />
          </div>
          <div>
            <Label htmlFor="time" className="font-heading font-light text-foreground">
              Preferred Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time || ""}
              onChange={(e) => onFieldChange("time", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="font-heading font-light text-foreground">
            Number of Guests
          </Label>
          <select
            id="guests"
            value={formData.guests || ""}
            onChange={(e) => onFieldChange("guests", e.target.value)}
            className="mt-2 w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
            required
          >
            <option value="">Select number of guests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
            <option value="10+">10+ guests</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tablePreference" className="font-heading font-light text-foreground">
            Table Preference (Optional)
          </Label>
          <select
            id="tablePreference"
            value={formData.tablePreference || ""}
            onChange={(e) => onFieldChange("tablePreference", e.target.value)}
            className="mt-2 w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
          >
            <option value="">No preference</option>
            <option value="window">Window</option>
            <option value="private">Private</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div>
          <Label htmlFor="specialOccasion" className="font-heading font-light text-foreground">
            Special Occasion (Optional)
          </Label>
          <select
            id="specialOccasion"
            value={formData.specialOccasion || ""}
            onChange={(e) => onFieldChange("specialOccasion", e.target.value)}
            className="mt-2 w-full h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
          >
            <option value="">None</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    )
  }

  if (orderType === "takeaway") {
    return (
      <div className="space-y-6 pt-6 border-t border-border/50">
        <div>
          <Label htmlFor="pickupTime" className="font-heading font-light text-foreground">
            Preferred Pickup Time
          </Label>
          <Input
            id="pickupTime"
            type="datetime-local"
            value={formData.pickupTime || ""}
            onChange={(e) => onFieldChange("pickupTime", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            required
            min={new Date().toISOString().slice(0, 16)}
            step="900"
          />
          <p className="mt-2 text-sm text-muted-foreground font-body font-light">
            We&apos;ll prepare your order in 15-minute intervals
          </p>
        </div>

        <div>
          <Label htmlFor="phone" className="font-heading font-light text-foreground">
            Phone Number for Notification
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            placeholder="024 395 2339"
            required
          />
        </div>
      </div>
    )
  }

  if (orderType === "delivery") {
    return (
      <div className="space-y-6 pt-6 border-t border-border/50">
        <div>
          <Label htmlFor="deliveryAddress" className="font-heading font-light text-foreground">
            Delivery Address
          </Label>
          <Textarea
            id="deliveryAddress"
            value={formData.deliveryAddress || ""}
            onChange={(e) => onFieldChange("deliveryAddress", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50 min-h-[100px]"
            placeholder="Street address, area, city..."
            required
          />
        </div>

        <div>
          <Label className="font-heading font-light text-foreground mb-3 block">
            Delivery Time
          </Label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 cursor-pointer transition-all">
              <input
                type="radio"
                name="deliveryTime"
                value="asap"
                checked={formData.deliveryTime === "asap"}
                onChange={(e) => onFieldChange("deliveryTime", e.target.value)}
                className="w-4 h-4 text-gold-500 focus:ring-gold-500"
              />
              <span className="font-body font-light">ASAP (35-45 minutes)</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 cursor-pointer transition-all">
              <input
                type="radio"
                name="deliveryTime"
                value="scheduled"
                checked={formData.deliveryTime === "scheduled"}
                onChange={(e) => onFieldChange("deliveryTime", e.target.value)}
                className="w-4 h-4 text-gold-500 focus:ring-gold-500"
              />
              <span className="font-body font-light">Schedule for later</span>
            </label>
          </div>
        </div>

        {formData.deliveryTime === "scheduled" && (
          <div>
            <Label htmlFor="scheduledTime" className="font-heading font-light text-foreground">
              Scheduled Time
            </Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              value={formData.scheduledTime || ""}
              onChange={(e) => onFieldChange("scheduledTime", e.target.value)}
              className="mt-2 border-border/50 focus:border-gold-500/50"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        )}

        <div>
          <Label htmlFor="phone" className="font-heading font-light text-foreground">
            Contact Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="mt-2 border-border/50 focus:border-gold-500/50"
            placeholder="024 395 2339"
            required
          />
        </div>
      </div>
    )
  }

  return null
}

