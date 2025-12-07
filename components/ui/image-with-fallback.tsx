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
  fallbackSrc = "/images/placeholder-dish.jpg",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden bg-gray-100", className)}>
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
            onError={handleError}
          />
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      {hasError ? (
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" style={{ width, height }}>
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
          sizes={sizes}
          priority={priority}
          onError={handleError}
        />
      )}
    </div>
  )
}

