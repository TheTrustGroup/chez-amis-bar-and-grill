"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export function FounderStory() {
  return (
    <section className="section-padding bg-background" aria-labelledby="founder-story-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Portrait - Using chef's picture, especially visible on mobile */}
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1">
            <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl">
              {/* Chef Image - Using head-chef.jpg */}
              <Image
                src="/images/team/head-chef.jpg"
                alt="Chef and Founder of Chez Amis Bar and Grill"
                fill
                className="object-cover object-center rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={90}
                style={{
                  filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
                }}
              />
              {/* Subtle overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <h2
              id="founder-story-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground leading-tight"
            >
              A Passion Born in Paris, Perfected in Accra
            </h2>

            <div className="space-y-5 md:space-y-6 text-base md:text-lg lg:text-xl text-muted-foreground font-body leading-relaxed">
              <p>
                My culinary journey began in the kitchens of Paris, where I trained under master
                chefs who taught me that cooking is not merely about feeding people—it&apos;s about
                creating moments of pure joy and connection. After years of honing my craft in some
                of Europe&apos;s finest restaurants, I felt a calling to bring this same level of
                excellence to my homeland.
              </p>
              <p>
                Chez Amis was born from a simple yet profound vision: to create a space where
                exceptional cuisine meets genuine hospitality, where every dish tells a story, and
                where our guests feel not just welcomed, but truly cherished. We believe that dining
                should be an experience that engages all the senses and leaves a lasting impression.
              </p>
              <p>
                Our philosophy is rooted in the belief that the best meals come from the heart. We
                source our ingredients with care, working closely with local farmers and artisans
                who share our commitment to quality. Every plate that leaves our kitchen is a
                reflection of our dedication to culinary artistry and our deep respect for the
                ingredients we work with.
              </p>
              <p>
                But beyond the food, Chez Amis is about community. We&apos;re not just a restaurant;
                we&apos;re a gathering place where families celebrate milestones, friends share
                laughter, and strangers become friends. Our connection to Accra runs deep, and we&apos;re
                honored to be part of this vibrant culinary landscape.
              </p>
              <p>
                Every day, we strive to create an atmosphere where time slows down, where
                conversations flow freely, and where the simple act of sharing a meal becomes a
                cherished memory. This is more than a restaurant—it&apos;s a home away from home,
                and you&apos;re always welcome here.
              </p>
            </div>

            {/* Signature */}
            <div className="pt-6 md:pt-8">
              <div className="relative w-56 h-24 md:w-64 md:h-28">
                {/* In production, use actual signature image */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent flex items-center justify-center">
                  <span className="font-script text-3xl md:text-4xl text-gold-600/60">
                    Chef&apos;s Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


