"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Search, Award, Wine, ShoppingBag, AlertCircle } from "lucide-react"
import { menuCategories } from "@/lib/data/menuData"
import { PremiumMenuItem } from "@/components/menu/PremiumMenuItem"
import { CategoryNav } from "@/components/menu/CategoryNav"
import { OrderSummary } from "@/components/menu/OrderSummary"
import { MobileCart } from "@/components/menu/MobileCart"
import { PrintMenu } from "@/components/menu/PrintMenu"
import { AllergenInfo } from "@/components/menu/AllergenInfo"
import { SeasonalSpecials } from "@/components/menu/SeasonalSpecials"
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
    const element = categoryRefs.current[categoryId]
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
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
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900">
            {/* In production, use actual food photography */}
            <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-4xl">
              Beautiful Plated Dish
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-display font-light text-cream-100 mb-4">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-cream-200/90 font-body font-light mb-6">
            Seasonal selections, crafted with passion
          </p>
          <div className="w-24 h-px bg-gold-500 mx-auto" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Print Menu & Allergen Info */}
        <div className="flex items-center justify-between mb-8 print-menu-buttons">
          <PrintMenu />
          <button
            onClick={() => setShowAllergenInfo(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Allergen Information</span>
          </button>
        </div>

        {/* Mobile Category Tabs */}
        <div className="lg:hidden sticky top-20 bg-white border-b border-gray-200 z-30 pb-4 mb-8">
          <ScrollArea className="w-full">
            <div className="flex gap-2 px-4">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors",
                    activeCategory === category.id
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Search Functionality */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
              const categoryItems = filteredItems.filter(
                (item) => item.category === category.name
              )

              if (categoryItems.length === 0 && filters.activeCategory === category.id) {
                return null
              }

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
                  <div className="mb-8">
                    <h2 className="text-4xl font-light font-serif text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-600 text-lg font-light max-w-2xl">
                        {category.description}
                      </p>
                    )}
                    <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mt-4" />
                  </div>

                  {/* Seasonal Specials Section */}
                  {category.id === "main-course-entrees" && (
                    <SeasonalSpecials />
                  )}

                  {/* Chef's Recommendations Section */}
                  {category.id === "main-course-entrees" && (
                    <div className="my-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-amber-600" />
                        <h3 className="text-2xl font-serif text-gray-900">
                          Chef&apos;s Recommendations
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Our culinary team&apos;s favorite creations, crafted
                        with seasonal ingredients
                      </p>
                    </div>
                  )}

                  {/* Wine Pairing Section */}
                  {category.id === "main-course-entrees" && (
                    <div className="my-12 bg-gray-900 text-white rounded-lg p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Wine className="w-6 h-6 text-amber-400" />
                        <h3 className="text-2xl font-serif">Perfect Pairings</h3>
                      </div>
                      <p className="text-gray-300 mb-6">
                        Enhance your dining experience with our sommelier&apos;s
                        wine recommendations
                      </p>
                      <button className="border border-amber-400 text-amber-400 px-6 py-2 rounded-md hover:bg-amber-400 hover:text-gray-900 transition-colors">
                        View Wine List
                      </button>
                    </div>
                  )}

                  {/* Menu Items */}
                  <div className="space-y-8 menu-section">
                    {isLoading ? (
                      <>
                        <MenuItemSkeleton />
                        <MenuItemSkeleton />
                        <MenuItemSkeleton />
                      </>
                    ) : (
                      categoryItems.map((item) => (
                        <div key={item.id} className="menu-item">
                          <PremiumMenuItem item={item} />
                        </div>
                      ))
                    )}
                  </div>
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
          className="lg:hidden fixed bottom-6 right-6 bg-amber-500 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-medium">{itemCount}</span>
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
        <p>Daily 9:30 am - 12 am</p>
      </div>

      {/* Print Footer (hidden on screen) */}
      <div className="print-footer hidden print:block">
        <p>For the most up-to-date menu and allergen information, please visit our website or contact us directly.</p>
        <p>www.chezamis.com | info@chezamis.com</p>
      </div>
    </div>
  )
}
