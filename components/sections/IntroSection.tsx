"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function IntroSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="intro-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Head Chef Image - Premium Professional Treatment */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group">
            {/* Base: Sophisticated dark gradient - Option A foundation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] rounded-2xl"></div>
            
            {/* Chef Image with professional color grading */}
            <div className="absolute inset-0">
              <Image
                src="/images/team/head-chef.jpg"
                alt="Head Chef of Chez Amis Bar and Grill presenting signature dishes with warm hospitality"
                fill
                className="object-cover object-center rounded-2xl transition-all duration-700 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={95}
                style={{
                  filter: 'brightness(1.08) contrast(1.15) saturate(1.1)',
                }}
              />
            </div>

            {/* Professional dark overlay - eliminates background pattern */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(20,20,20,0.88) 50%, rgba(5,5,5,0.95) 100%)',
                mixBlendMode: 'multiply',
              }}
            />

            {/* Sophisticated bokeh-like lighting effects - Option C luxury elements */}
            {/* Main warm spotlight from top-left */}
            <div 
              className="absolute top-0 left-0 w-2/3 h-2/3 rounded-2xl pointer-events-none opacity-40 group-hover:opacity-50 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 20% 20%, rgba(212, 175, 55, 0.25) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
            />
            
            {/* Secondary warm accent from right */}
            <div 
              className="absolute top-1/4 right-0 w-1/2 h-1/2 rounded-2xl pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Subtle bottom accent light */}
            <div 
              className="absolute bottom-0 left-1/3 w-1/3 h-1/3 rounded-2xl pointer-events-none opacity-15"
              style={{
                background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />

            {/* Professional spotlight on chef - keeps focus */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 90% at 50% 45%, transparent 0%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            {/* Premium vignette - cinematic depth */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4), inset 0 0 50px rgba(0,0,0,0.3), inset 0 0 25px rgba(0,0,0,0.2)',
              }}
            />

            {/* Elegant frame - triple border treatment */}
            <div className="absolute inset-0 border border-gold-500/15 rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-[1px] border border-white/3 rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-[2px] border border-gold-500/10 rounded-2xl pointer-events-none"></div>

            {/* Premium text overlay - magazine-style typography */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-2xl pointer-events-none">
              <div className="relative">
                {/* Elegant gold accent line */}
                <div className="absolute -top-4 left-0 w-20 h-[1px] bg-gradient-to-r from-gold-500/80 via-gold-400/60 to-transparent"></div>
                
                {/* Main title */}
                <p className="text-cream-100 font-display text-xl md:text-2xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2 tracking-tight">
                  Our Head Chef
                </p>
                
                {/* Subtitle with refined styling */}
                <p className="text-gold-300/95 font-body text-sm md:text-base font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] tracking-wider uppercase letter-spacing-[0.1em]">
                  Crafting Culinary Excellence
                </p>
              </div>
            </div>

            {/* Premium badge - refined positioning */}
            <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md border border-gold-500/25 rounded-full px-4 py-2 pointer-events-none shadow-lg">
              <span className="text-gold-300 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                Executive Chef
              </span>
            </div>

            {/* Subtle texture overlay for premium feel */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
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



