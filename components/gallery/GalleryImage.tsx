'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

interface GalleryImageProps {
  src: string
  alt: string
  type: 'dish' | 'video' | 'restaurant'
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  onImageLoad?: () => void
}

export function GalleryImage({ 
  src, 
  alt, 
  type,
  fill = true,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  onImageLoad
}: GalleryImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fallback images
  const fallbackImages = {
    dish: '/images/placeholders/dish-placeholder.svg',
    video: '/images/placeholders/video-placeholder.svg',
    restaurant: '/images/placeholders/restaurant-placeholder.svg',
  }

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`)
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    onImageLoad?.()
  }

  // If error and no fallback available, show placeholder component
  if (imageError && !fallbackImages[type]) {
    return <ImagePlaceholder type={type} />
  }

  return (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image with fallback */}
      <Image
        src={imageError ? fallbackImages[type] : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes}
        quality={85}
        priority={priority}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  )
}

