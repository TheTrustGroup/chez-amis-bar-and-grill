'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { X, Play, ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GalleryImage } from '@/components/gallery/GalleryImage'
import { VideoThumbnail } from '@/components/gallery/VideoThumbnail'
import { galleryMedia, galleryCategories, type MediaCategory, type MediaItem } from '@/lib/data/galleryMedia'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/context/ThemeContext'
import { useFocusTrap } from '@/lib/utils/useFocusTrap'

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
  const lightboxRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useFocusTrap(lightboxOpen, lightboxRef, currentMediaIndex)

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
      isDark ? "bg-green-700" : "bg-background"
    )}>
      {/* Hero Section - Premium */}
      <section className={cn(
        "relative h-[45vh] min-h-[350px] md:min-h-[500px] overflow-hidden",
        "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className={cn(
              "hero-title tracking-tight mb-6 md:mb-8",
              "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
              "animate-fade-in-up"
            )}>
              Our Gallery
            </h1>
            <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-terra-500/50" />
            <p className={cn(
              "text-lg md:text-xl lg:text-2xl font-body font-light leading-relaxed",
              "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
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
          ? "bg-green-700/95 border-green-700/50"
          : "bg-background/95 border-border/50"
      )}>
        <div className="section-shell-inner">
          <div className="flex gap-3 overflow-x-auto py-3 md:py-4 scrollbar-hide">
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
                      'px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap font-body font-medium transition-all duration-300 min-h-[48px] flex-shrink-0 touch-manipulation flex items-center gap-2',
                      'text-sm md:text-base',
                      'hover:scale-105 active:scale-95',
                      selectedCategory === category.id
                        ? 'bg-terra-500 text-neutral-900 shadow-lg shadow-terra-500/30 scale-105'
                        : isDark
                        ? 'bg-green-700/50 text-white/70 hover:bg-green-700 hover:text-white border border-green-700/50'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/30'
                    )}
                  >
                    <span>{category.label}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full font-semibold',
                        selectedCategory === category.id
                          ? 'bg-green-600/20 text-neutral-900'
                          : isDark
                          ? 'bg-green-700/50 text-white/60'
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
      <section className="section-shell">
        <div className="section-shell-inner">
          {/* Info Banner */}
          {filteredMedia.length === 0 && galleryMedia.length > 0 && (
            <div className={cn(
              "mb-8 rounded-xl card-padding flex items-start gap-3 border transition-colors duration-300",
              isDark 
                ? "bg-green-600/50 border-green-700/50"
                : "bg-blue-50 border-blue-200"
            )}>
              <AlertCircle className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                isDark ? "text-terra-400" : "text-blue-600"
              )} />
              <div>
                <p className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-blue-900"
                )}>
                  No media in this category
                </p>
                <p className={cn(
                  "text-sm mt-1",
                  isDark ? "text-white/70" : "text-blue-700"
                )}>
                  Try selecting a different category or view all media
                </p>
              </div>
            </div>
          )}

          {filteredMedia.length > 0 ? (
            <div
              className={cn(
                "columns-2 md:columns-3 lg:columns-4",
                "[column-gap:0.5rem] md:[column-gap:0.75rem] lg:[column-gap:1rem]",
              )}
            >
              {filteredMedia.map((item, index) => {
                const fallbackType = getFallbackType(item)
                const isLoaded = loadedImages.has(item.id)

                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openLightbox(index)
                      }
                    }}
                    className={cn(
                      "group relative mb-4 break-inside-avoid md:mb-6",
                      "rounded-sm overflow-hidden cursor-pointer transition-all duration-700 ease-out",
                      "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]",
                      "border-2",
                      isDark
                        ? "bg-green-600/50 border-green-700/50 hover:border-terra-500/40"
                        : "bg-neutral-50 border-border/30 hover:border-terra-500/40",
                      "shadow-lg"
                    )}
                  >
                    {/* Thumbnail — fixed aspect for stable masonry cells */}
                    <div className="relative w-full aspect-[4/5] z-0 overflow-hidden">
                      {item.type === 'video' ? (
                        <VideoThumbnail
                          videoSrc={item.src}
                          alt={item.alt}
                          poster={item.poster ?? item.thumbnail}
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
                          isDark ? "bg-green-700" : "bg-gray-200"
                        )} />
                      )}
                    </div>

                    {/* Video Play Button - Premium */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        <div className={cn(
                          "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500",
                          "bg-terra-500/95 backdrop-blur-md shadow-2xl",
                          "group-hover:scale-125 group-hover:bg-terra-400",
                          "border-2 border-terra-300/50 group-hover:border-terra-200"
                        )}>
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-neutral-900 ml-1 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Premium Gradient Overlay with Fade-in */}
                    <div className={cn(
                      "absolute inset-0 z-[25] transition-opacity duration-500",
                      "bg-gradient-to-t from-black/95 via-black/50 to-transparent",
                      "opacity-0 group-hover:opacity-100 pointer-events-none"
                    )} />

                    {/* Gold Accent Glow on Hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[28]",
                      "bg-gradient-to-br from-terra-500/20 via-transparent to-transparent pointer-events-none"
                    )} />

                    {/* Hover scrim + View (above gradients) */}
                    <div
                      className={cn(
                        "absolute inset-0 z-[35] flex items-center justify-center transition-opacity duration-500",
                        "bg-black/55 opacity-0 group-hover:opacity-100 pointer-events-none",
                      )}
                    >
                      <span className="font-display text-3xl font-light text-white" aria-hidden>
                        ↗
                      </span>
                    </div>

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
                          "text-xs md:text-sm text-white/90 font-body font-light line-clamp-2",
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
                        ? "bg-green-600/90 border border-terra-500/30"
                        : "bg-white/90 border border-terra-500/20"
                    )}>
                      <span className={cn(
                        "text-xs font-body font-semibold",
                        isDark ? "text-terra-400" : "text-foreground"
                      )}>
                        {galleryCategories.find((c) => c.id === item.category)?.label}
                      </span>
                    </div>

                    {/* Premium Hover Border Effect */}
                    <div className={cn(
                      "absolute inset-0 border-2 rounded-xl z-20 pointer-events-none transition-all duration-500",
                      "border-terra-500/0 group-hover:border-terra-500/60",
                      "shadow-[0_0_30px_rgba(212,175,55,0.3)] opacity-0 group-hover:opacity-100"
                    )} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={cn(
              "text-center py-20 md:py-24 rounded-xl transition-colors duration-300",
              isDark ? "bg-green-600/30" : "bg-muted/30"
            )}>
              <div className="text-8xl mb-6">📸</div>
              <h3 className={cn(
                "text-2xl md:text-3xl font-display font-light mb-4",
                isDark ? "text-white" : "text-foreground"
              )}>
                Gallery Coming Soon
              </h3>
              <p className={cn(
                "text-base md:text-lg mb-8 max-w-md mx-auto font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                We&apos;re preparing stunning visuals of our culinary creations. Check back soon!
              </p>
              <Link href="/menu">
                <Button 
                  variant="premium"
                  size="lg"
                  className="font-body font-semibold shadow-xl hover:shadow-2xl hover:shadow-terra-500/30"
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
              isDark ? "bg-green-600/30" : "bg-muted/30"
            )}>
              <div className="text-7xl mb-6">🔍</div>
              <h3 className={cn(
                "text-xl md:text-2xl font-display font-light mb-4",
                isDark ? "text-white" : "text-foreground"
              )}>
                No Media in This Category
              </h3>
              <p className={cn(
                "mb-6 font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                Try viewing all media or select a different category
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg",
                  "bg-terra-500 text-neutral-900 hover:bg-terra-400 hover:scale-105 active:scale-95",
                  "hover:shadow-xl hover:shadow-terra-500/30"
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
        isDark ? "bg-green-600" : "bg-green-700"
      )}>
        <div className="section-shell-inner text-center">
          <h2 className={cn(
            "section-title mb-6",
            "text-white"
          )}>
            Ready to Experience It Yourself?
          </h2>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "text-lg md:text-xl mb-10 max-w-2xl mx-auto font-body font-light leading-relaxed",
            "text-white/80"
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
                  "shadow-xl hover:shadow-2xl hover:shadow-terra-500/40"
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
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
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
                aria-label="Previous media"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextMedia()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center navigation-buttons"
                aria-label="Next media"
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
                  playsInline
                  preload="metadata"
                  poster="/media/images/img-6740.jpg"
                  className="w-full h-auto max-h-[75vh] rounded-lg shadow-2xl"
                  controlsList="nodownload noplaybackrate"
                  onError={() => {
                    console.error('Lightbox video failed to load:', filteredMedia[currentMediaIndex].src)
                  }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                  }}
                >
                  <source src={filteredMedia[currentMediaIndex].src} type="video/mp4" />
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
                <p className="text-white/80 font-body font-light max-w-2xl mx-auto mb-4">
                  {filteredMedia[currentMediaIndex].description}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 text-sm text-white/60">
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
