"use client"

import { useState } from "react"
import { lunchSlots, dinnerSlots, isDatePast, isTimeSlotAvailable } from "@/lib/utils/reservationAvailability"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  selectedDate: string
  selectedTime: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const [showLunch, setShowLunch] = useState(true)
  const [showDinner, setShowDinner] = useState(true)

  const minDate = new Date().toISOString().split("T")[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]

  const getAvailableSlots = () => {
    if (!selectedDate) return []
    const allSlots = [...lunchSlots, ...dinnerSlots]
    return allSlots.map((slot) => ({
      ...slot,
      available: isTimeSlotAvailable(selectedDate, slot.time),
    }))
  }

  const availableSlots = getAvailableSlots()
  const lunchAvailable = availableSlots.filter((s) =>
    lunchSlots.some((ls) => ls.time === s.time)
  )
  const dinnerAvailable = availableSlots.filter((s) =>
    dinnerSlots.some((ds) => ds.time === s.time)
  )

  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <Label htmlFor="date" className="font-heading font-light text-foreground mb-2.5 block text-sm md:text-base">
          Select Date
        </Label>
        <Input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => {
            onDateChange(e.target.value)
            onTimeChange("") // Reset time when date changes
          }}
          min={minDate}
          max={maxDate}
          className="border-border/50 focus:border-gold-500/50 min-h-[44px]"
          required
          aria-label="Select reservation date"
        />
        {selectedDate && isDatePast(selectedDate) && (
          <p className="mt-2 text-sm text-destructive font-body font-light">
            Please select a future date
          </p>
        )}
      </div>

      {selectedDate && (
        <div>
          <Label className="font-heading font-light text-foreground mb-4 block text-sm md:text-base">
            Select Time
          </Label>

          {/* Lunch Section */}
          {lunchAvailable.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs md:text-sm font-heading font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Lunch
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {lunchAvailable.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => onTimeChange(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "px-4 py-2.5 rounded-md border-2 transition-all duration-200 text-sm font-body font-light min-h-[40px] touch-manipulation",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1",
                      selectedTime === slot.time
                        ? "border-gold-500 bg-gold-500/10 text-foreground shadow-sm"
                        : slot.available
                        ? "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 text-foreground active:scale-95"
                        : "border-border/30 bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                    )}
                    aria-label={`Select ${slot.label} time slot`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dinner Section */}
          {dinnerAvailable.length > 0 && (
            <div>
              <h4 className="text-xs md:text-sm font-heading font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Dinner
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {dinnerAvailable.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => onTimeChange(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "px-4 py-2.5 rounded-md border-2 transition-all duration-200 text-sm font-body font-light min-h-[40px] touch-manipulation",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1",
                      selectedTime === slot.time
                        ? "border-gold-500 bg-gold-500/10 text-foreground shadow-sm"
                        : slot.available
                        ? "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 text-foreground active:scale-95"
                        : "border-border/30 bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                    )}
                    aria-label={`Select ${slot.label} time slot`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableSlots.filter((s) => s.available).length === 0 && (
            <p className="text-sm text-muted-foreground font-body font-light">
              No available slots for this date. Please select another date.
            </p>
          )}
        </div>
      )}
    </div>
  )
}



