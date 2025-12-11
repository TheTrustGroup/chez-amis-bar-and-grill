'use client'

import { useState, useEffect, useRef, memo } from 'react'
import Image from 'next/image'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

interface VideoThumbnailProps {
  videoSrc: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  onThumbnailLoad?: () => void
}

// Cache for generated thumbnails
const thumbnailCache = new Map<string, string>()

export const VideoThumbnail = memo(function VideoThumbnail({
  videoSrc,
  alt,
  className = '',
  priority = false,
  sizes,
  onThumbnailLoad,
}: VideoThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true
    let video: HTMLVideoElement | null = null

    // Check cache first
    const cachedThumbnail = thumbnailCache.get(videoSrc)
    if (cachedThumbnail) {
      setThumbnailUrl(cachedThumbnail)
      setIsLoading(false)
      onThumbnailLoad?.()
      return
    }

    // Only generate thumbnail when element is visible (lazy loading)
    const generateThumbnail = async () => {
      if (!isMounted) return

      try {
        // Create video element
        video = document.createElement('video')
        video.crossOrigin = 'anonymous'
        video.preload = 'metadata'
        video.muted = true
        video.src = videoSrc

        // Set timeout for slow connections
        const timeout = setTimeout(() => {
          if (isMounted) {
            setHasError(true)
            setIsLoading(false)
          }
        }, 10000) // 10 second timeout

        await new Promise((resolve, reject) => {
          const handleLoadedMetadata = () => {
            // Seek to 0.1 seconds for faster loading (instead of 0.5)
            video!.currentTime = 0.1
            resolve(null)
          }
          const handleError = () => {
            clearTimeout(timeout)
            reject(new Error('Video metadata failed to load'))
          }
          video!.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
          video!.addEventListener('error', handleError, { once: true })
        })

        await new Promise((resolve) => {
          const handleSeeked = () => {
            clearTimeout(timeout)
            // Create canvas with smaller size for faster processing
            const canvas = document.createElement('canvas')
            const maxSize = 400 // Smaller thumbnail for faster generation
            const aspectRatio = (video!.videoWidth || 800) / (video!.videoHeight || 600)
            
            if (aspectRatio > 1) {
              canvas.width = maxSize
              canvas.height = maxSize / aspectRatio
            } else {
              canvas.width = maxSize * aspectRatio
              canvas.height = maxSize
            }
            
            const ctx = canvas.getContext('2d')
            if (ctx && isMounted) {
              ctx.drawImage(video!, 0, 0, canvas.width, canvas.height)
              const dataUrl = canvas.toDataURL('image/jpeg', 0.75) // Lower quality for speed
              
              // Cache the thumbnail
              thumbnailCache.set(videoSrc, dataUrl)
              
              setThumbnailUrl(dataUrl)
              setIsLoading(false)
              onThumbnailLoad?.()
            } else if (isMounted) {
              setHasError(true)
              setIsLoading(false)
            }
            resolve(null)
          }
          video!.addEventListener('seeked', handleSeeked, { once: true })
        })

        // Cleanup
        if (video) {
          video.src = ''
          video.load()
        }
      } catch (error) {
        console.error('Error generating video thumbnail:', error)
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    // Use Intersection Observer for lazy loading
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && isMounted && !thumbnailUrl && isLoading) {
              // Only generate when visible and not already loaded
              generateThumbnail()
              observerRef.current?.disconnect()
            }
          })
        },
        {
          rootMargin: '50px', // Start loading 50px before visible
          threshold: 0.1,
        }
      )
      observerRef.current.observe(containerRef.current)
    } else if (priority) {
      // For priority items, generate immediately
      generateThumbnail()
    }

    return () => {
      isMounted = false
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (video) {
        video.src = ''
        video.load()
      }
    }
  }, [videoSrc, onThumbnailLoad, priority, thumbnailUrl, isLoading])

  if (hasError) {
    return <ImagePlaceholder type="video" />
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {isLoading || !thumbnailUrl ? (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Image
          src={thumbnailUrl}
          alt={alt}
          fill
          className={`${className} object-cover`}
          sizes={sizes}
          quality={75}
          priority={priority}
        />
      )}
    </div>
  )
})
