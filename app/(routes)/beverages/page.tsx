"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { beverageCategories } from "@/lib/data/beverages"
import { BeverageCard } from "@/components/beverages/BeverageCard"
import { BeverageCategory } from "@/lib/types/beverage"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/lib/context/ThemeContext"

export default function BeveragesPage() {
  const [activeCategory, setActiveCategory] = useState<BeverageCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const filteredCategories = beverageCategories
    .map((category) => {
      let items = category.items

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query),
        )
      }

      if (activeCategory !== "all" && category.id !== activeCategory) {
        items = []
      }

      return { ...category, items }
    })
    .filter((category) => category.items.length > 0)

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark ? "bg-green-700" : "bg-neutral-50",
      )}
    >
      <section
        className={cn(
          "relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-green-700 via-green-600 to-green-900",
        )}
      >
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1
            className={cn(
              "nav-page-heading md:text-5xl tracking-tight text-white mb-3",
              "drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            )}
          >
            Our Beverages
          </h1>
          <p className="nav-page-subheading text-white/90 md:text-lg mb-5 max-w-2xl mx-auto">
            Curated selection of premium drinks
          </p>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto shadow-lg shadow-terra-500/40" />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-shell-inner">
        <div className="mb-10">
          <div className="relative max-w-md">
            <Search
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5",
                isDark ? "text-white/50" : "text-muted-foreground",
              )}
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full min-h-[48px] pl-12 pr-4 py-3 rounded-lg border-2 text-sm md:text-base transition-all",
                "focus:outline-none focus:ring-2 focus:ring-terra-500/50 focus:border-terra-500",
                isDark
                  ? "bg-green-600/50 border-green-700/50 text-white placeholder:text-neutral-400/80"
                  : "bg-background border-border text-foreground",
              )}
              aria-label="Search beverages"
            />
          </div>
        </div>

        <div className="mb-12">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-4">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "px-4 md:px-5 py-2.5 md:py-3 rounded-full whitespace-nowrap font-body uppercase tracking-widest text-xs min-h-[48px] transition-all border-b-2 border-transparent",
                  activeCategory === "all"
                    ? "border-terra-500 text-terra-600 dark:text-terra-400"
                    : isDark
                      ? "text-white/70 md:hover:text-white"
                      : "text-muted-foreground md:hover:text-foreground",
                )}
              >
                All Beverages
              </button>
              {beverageCategories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 md:px-5 py-2.5 md:py-3 rounded-full whitespace-nowrap font-body uppercase tracking-widest text-xs min-h-[48px] transition-all border-b-2 border-transparent",
                    activeCategory === category.id
                      ? "border-terra-500 text-terra-600 dark:text-terra-400"
                      : isDark
                        ? "text-white/70 md:hover:text-white"
                        : "text-muted-foreground md:hover:text-foreground",
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {filteredCategories.map((category) => (
          <section key={category.id} className="mb-16 md:mb-24 last:mb-0">
            <div className="mb-8 border-b border-terra-500/20 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden>
                  {category.icon}
                </span>
                <h2
                  className={cn(
                    "section-title",
                    isDark ? "text-white" : "text-neutral-900",
                  )}
                >
                  {category.name}
                </h2>
              </div>
              {category.description && (
                <p
                  className={cn(
                    "text-lg font-body font-light max-w-2xl mt-2",
                    isDark ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {category.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap-section">
              {category.items.map((beverage) => (
                <BeverageCard key={beverage.id} beverage={beverage} />
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center section-padding-sm">
            <p
              className={cn(
                "text-lg font-body font-light",
                isDark ? "text-white/60" : "text-muted-foreground",
              )}
            >
              No beverages found matching your search.
            </p>
          </div>
        )}
        </div>
      </section>
    </div>
  )
}
