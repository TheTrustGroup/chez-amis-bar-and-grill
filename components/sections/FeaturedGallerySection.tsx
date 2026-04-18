"use client"

import { useState, useEffect, useRef } from "react"
import { useFocusTrap } from "@/lib/utils/useFocusTrap"
import Image from "next/image"
import Link from "next/link"
import { Play, ArrowRight, X } from "lucide-react"
import { featuredMedia, type FeaturedMediaItem } from "@/lib/data/galleryMedia"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function FeaturedGallerySection() {
  const [selectedMedia, setSelectedMedia] = useState<FeaturedMediaItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useFocusTrap(isModalOpen, modalRef, selectedMedia?.id ?? "")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const openModal = (media: FeaturedMediaItem) => {
    setSelectedMedia(media)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMedia(null)
    document.body.style.overflow = "unset"
  }

  // Handle escape key
  useEffect(() => {
    if (!isModalOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isModalOpen])

  return (
    <>
      <section className={cn(
        "section-shell transition-colors duration-300",
        isDark ? "bg-green-700/50" : "bg-background"
      )}>
        <div className="section-shell-inner">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-12 md:mb-16",
            "animate-fade-in-up"
          )}>
            <h2 className={cn(
              "section-title mb-4 transition-colors duration-300",
              isDark ? "text-white" : "text-foreground"
            )}>
              A Taste of What Awaits
            </h2>
            <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 shadow-lg shadow-terra-500/50" />
            <p className={cn(
              "text-lg md:text-xl font-body font-light max-w-2xl mx-auto transition-colors duration-300",
              isDark ? "text-white/80" : "text-muted-foreground"
            )}>
              Explore our visual story of culinary excellence, crafted with passion and served with pride
            </p>
          </div>

          {/* Featured Media Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
            {featuredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className={cn(
                  "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "bg-green-600" // Fallback background
                )}
              >
                {/* Video Thumbnail - Use video element to show first frame */}
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    poster={item.poster ?? "/media/images/img-6740.jpg"}
                    className="absolute inset-0 z-[1] h-full w-full object-cover bg-green-600"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <ImageWithFallback
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    fallbackType="dish"
                    fallbackSrc="/media/images/img-0821-2.jpg"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Video Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-terra-500/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 z-[2] p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-left text-white text-sm font-body font-medium">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All Button - Secondary CTA */}
          <div className={cn(
            "text-center",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.3s" }}>
            <Link
              href="/gallery"
              className="bg-terra-500 text-white hover:bg-terra-600 font-body font-medium tracking-widest uppercase text-xs px-8 py-4 rounded-full transition-all duration-200 inline-flex items-center gap-2"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL for Videos */}
      {isModalOpen && selectedMedia && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Featured media"
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close featured media"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Media Content */}
          <div
            className="max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "image" ? (
              // Display Image
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                  onError={(e) => {
                    console.error('Featured modal image failed to load:', selectedMedia.src)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            ) : (
              // Display Video
              <div className="relative w-full">
                <video
                  src={selectedMedia.src}
                  poster={selectedMedia.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[80vh] rounded-lg"
                >
                  <source src={selectedMedia.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Media Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-display font-light mb-2">
                {selectedMedia.title || selectedMedia.alt}
              </h3>
              {selectedMedia.title && (
                <p className="text-white/80 font-body font-light text-sm">
                  {selectedMedia.alt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

