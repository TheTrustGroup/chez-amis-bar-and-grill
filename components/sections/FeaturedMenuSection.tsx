"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedMenuCard } from "@/components/menu/FeaturedMenuCard"
import { MenuItem, menuItems } from "@/lib/menuData"
import { ArrowRight } from "lucide-react"

// Sample featured menu items - using items from menuData
const featuredMenuItems: MenuItem[] = menuItems
  .filter((item) => item.popular || item.category === "main-course" || item.category === "grill")
  .slice(0, 6)

export function FeaturedMenuSection() {
  const handleAddToCart = (item: MenuItem) => {
    // Cart is handled by FeaturedMenuCard component with toast notifications
  }

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="featured-menu-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="featured-menu-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
          >
            Our Signature Dishes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Taste the flavors that keep our guests coming back
          </p>
        </div>

        {/* Featured Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
          {featuredMenuItems.map((item) => (
            <FeaturedMenuCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center">
          <Link href="/menu">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold text-lg px-8 py-6"
            >
              View Full Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
