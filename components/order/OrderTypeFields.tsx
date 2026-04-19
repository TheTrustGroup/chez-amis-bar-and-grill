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
  fieldErrors?: Record<string, string>
}

export function OrderTypeFields({
  orderType,
  formData,
  onFieldChange,
  fieldErrors,
}: OrderTypeFieldsProps) {
  if (orderType === "dine-in") {
    return (
      <div className="space-y-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="font-body font-light text-foreground">
              Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date || ""}
              onChange={(e) => onFieldChange("date", e.target.value)}
              className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
              aria-invalid={Boolean(fieldErrors?.date)}
              required
            />
            {fieldErrors?.date && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.date}</p>
            )}
          </div>
          <div>
            <Label htmlFor="time" className="font-body font-light text-foreground">
              Preferred Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time || ""}
              onChange={(e) => onFieldChange("time", e.target.value)}
              className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
              aria-invalid={Boolean(fieldErrors?.time)}
              required
            />
            {fieldErrors?.time && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.time}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="font-body font-light text-foreground">
            Number of Guests
          </Label>
          <select
            id="guests"
            value={formData.guests || ""}
            onChange={(e) => onFieldChange("guests", e.target.value)}
            className="mt-2 w-full h-12 md:h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-1 min-h-[44px]"
            aria-invalid={Boolean(fieldErrors?.guests)}
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
          {fieldErrors?.guests && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.guests}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tablePreference" className="font-body font-light text-foreground">
            Table Preference (Optional)
          </Label>
          <select
            id="tablePreference"
            value={formData.tablePreference || ""}
            onChange={(e) => onFieldChange("tablePreference", e.target.value)}
            className="mt-2 w-full h-12 md:h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-1 min-h-[44px]"
          >
            <option value="">No preference</option>
            <option value="window">Window</option>
            <option value="private">Private</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div>
          <Label htmlFor="specialOccasion" className="font-body font-light text-foreground">
            Special Occasion (Optional)
          </Label>
          <select
            id="specialOccasion"
            value={formData.specialOccasion || ""}
            onChange={(e) => onFieldChange("specialOccasion", e.target.value)}
            className="mt-2 w-full h-12 md:h-10 rounded-md border border-border/50 bg-background px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-1 min-h-[44px]"
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
          <Label htmlFor="pickupTime" className="font-body font-light text-foreground">
            Preferred Pickup Time
          </Label>
          <Input
            id="pickupTime"
            type="datetime-local"
            value={formData.pickupTime || ""}
            onChange={(e) => onFieldChange("pickupTime", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
            aria-invalid={Boolean(fieldErrors?.pickupTime)}
            required
            min={new Date().toISOString().slice(0, 16)}
            step="900"
          />
          {fieldErrors?.pickupTime && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.pickupTime}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground font-body font-light">
            We&apos;ll prepare your order in 15-minute intervals
          </p>
        </div>

      </div>
    )
  }

  if (orderType === "delivery") {
    return (
      <div className="space-y-6 pt-6 border-t border-border/50">
        <div>
          <Label htmlFor="deliveryAddress" className="font-body font-light text-foreground">
            Delivery Address
          </Label>
          <Textarea
            id="deliveryAddress"
            value={formData.deliveryAddress || ""}
            onChange={(e) => onFieldChange("deliveryAddress", e.target.value)}
            className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[100px]"
            placeholder="Street address, area, city..."
            aria-invalid={Boolean(fieldErrors?.deliveryAddress)}
            required
          />
          {fieldErrors?.deliveryAddress && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.deliveryAddress}</p>
          )}
        </div>

        <div>
          <Label className="font-body font-light text-foreground mb-3 block">
            Delivery Time
          </Label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 rounded-lg border border-border/50 md:hover:border-terra-500/50 md:hover:bg-terra-500/5 cursor-pointer transition-all">
              <input
                type="radio"
                name="deliveryTime"
                id="deliveryTime-asap"
                value="asap"
                checked={formData.deliveryTime === "asap"}
                onChange={(e) => onFieldChange("deliveryTime", e.target.value)}
                className="w-4 h-4 text-terra-500 focus:ring-terra-500"
              />
              <span className="font-body font-light">ASAP (35-45 minutes)</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-lg border border-border/50 md:hover:border-terra-500/50 md:hover:bg-terra-500/5 cursor-pointer transition-all">
              <input
                type="radio"
                name="deliveryTime"
                id="deliveryTime-scheduled"
                value="scheduled"
                checked={formData.deliveryTime === "scheduled"}
                onChange={(e) => onFieldChange("deliveryTime", e.target.value)}
                className="w-4 h-4 text-terra-500 focus:ring-terra-500"
              />
              <span className="font-body font-light">Schedule for later</span>
            </label>
          </div>
          {fieldErrors?.deliveryTime && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.deliveryTime}</p>
          )}
        </div>

        {formData.deliveryTime === "scheduled" && (
          <div>
            <Label htmlFor="scheduledTime" className="font-body font-light text-foreground">
              Scheduled Time
            </Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              value={formData.scheduledTime || ""}
              onChange={(e) => onFieldChange("scheduledTime", e.target.value)}
              className="mt-2 border-border/50 focus:border-terra-500/50 min-h-[44px] text-base md:text-sm"
              aria-invalid={Boolean(fieldErrors?.scheduledTime)}
              required
              min={new Date().toISOString().slice(0, 16)}
            />
            {fieldErrors?.scheduledTime && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300">{fieldErrors.scheduledTime}</p>
            )}
          </div>
        )}

      </div>
    )
  }

  return null
}

