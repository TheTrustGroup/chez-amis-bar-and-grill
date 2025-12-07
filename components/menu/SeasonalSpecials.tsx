"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { menuCategories } from "@/lib/data/menuData"
import { MenuItem } from "@/lib/data/menuData"
import { PremiumMenuItem } from "./PremiumMenuItem"
import { cn } from "@/lib/utils"

export function SeasonalSpecials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get seasonal items from all categories
  const seasonalItems: MenuItem[] = menuCategories
    .flatMap((category) => category.items)
    .filter((item) => item.tags?.includes("new") || item.tags?.includes("chef-special"))
    .slice(0, 6) // Limit to 6 items

  // Rotate through seasonal items every 5 seconds
  useEffect(() => {
    if (seasonalItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % seasonalItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [seasonalItems.length])

  if (seasonalItems.length === 0) return null

  const currentItem = seasonalItems[currentIndex]

  return (
    <div className="my-12 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-lg p-8 border border-amber-200">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-amber-600" />
        <h3 className="text-2xl font-serif text-gray-900">Seasonal Specials</h3>
        <span className="ml-auto text-sm text-gray-600 font-light">
          {currentIndex + 1} of {seasonalItems.length}
        </span>
      </div>

      <p className="text-gray-600 mb-6 font-light">
        Discover our chef&apos;s seasonal creations, crafted with the finest ingredients
      </p>

      {/* Current Seasonal Item */}
      <div className="bg-white rounded-lg p-6 border border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          {currentItem.tags?.includes("chef-special") && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
              Chef&apos;s Special
            </span>
          )}
          {currentItem.tags?.includes("new") && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <h4 className="text-xl font-serif text-gray-900 mb-2">{currentItem.name}</h4>
        <p className="text-gray-600 text-sm mb-4 font-light">{currentItem.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-amber-700">
            GH₵ {(currentItem.price || currentItem.portionSizes?.[0]?.price || 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {seasonalItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-amber-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`View seasonal item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

