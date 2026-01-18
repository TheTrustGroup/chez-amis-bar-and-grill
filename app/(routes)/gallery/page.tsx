'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { X, Play, ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GalleryImage } from '@/components/gallery/GalleryImage'
import { VideoThumbnail } from '@/components/gallery/VideoThumbnail'
import { galleryMedia, galleryCategories, type MediaCategory, type MediaItem } from '@/lib/data/galleryMedia'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/context/ThemeContext'

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
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Memoize filtered media to prevent unnecessary recalculations
  const filteredMedia = useMemo(
    () =>
      selectedCategory === 'all'
        ? galleryMedia
        : galleryMedia.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  )

  // Memoize category counts to prevent unnecessary recalculations
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    galleryMedia.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [])

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
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-charcoal-950" : "bg-background"
    )}>
      {/* Hero Section - Premium */}
      <section className={cn(
        "relative h-[45vh] min-h-[350px] md:min-h-[500px] overflow-hidden",
        "bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-display font-light mb-6 md:mb-8",
              "text-cream-100 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
              "animate-fade-in-up"
            )}>
              Our Gallery
            </h1>
            <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-gold-500/50" />
            <p className={cn(
              "text-lg md:text-xl lg:text-2xl font-body font-light leading-relaxed",
              "text-cream-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
              "animate-fade-in-up"
            )} style={{ animationDelay: "0.2s" }}>
              A visual journey through our culinary excellence and warm hospitality
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs - Premium */}
      <section className={cn(
        "sticky top-20 z-40 border-b transition-colors duration-300",
        "backdrop-blur-xl shadow-lg",
        isDark 
          ? "bg-charcoal-950/95 border-charcoal-800/50"
          : "bg-background/95 border-border/50"
      )}>
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto py-4 md:py-5 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-3 min-w-max">
              {galleryCategories.map((category) => {
                const count =
                  category.id === 'all'
                    ? galleryMedia.length
                    : categoryCounts[category.id] || 0
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap font-heading font-medium transition-all duration-300 min-h-[44px] flex-shrink-0 touch-manipulation flex items-center gap-2',
                      'text-sm md:text-base',
                      'hover:scale-105 active:scale-95',
                      selectedCategory === category.id
                        ? 'bg-gold-500 text-charcoal-900 shadow-lg shadow-gold-500/30 scale-105'
                        : isDark
                        ? 'bg-charcoal-800/50 text-cream-200/70 hover:bg-charcoal-800 hover:text-cream-100 border border-charcoal-700/50'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/30'
                    )}
                  >
                    <span>{category.label}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full font-semibold',
                        selectedCategory === category.id
                          ? 'bg-charcoal-900/20 text-charcoal-900'
                          : isDark
                          ? 'bg-charcoal-700/50 text-cream-200/60'
                          : 'bg-muted text-muted-foreground'
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

      {/* Gallery Grid - Premium Immersive */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Info Banner */}
          {filteredMedia.length === 0 && galleryMedia.length > 0 && (
            <div className={cn(
              "mb-8 rounded-xl p-4 md:p-6 flex items-start gap-3 border transition-colors duration-300",
              isDark 
                ? "bg-charcoal-900/50 border-charcoal-800/50"
                : "bg-blue-50 border-blue-200"
            )}>
              <AlertCircle className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                isDark ? "text-gold-400" : "text-blue-600"
              )} />
              <div>
                <p className={cn(
                  "font-medium",
                  isDark ? "text-cream-100" : "text-blue-900"
                )}>
                  No media in this category
                </p>
                <p className={cn(
                  "text-sm mt-1",
                  isDark ? "text-cream-200/70" : "text-blue-700"
                )}>
                  Try selecting a different category or view all media
                </p>
              </div>
            </div>
          )}

          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredMedia.map((item, index) => {
                const fallbackType = getFallbackType(item)
                const isLoaded = loadedImages.has(item.id)

                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className={cn(
                      "group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-out",
                      "hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
                      "border-2",
                      isDark
                        ? "bg-charcoal-900/50 border-charcoal-800/50 hover:border-gold-500/40"
                        : "bg-cream-100 border-border/30 hover:border-gold-500/40",
                      "shadow-lg"
                    )}
                  >
                    {/* Thumbnail with Premium Effects - Lazy loading for performance */}
                    <div className="relative w-full h-full z-0 overflow-hidden">
                      {item.type === 'video' ? (
                        <VideoThumbnail
                          videoSrc={item.src}
                          alt={item.alt}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                          priority={index < 8} // Only first 8 load immediately
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          onThumbnailLoad={() => handleImageLoad(item.id)}
                        />
                      ) : (
                        <GalleryImage
                          src={item.thumbnail || item.src}
                          alt={item.alt}
                          type={fallbackType}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                          priority={index < 8} // Only first 8 load immediately
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          onImageLoad={() => handleImageLoad(item.id)}
                        />
                      )}
                      
                      {/* Loading shimmer effect */}
                      {!isLoaded && (
                        <div className={cn(
                          "absolute inset-0 animate-pulse",
                          isDark ? "bg-charcoal-800" : "bg-gray-200"
                        )} />
                      )}
                    </div>

                    {/* Video Play Button - Premium */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        <div className={cn(
                          "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500",
                          "bg-gold-500/95 backdrop-blur-md shadow-2xl",
                          "group-hover:scale-125 group-hover:bg-gold-400",
                          "border-2 border-gold-300/50 group-hover:border-gold-200"
                        )}>
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-charcoal-900 ml-1 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Premium Gradient Overlay with Fade-in */}
                    <div className={cn(
                      "absolute inset-0 z-30 transition-opacity duration-500",
                      "bg-gradient-to-t from-black/95 via-black/50 to-transparent",
                      "opacity-0 group-hover:opacity-100"
                    )} />

                    {/* Gold Accent Glow on Hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30",
                      "bg-gradient-to-br from-gold-500/20 via-transparent to-transparent"
                    )} />

                    {/* Content Overlay - Premium Animation */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40">
                      <h3 className={cn(
                        "text-base md:text-lg lg:text-xl font-display font-light mb-2",
                        "transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out"
                      )}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className={cn(
                          "text-xs md:text-sm text-cream-200/90 font-body font-light line-clamp-2",
                          "transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75"
                        )}>
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Category Badge - Premium */}
                    <div className={cn(
                      "absolute top-3 left-3 md:top-4 md:left-4 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg z-40 transition-all duration-300",
                      "group-hover:scale-110",
                      isDark
                        ? "bg-charcoal-900/90 border border-gold-500/30"
                        : "bg-white/90 border border-gold-500/20"
                    )}>
                      <span className={cn(
                        "text-xs font-heading font-semibold",
                        isDark ? "text-gold-400" : "text-foreground"
                      )}>
                        {galleryCategories.find((c) => c.id === item.category)?.label}
                      </span>
                    </div>

                    {/* Premium Hover Border Effect */}
                    <div className={cn(
                      "absolute inset-0 border-2 rounded-xl z-20 pointer-events-none transition-all duration-500",
                      "border-gold-500/0 group-hover:border-gold-500/60",
                      "shadow-[0_0_30px_rgba(212,175,55,0.3)] opacity-0 group-hover:opacity-100"
                    )} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={cn(
              "text-center py-20 md:py-24 rounded-xl transition-colors duration-300",
              isDark ? "bg-charcoal-900/30" : "bg-muted/30"
            )}>
              <div className="text-8xl mb-6">📸</div>
              <h3 className={cn(
                "text-2xl md:text-3xl font-display font-light mb-4",
                isDark ? "text-cream-100" : "text-foreground"
              )}>
                Gallery Coming Soon
              </h3>
              <p className={cn(
                "text-base md:text-lg mb-8 max-w-md mx-auto font-body font-light",
                isDark ? "text-cream-200/70" : "text-muted-foreground"
              )}>
                We're preparing stunning visuals of our culinary creations. Check back soon!
              </p>
              <Link href="/menu">
                <Button 
                  variant="premium"
                  size="lg"
                  className="font-heading font-semibold shadow-xl hover:shadow-2xl hover:shadow-gold-500/30"
                >
                  Explore Our Menu
                </Button>
              </Link>
            </div>
          )}

          {/* Empty Category State */}
          {filteredMedia.length === 0 && galleryMedia.length > 0 && (
            <div className={cn(
              "text-center py-20 md:py-24 rounded-xl transition-colors duration-300",
              isDark ? "bg-charcoal-900/30" : "bg-muted/30"
            )}>
              <div className="text-7xl mb-6">🔍</div>
              <h3 className={cn(
                "text-xl md:text-2xl font-display font-light mb-4",
                isDark ? "text-cream-100" : "text-foreground"
              )}>
                No Media in This Category
              </h3>
              <p className={cn(
                "mb-6 font-body font-light",
                isDark ? "text-cream-200/70" : "text-muted-foreground"
              )}>
                Try viewing all media or select a different category
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg",
                  "bg-gold-500 text-charcoal-900 hover:bg-gold-400 hover:scale-105 active:scale-95",
                  "hover:shadow-xl hover:shadow-gold-500/30"
                )}
              >
                View All Media
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className={cn(
        "py-16 md:py-24 transition-colors duration-300",
        isDark ? "bg-charcoal-900" : "bg-charcoal-950"
      )}>
        <div className="container-custom text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-display font-light mb-6",
            "text-cream-100"
          )}>
            Ready to Experience It Yourself?
          </h2>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 shadow-lg shadow-gold-500/50" />
          <p className={cn(
            "text-lg md:text-xl mb-10 max-w-2xl mx-auto font-body font-light leading-relaxed",
            "text-cream-200/80"
          )}>
            Reserve your table and taste the culinary excellence that awaits you at Chez Amis
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/reservations" className="group/reserve">
              <Button
                variant="premium"
                size="lg"
                className={cn(
                  "min-w-[220px]",
                  "shadow-xl hover:shadow-2xl hover:shadow-gold-500/40"
                )}
              >
                <Calendar className="h-5 w-5" />
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredMedia[currentMediaIndex] && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 animate-fade-in overflow-hidden gallery-lightbox"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[60] bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 hover:rotate-90 min-h-[44px] min-w-[44px] flex items-center justify-center close-button"
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
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[60] bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center navigation-buttons"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextMedia()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center navigation-buttons"
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>
            </>
          )}

          {/* Media Content */}
          <div
            className="max-w-7xl max-h-[90vh] w-full relative"
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
              <div className="gallery-video-container">
                <video
                  src={filteredMedia[currentMediaIndex].src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[75vh] rounded-lg shadow-2xl"
                  playsInline
                  controlsList="nodownload noplaybackrate"
                  onError={(e) => {
                    console.error('Lightbox video failed to load:', filteredMedia[currentMediaIndex].src)
                  }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                  }}
                >
                  <source src={filteredMedia[currentMediaIndex].src} type="video/mp4" />
                  <source src={filteredMedia[currentMediaIndex].src} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Media Info - Positioned below video to avoid overlap */}
            <div className={`text-center text-white animate-fade-in ${filteredMedia[currentMediaIndex].type === 'video' ? 'mt-4' : 'mt-8'}`}>
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

          {/* Keyboard Hint - Only show for images, hide for videos to avoid clutter */}
          {filteredMedia[currentMediaIndex].type === 'image' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm flex items-center gap-6 z-50">
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
          )}
        </div>
      )}
    </div>
  )
}
