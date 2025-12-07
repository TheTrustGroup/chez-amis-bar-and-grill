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
            {/* Background decorative elements - subtle glow */}
            <div className="absolute -inset-4 -z-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

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
              <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none"></div>
            </div>

            {/* Floating credential badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-4 max-w-[180px] z-20 hidden md:block">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-xs font-bold tracking-wider uppercase text-amber-700">
                  Executive Chef
                </span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-600">15+ Years Experience</p>
            </div>

            {/* Gold accent corners - decorative */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-400/30 rounded-tr-xl pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-amber-400/30 rounded-bl-xl pointer-events-none hidden md:block"></div>
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



