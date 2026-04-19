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

  const blockClass = cn(
    "ui-card-compact p-5 md:p-6 transition-all duration-300",
    isDark ? "dark:bg-green-600/50 dark:border-green-700/50" : "bg-neutral-50/50",
    "md:hover:border-terra-500/30 md:hover:shadow-lg",
  )

  return (
    <section
      className={cn(
        "section-shell relative overflow-hidden",
        isDark ? "bg-green-700/50" : "bg-background",
      )}
      aria-labelledby="founder-story-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terra-500/5 via-transparent to-green-500/5" aria-hidden="true" />

      <div className="section-shell-inner relative z-10">
        <div className="section-split items-center">
          <div className="group relative order-2 h-[500px] w-full md:order-1 md:h-[600px] lg:h-[700px] section-split-half">
            <div
              className={cn(
                "absolute inset-0 overflow-hidden rounded-2xl border border-terra-500/20 shadow-2xl transition-all duration-700 ease-out",
                "md:group-hover:border-terra-500/40 md:group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]",
              )}
            >
              <Image
                src="/media/images/img-8209.jpg"
                alt="Chef and Founder of Chez Amis Bar and Grill"
                fill
                className="object-cover object-center brightness-110 contrast-110 saturate-110 transition-transform duration-700 ease-out md:group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={95}
              />

              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
                  "md:group-hover:from-black/40 md:group-hover:via-black/10",
                )}
              />

              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 md:group-hover:opacity-100 bg-gradient-to-br from-terra-500/10 via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />
            </div>

            <div
              className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-terra-500/10 opacity-0 blur-3xl transition-opacity duration-700 md:group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <div
            className={cn(
              "order-1 space-y-8 md:space-y-10 md:order-2 section-split-half",
              "transition-all duration-1000 ease-out",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
            )}
          >
            <div className="space-y-4">
              <h2
                id="founder-story-heading"
                className={cn("section-title leading-tight", isDark ? "text-white" : "text-foreground")}
              >
                A Passion Born in Paris, Perfected in Accra
              </h2>
              <div className="h-0.5 w-20 bg-gradient-to-r from-terra-500 to-transparent" aria-hidden="true" />
            </div>

            <div
              className={cn(
                "prose-readable space-y-6 text-base font-body md:space-y-8 md:text-lg lg:text-xl",
                isDark ? "text-white/90" : "text-muted-foreground",
              )}
            >
              <div className={blockClass}>
                <p className="mb-0">
                  My culinary journey began in the kitchens of Paris, where I trained under master chefs
                  who taught me that cooking is not merely about feeding people. It&apos;s about creating
                  moments of pure joy and connection. After years of honing my craft in some of
                  Europe&apos;s finest restaurants, I felt a calling to bring this same level of excellence
                  to my homeland.
                </p>
              </div>

              <div className={blockClass}>
                <p className="mb-0">
                  Chez Amis was born from a simple yet profound vision: to create a space where
                  exceptional cuisine meets genuine hospitality, where every dish tells a story, and
                  where our guests feel not just welcomed, but truly cherished. We believe that dining
                  should be an experience that engages all the senses and leaves a lasting impression.
                </p>
              </div>

              <div className={blockClass}>
                <p className="mb-0">
                  Our philosophy is rooted in the belief that the best meals come from the heart. We
                  source our ingredients with care, working closely with local farmers and artisans who
                  share our commitment to quality. Every plate that leaves our kitchen is a reflection of
                  our dedication to culinary artistry and our deep respect for the ingredients we work
                  with.
                </p>
              </div>

              <div className={blockClass}>
                <p className="mb-0">
                  But beyond the food, Chez Amis is about community. We&apos;re not just a restaurant;
                  we&apos;re a gathering place where families celebrate milestones, friends share laughter,
                  and strangers become friends. Our connection to Accra runs deep, and we&apos;re honored to
                  be part of this vibrant culinary landscape.
                </p>
              </div>

              <div className={blockClass}>
                <p className="mb-0">
                  Every day, we strive to create an atmosphere where time slows down, where conversations
                  flow freely, and where the simple act of sharing a meal becomes a cherished memory. This
                  is more than a restaurant. It&apos;s a home away from home, and you&apos;re always welcome
                  here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
