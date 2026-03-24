"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedMenuCard } from "@/components/menu/FeaturedMenuCard"
import type { MenuItem } from "@/lib/data/menuData"
import { featuredMenuItemsForHome } from "@/lib/data/menuData"
import { ArrowRight } from "lucide-react"

const featuredMenuItems: MenuItem[] = featuredMenuItemsForHome.slice(0, 6)

export function FeaturedMenuSection() {
  const handleAddToCart = (_item: MenuItem) => {
    // Cart is handled by FeaturedMenuCard component with toast notifications
  }

  return (
    <section className="section-shell bg-background" aria-labelledby="featured-menu-heading">
      <div className="section-shell-inner">
        <div className="section-heading-margin text-center">
          <h2 id="featured-menu-heading" className="section-title text-foreground">
            Our Signature Dishes
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Taste the flavors that keep our guests coming back
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 grid-gap-section md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredMenuItems.map((item) => (
            <FeaturedMenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/menu">
            <Button size="lg" variant="outline" className="min-h-[48px] w-full px-8 py-6 text-lg font-semibold sm:w-auto">
              View Full Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
