"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.querySelector("section:not(:first-of-type)")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder background - in production, replace with actual image using Next.js Image */}
        {/* Example: <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover" priority /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900">
          {/* Decorative pattern overlay for texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0VjI2aDR2OGgtNHptMCAxNnYtOGg0djhoLTR6TTIwIDM0VjI2aDR2OGgtNHptMCAxNnYtOGg0djhoLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        {/* Dark overlay - 60% opacity as specified */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000 ease-out",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 md:mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-primary">Chez Amis</span> Bar and Grill
          </h1>

          {/* Subheadline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-primary mb-4 md:mb-6">
            Where Every Meal is a Celebration
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience exquisite flavors and warm hospitality in the heart of
            Accra
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/order" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="accent"
                className="w-full sm:w-auto text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Order Online"
              >
                Order Online
              </Button>
            </Link>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 font-semibold border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
                aria-label="View Menu"
              >
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-medium hidden sm:block">Scroll</span>
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
