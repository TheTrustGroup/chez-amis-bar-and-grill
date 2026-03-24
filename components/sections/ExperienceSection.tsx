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
    <section className="section-shell bg-neutral-50" aria-labelledby="experience-heading">
      <div className="section-shell-inner">
        <div className="section-heading-margin text-center">
          <h2 id="experience-heading" className="section-title text-foreground">
            The Experience
          </h2>
          <div className="mx-auto mb-6 h-px w-20 bg-terra-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap-section">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative cursor-pointer overflow-hidden transition-all duration-700 ease-out",
                  "animate-fade-in-up hover:-translate-y-3 hover:shadow-elegant",
                  "border border-border/50 bg-card/50 backdrop-blur-sm",
                  "hover:border-terra-500/30",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-terra-500/0 via-terra-500/0 to-terra-500/0 transition-all duration-700 group-hover:from-terra-500/5 group-hover:via-terra-500/10 group-hover:to-terra-500/5" />

                <CardContent className="card-padding relative z-10 space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 scale-100 rounded-full bg-terra-500/10 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:bg-terra-500/30 group-hover:blur-3xl" />
                      <div className="relative rounded-full bg-terra-500/5 p-6 transition-all duration-700 group-hover:scale-110 group-hover:bg-terra-500/15">
                        <Icon className="h-10 w-10 text-terra-600 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110 md:h-12 md:w-12" />
                      </div>
                    </div>
                  </div>

                  <h3 className="relative inline-block font-display text-xl font-light text-foreground md:text-2xl">
                    {experience.title}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-terra-400 via-terra-500 to-terra-600 shadow-sm transition-all duration-700 group-hover:w-full" />
                  </h3>

                  <p className="font-body text-base font-light text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90 md:text-lg">
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
