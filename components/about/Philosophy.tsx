"use client"

import { useState, useEffect } from "react"
import { Award, Palette, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

const pillars = [
  {
    icon: Award,
    title: "Quality",
    description: "We source only the finest ingredients, working directly with local farmers and trusted suppliers to ensure every component meets our exacting standards.",
  },
  {
    icon: Palette,
    title: "Craft",
    description: "Every dish is a work of culinary art, crafted with precision, passion, and an unwavering commitment to excellence in both flavor and presentation.",
  },
  {
    icon: Heart,
    title: "Hospitality",
    description: "Your comfort is our priority. We believe that exceptional service is the foundation of a memorable dining experience, and we strive to exceed your expectations at every turn.",
  },
]

export function Philosophy() {
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={cn(
      "section-padding relative overflow-hidden",
      isDark ? "bg-charcoal-950/30" : "bg-cream-50"
    )} aria-labelledby="philosophy-heading">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/3 via-transparent to-burgundy-500/3 pointer-events-none" aria-hidden="true" />
      
      <div className="container-custom relative z-10">
        <div className={cn(
          "text-center mb-12 md:mb-16 transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2
            id="philosophy-heading"
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-light mb-4",
              isDark ? "text-cream-100" : "text-foreground"
            )}
          >
            Our Philosophy
          </h2>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-4 shadow-lg shadow-gold-500/50" />
          <p className={cn(
            "text-lg md:text-xl font-body font-light max-w-2xl mx-auto",
            isDark ? "text-cream-200/80" : "text-muted-foreground"
          )}>
            Three principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={index}
                className={cn(
                  "text-center space-y-6 group relative",
                  "p-8 md:p-10 rounded-2xl transition-all duration-700 ease-out",
                  isDark 
                    ? "bg-charcoal-900/50 border border-charcoal-800/50 hover:border-gold-500/40 hover:bg-charcoal-900/70"
                    : "bg-background/50 border border-border/30 hover:border-gold-500/40 hover:bg-background/80",
                  "hover:shadow-2xl hover:-translate-y-2",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Decorative Icon with Enhanced Effects */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-2xl transition-all duration-700",
                      "bg-gold-500/10 group-hover:bg-gold-500/30 group-hover:blur-3xl group-hover:scale-125"
                    )} />
                    <div className={cn(
                      "relative rounded-full p-6 transition-all duration-700",
                      "bg-gold-500/5 group-hover:bg-gold-500/15 group-hover:scale-110",
                      "border border-gold-500/20 group-hover:border-gold-500/40"
                    )}>
                      <Icon className="h-10 w-10 md:h-12 md:w-12 text-gold-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className={cn(
                  "text-2xl md:text-3xl font-display font-light transition-colors duration-300",
                  isDark ? "text-cream-100 group-hover:text-gold-400" : "text-foreground group-hover:text-gold-600"
                )}>
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className={cn(
                  "text-base md:text-lg font-body font-light leading-relaxed max-w-md mx-auto transition-colors duration-300",
                  isDark ? "text-cream-200/80" : "text-muted-foreground"
                )}>
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



