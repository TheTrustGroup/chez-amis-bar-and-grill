"use client"

import Link from "next/link"
import { ChefHat } from "lucide-react"

export function IntroSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-background" aria-labelledby="intro-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-terra-500/5 via-transparent to-green-500/5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell-inner relative z-10">
        <div className="section-split items-start lg:items-center">
          <div className="relative order-2 w-full md:order-1 section-split-half">
            <div className="ui-panel h-full min-h-[260px] md:min-h-[320px]">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-terra-500/10">
                  <ChefHat className="h-5 w-5 text-terra-600" />
                </div>
                <div>
                  <p className="mb-1 font-body text-xs font-medium uppercase tracking-widest text-terra-600">
                    Our Head Chef
                  </p>
                  <p className="font-display text-2xl font-light text-foreground">
                    Chef Chez Amis
                  </p>
                  <p className="mt-2 text-sm font-body font-light text-muted-foreground">
                    New chef portrait will be added soon.
                  </p>
                </div>
                <p className="text-sm font-body font-light text-muted-foreground">
                  18+ years of West African fine dining mastery
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-6 md:order-2 md:space-y-8 animate-fade-in-up section-split-half">
            <div className="space-y-4">
              <h2
                id="intro-heading"
                className="section-title text-foreground relative inline-block leading-tight"
              >
                A Culinary Sanctuary
                <span className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-terra-500 to-transparent" aria-hidden="true" />
              </h2>
            </div>

            <div className="prose-readable space-y-4 text-base text-muted-foreground md:space-y-5 md:text-lg lg:text-xl">
              <p>
                Chez Amis is built on one idea. Dining should feel personal, thoughtful, and memorable every
                single time. We shape each service around pace, comfort, and flavor so guests can settle in,
                connect, and enjoy food that feels both familiar and elevated.
              </p>
              <p>
                Our kitchen, led by <strong>Chef Chez Amis</strong>, blends Ivorian and Ghanaian roots with
                modern technique. Local ingredients guide the menu, seasonal shifts keep it fresh, and every
                plate is finished with balance in mind. Depth of flavor, clean presentation, and consistency
                matter as much as creativity.
              </p>
              <p>
                The experience goes beyond the plate. Lighting, music, table flow, and warm attentive service
                are designed to feel calm and intentional. Whether you are here for a quick meal or a long
                evening, our goal is simple. Give you exceptional food and a space you want to return to.
              </p>
            </div>

            <div className="pt-4 md:pt-6">
              <Link
                href="/about"
                className="inline-block min-h-[48px] py-3 text-base font-body text-foreground underline decoration-1 decoration-terra-500/50 underline-offset-4 transition-colors duration-300 md:hover:text-terra-600 md:hover:decoration-terra-500 md:text-lg"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
