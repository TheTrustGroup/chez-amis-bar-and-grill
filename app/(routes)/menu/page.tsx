"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Search, ShoppingBag, AlertCircle } from "lucide-react"
import { menuCategories } from "@/lib/data/menuData"
import { PremiumMenuItem } from "@/components/menu/PremiumMenuItem"
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

export default function MenuPage() {
  const [showMobileCart, setShowMobileCart] = useState(false)
  const [showAllergenInfo, setShowAllergenInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({})

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[40vh] min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-cream-100 mb-4">
            Our Menu
          </h1>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-cream-200/90 font-body font-light max-w-2xl mx-auto">
            Seasonal selections, crafted with passion
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-16">
        {/* Print Menu & Allergen Info - Minimal */}
        <div className="flex items-center justify-end gap-4 mb-8 print-menu-buttons">
          <button
            onClick={() => setShowAllergenInfo(true)}
            className="text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors min-h-[32px] px-2"
            aria-label="View allergen information"
          >
            Allergen Info
          </button>
          <PrintMenu />
        </div>

        {/* Mobile Category Tabs - Cleaner */}
        <div className="lg:hidden sticky top-20 bg-white border-b border-gray-100 z-30 mb-8 shadow-sm">
          <div className="overflow-x-auto scrollbar-hide px-4 py-3">
            <div className="flex gap-2 min-w-max">
              {menuCategories.map((category) => {
                const getShortName = (name: string) => {
                  if (name.length <= 12) return name
                  const shortMap: { [key: string]: string } = {
                    'Pasta & Rice Dishes': 'Pasta & Rice',
                    'Main Course / Entrées': 'Main Course',
                    'From the Grill': 'Grill',
                    'Seafood Selections': 'Seafood',
                    'Sides & Accompaniments': 'Sides',
                    'Cold Beverages': 'Cold Drinks',
                    'Alcoholic Beverages': 'Alcohol',
                  }
                  return shortMap[name] || name.split(' ').slice(0, 2).join(' ')
                }
                
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-full whitespace-nowrap text-xs font-medium transition-all flex-shrink-0 min-h-[40px] touch-manipulation",
                      activeCategory === category.id
                        ? "bg-amber-500 text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
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

        {/* Search Functionality - Minimal */}
        <div className="mb-8">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border-b-2 border-gray-200 focus:outline-none focus:border-amber-500 transition-colors bg-transparent placeholder:text-gray-400 min-h-[44px]"
              aria-label="Search menu items"
            />
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
                  {/* Category Header - Minimal */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-light font-display text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <div className="w-20 h-px bg-amber-500" />
                  </div>

                  {/* Menu Items - Cleaner spacing */}
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
                        <div className="py-8 text-center text-gray-500">
                          <p className="text-sm">No items found in this category.</p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )
            })}
          </div>

          {/* Right Sidebar - Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>

      {/* Floating Mobile Order Button */}
      {itemCount > 0 && (
        <button
          onClick={() => setShowMobileCart(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-amber-500 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2 min-w-[56px] min-h-[56px] touch-manipulation active:scale-95 transition-transform"
          aria-label={`View your selection (${itemCount} items)`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="font-medium text-base">{itemCount}</span>
        </button>
      )}

      {/* Mobile Cart Drawer */}
      <MobileCart isOpen={showMobileCart} onClose={() => setShowMobileCart(false)} />

      {/* Allergen Info Modal */}
      <AllergenInfo isOpen={showAllergenInfo} onClose={() => setShowAllergenInfo(false)} />

      {/* Print Header (hidden on screen) */}
      <div className="print-header hidden print:block">
        <h1>Chez Amis Bar and Grill</h1>
        <p>40 Boundary Rd, Accra | +233 024 395 2339</p>
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