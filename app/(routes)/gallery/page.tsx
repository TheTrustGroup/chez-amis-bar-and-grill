'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Play, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GalleryImage } from '@/components/gallery/GalleryImage'
import { galleryMedia, galleryCategories, type MediaCategory, type MediaItem } from '@/lib/data/galleryMedia'
import { cn } from '@/lib/utils'

// Helper to determine fallback type
const getFallbackType = (item: MediaItem): 'dish' | 'video' | 'restaurant' => {
  if (item.fallbackType) return item.fallbackType
  if (item.type === 'video') return 'video'
  if (item.category === 'restaurant-ambiance') return 'restaurant'
  return 'dish'
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const filteredMedia =
    selectedCategory === 'all'
      ? galleryMedia
      : galleryMedia.filter((item) => item.category === selectedCategory)

  // Update category counts
  useEffect(() => {
    // Counts are calculated dynamically from filteredMedia
  }, [selectedCategory])

  const openLightbox = (index: number) => {
    setCurrentMediaIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
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
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevMedia()
          break
        case 'ArrowRight':
          nextMedia()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextMedia, prevMedia, closeLightbox])

  const handleImageLoad = (itemId: string) => {
    setLoadedImages((prev) => new Set([...prev, itemId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-light text-cream-100 mb-4">
              Our Gallery
            </h1>
            <div className="w-24 h-px bg-gold-500 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-cream-200/90 font-body font-light">
              A visual journey through our culinary excellence and warm hospitality
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-cream-50 border-b border-border/50 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-3 min-w-max">
              {galleryCategories.map((category) => {
                const count =
                  category.id === 'all'
                    ? galleryMedia.length
                    : galleryMedia.filter((item) => item.category === category.id).length
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-5 py-2.5 rounded-full whitespace-nowrap font-heading font-medium transition-all duration-300 min-h-[44px] flex-shrink-0 touch-manipulation flex items-center gap-2',
                      'text-sm md:text-base',
                      selectedCategory === category.id
                        ? 'bg-gold-500 text-foreground shadow-md scale-105'
                        : 'bg-white text-muted-foreground hover:bg-cream-100 active:bg-cream-200 border border-border/30'
                    )}
                  >
                    <span>{category.label}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        selectedCategory === category.id
                          ? 'bg-white/20 text-foreground'
                          : 'bg-gray-200 text-gray-600'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Info Banner */}
          {filteredMedia.length === 0 && galleryMedia.length > 0 && (
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-medium">No media in this category</p>
                <p className="text-blue-700 text-sm mt-1">
                  Try selecting a different category or view all media
                </p>
              </div>
            </div>
          )}

          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item, index) => {
                const fallbackType = getFallbackType(item)
                const isLoaded = loadedImages.has(item.id)

                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-cream-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {/* Thumbnail with robust error handling */}
                    <div className="relative w-full h-full">
                      <GalleryImage
                        src={item.thumbnail || item.src}
                        alt={item.alt}
                        type={fallbackType}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 6}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onImageLoad={() => handleImageLoad(item.id)}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <h3 className="text-lg md:text-xl font-display font-light mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-cream-200/90 font-body font-light line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Video Play Button */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/95 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md z-30">
                      <span className="text-xs font-heading font-medium text-foreground">
                        {galleryCategories.find((c) => c.id === item.category)?.label}
                      </span>
                    </div>

                    {/* Load Status Indicator */}
                    {!isLoaded && (
                      <div className="absolute top-4 right-4 z-30">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                      </div>
                    )}

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-4 border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-20 pointer-events-none" />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📸</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">Gallery Coming Soon</h3>
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                We're preparing stunning visuals of our culinary creations. Check back soon!
              </p>
              <Link href="/menu">
                <Button className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium shadow-lg">
                  Explore Our Menu
                </Button>
              </Link>
            </div>
          )}

          {/* Empty Category State */}
          {filteredMedia.length === 0 && galleryMedia.length > 0 && (
            <div className="text-center py-20">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">No Media in This Category</h3>
              <p className="text-gray-500 mb-6">Try viewing all media or select a different category</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                View All Media
              </button>
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

      {/* Lightbox Modal */}
      {lightboxOpen && filteredMedia[currentMediaIndex] && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 hover:rotate-90 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {filteredMedia.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevMedia()
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextMedia()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>
            </>
          )}

          {/* Media Content */}
          <div
            className="max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredMedia[currentMediaIndex].type === 'image' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <GalleryImage
                  src={filteredMedia[currentMediaIndex].src}
                  alt={filteredMedia[currentMediaIndex].alt}
                  type={getFallbackType(filteredMedia[currentMediaIndex])}
                  fill={false}
                  width={1400}
                  height={900}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full">
                <video
                  src={filteredMedia[currentMediaIndex].src}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] rounded-lg shadow-2xl"
                  playsInline
                  poster={filteredMedia[currentMediaIndex].thumbnail}
                  onError={(e) => {
                    console.error('Lightbox video failed to load:', filteredMedia[currentMediaIndex].src)
                  }}
                >
                  <source src={filteredMedia[currentMediaIndex].src} type="video/mp4" />
                  <source src={filteredMedia[currentMediaIndex].src} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Media Info */}
            <div className="mt-8 text-center text-white animate-fade-in">
              <h3 className="text-2xl md:text-3xl font-display font-light mb-3">
                {filteredMedia[currentMediaIndex].title}
              </h3>
              {filteredMedia[currentMediaIndex].description && (
                <p className="text-cream-200/80 font-body font-light max-w-2xl mx-auto mb-4">
                  {filteredMedia[currentMediaIndex].description}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 text-sm text-cream-200/60">
                <span>
                  {currentMediaIndex + 1} / {filteredMedia.length}
                </span>
                <span>•</span>
                <span className="capitalize">
                  {filteredMedia[currentMediaIndex].category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm flex items-center gap-6">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
