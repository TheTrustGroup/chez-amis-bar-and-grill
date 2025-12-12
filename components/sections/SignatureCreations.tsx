"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { MenuItem, allMenuItems } from "@/lib/data/menuData"
import { formatPrice } from "@/lib/utils/formatting"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Get signature dishes (items with 'signature' tag - Attieke dishes)
const signatureDishes: MenuItem[] = allMenuItems
  .filter((item) => item.tags?.includes('signature'))
  .slice(0, 6)

export function SignatureCreations() {
  return (
    <section className="section-padding bg-background" aria-labelledby="signature-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="signature-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Signature Creations
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Our chef&apos;s most celebrated dishes, each a masterpiece of flavor and presentation
          </p>
        </div>

        {/* Horizontal Scroll Gallery - Desktop */}
        <div className="hidden md:block">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className={cn(
                  "group relative flex-shrink-0 w-[400px] h-[500px] rounded-lg overflow-hidden",
                  "transition-all duration-700 ease-out",
                  "hover:shadow-elegant"
                )}
              >
                {/* Image Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
                  {dish.image ? (
                    <Image
                      src={dish.image}
                      alt={`${dish.name} - ${dish.description}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="400px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-2xl">
                      {dish.name}
                    </div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {dish.tags?.includes('signature') && (
                    <span className="inline-block bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                      Signature Dish
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-display font-light text-cream-100 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-cream-200/80 text-sm md:text-base font-body font-light mb-4 line-clamp-2">
                    {dish.description.split(".")[0]}.
                  </p>
                  <p className="text-gold-500 text-lg md:text-xl font-display font-light">
                    {dish.price ? formatPrice(dish.price) : dish.portionSizes?.[0] ? formatPrice(dish.portionSizes[0].price) : 'Price varies'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stacked Layout - Mobile */}
        <div className="md:hidden space-y-8">
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              className={cn(
                "group relative w-full h-[400px] rounded-lg overflow-hidden",
                "transition-all duration-700 ease-out",
                "hover:shadow-elegant"
              )}
            >
              {/* Image Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
                {dish.image ? (
                  <Image
                    src={dish.image}
                    alt={`${dish.name} - ${dish.description}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-xl">
                    {dish.name}
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {dish.tags?.includes('signature') && (
                  <span className="inline-block bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                    Signature Dish
                  </span>
                )}
                <h3 className="text-2xl font-display font-light text-cream-100 mb-2">
                  {dish.name}
                </h3>
                <p className="text-cream-200/80 text-sm font-body font-light mb-4 line-clamp-2">
                  {dish.description.split(".")[0]}.
                </p>
                <p className="text-gold-500 text-lg font-display font-light">
                  {dish.price ? formatPrice(dish.price) : dish.portionSizes?.[0] ? formatPrice(dish.portionSizes[0].price) : 'Price varies'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center mt-16 md:mt-20">
          <Link href="/menu">
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-heading font-light tracking-wide px-8 md:px-12 py-6 md:py-7 transition-all duration-500"
            >
              Explore Our Complete Menu
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}



