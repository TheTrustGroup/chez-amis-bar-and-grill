"use client"

import { menuCategories } from "@/lib/data/menuData"
import { cn } from "@/lib/utils"
import { Leaf, Wheat, Droplets, Flame } from "lucide-react"

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
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    onCategoryChange(categoryId)
  }

  return (
    <aside className="sticky top-24 h-fit">
      <nav className="space-y-1">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "block w-full text-left px-3 py-2.5 text-sm transition-all duration-200 rounded-md",
              activeCategory === category.id
                ? "text-amber-700 font-medium bg-amber-50 border-l-2 border-amber-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
            aria-label={`View ${category.name} category`}
          >
            {category.name}
          </button>
        ))}

        {/* Dietary Filters - Minimal */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Filters</p>
          <div className="space-y-2">
            {dietaryFilters.map((filter) => (
              <label
                key={filter.id}
                className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 hover:text-gray-900 transition-colors min-h-[32px]"
              >
                <input
                  type="checkbox"
                  checked={activeDietaryFilters.includes(filter.id)}
                  onChange={() => onToggleDietaryFilter(filter.id)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 focus:ring-1 cursor-pointer"
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

