"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Search, ShoppingBag, AlertCircle, UtensilsCrossed, Grid3x3, List } from "lucide-react"
import { menuCategories } from "@/lib/data/menuData"
import { PremiumMenuItem } from "@/components/menu/PremiumMenuItem"
import { PremiumMenuCard } from "@/components/menu/PremiumMenuCard"
import { CategoryNav } from "@/components/menu/CategoryNav"
import { OrderSummary } from "@/components/menu/OrderSummary"
import { MobileCart } from "@/components/menu/MobileCart"
import { PrintMenu } from "@/components/menu/PrintMenu"
import { AllergenInfo } from "@/components/menu/AllergenInfo"
import { MenuItemSkeleton } from "@/components/ui/skeleton"
import { useMenuFilters } from "@/lib/hooks/useMenuFilters"
import { useOrder } from "@/lib/hooks/useOrder"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/lib/context/ThemeContext"

export default function MenuPage() {
  const [showMobileCart, setShowMobileCart] = useState(false)
  const [showAllergenInfo, setShowAllergenInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const {
    filters,
    filteredItems,
    updateSearchQuery,
    setActiveCategory: setFilterCategory,
    toggleDietaryFilter,
    clearFilters,
  } = useMenuFilters()

  const { itemCount } = useOrder()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Update active category when filters change
  useEffect(() => {
    setActiveCategory(filters.activeCategory)
  }, [filters.activeCategory])

  // Scroll to category
  const scrollToCategory = (categoryId: string) => {
    // First try to get element from ref
    let element = categoryRefs.current[categoryId]
    
    // If ref doesn't exist, try to get by ID (fallback)
    if (!element) {
      element = document.getElementById(categoryId)
    }
    
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
    
    // Always update the filter category
    setFilterCategory(categoryId)
  }

  // Intersection Observer for active category highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.getAttribute("id")
          if (categoryId) {
            setActiveCategory(categoryId)
            setFilterCategory(categoryId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    menuCategories.forEach((category) => {
      const element = categoryRefs.current[category.id]
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [setFilterCategory])

  // Organize categories into main groups
  const mainCategories = [
    { id: "starters", name: "Starters", icon: "🥗" },
    { id: "mains", name: "Main Courses", icon: "🍽️" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "signature", name: "Signature Dishes", icon: "⭐" },
  ]

  // Map existing categories to main groups
  const getCategoryGroup = (categoryName: string) => {
    const lower = categoryName.toLowerCase()
    if (lower.includes("starter") || lower.includes("appetizer") || lower.includes("salad")) return "starters"
    if (lower.includes("main") || lower.includes("entrée") || lower.includes("grill") || lower.includes("seafood") || lower.includes("pasta")) return "mains"
    if (lower.includes("dessert") || lower.includes("sweet")) return "desserts"
    if (lower.includes("signature") || lower.includes("attieke")) return "signature"
    return "mains" // Default
  }

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-charcoal-950" : "bg-background"
    )}>
      {/* Hero Section - Refined */}
      <section className={cn(
        "relative h-[40vh] md:h-[45vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-display font-light mb-6 md:mb-8",
            "text-cream-100 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Our Menu
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-gold-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light max-w-3xl mx-auto leading-relaxed",
            "text-cream-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            Seasonal selections, crafted with passion
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className={cn(
        "container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-16",
        "transition-colors duration-300"
      )}>
        {/* Header Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12 print-menu-buttons">
          {/* Search Functionality - Premium */}
          <div className="relative flex-1 max-w-md">
            <Search className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              isDark ? "text-cream-200/60" : "text-muted-foreground"
            )} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3 text-sm md:text-base rounded-lg border-2 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500",
                "min-h-[48px]",
                isDark 
                  ? "bg-charcoal-900/50 border-charcoal-800/50 text-cream-100 placeholder:text-cream-200/40"
                  : "bg-background border-border text-foreground placeholder:text-muted-foreground"
              )}
              aria-label="Search menu items"
            />
          </div>

          {/* View Mode Toggle & Actions */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle - Desktop Only */}
            <div className={cn(
              "hidden md:flex items-center gap-2 p-1 rounded-lg border transition-colors duration-300",
              isDark 
                ? "bg-charcoal-900/50 border-charcoal-800/50" 
                : "bg-muted/50 border-border/50"
            )}>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded transition-all duration-300 hover:scale-110 active:scale-95",
                  viewMode === "grid"
                    ? "bg-gold-500 text-charcoal-900 shadow-md"
                    : isDark ? "text-cream-200/60 hover:text-cream-100" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded transition-all duration-300 hover:scale-110 active:scale-95",
                  viewMode === "list"
                    ? "bg-gold-500 text-charcoal-900 shadow-md"
                    : isDark ? "text-cream-200/60 hover:text-cream-100" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Allergen Info & Print */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAllergenInfo(true)}
                className={cn(
                  "text-xs md:text-sm transition-colors min-h-[32px] px-3 py-1.5 rounded-md",
                  isDark 
                    ? "text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-800/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-label="View allergen information"
              >
                Allergen Info
              </button>
              <PrintMenu />
            </div>
          </div>
        </div>

        {/* Premium Category Tabs - Mobile & Desktop */}
        <div className={cn(
          "sticky top-20 z-30 mb-8 md:mb-12 border-b transition-colors duration-300",
          isDark 
            ? "bg-charcoal-950/95 backdrop-blur-xl border-charcoal-800/50"
            : "bg-background/95 backdrop-blur-xl border-border/50",
          "shadow-lg"
        )}>
          <div className="overflow-x-auto scrollbar-hide px-4 md:px-6 py-4">
            <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:justify-center">
              {/* All Categories Tab */}
              <button
                onClick={() => {
                  setFilterCategory(null)
                  setActiveCategory(null)
                }}
                className={cn(
                  "px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 flex-shrink-0 min-h-[44px] touch-manipulation",
                  "hover:scale-105 active:scale-95",
                  activeCategory === null
                    ? "bg-gold-500 text-charcoal-900 shadow-lg shadow-gold-500/30"
                    : isDark
                    ? "bg-charcoal-800/50 text-cream-200/70 hover:bg-charcoal-800 hover:text-cream-100"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-label="View all categories"
              >
                All Items
              </button>
              
              {menuCategories.map((category) => {
                const getShortName = (name: string) => {
                  if (name.length <= 15) return name
                  const shortMap: { [key: string]: string } = {
                    'Pasta & Rice Dishes': 'Pasta & Rice',
                    'Main Course / Entrées': 'Main Course',
                    'From the Grill': 'Grill',
                    'Seafood Selections': 'Seafood',
                    'Sides & Accompaniments': 'Sides',
                    'Cold Beverages': 'Cold Drinks',
                    'Alcoholic Beverages': 'Alcohol',
                    'Signature Attieke Dishes': 'Signature',
                  }
                  return shortMap[name] || name.split(' ').slice(0, 2).join(' ')
                }
                
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={cn(
                      "px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 flex-shrink-0 min-h-[44px] touch-manipulation",
                      "hover:scale-105 active:scale-95",
                      activeCategory === category.id
                        ? "bg-gold-500 text-charcoal-900 shadow-lg shadow-gold-500/30"
                        : isDark
                        ? "bg-charcoal-800/50 text-cream-200/70 hover:bg-charcoal-800 hover:text-cream-100"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={category.name}
                    aria-label={`View ${category.name} category`}
                  >
                    {getShortName(category.name)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Sidebar - Category Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <CategoryNav
              activeCategory={activeCategory}
              onCategoryChange={(id) => {
                setFilterCategory(id)
                if (id) scrollToCategory(id)
              }}
              dietaryFilters={filters.dietaryFilters}
              onToggleDietaryFilter={toggleDietaryFilter}
            />
          </div>

          {/* Main Content - Menu Items */}
          <div className="lg:col-span-3">
            {/* View Mode: Grid or List */}
            {viewMode === "grid" ? (
              /* Grid View - Premium Cards */
              <div className="space-y-16 md:space-y-20">
            {menuCategories.map((category) => {
              // Get items from this category
              // When a category filter is active, only show items from that category
              // Otherwise, show all items from this category that match other filters
              let categoryItems: typeof filteredItems = []
              
              if (filters.activeCategory) {
                // Category filter is active - only show this category if it matches
                if (filters.activeCategory === category.id) {
                  // Use items directly from category.items (source of truth)
                  // Then apply other filters (search, dietary, etc.)
                  categoryItems = category.items.filter((item) => {
                    // Apply search filter
                    if (filters.searchQuery.trim()) {
                      const query = filters.searchQuery.toLowerCase()
                      if (!item.name.toLowerCase().includes(query) && 
                          !item.description.toLowerCase().includes(query)) {
                        return false
                      }
                    }
                    
                    // Apply dietary filters
                    if (filters.dietaryFilters.length > 0) {
                      if (!item.dietary) return false
                      if (!filters.dietaryFilters.some((filter) =>
                        item.dietary?.includes(filter as 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')
                      )) {
                        return false
                      }
                    }
                    
                    // Apply spicy level filter
                    if (filters.spicyLevel !== null && item.spicyLevel !== filters.spicyLevel) {
                      return false
                    }
                    
                    // Apply price range filter
                    if (filters.priceRange) {
                      const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
                      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                        return false
                      }
                    }
                    
                    // Filter available items only
                    return item.available !== false
                  })
                } else {
                  // Don't show items from other categories when a specific category is selected
                  categoryItems = []
                }
              } else {
                // No category filter active - show all items from this category
                // Match by both category.id (for menuCategories) and category.name (for item.category field)
                categoryItems = category.items.filter((item) => {
                  // Item must belong to this category (match by category name)
                  const itemBelongsToCategory = item.category === category.name
                  
                  if (!itemBelongsToCategory) return false
                  
                  // Apply search filter
                  if (filters.searchQuery.trim()) {
                    const query = filters.searchQuery.toLowerCase()
                    if (!item.name.toLowerCase().includes(query) && 
                        !item.description.toLowerCase().includes(query)) {
                      return false
                    }
                  }
                  
                  // Apply dietary filters
                  if (filters.dietaryFilters.length > 0) {
                    if (!item.dietary) return false
                    if (!filters.dietaryFilters.some((filter) =>
                      item.dietary?.includes(filter as 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')
                    )) {
                      return false
                    }
                  }
                  
                  // Apply spicy level filter
                  if (filters.spicyLevel !== null && item.spicyLevel !== filters.spicyLevel) {
                    return false
                  }
                  
                  // Apply price range filter
                  if (filters.priceRange) {
                    const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
                    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                      return false
                    }
                  }
                  
                  // Filter available items only
                  return item.available !== false
                })
              }

              // Always render the section so refs are set and scrolling works
              // Only show items if they exist, but keep the section for navigation
              const shouldShowItems = categoryItems.length > 0 || !filters.activeCategory || filters.activeCategory === category.id

              return (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el
                  }}
                  className="mb-16 scroll-mt-24"
                >
                  {/* Category Header - Premium */}
                  <div className="mb-10 md:mb-12">
                    <h2 className={cn(
                      "text-3xl md:text-4xl lg:text-5xl font-display font-light mb-4 transition-colors duration-300",
                      isDark ? "text-cream-100" : "text-foreground"
                    )}>
                      {category.name}
                    </h2>
                    <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent shadow-lg shadow-gold-500/50" />
                    {category.description && (
                      <p className={cn(
                        "mt-4 text-base md:text-lg font-body font-light max-w-2xl",
                        isDark ? "text-cream-200/70" : "text-muted-foreground"
                      )}>
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Menu Items - Grid View */}
                  {shouldShowItems && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 menu-section">
                      {isLoading ? (
                        <>
                          <MenuItemSkeleton />
                          <MenuItemSkeleton />
                          <MenuItemSkeleton />
                          <MenuItemSkeleton />
                        </>
                      ) : categoryItems.length > 0 ? (
                        categoryItems.map((item) => (
                          <PremiumMenuCard key={item.id} item={item} />
                        ))
                      ) : (
                        <div className={cn(
                          "col-span-full py-12 text-center rounded-xl",
                          isDark ? "bg-charcoal-900/30" : "bg-muted/30"
                        )}>
                          <p className={cn(
                            "text-base font-body font-light",
                            isDark ? "text-cream-200/60" : "text-muted-foreground"
                          )}>
                            No items found in this category.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )
            })}
              </div>
            ) : (
              /* List View - Traditional Layout */
              <div className="space-y-16 md:space-y-20">
                {menuCategories.map((category) => {
                  // Same filtering logic as grid view
                  let categoryItems: typeof filteredItems = []
                  
                  if (filters.activeCategory) {
                    if (filters.activeCategory === category.id) {
                      categoryItems = category.items.filter((item) => {
                        if (filters.searchQuery.trim()) {
                          const query = filters.searchQuery.toLowerCase()
                          if (!item.name.toLowerCase().includes(query) && 
                              !item.description.toLowerCase().includes(query)) {
                            return false
                          }
                        }
                        if (filters.dietaryFilters.length > 0) {
                          if (!item.dietary) return false
                          if (!filters.dietaryFilters.some((filter) =>
                            item.dietary?.includes(filter as 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')
                          )) {
                            return false
                          }
                        }
                        if (filters.spicyLevel !== null && item.spicyLevel !== filters.spicyLevel) {
                          return false
                        }
                        if (filters.priceRange) {
                          const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
                          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                            return false
                          }
                        }
                        return item.available !== false
                      })
                    } else {
                      categoryItems = []
                    }
                  } else {
                    categoryItems = category.items.filter((item) => {
                      const itemBelongsToCategory = item.category === category.name
                      if (!itemBelongsToCategory) return false
                      if (filters.searchQuery.trim()) {
                        const query = filters.searchQuery.toLowerCase()
                        if (!item.name.toLowerCase().includes(query) && 
                            !item.description.toLowerCase().includes(query)) {
                          return false
                        }
                      }
                      if (filters.dietaryFilters.length > 0) {
                        if (!item.dietary) return false
                        if (!filters.dietaryFilters.some((filter) =>
                          item.dietary?.includes(filter as 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')
                        )) {
                          return false
                        }
                      }
                      if (filters.spicyLevel !== null && item.spicyLevel !== filters.spicyLevel) {
                        return false
                      }
                      if (filters.priceRange) {
                        const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
                        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                          return false
                        }
                      }
                      return item.available !== false
                    })
                  }

                  const shouldShowItems = categoryItems.length > 0 || !filters.activeCategory || filters.activeCategory === category.id

                  return (
                    <section
                      key={category.id}
                      id={category.id}
                      ref={(el) => {
                        categoryRefs.current[category.id] = el
                      }}
                      className="mb-16 scroll-mt-24"
                    >
                      {/* Category Header */}
                      <div className="mb-10 md:mb-12">
                        <h2 className={cn(
                          "text-3xl md:text-4xl lg:text-5xl font-display font-light mb-4 transition-colors duration-300",
                          isDark ? "text-cream-100" : "text-foreground"
                        )}>
                          {category.name}
                        </h2>
                        <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent shadow-lg shadow-gold-500/50" />
                      </div>

                      {/* List View Items */}
                      {shouldShowItems && (
                        <div className="space-y-8 md:space-y-10 menu-section">
                          {isLoading ? (
                            <>
                              <MenuItemSkeleton />
                              <MenuItemSkeleton />
                              <MenuItemSkeleton />
                            </>
                          ) : categoryItems.length > 0 ? (
                            categoryItems.map((item) => (
                              <div key={item.id} className="menu-item">
                                <PremiumMenuItem item={item} />
                              </div>
                            ))
                          ) : (
                            <div className={cn(
                              "py-12 text-center rounded-xl",
                              isDark ? "bg-charcoal-900/30" : "bg-muted/30"
                            )}>
                              <p className={cn(
                                "text-base font-body font-light",
                                isDark ? "text-cream-200/60" : "text-muted-foreground"
                              )}>
                                No items found in this category.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>

      {/* Floating Mobile Order Button - Premium */}
      {itemCount > 0 && (
        <button
          onClick={() => setShowMobileCart(true)}
          className={cn(
            "lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2",
            "p-4 rounded-full shadow-2xl min-w-[64px] min-h-[64px] touch-manipulation",
            "bg-gold-500 text-charcoal-900 hover:bg-gold-400 active:scale-95 transition-all duration-300",
            "hover:scale-110 hover:shadow-gold-500/50",
            "border-2 border-gold-400/50"
          )}
          aria-label={`View your selection (${itemCount} items)`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="font-bold text-lg">{itemCount}</span>
        </button>
      )}

      {/* Mobile Cart Drawer */}
      <MobileCart isOpen={showMobileCart} onClose={() => setShowMobileCart(false)} />

      {/* Allergen Info Modal */}
      <AllergenInfo isOpen={showAllergenInfo} onClose={() => setShowAllergenInfo(false)} />

      {/* Print Header (hidden on screen) */}
      <div className="print-header hidden print:block">
        <h1>Chez Amis Bar and Grill</h1>
        <p>40 Boundary Rd, Accra | +233 055 703 2312 / +233 055 703 2335 / +233 024 395 2339 / +233 050 243 2037</p>
        <p>We&apos;re Open 24/7</p>
      </div>

      {/* Print Footer (hidden on screen) */}
      <div className="print-footer hidden print:block">
        <p>For the most up-to-date menu and allergen information, please visit our website or contact us directly.</p>
        <p>www.chezamisrestaurant.com | chez@chezamisrestaurant.com</p>
      </div>
    </div>
  )
}