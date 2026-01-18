"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function FounderStory() {
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={cn(
      "section-padding relative overflow-hidden",
      isDark ? "bg-charcoal-950/50" : "bg-background"
    )} aria-labelledby="founder-story-heading">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-burgundy-500/5 pointer-events-none" aria-hidden="true" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Chef Portrait with Premium Hover Effects */}
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1 group">
            <div className={cn(
              "absolute inset-0 rounded-2xl overflow-hidden",
              "shadow-2xl transition-all duration-700 ease-out",
              "group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]",
              "border border-gold-500/20 group-hover:border-gold-500/40"
            )}>
              {/* Chef Image with Premium Effects */}
              <Image
                src="/images/team/head-chef.jpg"
                alt="Chef and Founder of Chez Amis Bar and Grill"
                fill
                className={cn(
                  "object-cover object-center transition-transform duration-700 ease-out",
                  "group-hover:scale-110"
                )}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={95}
                style={{
                  filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
                }}
              />
              
              {/* Elegant gradient overlay */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
                "group-hover:from-black/40 group-hover:via-black/10"
              )} />
              
              {/* Gold accent glow on hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                "bg-gradient-to-br from-gold-500/10 via-transparent to-transparent"
              )} />
              
              {/* Elegant frame border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            </div>
            
            {/* Decorative corner accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
          </div>

          {/* Right: Story Text - Elegant Typography */}
          <div className={cn(
            "order-1 lg:order-2 space-y-8 md:space-y-10",
            "transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}>
            {/* Section Header */}
            <div className="space-y-4">
              <h2
                id="founder-story-heading"
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-display font-light leading-tight",
                  isDark ? "text-cream-100" : "text-foreground"
                )}
              >
                A Passion Born in Paris, Perfected in Accra
              </h2>
              {/* Decorative underline */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-gold-500 to-transparent" aria-hidden="true" />
            </div>

            {/* Story Content - Readable Blocks */}
            <div className={cn(
              "space-y-6 md:space-y-8",
              "text-base md:text-lg lg:text-xl font-body leading-relaxed",
              isDark ? "text-cream-200/90" : "text-muted-foreground"
            )}>
              {/* Story Block 1 - Key Point */}
              <div className={cn(
                "p-6 md:p-8 rounded-xl transition-all duration-300",
                isDark ? "bg-charcoal-900/50 border border-charcoal-800/50" : "bg-cream-50/50 border border-border/30",
                "hover:shadow-lg hover:border-gold-500/30"
              )}>
                <p className="mb-0">
                  My culinary journey began in the kitchens of Paris, where I trained under master
                  chefs who taught me that cooking is not merely about feeding people—it&apos;s about
                  creating moments of pure joy and connection. After years of honing my craft in some
                  of Europe&apos;s finest restaurants, I felt a calling to bring this same level of
                  excellence to my homeland.
                </p>
              </div>

              {/* Story Block 2 - Vision */}
              <div className={cn(
                "p-6 md:p-8 rounded-xl transition-all duration-300",
                isDark ? "bg-charcoal-900/50 border border-charcoal-800/50" : "bg-cream-50/50 border border-border/30",
                "hover:shadow-lg hover:border-gold-500/30"
              )}>
                <p className="mb-0">
                  Chez Amis was born from a simple yet profound vision: to create a space where
                  exceptional cuisine meets genuine hospitality, where every dish tells a story, and
                  where our guests feel not just welcomed, but truly cherished. We believe that dining
                  should be an experience that engages all the senses and leaves a lasting impression.
                </p>
              </div>

              {/* Story Block 3 - Philosophy */}
              <div className={cn(
                "p-6 md:p-8 rounded-xl transition-all duration-300",
                isDark ? "bg-charcoal-900/50 border border-charcoal-800/50" : "bg-cream-50/50 border border-border/30",
                "hover:shadow-lg hover:border-gold-500/30"
              )}>
                <p className="mb-0">
                  Our philosophy is rooted in the belief that the best meals come from the heart. We
                  source our ingredients with care, working closely with local farmers and artisans
                  who share our commitment to quality. Every plate that leaves our kitchen is a
                  reflection of our dedication to culinary artistry and our deep respect for the
                  ingredients we work with.
                </p>
              </div>

              {/* Story Block 4 - Community */}
              <div className={cn(
                "p-6 md:p-8 rounded-xl transition-all duration-300",
                isDark ? "bg-charcoal-900/50 border border-charcoal-800/50" : "bg-cream-50/50 border border-border/30",
                "hover:shadow-lg hover:border-gold-500/30"
              )}>
                <p className="mb-0">
                  But beyond the food, Chez Amis is about community. We&apos;re not just a restaurant;
                  we&apos;re a gathering place where families celebrate milestones, friends share
                  laughter, and strangers become friends. Our connection to Accra runs deep, and we&apos;re
                  honored to be part of this vibrant culinary landscape.
                </p>
              </div>

              {/* Story Block 5 - Commitment */}
              <div className={cn(
                "p-6 md:p-8 rounded-xl transition-all duration-300",
                isDark ? "bg-charcoal-900/50 border border-charcoal-800/50" : "bg-cream-50/50 border border-border/30",
                "hover:shadow-lg hover:border-gold-500/30"
              )}>
                <p className="mb-0">
                  Every day, we strive to create an atmosphere where time slows down, where
                  conversations flow freely, and where the simple act of sharing a meal becomes a
                  cherished memory. This is more than a restaurant—it&apos;s a home away from home,
                  and you&apos;re always welcome here.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

