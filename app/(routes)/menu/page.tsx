"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Search, ShoppingBag, AlertCircle, UtensilsCrossed, Grid3x3, List } from "lucide-react"
import { menuCategories, itemMatchesDietaryFilters } from "@/lib/data/menuData"
import { PremiumMenuItem } from "@/components/menu/PremiumMenuItem"
import { PremiumMenuCard } from "@/components/menu/PremiumMenuCard"
import { CategoryNav } from "@/components/menu/CategoryNav"
import { CartSidebar } from "@/components/menu/CartSidebar"
import { MobileCart } from "@/components/menu/MobileCart"
import { PrintMenu } from "@/components/menu/PrintMenu"
import { AllergenInfo } from "@/components/menu/AllergenInfo"
import { MenuItemSkeleton } from "@/components/ui/skeleton"
import { useMenuFilters } from "@/lib/hooks/useMenuFilters"
import { useOrder } from "@/lib/hooks/useOrder"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/lib/context/ThemeContext"
import { PHONE_DISPLAY_ALL, SITE_EMAIL } from "@/lib/data/siteContact"

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

  const applyCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId)
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

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      {/* Hero Section - Desktop */}
      <section className={cn(
        "relative hidden h-[45vh] min-h-[500px] items-center justify-center overflow-hidden md:flex",
        "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
          <PrintMenu variant="header" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "hero-title tracking-tight",
            "mb-6 md:mb-8 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Our Menu
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light max-w-3xl mx-auto leading-relaxed",
            "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            Seasonal selections, crafted with passion
          </p>
        </div>
      </section>

      {/* Compact mobile page heading */}
      <section className="section-shell py-6 md:hidden">
        <div className="section-shell-inner">
          <h1 className={cn("text-2xl font-display font-light", isDark ? "text-white" : "text-foreground")}>
            Menu
          </h1>
          <p className={cn("mt-1 text-sm font-body font-light", isDark ? "text-white/70" : "text-muted-foreground")}>
            Browse and add your items quickly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={cn("section-shell transition-colors duration-300")}>
        <div className="section-shell-inner">
        {/* Header Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12 print-menu-buttons">
          {/* Search Functionality - Premium */}
          <div className="relative flex-1 max-w-md">
            <Search className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              isDark ? "text-white/60" : "text-muted-foreground"
            )} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3 text-sm md:text-base rounded-lg border-2 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-terra-500/50 focus:border-terra-500",
                "min-h-[48px]",
                isDark 
                  ? "bg-green-600/50 border-green-700/50 text-white placeholder:text-neutral-400/80"
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
                ? "bg-green-600/50 border-green-700/50" 
                : "bg-muted/50 border-border/50"
            )}>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded transition-all duration-300 hover:scale-110 active:scale-95",
                  viewMode === "grid"
                    ? "bg-terra-500 text-neutral-900 shadow-md"
                    : isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
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
                    ? "bg-terra-500 text-neutral-900 shadow-md"
                    : isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Allergen Info (print lives in hero) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAllergenInfo(true)}
                className={cn(
                  "text-xs md:text-sm transition-colors min-h-[32px] px-3 py-1.5 rounded-md",
                  isDark 
                    ? "text-white/70 hover:text-white hover:bg-green-700/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-label="View allergen information"
              >
                Allergen Info
              </button>
            </div>
          </div>
        </div>

        {/* Premium Category Tabs - Mobile & Desktop */}
        <div className={cn(
          "sticky top-20 z-30 mb-8 md:mb-12 border-b transition-colors duration-300",
          isDark 
            ? "bg-green-700/95 backdrop-blur-xl border-green-700/50"
            : "bg-background/95 backdrop-blur-xl border-border/50",
          "shadow-lg"
        )}>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-6 py-3">
            <div className="flex gap-2 min-w-max md:min-w-0 md:justify-center md:flex-wrap md:gap-3">
              {/* All Categories Tab */}
              <button
                onClick={() => {
                  setFilterCategory(null)
                  setActiveCategory(null)
                }}
                className={cn(
                  "h-10 px-4 rounded-full whitespace-nowrap font-body font-medium tracking-wide uppercase text-xs transition-all duration-200 flex-shrink-0 touch-manipulation min-h-[40px] flex items-center",
                  activeCategory === null
                    ? "bg-green-500 text-white shadow-sm"
                    : isDark
                    ? "bg-green-800/80 text-white/80 hover:text-white"
                    : "bg-neutral-100 text-neutral-500 hover:text-neutral-700"
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
                    onClick={() => applyCategoryFilter(category.id)}
                    className={cn(
                      "px-4 rounded-full whitespace-nowrap font-body font-medium tracking-wide uppercase text-xs transition-all duration-200 flex-shrink-0 touch-manipulation min-h-[48px] flex items-center",
                      activeCategory === category.id
                        ? "bg-green-500 text-white shadow-sm"
                        : isDark
                        ? "bg-green-800/80 text-white/80 hover:text-white"
                        : "bg-neutral-100 text-neutral-500 hover:text-neutral-700"
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
                setActiveCategory(id)
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
                    
                    if (!itemMatchesDietaryFilters(item, filters.dietaryFilters)) return false
                    
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
                  
                  if (!itemMatchesDietaryFilters(item, filters.dietaryFilters)) return false
                  
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
                      "section-title mb-4 transition-colors duration-300",
                      isDark ? "text-white" : "text-foreground"
                    )}>
                      {category.name}
                    </h2>
                    <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent shadow-lg shadow-terra-500/50" />
                    {category.description && (
                      <p className={cn(
                        "mt-4 text-base md:text-lg font-body font-light max-w-2xl",
                        isDark ? "text-white/70" : "text-muted-foreground"
                      )}>
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Menu Items - Grid View: 1 col mobile, 2 tablet+, max 3 without cart on xl */}
                  {shouldShowItems && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 grid-gap-section menu-section">
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
                          isDark ? "bg-green-600/30" : "bg-muted/30"
                        )}>
                          <p className={cn(
                            "text-base font-body font-light",
                            isDark ? "text-white/60" : "text-muted-foreground"
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
                        if (!itemMatchesDietaryFilters(item, filters.dietaryFilters)) return false
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
                      if (!itemMatchesDietaryFilters(item, filters.dietaryFilters)) return false
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
                          "section-title mb-4 transition-colors duration-300",
                          isDark ? "text-white" : "text-foreground"
                        )}>
                          {category.name}
                        </h2>
                        <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent shadow-lg shadow-terra-500/50" />
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
                              isDark ? "bg-green-600/30" : "bg-muted/30"
                            )}>
                              <p className={cn(
                                "text-base font-body font-light",
                                isDark ? "text-white/60" : "text-muted-foreground"
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
            <CartSidebar />
          </div>
        </div>
        </div>
      </section>

      {/* Floating Mobile Order Button - Premium */}
      {itemCount > 0 && (
        <button
          type="button"
          onClick={() => setShowMobileCart(true)}
          className={cn(
            "lg:hidden fixed bottom-[7.25rem] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg",
            "bg-terra-500 text-white hover:bg-terra-600 active:scale-95 transition-all duration-200",
            "shadow-[var(--shadow-terra)] focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2"
          )}
          aria-label={`View your selection (${itemCount} items)`}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-bold text-white">
            {itemCount}
          </span>
        </button>
      )}

      {/* Mobile Cart Drawer */}
      <MobileCart isOpen={showMobileCart} onClose={() => setShowMobileCart(false)} />

      {/* Allergen Info Modal */}
      <AllergenInfo isOpen={showAllergenInfo} onClose={() => setShowAllergenInfo(false)} />

      {/* Print Header (hidden on screen) */}
      <div className="print-header hidden print:block">
        <h1>Chez Amis Bar and Grill</h1>
        <p>
          40 Boundary Rd, Accra | {PHONE_DISPLAY_ALL}
        </p>
        <p>We&apos;re Open 24/7</p>
      </div>

      {/* Print Footer (hidden on screen) */}
      <div className="print-footer hidden print:block">
        <p>For the most up-to-date menu and allergen information, please visit our website or contact us directly.</p>
        <p>www.chezamisrestaurant.com | {SITE_EMAIL}</p>
      </div>
    </div>
  )
}