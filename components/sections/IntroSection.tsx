"use client"

import Link from "next/link"
import Image from "next/image"

export function IntroSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-background" aria-labelledby="intro-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-terra-500/5 via-transparent to-green-500/5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell-inner relative z-10">
        <div className="section-split items-start lg:items-center">
          <div className="relative order-2 h-[400px] w-full md:order-1 md:h-[500px] lg:h-[600px] group section-split-half">
            <div className="relative h-full w-full overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/media/images/img-8209.jpg"
                alt="Head Chef of Chez Amis Bar and Grill presenting signature dishes with warm hospitality"
                fill
                className="rounded-xl object-cover object-center brightness-110 contrast-110 saturate-115 transition-all duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={95}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent" />

              <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-10 text-white">
                <div className="relative">
                  <div className="absolute -top-3 left-0 h-0.5 w-16 bg-gradient-to-r from-terra-400/80 to-transparent" />
                  <p className="mb-1 font-body text-xs font-medium uppercase tracking-widest text-terra-200 drop-shadow-lg">
                    Our Head Chef
                  </p>
                  <p className="font-display text-lg md:text-xl font-light drop-shadow-lg">
                    Crafting culinary excellence
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/10" />
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
                At Chez Amis, we believe that dining is more than sustenance—it&apos;s an art form, a
                celebration, and a journey of discovery. Our philosophy is rooted in the belief that
                every meal should be a memorable experience, crafted with passion, precision, and an
                unwavering commitment to excellence.
              </p>
              <p>
                Our award-winning chefs draw inspiration from both local traditions and global culinary
                innovations, creating dishes that tell a story. Each plate is a canvas where flavors,
                textures, and aromas come together in perfect harmony, inviting you to savor every moment.
              </p>
              <p>
                We source only the finest ingredients, working closely with local farmers and artisans to
                ensure that every component of your meal meets our exacting standards. From the first sip of
                wine to the last bite of dessert, we strive to create moments of pure culinary delight.
              </p>
              <p>
                Our commitment extends beyond the kitchen. Every detail—from the ambient lighting to the
                attentive service—is carefully orchestrated to create an atmosphere of warmth, elegance, and
                genuine hospitality. Welcome to a place where culinary excellence meets heartfelt service.
              </p>
            </div>

            <div className="pt-4 md:pt-6">
              <Link
                href="/about"
                className="inline-block min-h-[48px] py-3 text-base font-body text-foreground underline decoration-1 decoration-terra-500/50 underline-offset-4 transition-colors duration-300 hover:text-terra-600 hover:decoration-terra-500 md:text-lg"
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
