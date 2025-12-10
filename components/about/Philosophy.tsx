"use client"

import { Award, Palette, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

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
  return (
    <section className="section-padding bg-cream-50" aria-labelledby="philosophy-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="philosophy-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Our Philosophy
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Three principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={index}
                className="text-center space-y-6 group"
              >
                {/* Decorative Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-colors duration-500"></div>
                    <div className="relative bg-gold-500/5 rounded-full p-6 group-hover:bg-gold-500/10 transition-colors duration-500">
                      <Icon className="h-10 w-10 md:h-12 md:w-12 text-gold-600" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-light text-foreground">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed max-w-md mx-auto">
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



