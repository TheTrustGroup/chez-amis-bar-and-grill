"use client"

import Link from "next/link"
import Image from "next/image"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { cn } from "@/lib/utils"

export function IntroSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="intro-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Head Chef Image */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900 rounded-lg">
              {/* Chef Image with Fallback */}
              <ImageWithFallback
                src="/images/team/head-chef.jpg"
                alt="Head Chef of Chez Amis Bar and Grill holding signature dishes"
                fill
                className="object-cover object-center rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                fallbackSrc="/images/placeholder-dish.jpg"
              />
            </div>
            {/* Subtle overlay for depth and text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            {/* Chef name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg pointer-events-none">
              <p className="text-cream-100 font-display text-lg md:text-xl font-light">
                Our Head Chef
              </p>
            </div>
          </div>

          {/* Right: Welcome Text */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <h2
              id="intro-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground leading-tight"
            >
              A Culinary Sanctuary
            </h2>

            <div className="space-y-4 md:space-y-5 text-base md:text-lg lg:text-xl text-muted-foreground font-body leading-relaxed">
              <p>
                At Chez Amis, we believe that dining is more than sustenance—it&apos;s an art form, a celebration, and a journey of discovery. Our philosophy is rooted in the belief that every meal should be a memorable experience, crafted with passion, precision, and an unwavering commitment to excellence.
              </p>
              <p>
                Our award-winning chefs draw inspiration from both local traditions and global culinary innovations, creating dishes that tell a story. Each plate is a canvas where flavors, textures, and aromas come together in perfect harmony, inviting you to savor every moment.
              </p>
              <p>
                We source only the finest ingredients, working closely with local farmers and artisans to ensure that every component of your meal meets our exacting standards. From the first sip of wine to the last bite of dessert, we strive to create moments of pure culinary delight.
              </p>
              <p>
                Our commitment extends beyond the kitchen. Every detail—from the ambient lighting to the attentive service—is carefully orchestrated to create an atmosphere of warmth, elegance, and genuine hospitality. Welcome to a place where culinary excellence meets heartfelt service.
              </p>
            </div>

            {/* Chef's Signature */}
            <div className="pt-4 md:pt-6">
              <div className="relative w-48 h-20 md:w-56 md:h-24">
                {/* In production, replace with actual signature image */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent flex items-center justify-center">
                  <span className="font-script text-2xl md:text-3xl text-gold-600/60">
                    Chef&apos;s Signature
                  </span>
                </div>
              </div>
            </div>

            {/* Learn Our Story Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block text-base md:text-lg font-body text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-1 decoration-gold-500/50 hover:decoration-gold-500"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



