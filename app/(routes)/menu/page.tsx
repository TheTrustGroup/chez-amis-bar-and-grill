"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Search, ShoppingBag } from "lucide-react"
import { menuCategories, itemMatchesDietaryFilters } from "@/lib/data/menuData"
import { PremiumMenuCard } from "@/components/menu/PremiumMenuCard"
import { CartSidebar } from "@/components/menu/CartSidebar"
import { MobileCart } from "@/components/menu/MobileCart"
import { PrintMenu } from "@/components/menu/PrintMenu"
import { AllergenInfo } from "@/components/menu/AllergenInfo"
import { useMenuFilters } from "@/lib/hooks/useMenuFilters"
import { useOrder } from "@/lib/hooks/useOrder"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import { PHONE_DISPLAY_ALL, SITE_EMAIL } from "@/lib/data/siteContact"
import { PageIntro } from "@/components/layout/PageIntro"

export default function MenuPage() {
  const [showMobileCart, setShowMobileCart] = useState(false)
  const [showAllergenInfo, setShowAllergenInfo] = useState(false)
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const {
    filters,
    updateSearchQuery,
    setActiveCategory: setFilterCategory,
    clearFilters,
  } = useMenuFilters()
  const activeCategory = filters.activeCategory

  const { itemCount } = useOrder()

  const visibleCategories = useMemo(
    () =>
      menuCategories.filter((category) =>
        filters.activeCategory ? filters.activeCategory === category.id : true
      ),
    [filters.activeCategory]
  )

  const getCategoryItems = useCallback(
    (category: (typeof menuCategories)[number]) =>
      category.items.filter((item) => {
        if (item.category !== category.name) return false
        if (item.available === false) return false
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase()
          if (
            !item.name.toLowerCase().includes(query) &&
            !item.description.toLowerCase().includes(query)
          ) {
            return false
          }
        }
        if (!itemMatchesDietaryFilters(item, filters.dietaryFilters)) return false
        if (filters.spicyLevel !== null && item.spicyLevel !== filters.spicyLevel) return false
        if (filters.priceRange) {
          const price = item.price || (item.portionSizes?.[0]?.price ?? 0)
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false
        }
        return true
      }),
    [filters]
  )

  const hasAnyVisibleItems = useMemo(
    () => visibleCategories.some((category) => getCategoryItems(category).length > 0),
    [visibleCategories, getCategoryItems]
  )

  const applyCategoryFilter = (categoryId: string) => {
    setFilterCategory(categoryId)
  }

  return (
    <div className={cn(
      "print-menu-root",
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      <PageIntro title="Our Menu" description="Browse dishes and add to cart." className="print-menu-buttons">
        <div className="pt-2">
          <PrintMenu variant="header" />
        </div>
      </PageIntro>

      {/* Main Content */}
      <section className={cn("section-shell transition-colors duration-300")}>
        <div className="section-shell-inner">
        {/* Header Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12 print-menu-buttons">
          {/* Search Functionality - Premium */}
          <div className="relative flex-1 max-w-md">
            <Search className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
              isDark ? "text-white/60" : "text-muted-foreground"
            )} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-11 pr-4 py-3 text-sm md:text-base rounded-lg border transition-all duration-300",
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
            {/* Allergen Info (print lives in hero) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAllergenInfo(true)}
                className={cn(
                  "text-xs md:text-sm transition-colors min-h-[32px] px-3 py-1.5 rounded-md",
                  isDark 
                    ? "text-white/70 md:hover:text-white md:hover:bg-green-700/50 active:bg-green-700/50"
                    : "text-muted-foreground md:hover:text-foreground md:hover:bg-muted/50 active:bg-muted/50"
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
            : "bg-background/95 backdrop-blur-xl border-border/50"
        )}>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-6 py-3">
            <div className="flex gap-2 min-w-max md:min-w-0 md:justify-center md:flex-wrap md:gap-3">
              {/* All Categories Tab */}
              <button
                onClick={() => {
                  setFilterCategory(null)
                }}
                className={cn(
                  "h-10 px-4 rounded-full whitespace-nowrap font-body font-medium tracking-wide uppercase text-xs transition-all duration-200 flex-shrink-0 touch-manipulation min-h-[40px] flex items-center",
                  activeCategory === null
                    ? "bg-green-500 text-white shadow-sm"
                    : isDark
                    ? "bg-green-800/80 text-white/80 md:hover:text-white"
                    : "bg-neutral-100 text-neutral-500 md:hover:text-neutral-700"
                )}
                aria-label="View all categories"
              >
                All
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
                        ? "bg-green-800/80 text-white/80 md:hover:text-white"
                        : "bg-neutral-100 text-neutral-500 md:hover:text-neutral-700"
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Main Content - Menu Items */}
          <div className="lg:col-span-3">
            <div className="space-y-16 md:space-y-20">
              {visibleCategories.map((category) => {
                const categoryItems = getCategoryItems(category)
                return (
                  <section
                    key={category.id}
                    id={category.id}
                    ref={(el) => {
                      categoryRefs.current[category.id] = el
                    }}
                    className="mb-16 scroll-mt-24"
                  >
                    <div className="mb-10 md:mb-12">
                      <h2 className={cn(
                        "section-title mb-4 transition-colors duration-300",
                        isDark ? "text-white" : "text-foreground"
                      )}>
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className={cn(
                          "mt-4 text-base md:text-lg font-body font-light max-w-2xl",
                          isDark ? "text-white/70" : "text-muted-foreground"
                        )}>
                          {category.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 grid-gap-section menu-section">
                      {categoryItems.length > 0 ? (
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
                            No items match this filter.
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                )
              })}
            </div>

            {!hasAnyVisibleItems && (
              <div className={cn(
                "rounded-xl py-12 text-center",
                isDark ? "bg-green-600/30" : "bg-muted/30"
              )}>
                <p className={cn(
                  "text-base font-body font-light",
                  isDark ? "text-white/70" : "text-muted-foreground"
                )}>
                  No items found. Try a different search or clear filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={cn(
                    "mt-4 text-sm font-medium underline underline-offset-4",
                    isDark ? "text-white/90" : "text-foreground"
                  )}
                >
                  Clear filters
                </button>
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
            "bg-terra-500 text-white md:hover:bg-terra-600 active:bg-terra-600 active:scale-95 transition-all duration-200",
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