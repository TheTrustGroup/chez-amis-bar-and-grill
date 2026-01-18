"use client"

import { menuCategories } from "@/lib/data/menuData"
import { cn } from "@/lib/utils"
import { Leaf, Wheat, Droplets, Flame } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"

interface CategoryNavProps {
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  dietaryFilters: string[]
  onToggleDietaryFilter: (filter: string) => void
}

const dietaryFilters = [
  { id: "vegetarian", label: "Vegetarian", icon: "🌱" },
  { id: "vegan", label: "Vegan", icon: "🌿" },
  { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { id: "dairy-free", label: "Dairy-Free", icon: "🥛" },
]

export function CategoryNav({
  activeCategory,
  onCategoryChange,
  dietaryFilters: activeDietaryFilters,
  onToggleDietaryFilter,
}: CategoryNavProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      // Calculate proper offset for sticky header
      const headerOffset = 120 // Account for header + mobile category tabs
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Ensure we don't scroll to negative position
      const scrollPosition = Math.max(0, offsetPosition)

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      })
    } else {
      // If element doesn't exist yet, wait for it to render
      setTimeout(() => {
        const element = document.getElementById(categoryId)
        if (element) {
          const headerOffset = 120
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          const scrollPosition = Math.max(0, offsetPosition)
          
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    }
    onCategoryChange(categoryId)
  }

  return (
    <aside className={cn(
      "sticky top-24 h-fit transition-colors duration-300",
      isDark ? "bg-charcoal-900/30 rounded-xl p-4 border border-charcoal-800/50" : "bg-transparent"
    )}>
      <nav className="space-y-1">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "block w-full text-left px-3 py-2.5 text-sm transition-all duration-300 rounded-md",
              "hover:scale-105 active:scale-95",
              activeCategory === category.id
                ? isDark
                  ? "text-gold-400 font-semibold bg-gold-500/10 border-l-2 border-gold-500"
                  : "text-amber-700 font-semibold bg-amber-50 border-l-2 border-amber-500"
                : isDark
                ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            aria-label={`View ${category.name} category`}
          >
            {category.name}
          </button>
        ))}

        {/* Dietary Filters - Premium */}
        <div className={cn(
          "mt-6 pt-6 border-t transition-colors duration-300",
          isDark ? "border-charcoal-800/50" : "border-border/50"
        )}>
          <p className={cn(
            "text-xs font-medium mb-3 uppercase tracking-wide transition-colors duration-300",
            isDark ? "text-cream-200/60" : "text-muted-foreground"
          )}>
            Filters
          </p>
          <div className="space-y-2">
            {dietaryFilters.map((filter) => (
              <label
                key={filter.id}
                className={cn(
                  "flex items-center gap-2.5 cursor-pointer text-xs transition-all duration-300 min-h-[32px] rounded-md px-2 py-1.5",
                  "hover:scale-105",
                  isDark 
                    ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <input
                  type="checkbox"
                  checked={activeDietaryFilters.includes(filter.id)}
                  onChange={() => onToggleDietaryFilter(filter.id)}
                  className={cn(
                    "w-4 h-4 rounded border transition-all duration-300 cursor-pointer",
                    "text-gold-600 focus:ring-gold-500 focus:ring-1",
                    isDark ? "border-charcoal-700 bg-charcoal-800" : "border-border bg-background"
                  )}
                  aria-label={`Filter by ${filter.label}`}
                />
                <span className="select-none">{filter.label}</span>
              </label>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}

