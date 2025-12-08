"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface VideoBackgroundProps {
  src: string
  poster: string
  children: React.ReactNode
  overlay?: boolean
  className?: string
}

export function VideoBackground({
  src,
  poster,
  children,
  overlay = true,
  className,
}: VideoBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Video Background */}
      <video
        autoPlay={!isMobile} // Disable autoplay on mobile to save data
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <div className="absolute inset-0">
          <Image
            src={poster}
            alt="Video background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </video>

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/50" aria-hidden="true" />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

