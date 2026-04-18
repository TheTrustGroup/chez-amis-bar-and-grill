'use client'

import { memo } from 'react'

const DEFAULT_POSTER = '/media/images/img-6740.jpg'

interface VideoThumbnailProps {
  videoSrc: string
  alt: string
  poster?: string
  className?: string
  priority?: boolean
  /** Accepted for API parity with image thumbnails; not used for native video. */
  sizes?: string
  onThumbnailLoad?: () => void
}

export const VideoThumbnail = memo(function VideoThumbnail({
  videoSrc,
  alt,
  poster,
  className = '',
  priority = false,
  onThumbnailLoad,
}: VideoThumbnailProps) {
  const posterSrc = poster && !poster.endsWith('.svg') ? poster : DEFAULT_POSTER

  return (
    <div className={`relative w-full h-full overflow-hidden bg-green-600 ${className}`}>
      <video
        src={videoSrc}
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload={priority ? 'metadata' : 'none'}
        aria-label={alt}
        onLoadedData={() => onThumbnailLoad?.()}
      />
    </div>
  )
})
