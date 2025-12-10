"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Space {
  id: string
  name: string
  description: string
  image: string
}

const spaces: Space[] = [
  {
    id: "1",
    name: "Main Dining Room",
    description: "Our elegant main dining space features warm lighting, comfortable seating, and an atmosphere designed for memorable conversations.",
    image: "/images/spaces/main-dining.jpg",
  },
  {
    id: "2",
    name: "Private Dining Areas",
    description: "Intimate private rooms perfect for special occasions, business dinners, or celebrations with family and friends.",
    image: "/images/spaces/private-dining.jpg",
  },
  {
    id: "3",
    name: "Bar Area",
    description: "A sophisticated bar space where craft cocktails meet exceptional service, perfect for pre-dinner drinks or casual evenings.",
    image: "/images/spaces/bar.jpg",
  },
  {
    id: "4",
    name: "Outdoor Terrace",
    description: "Al fresco dining on our beautiful terrace, offering fresh air and a relaxed atmosphere under the stars.",
    image: "/images/spaces/terrace.jpg",
  },
  {
    id: "5",
    name: "The Kitchen",
    description: "A glimpse behind the scenes where our chefs work their magic, creating culinary masterpieces with precision and passion.",
    image: "/images/spaces/kitchen.jpg",
  },
]

export function SpaceGallery() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (space: Space, index: number) => {
    setSelectedSpace(space)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedSpace(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? spaces.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedSpace(spaces[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === spaces.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedSpace(spaces[newIndex])
  }

  return (
    <section className="section-padding bg-cream-50" aria-labelledby="space-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="space-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Our Space
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Each area thoughtfully designed to create the perfect atmosphere for your dining
            experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {spaces.map((space, index) => (
            <div
              key={space.id}
              className="group relative w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(space, index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900"></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-display font-light text-cream-100 mb-2">
                  {space.name}
                </h3>
                <p className="text-sm md:text-base text-cream-200/90 font-body font-light line-clamp-2">
                  {space.description}
                </p>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedSpace && (
          <>
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 animate-fade-in"
              onClick={closeLightbox}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="relative max-w-5xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50"
                  onClick={goToPrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50"
                  onClick={goToNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image */}
                <div className="relative w-full h-[60vh] rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900"></div>
                </div>

                {/* Caption */}
                <div className="bg-background rounded-lg p-6 border border-border/30">
                  <h3 className="text-2xl md:text-3xl font-display font-light text-foreground mb-3">
                    {selectedSpace.name}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
                    {selectedSpace.description}
                  </p>
                  <p className="text-sm text-muted-foreground font-body font-light mt-4">
                    {currentIndex + 1} of {spaces.length}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}



