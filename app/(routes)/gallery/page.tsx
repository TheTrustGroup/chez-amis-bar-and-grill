"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { galleryMedia, galleryCategories, type MediaCategory } from "@/lib/data/galleryMedia"
import { cn } from "@/lib/utils"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredMedia =
    selectedCategory === "all"
      ? galleryMedia
      : galleryMedia.filter((item) => item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentMediaIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = "unset"
  }, [])

  const nextMedia = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev + 1) % filteredMedia.length)
  }, [filteredMedia.length])

  const prevMedia = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length)
  }, [filteredMedia.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextMedia()
      if (e.key === "ArrowLeft") prevMedia()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, nextMedia, prevMedia, closeLightbox])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-charcoal-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
          <Image
            src="/media/images/dishes/attieke/attieke-grilled-tilapia-001.jpg"
            alt="Gallery Hero"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-display font-light text-cream-100 mb-4">
              Our Gallery
            </h1>
            <div className="w-24 h-px bg-gold-500 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-cream-200/90 font-body font-light max-w-2xl mx-auto">
              A visual journey through our culinary world, from signature dishes to memorable moments
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-cream-50 border-b border-border/50 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-6 py-2 rounded-full whitespace-nowrap font-heading font-medium transition-all duration-300 min-h-[44px]",
                  selectedCategory === category.id
                    ? "bg-gold-500 text-foreground shadow-md"
                    : "bg-white text-muted-foreground hover:bg-cream-100 border border-border/30"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-cream-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <Image
                    src={item.thumbnail || item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to gradient background if image fails
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  {/* Fallback gradient if image fails to load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900 -z-10" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-display font-light text-xl mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-cream-200/90 font-body font-light line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Video Play Icon */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gold-500/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-xs font-heading font-medium text-foreground">
                      {galleryCategories.find((c) => c.id === item.category)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg font-body font-light">
                No media found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-charcoal-900 text-cream-100 py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-light mb-4">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-cream-200/80 mb-8 max-w-2xl mx-auto font-body font-light">
            Reserve your table and taste the culinary excellence that awaits you at Chez Amis
          </p>
          <Link href="/reservations">
            <Button
              size="lg"
              className="font-heading font-light tracking-wide bg-gold-500 text-foreground hover:bg-gold-600 min-h-[48px] px-8"
            >
              Reserve a Table
            </Button>
          </Link>
        </div>
      </section>

      {/* LIGHTBOX Modal */}
      {lightboxOpen && filteredMedia[currentMediaIndex] && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          {filteredMedia.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevMedia()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Next Button */}
          {filteredMedia.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextMedia()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Media Content */}
          <div
            className="max-w-6xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredMedia[currentMediaIndex].type === "image" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={filteredMedia[currentMediaIndex].src}
                  alt={filteredMedia[currentMediaIndex].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  priority
                  onError={(e) => {
                    // Show error message if image fails
                    e.currentTarget.style.display = "none"
                  }}
                />
                {/* Fallback message if image fails */}
                <div className="text-white text-center p-8">
                  <p className="text-lg mb-2">Image unavailable</p>
                  <p className="text-sm text-cream-200/60">{filteredMedia[currentMediaIndex].alt}</p>
                </div>
              </div>
            ) : (
              <video
                src={filteredMedia[currentMediaIndex].src}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain rounded-lg"
                poster={filteredMedia[currentMediaIndex].thumbnail}
                playsInline
              >
                <source src={filteredMedia[currentMediaIndex].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Media Info */}
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-display font-light mb-2">
                {filteredMedia[currentMediaIndex].title}
              </h3>
              {filteredMedia[currentMediaIndex].description && (
                <p className="text-cream-200/80 font-body font-light max-w-2xl mx-auto">
                  {filteredMedia[currentMediaIndex].description}
                </p>
              )}
              <p className="text-sm text-cream-200/60 mt-4 font-body font-light">
                {currentMediaIndex + 1} / {filteredMedia.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

