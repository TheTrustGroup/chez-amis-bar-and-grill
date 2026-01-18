"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ChefHat, Wine } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    icon: Sparkles,
    title: "Curated Ambiance",
    description: "Intimate dining spaces designed for memorable moments",
  },
  {
    icon: ChefHat,
    title: "Culinary Mastery",
    description: "Seasonally-inspired menus crafted by award-winning chefs",
  },
  {
    icon: Wine,
    title: "Impeccable Service",
    description: "Attentive hospitality that anticipates your every need",
  },
]

export function ExperienceSection() {
  return (
    <section className="section-padding bg-cream-50" aria-labelledby="experience-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="experience-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            The Experience
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative overflow-hidden transition-all duration-700 ease-out",
                  "hover:shadow-elegant hover:-translate-y-3",
                  "border border-border/50 bg-card/50 backdrop-blur-sm",
                  "cursor-pointer animate-fade-in-up",
                  "hover:border-gold-500/30"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:via-gold-500/10 group-hover:to-gold-500/5 transition-all duration-700" />
                
                <CardContent className="p-8 md:p-10 text-center space-y-6 relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/30 group-hover:blur-3xl transition-all duration-700 scale-100 group-hover:scale-125"></div>
                      <div className="relative bg-gold-500/5 rounded-full p-6 group-hover:bg-gold-500/15 transition-all duration-700 group-hover:scale-110">
                        <Icon className="h-10 w-10 md:h-12 md:w-12 text-gold-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-display font-light text-foreground relative inline-block">
                    {experience.title}
                    {/* Gold underline on hover */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 group-hover:w-full transition-all duration-700 shadow-sm"></span>
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-body font-light transition-colors duration-300 group-hover:text-foreground/90">
                    {experience.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

