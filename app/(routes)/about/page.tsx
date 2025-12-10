"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FounderStory } from "@/components/about/FounderStory"
import { Philosophy } from "@/components/about/Philosophy"
import { TeamGrid } from "@/components/about/TeamGrid"
import { SpaceGallery } from "@/components/about/SpaceGallery"
import { BehindTheScenesSection } from "@/components/sections/BehindTheScenesSection"
import { Award, Star, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[40vh] min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-cream-100 mb-4">
            Our Story
          </h1>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-cream-200/90 font-body font-light max-w-2xl mx-auto">
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

      {/* Awards & Recognition */}
      <section className="section-padding bg-background" aria-labelledby="awards-heading">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="awards-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Honored to Serve You
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
              Recognition from our community and industry peers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {/* TripAdvisor */}
            <div className="text-center space-y-3 p-5 md:p-6 bg-cream-50 rounded-lg border border-border/30 hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                <div className="p-3 rounded-lg bg-gold-500/10">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-gold-600" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-display font-light text-foreground">
                TripAdvisor Excellence
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-body font-light">
                Certificate of Excellence 2024
              </p>
            </div>

            {/* Ghana Restaurant Awards */}
            <div className="text-center space-y-3 p-5 md:p-6 bg-cream-50 rounded-lg border border-border/30 hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                <div className="p-3 rounded-lg bg-gold-500/10">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-gold-600" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-display font-light text-foreground">
                Ghana Restaurant Awards
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-body font-light">
                2024 Winner - Fine Dining
              </p>
            </div>

            {/* Featured in Magazine */}
            <div className="text-center space-y-3 p-5 md:p-6 bg-cream-50 rounded-lg border border-border/30 hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                <div className="p-3 rounded-lg bg-gold-500/10">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-gold-600" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-display font-light text-foreground">
                Featured in
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-body font-light">
                Accra Culinary Magazine
              </p>
            </div>

            {/* Reviews */}
            <div className="text-center space-y-3 p-5 md:p-6 bg-cream-50 rounded-lg border border-border/30 hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                <div className="p-3 rounded-lg bg-gold-500/10">
                  <Star className="h-8 w-8 md:h-10 md:w-10 text-gold-600 fill-gold-600" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-display font-light text-foreground">
                2,500+ Five-Star Reviews
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-body font-light">
                From our valued guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="section-padding bg-cream-50" aria-labelledby="commitment-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <h2
              id="commitment-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Commitment to Excellence
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-display font-light text-foreground leading-relaxed italic">
              &ldquo;At Chez Amis, every meal is an occasion, every guest is family, and every
              moment is crafted with care.&rdquo;
            </blockquote>
            <div className="pt-6 md:pt-8">
              <Link href="/reservations">
                <Button
                  size="lg"
                  className="font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-base md:text-lg px-8 py-3 md:py-4 min-h-[48px] md:min-h-[52px]"
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
