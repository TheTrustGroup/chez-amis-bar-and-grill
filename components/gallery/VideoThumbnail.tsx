'use client'

import { useState, useEffect, useRef } from 'react'
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

export function VideoThumbnail({
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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let isMounted = true

    const generateThumbnail = async () => {
      try {
        // Create video element
        const video = document.createElement('video')
        video.crossOrigin = 'anonymous'
        video.preload = 'metadata'
        video.muted = true
        video.src = videoSrc

        await new Promise((resolve, reject) => {
          video.addEventListener('loadedmetadata', () => {
            // Seek to 0.5 seconds for better thumbnail
            video.currentTime = 0.5
            resolve(null)
          })
          video.addEventListener('error', reject)
        })

        await new Promise((resolve) => {
          video.addEventListener('seeked', () => {
            // Create canvas
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth || 800
            canvas.height = video.videoHeight || 600
            const ctx = canvas.getContext('2d')

            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
              
              if (isMounted) {
                setThumbnailUrl(dataUrl)
                setIsLoading(false)
                onThumbnailLoad?.()
              }
            } else {
              if (isMounted) {
                setHasError(true)
                setIsLoading(false)
              }
            }
            resolve(null)
          })
        })

        // Cleanup
        video.src = ''
        video.load()
      } catch (error) {
        console.error('Error generating video thumbnail:', error)
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    generateThumbnail()

    return () => {
      isMounted = false
    }
  }, [videoSrc, onThumbnailLoad])

  if (hasError) {
    return <ImagePlaceholder type="video" />
  }

  if (isLoading || !thumbnailUrl) {
    return (
      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <Image
      src={thumbnailUrl}
      alt={alt}
      fill
      className={`${className} object-cover`}
      sizes={sizes}
      quality={85}
      priority={priority}
    />
  )
}

