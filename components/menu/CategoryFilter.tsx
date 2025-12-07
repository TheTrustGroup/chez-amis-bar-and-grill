"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/menuData"
import { MenuItem } from "@/lib/menuData"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  menuItems: MenuItem[]
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  menuItems,
}: CategoryFilterProps) {
  const getItemCount = (category: string) => {
    if (category === "all") return menuItems.length
    return menuItems.filter((item) => item.category === category).length
  }

  return (
    <div className="relative">
      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap md:justify-center px-1">
          {categories.map((category) => {
            const count = getItemCount(category.value)
            const isActive = selectedCategory === category.value

            return (
              <Button
                key={category.value}
                variant={isActive ? "default" : "outline"}
                onClick={() => onCategoryChange(category.value)}
                className={cn(
                  "capitalize transition-all duration-300 whitespace-nowrap",
                  "flex items-center gap-2",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent"
                )}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.label}`}
              >
                <span>{category.label}</span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}



