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
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="experience-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            The Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative overflow-hidden transition-all duration-500",
                  "hover:shadow-elegant hover:-translate-y-2",
                  "border-0 bg-card/50 backdrop-blur-sm",
                  "cursor-pointer"
                )}
              >
                <CardContent className="p-8 md:p-10 text-center space-y-6">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-colors duration-500"></div>
                      <div className="relative bg-gold-500/5 rounded-full p-6 group-hover:bg-gold-500/10 transition-colors duration-500">
                        <Icon className="h-10 w-10 md:h-12 md:w-12 text-gold-600" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-display font-light text-foreground relative">
                    {experience.title}
                    {/* Gold underline on hover */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500"></span>
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-body font-light">
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

