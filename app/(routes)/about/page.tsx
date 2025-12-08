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
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900">
          {/* In production, use Next.js Image */}
          {/* <Image
            src="/images/chef-or-restaurant.jpg"
            alt="Chef or restaurant exterior"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-4xl">
            Chef or Restaurant Exterior
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-cream-100 mb-4">
            Our Story
          </h1>
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
          <div className="text-center mb-16 md:mb-20">
            <h2
              id="awards-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Honored to Serve You
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
              Recognition from our community and industry peers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* TripAdvisor */}
            <div className="text-center space-y-4 p-6 bg-cream-50 rounded-lg border border-border/30">
              <div className="flex justify-center">
                <Award className="h-12 w-12 text-gold-600" />
              </div>
              <h3 className="text-lg font-display font-light text-foreground">
                TripAdvisor Excellence
              </h3>
              <p className="text-sm text-muted-foreground font-body font-light">
                Certificate of Excellence 2024
              </p>
            </div>

            {/* Ghana Restaurant Awards */}
            <div className="text-center space-y-4 p-6 bg-cream-50 rounded-lg border border-border/30">
              <div className="flex justify-center">
                <Award className="h-12 w-12 text-gold-600" />
              </div>
              <h3 className="text-lg font-display font-light text-foreground">
                Ghana Restaurant Awards
              </h3>
              <p className="text-sm text-muted-foreground font-body font-light">
                2024 Winner - Fine Dining
              </p>
            </div>

            {/* Featured in Magazine */}
            <div className="text-center space-y-4 p-6 bg-cream-50 rounded-lg border border-border/30">
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-gold-600" />
              </div>
              <h3 className="text-lg font-display font-light text-foreground">
                Featured in
              </h3>
              <p className="text-sm text-muted-foreground font-body font-light">
                Accra Culinary Magazine
              </p>
            </div>

            {/* Reviews */}
            <div className="text-center space-y-4 p-6 bg-cream-50 rounded-lg border border-border/30">
              <div className="flex justify-center">
                <Star className="h-12 w-12 text-gold-600 fill-gold-600" />
              </div>
              <h3 className="text-lg font-display font-light text-foreground">
                2,500+ Five-Star Reviews
              </h3>
              <p className="text-sm text-muted-foreground font-body font-light">
                From our valued guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="section-padding bg-cream-50" aria-labelledby="commitment-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2
              id="commitment-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground"
            >
              Commitment to Excellence
            </h2>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-foreground leading-relaxed italic">
              &ldquo;At Chez Amis, every meal is an occasion, every guest is family, and every
              moment is crafted with care.&rdquo;
            </blockquote>
            <div className="pt-8">
              <Link href="/reservations">
                <Button
                  size="lg"
                  className="font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-7"
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
