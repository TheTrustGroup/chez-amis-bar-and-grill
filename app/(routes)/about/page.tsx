"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FounderStory } from "@/components/about/FounderStory"
import { Philosophy } from "@/components/about/Philosophy"
import { TeamGrid } from "@/components/about/TeamGrid"
import { SpaceGallery } from "@/components/about/SpaceGallery"
import { BehindTheScenesSection } from "@/components/sections/BehindTheScenesSection"
import { Award, BookOpen } from "lucide-react"
import { StarRating } from "@/components/ui/StarRating"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/layout/PageIntro"

export default function AboutPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark ? "bg-green-700" : "bg-neutral-50",
      )}
    >
      <PageIntro
        title="Our Story"
        description="A journey of passion, tradition, and culinary excellence."
      />

      {/* Founder's Story */}
      <FounderStory />

      {/* Philosophy */}
      <Philosophy />

      {/* Team */}
      <TeamGrid />

      {/* Space Gallery */}
      <SpaceGallery />

      {/* Behind the Scenes */}
      <BehindTheScenesSection />

      {/* Awards & Recognition - Refined */}
      <section className={cn(
        "section-shell relative overflow-hidden",
        isDark ? "bg-green-700/50" : "bg-neutral-50"
      )} aria-labelledby="awards-heading">
        <div className="section-shell-inner relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <h2
              id="awards-heading"
              className={cn(
                "section-title mb-3",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              Honored to Serve You
            </h2>
            <p className={cn(
              "text-base md:text-lg font-body font-light max-w-2xl mx-auto",
              isDark ? "text-white/80" : "text-muted-foreground"
            )}>
              Recognition from our community and industry peers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {/* TripAdvisor */}
            <div className={cn(
              "text-center space-y-3.5 p-5 md:p-6 rounded-xl border transition-all duration-500",
              "md:hover:shadow-lg md:hover:-translate-y-1 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 md:hover:border-terra-500/40 active:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 md:hover:border-terra-500/40 active:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 md:group-hover:bg-terra-500/20 md:group-hover:scale-105"
                )}>
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 md:group-hover:scale-105" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white md:group-hover:text-terra-400" : "text-foreground md:group-hover:text-terra-600"
              )}>
                TripAdvisor Excellence
              </h3>
              <p className={cn(
                "text-xs md:text-sm font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                Certificate of Excellence 2024
              </p>
            </div>

            {/* Ghana Restaurant Awards */}
            <div className={cn(
              "text-center space-y-3.5 p-5 md:p-6 rounded-xl border transition-all duration-500",
              "md:hover:shadow-lg md:hover:-translate-y-1 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 md:hover:border-terra-500/40 active:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 md:hover:border-terra-500/40 active:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 md:group-hover:bg-terra-500/20 md:group-hover:scale-105"
                )}>
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 md:group-hover:scale-105" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white md:group-hover:text-terra-400" : "text-foreground md:group-hover:text-terra-600"
              )}>
                Ghana Restaurant Awards
              </h3>
              <p className={cn(
                "text-xs md:text-sm font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                2024 Winner - Fine Dining
              </p>
            </div>

            {/* Featured in Magazine */}
            <div className={cn(
              "text-center space-y-3.5 p-5 md:p-6 rounded-xl border transition-all duration-500",
              "md:hover:shadow-lg md:hover:-translate-y-1 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 md:hover:border-terra-500/40 active:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 md:hover:border-terra-500/40 active:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 md:group-hover:bg-terra-500/20 md:group-hover:scale-105"
                )}>
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 md:group-hover:scale-105" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white md:group-hover:text-terra-400" : "text-foreground md:group-hover:text-terra-600"
              )}>
                Featured in
              </h3>
              <p className={cn(
                "text-xs md:text-sm font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                Accra Culinary Magazine
              </p>
            </div>

            {/* Reviews */}
            <div className={cn(
              "text-center space-y-3.5 p-5 md:p-6 rounded-xl border transition-all duration-500",
              "md:hover:shadow-lg md:hover:-translate-y-1 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 md:hover:border-terra-500/40 active:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 md:hover:border-terra-500/40 active:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 md:group-hover:bg-terra-500/20 md:group-hover:scale-105"
                )}>
                  <StarRating count={5} size={22} />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white md:group-hover:text-terra-400" : "text-foreground md:group-hover:text-terra-600"
              )}>
                2,500+ Five-Star Reviews
              </h3>
              <p className={cn(
                "text-xs md:text-sm font-body font-light",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}>
                From our valued guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Excellence - Refined */}
      <section className={cn(
        "section-shell relative overflow-hidden",
        isDark ? "bg-green-700/30" : "bg-neutral-50"
      )} aria-labelledby="commitment-heading">
        <div className="section-shell-inner relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div>
              <h2
                id="commitment-heading"
                className={cn(
                  "section-title mb-4",
                  isDark ? "text-white" : "text-foreground"
                )}
              >
                Commitment to Excellence
              </h2>
            </div>
            
            <blockquote className={cn(
              "text-lg md:text-xl lg:text-2xl font-display font-light leading-relaxed italic",
              "px-5 md:px-6 py-6 md:py-8 rounded-2xl",
              "border-l-4 border-terra-500/50",
              isDark 
                ? "text-white/90 bg-green-600/30 border-green-700/50"
                : "text-foreground bg-background/50 border-border/30",
              "shadow-lg"
            )}>
              &ldquo;At Chez Amis, every meal is an occasion, every guest is family, and every
              moment is crafted with care.&rdquo;
            </blockquote>
            
            <div className={cn(
              "pt-4 md:pt-6",
              "animate-fade-in-up"
            )} style={{ animationDelay: "0.4s" }}>
              <Link href="/reservations" className="group/cta">
                <Button
                  variant="premium"
                  size="lg"
                  className={cn(
                    "min-w-[240px]",
                    "shadow-md md:hover:shadow-lg md:hover:shadow-terra-500/20"
                  )}
                >
                  Experience It Yourself
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
