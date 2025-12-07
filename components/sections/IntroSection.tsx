"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function IntroSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="intro-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Head Chef Image - Premium Enhanced */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1 rounded-lg overflow-hidden shadow-2xl group">
            {/* Sophisticated dark gradient background base */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-black rounded-lg"></div>
            
            {/* Chef Image with enhanced styling */}
            <div className="absolute inset-0">
              <Image
                src="/images/team/head-chef.jpg"
                alt="Head Chef of Chez Amis Bar and Grill presenting signature dishes with warm hospitality"
                fill
                className="object-cover object-center rounded-lg transition-all duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={90}
                style={{
                  filter: 'brightness(1.05) contrast(1.1) saturate(1.05)',
                }}
              />
            </div>

            {/* Dark overlay to minimize background pattern - sophisticated blend */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/85 via-charcoal-800/75 to-black/90 mix-blend-multiply rounded-lg pointer-events-none"></div>
            
            {/* Selective brightness on chef - spotlight effect */}
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            {/* Gold accent glow - warm lighting from left */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-full rounded-lg pointer-events-none opacity-30 group-hover:opacity-40 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse 100% 150% at 0% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
              }}
            />

            {/* Premium frame - elegant border treatment */}
            <div className="absolute inset-0 border-2 border-gold-500/20 rounded-lg pointer-events-none"></div>
            <div className="absolute inset-2 border border-white/5 rounded-lg pointer-events-none"></div>

            {/* Subtle vignette for depth */}
            <div className="absolute inset-0 rounded-lg pointer-events-none" 
              style={{
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.2)',
              }}
            />

            {/* Enhanced text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/60 to-transparent rounded-b-lg pointer-events-none">
              <div className="relative">
                {/* Gold accent line above text */}
                <div className="absolute -top-3 left-0 w-16 h-0.5 bg-gold-500/60"></div>
                <p className="text-cream-100 font-display text-lg md:text-xl font-light drop-shadow-2xl mb-1">
                  Our Head Chef
                </p>
                <p className="text-gold-400/90 font-body text-sm md:text-base font-light drop-shadow-lg tracking-wide">
                  Crafting culinary excellence
                </p>
              </div>
            </div>

            {/* Premium badge indicator - subtle */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-gold-500/30 rounded-full px-3 py-1.5 pointer-events-none">
              <span className="text-gold-400 text-xs font-medium tracking-wider">EXECUTIVE CHEF</span>
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



