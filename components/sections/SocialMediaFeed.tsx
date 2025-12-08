"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { instagramPosts } from "@/lib/data/galleryMedia"
import { cn } from "@/lib/utils"

export function SocialMediaFeed() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-gold-600" />
            <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
              @ChezAmisAccra
            </h2>
          </div>
          <p className="text-muted-foreground font-body font-light">
            Follow us for daily culinary inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden",
                "shadow-md hover:shadow-xl transition-all duration-300"
              )}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-heading font-medium transition-colors"
          >
            Follow us on Instagram
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

