"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { beverageCategories } from "@/lib/data/beverages"
import { BeverageCard } from "@/components/beverages/BeverageCard"
import { BeverageCategory } from "@/lib/types/beverage"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function BeveragesPage() {
  const [activeCategory, setActiveCategory] = useState<BeverageCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState("")

  // Filter beverages
  const filteredCategories = beverageCategories.map((category) => {
    let items = category.items

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    // Filter by active category
    if (activeCategory !== 'all' && category.id !== activeCategory) {
      items = []
    }

    return { ...category, items }
  }).filter((category) => category.items.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900">
            {/* In production, use actual beverage photography */}
            <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-4xl">
              Premium Beverages
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-display font-light text-cream-100 mb-4">
            Our Beverages
          </h1>
          <p className="text-lg md:text-xl text-cream-200/90 font-body font-light mb-6">
            Curated selection of premium drinks
          </p>
          <div className="w-24 h-px bg-gold-500 mx-auto" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Search Functionality */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  "px-6 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-colors",
                  activeCategory === 'all'
                    ? "bg-amber-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                )}
              >
                All Beverages
              </button>
              {beverageCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-colors",
                    activeCategory === category.id
                      ? "bg-amber-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Beverage Categories */}
        {filteredCategories.map((category) => (
          <section key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-4xl font-light font-serif text-gray-900">
                  {category.name}
                </h2>
              </div>
              {category.description && (
                <p className="text-gray-600 text-lg font-light max-w-2xl">
                  {category.description}
                </p>
              )}
              <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mt-4" />
            </div>

            {/* Beverage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((beverage) => (
                <BeverageCard key={beverage.id} beverage={beverage} />
              ))}
            </div>
          </section>
        ))}

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No beverages found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

