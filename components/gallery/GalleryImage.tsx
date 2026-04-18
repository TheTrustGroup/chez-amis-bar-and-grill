'use client'

import { useState, memo } from 'react'
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

export const GalleryImage = memo(function GalleryImage({ 
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
    dish: '/media/images/img-0821-2.jpg',
    video: '/media/images/img-6740.jpg',
    restaurant: '/media/images/img-6740.jpg',
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
      {/* Loading skeleton with theme support */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-green-700 dark:via-green-700 dark:to-green-700 animate-pulse" />
      )}

      {/* Main image with fallback */}
      <Image
        src={imageError ? fallbackImages[type] : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-out`}
        sizes={sizes}
        quality={90}
        priority={priority}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  )
})
