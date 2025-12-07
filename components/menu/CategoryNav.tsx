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
        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-4">
          Menu Categories
        </h3>
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "block w-full text-left px-4 py-2 text-sm transition-colors rounded-md",
              activeCategory === category.id
                ? "bg-amber-50 text-amber-700 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <span>{category.name}</span>
            <span className="text-xs text-gray-500 ml-2">
              ({category.items.length})
            </span>
          </button>
        ))}

        {/* Dietary Filters */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3">
            Dietary Preferences
          </h4>
          <div className="space-y-2">
            {dietaryFilters.map((filter) => (
              <label
                key={filter.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeDietaryFilters.includes(filter.id)}
                  onChange={() => onToggleDietaryFilter(filter.id)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">{filter.label}</span>
                <span className="text-xl">{filter.icon}</span>
              </label>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}

