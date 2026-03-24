"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FounderStory } from "@/components/about/FounderStory"
import { Philosophy } from "@/components/about/Philosophy"
import { TeamGrid } from "@/components/about/TeamGrid"
import { SpaceGallery } from "@/components/about/SpaceGallery"
import { BehindTheScenesSection } from "@/components/sections/BehindTheScenesSection"
import { Award, Star, BookOpen } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

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
      {/* Hero Section - Refined and Luxurious */}
      <section className={cn(
        "relative h-[40vh] md:h-[45vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      )}>
        {/* Elegant overlay */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        
        {/* Decorative pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-4v4h4zm0-16v-4h-4v4h4zm-16 0v-4h-4v4h4zm0 16v-4h-4v4h4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "hero-title tracking-tight mb-6 md:mb-8",
            "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Our Story
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light max-w-3xl mx-auto leading-relaxed",
            "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            A journey of passion, tradition, and culinary excellence
          </p>
        </div>
      </section>

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
        <div className="absolute inset-0 bg-gradient-to-br from-terra-500/3 via-transparent to-green-500/3 pointer-events-none" aria-hidden="true" />
        
        <div className="section-shell-inner relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="awards-heading"
              className={cn(
                "section-title mb-4",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              Honored to Serve You
            </h2>
            <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-4 shadow-lg shadow-terra-500/50" />
            <p className={cn(
              "text-lg md:text-xl font-body font-light max-w-2xl mx-auto",
              isDark ? "text-white/80" : "text-muted-foreground"
            )}>
              Recognition from our community and industry peers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* TripAdvisor */}
            <div className={cn(
              "text-center space-y-4 p-6 md:p-8 rounded-xl border transition-all duration-500",
              "hover:shadow-2xl hover:-translate-y-2 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 hover:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 hover:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white group-hover:text-terra-400" : "text-foreground group-hover:text-terra-600"
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
              "text-center space-y-4 p-6 md:p-8 rounded-xl border transition-all duration-500",
              "hover:shadow-2xl hover:-translate-y-2 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 hover:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 hover:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white group-hover:text-terra-400" : "text-foreground group-hover:text-terra-600"
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
              "text-center space-y-4 p-6 md:p-8 rounded-xl border transition-all duration-500",
              "hover:shadow-2xl hover:-translate-y-2 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 hover:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 hover:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-terra-600 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white group-hover:text-terra-400" : "text-foreground group-hover:text-terra-600"
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
              "text-center space-y-4 p-6 md:p-8 rounded-xl border transition-all duration-500",
              "hover:shadow-2xl hover:-translate-y-2 group",
              isDark 
                ? "bg-green-600/50 border-green-700/50 hover:border-terra-500/40"
                : "bg-neutral-50/50 border-border/30 hover:border-terra-500/40"
            )}>
              <div className="flex justify-center">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-500",
                  "bg-terra-500/10 group-hover:bg-terra-500/20 group-hover:scale-110"
                )}>
                  <Star className="h-8 w-8 md:h-10 md:w-10 text-terra-600 fill-terra-600 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className={cn(
                "text-base md:text-lg font-display font-light transition-colors duration-300",
                isDark ? "text-white group-hover:text-terra-400" : "text-foreground group-hover:text-terra-600"
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
        <div className="absolute inset-0 bg-gradient-to-br from-terra-500/5 via-transparent to-green-500/5 pointer-events-none" aria-hidden="true" />
        
        <div className="section-shell-inner relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
            <div>
              <h2
                id="commitment-heading"
                className={cn(
                  "section-title mb-6",
                  isDark ? "text-white" : "text-foreground"
                )}
              >
                Commitment to Excellence
              </h2>
              <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto shadow-lg shadow-terra-500/50" />
            </div>
            
            <blockquote className={cn(
              "text-xl md:text-2xl lg:text-3xl font-display font-light leading-relaxed italic",
              "px-6 md:px-8 py-8 md:py-10 rounded-2xl",
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
                    "shadow-xl hover:shadow-2xl hover:shadow-terra-500/40"
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
