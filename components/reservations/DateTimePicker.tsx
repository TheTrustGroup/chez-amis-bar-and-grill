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
    <div className="space-y-6">
      <div>
        <Label htmlFor="date" className="font-heading font-light text-foreground mb-3 block">
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
          className="border-border/50 focus:border-gold-500/50"
          required
        />
        {selectedDate && isDatePast(selectedDate) && (
          <p className="mt-2 text-sm text-destructive font-body font-light">
            Please select a future date
          </p>
        )}
      </div>

      {selectedDate && (
        <div>
          <Label className="font-heading font-light text-foreground mb-4 block">
            Select Time
          </Label>

          {/* Lunch Section */}
          {lunchAvailable.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-heading font-light text-muted-foreground mb-3">
                Lunch
              </h4>
              <div className="flex flex-wrap gap-3">
                {lunchAvailable.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => onTimeChange(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-all duration-300 text-sm font-body font-light",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
                      selectedTime === slot.time
                        ? "border-gold-500 bg-gold-500/10 text-foreground"
                        : slot.available
                        ? "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 text-foreground"
                        : "border-border/30 bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                    )}
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
              <h4 className="text-sm font-heading font-light text-muted-foreground mb-3">
                Dinner
              </h4>
              <div className="flex flex-wrap gap-3">
                {dinnerAvailable.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => onTimeChange(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-all duration-300 text-sm font-body font-light",
                      "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
                      selectedTime === slot.time
                        ? "border-gold-500 bg-gold-500/10 text-foreground"
                        : slot.available
                        ? "border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 text-foreground"
                        : "border-border/30 bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                    )}
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



