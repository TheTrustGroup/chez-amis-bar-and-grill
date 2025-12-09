"use client"

import { useState, useMemo } from "react"
import { MenuItem, menuCategories } from "@/lib/data/menuData"

export interface MenuFilters {
  searchQuery: string
  activeCategory: string | null
  dietaryFilters: string[]
  priceRange: [number, number] | null
  spicyLevel: number | null
}

export function useMenuFilters() {
  const [filters, setFilters] = useState<MenuFilters>({
    searchQuery: "",
    activeCategory: null,
    dietaryFilters: [],
    priceRange: null,
    spicyLevel: null,
  })

  const filteredItems = useMemo(() => {
    let items: MenuItem[] = []

    // Get items from selected category or all items
    if (filters.activeCategory) {
      const category = menuCategories.find((cat) => cat.id === filters.activeCategory)
      items = category ? category.items : []
    } else {
      items = menuCategories.flatMap((cat) => cat.items)
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    // Filter by dietary preferences
    if (filters.dietaryFilters.length > 0) {
      items = items.filter((item) => {
        if (!item.dietary) return false
        return filters.dietaryFilters.some((filter) =>
          item.dietary?.includes(filter as 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')
        )
      })
    }

    // Filter by spicy level
    if (filters.spicyLevel !== null) {
      items = items.filter((item) => item.spicyLevel === filters.spicyLevel)
    }

    // Filter by price range
    if (filters.priceRange) {
      items = items.filter((item) => {
        const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
        return price >= filters.priceRange![0] && price <= filters.priceRange![1]
      })
    }

    // Filter available items only
    return items.filter((item) => item.available !== false)
  }, [filters])

  const updateSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }

  const setActiveCategory = (categoryId: string | null) => {
    setFilters((prev) => ({ ...prev, activeCategory: categoryId }))
  }

  const toggleDietaryFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      dietaryFilters: prev.dietaryFilters.includes(filter)
        ? prev.dietaryFilters.filter((f) => f !== filter)
        : [...prev.dietaryFilters, filter],
    }))
  }

  const setPriceRange = (range: [number, number] | null) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }

  const setSpicyLevel = (level: number | null) => {
    setFilters((prev) => ({ ...prev, spicyLevel: level }))
  }

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      activeCategory: null,
      dietaryFilters: [],
      priceRange: null,
      spicyLevel: null,
    })
  }

  return {
    filters,
    filteredItems,
    updateSearchQuery,
    setActiveCategory,
    toggleDietaryFilter,
    setPriceRange,
    setSpicyLevel,
    clearFilters,
  }
}

