"use client"

import { Flame, ChefHat, Wine } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    icon: Flame,
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
          <h2
            id="experience-heading"
            className="section-title text-neutral-900"
          >
            The Experience
          </h2>
          <div className="mx-auto mb-6 h-px w-20 bg-terra-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap-section items-stretch">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            const featured = index === 1
            return (
              <div
                key={experience.title}
                className={cn(
                  "bg-terra-50 border border-terra-200 rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-sm",
                  featured && "md:scale-105 z-10"
                )}
              >
                <div className="flex justify-center">
                  <div className="relative rounded-full bg-terra-500/10 p-6">
                    <Icon className="h-10 w-10 text-terra-600 md:h-12 md:w-12" aria-hidden />
                  </div>
                </div>

                <h3 className="font-display text-xl font-light text-neutral-900 md:text-2xl">
                  {experience.title}
                </h3>

                <p className="font-body text-base font-light text-neutral-800 md:text-lg">
                  {experience.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
