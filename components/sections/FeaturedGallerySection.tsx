"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featuredMedia } from "@/lib/data/galleryMedia"
import { cn } from "@/lib/utils"

export function FeaturedGallerySection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4">
            A Taste of What Awaits
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Explore our visual story of culinary excellence, crafted with passion and served with pride
          </p>
        </div>

        {/* Featured Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {featuredMedia.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
                "shadow-lg hover:shadow-xl transition-all duration-300"
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading={index < 2 ? "eager" : "lazy"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Video Play Button */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gold-500/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/gallery">
            <Button
              variant="outline"
              size="lg"
              className="font-heading font-light tracking-wide border-2 border-gold-500/60 text-foreground hover:bg-gold-500/10 hover:border-gold-500 min-h-[48px] px-8"
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

