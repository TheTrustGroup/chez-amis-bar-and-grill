"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string | undefined
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  fallbackSrc?: string
  quality?: number
  loading?: "lazy" | "eager"
  fallbackType?: "dish" | "restaurant" | "video" | "general"
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  sizes,
  priority = false,
  fallbackSrc,
  quality = 85,
  loading,
  fallbackType = "general",
}: ImageWithFallbackProps) {
  // Default fallback images based on type
  const defaultFallbacks: Record<string, string> = {
    dish: "/images/placeholders/dish-placeholder.svg",
    restaurant: "/images/placeholders/restaurant-placeholder.svg",
    video: "/images/placeholders/video-placeholder.svg",
    general: "/images/placeholders/dish-placeholder.svg",
  }

  const finalFallbackSrc = fallbackSrc || defaultFallbacks[fallbackType] || defaultFallbacks.general

  // Optimized sizes prop with responsive breakpoints
  const defaultSizes = sizes || 
    (fill 
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      : width 
        ? `(max-width: ${width}px) 100vw, ${width}px`
        : "100vw"
    )

  const [imgSrc, setImgSrc] = useState(src || finalFallbackSrc)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (!hasError && imgSrc !== finalFallbackSrc) {
      setHasError(true)
      setImgSrc(finalFallbackSrc)
      setIsLoading(false)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200", className)}>
        {/* Loading skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            sizes={defaultSizes}
            quality={quality}
            priority={priority}
            loading={loading || (priority ? "eager" : "lazy")}
            onError={handleError}
            onLoad={handleLoad}
          />
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200", className)}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {hasError ? (
        <div 
          className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" 
          style={{ width, height }}
        >
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          sizes={defaultSizes}
          quality={quality}
          priority={priority}
          loading={loading || (priority ? "eager" : "lazy")}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}

