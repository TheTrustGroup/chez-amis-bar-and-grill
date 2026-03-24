"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFocusTrap } from "@/lib/utils/useFocusTrap"

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
    image: "/media/images/img-6740.jpg",
  },
  {
    id: "2",
    name: "Private Dining Areas",
    description: "Intimate private rooms perfect for special occasions, business dinners, or celebrations with family and friends.",
    image: "/media/images/img-7189.jpg",
  },
  {
    id: "3",
    name: "Bar Area",
    description: "A sophisticated bar space where craft cocktails meet exceptional service, perfect for pre-dinner drinks or casual evenings.",
    image: "/media/images/img-8021.jpg",
  },
  {
    id: "4",
    name: "Outdoor Terrace",
    description: "Al fresco dining on our beautiful terrace, offering fresh air and a relaxed atmosphere under the stars.",
    image: "/media/images/img-0821-2.jpg",
  },
  {
    id: "5",
    name: "The Kitchen",
    description: "A glimpse behind the scenes where our chefs work their magic, creating culinary masterpieces with precision and passion.",
    image: "/media/images/img-8209.jpg",
  },
]

export function SpaceGallery() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)

  useFocusTrap(!!selectedSpace, dialogRef, selectedSpace ? `${selectedSpace.id}-${currentIndex}` : "")

  const openLightbox = (space: Space, index: number) => {
    setSelectedSpace(space)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedSpace(null)
  }

  useEffect(() => {
    if (!selectedSpace) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedSpace])

  useEffect(() => {
    if (!selectedSpace) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [selectedSpace])

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
    <section className="section-shell bg-neutral-50" aria-labelledby="space-heading">
      <div className="section-shell-inner">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="space-heading"
            className="section-title text-foreground mb-4"
          >
            Our Space
          </h2>
          <div className="w-20 h-px bg-terra-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Each area thoughtfully designed to create the perfect atmosphere for your dining
            experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {spaces.map((space, index) => (
            <button
              key={space.id}
              type="button"
              className="group relative w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden cursor-pointer text-left border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2"
              onClick={() => openLightbox(space, index)}
              aria-label={`View ${space.name}, larger photo`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-900"></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-display font-light text-white mb-2">
                  {space.name}
                </h3>
                <p className="text-sm md:text-base text-white/90 font-body font-light line-clamp-2">
                  {space.description}
                </p>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-terra-500/0 group-hover:bg-terra-500/10 transition-colors duration-500" aria-hidden />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedSpace && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="space-lightbox-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in" aria-hidden />
            <div
              className="relative max-w-5xl w-full max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </Button>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors flex items-center justify-center"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              {/* Image */}
              <div className="relative w-full h-[60vh] rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-900" aria-hidden />
              </div>

              {/* Caption */}
              <div className="bg-background rounded-lg p-6 border border-border/30">
                  <h3
                    id="space-lightbox-title"
                    className="text-2xl md:text-3xl font-display font-light text-foreground mb-3"
                  >
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
        )}
      </div>
    </section>
  )
}



