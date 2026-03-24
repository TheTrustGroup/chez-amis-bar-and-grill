"use client"

import { Home, Sun, Wine, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type SeatingPreference = "main-dining" | "outdoor" | "bar" | "private"

interface SeatingSelectorProps {
  selectedSeating: SeatingPreference | null
  onSelect: (seating: SeatingPreference) => void
  partySize: number
}

const seatingOptions = [
  {
    id: "main-dining" as SeatingPreference,
    icon: Home,
    title: "Main Dining Room",
    description: "Our elegant main dining space",
  },
  {
    id: "outdoor" as SeatingPreference,
    icon: Sun,
    title: "Outdoor Terrace",
    description: "Al fresco dining experience",
  },
  {
    id: "bar" as SeatingPreference,
    icon: Wine,
    title: "Bar Area",
    description: "Casual bar seating",
  },
  {
    id: "private" as SeatingPreference,
    icon: Users,
    title: "Private Room",
    description: "Intimate private dining space",
  },
]

export function SeatingSelector({
  selectedSeating,
  onSelect,
  partySize,
}: SeatingSelectorProps) {
  const showPrivateRoomFee = partySize >= 8

  return (
    <div className="space-y-4">
      <Label className="font-body font-light text-foreground mb-4 block text-sm md:text-base">
        Seating Preference
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {seatingOptions.map((option) => {
          const Icon = option.icon
          const isSelected = selectedSeating === option.id
          const isPrivate = option.id === "private"

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "group relative p-4 md:p-5 rounded-lg border-2 transition-all duration-200 text-left min-h-[80px] touch-manipulation",
                "focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-1",
                isSelected
                  ? "border-terra-500 bg-terra-500/5 shadow-sm"
                  : "border-border/50 hover:border-terra-500/50 hover:bg-terra-500/5 active:scale-[0.98]"
              )}
              aria-label={`Select ${option.title} seating`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors flex-shrink-0",
                    isSelected ? "bg-terra-500/10" : "bg-muted/50 group-hover:bg-terra-500/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isSelected
                        ? "text-terra-600"
                        : "text-muted-foreground group-hover:text-terra-600"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-display font-light text-foreground">
                      {option.title}
                    </h3>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-terra-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-body font-light mt-1">
                    {option.description}
                  </p>
                  {isPrivate && showPrivateRoomFee && (
                    <p className="text-sm text-terra-600 font-body font-light mt-2">
                      +GH₵ 200 room fee for groups 8+
                    </p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}



