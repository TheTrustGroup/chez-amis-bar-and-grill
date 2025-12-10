"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function IntroSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="intro-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Head Chef Image - Bright & Polished */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1 group">

            {/* Main Image Container - BRIGHT AND CLEAR */}
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
              {/* Chef Image - NO DARK OVERLAYS, BRIGHT AND VISIBLE */}
              <Image
                src="/images/team/head-chef.jpg"
                alt="Head Chef of Chez Amis Bar and Grill presenting signature dishes with warm hospitality"
                fill
                className="object-cover object-center rounded-xl transition-all duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={95}
                style={{
                  filter: 'brightness(1.08) contrast(1.12) saturate(1.15)',
                }}
              />

              {/* Minimal bottom gradient ONLY for text readability */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent pointer-events-none"></div>

              {/* Text overlay at bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10 pointer-events-none">
                <div className="relative">
                  {/* Gold accent line */}
                  <div className="absolute -top-3 left-0 w-16 h-0.5 bg-gradient-to-r from-amber-400/80 to-transparent"></div>
                  <p className="text-sm font-semibold tracking-wider uppercase text-amber-300 mb-1 drop-shadow-lg">
                    Our Head Chef
                  </p>
                  <p className="text-lg md:text-xl font-light font-display drop-shadow-lg">
                    Crafting culinary excellence
                  </p>
                </div>
              </div>

              {/* Elegant frame border - subtle */}
              <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></div>
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

            {/* Learn Our Story Link */}
            <div className="pt-4 md:pt-6">
              <Link
                href="/about"
                className="inline-block text-base md:text-lg font-body text-foreground hover:text-gold-600 transition-colors duration-300 underline underline-offset-4 decoration-1 decoration-gold-500/50 hover:decoration-gold-500"
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



