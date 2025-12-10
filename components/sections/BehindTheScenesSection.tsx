"use client"

import Image from "next/image"
import { Play } from "lucide-react"

export function BehindTheScenesSection() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4">
            Behind the Scenes
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Step into our kitchen and see the passion, precision, and artistry that goes into every dish
          </p>
        </div>

        {/* Video Feature */}
        <div className="mb-12 md:mb-16">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-charcoal-900">
            {/* Placeholder for video - replace with actual video when available */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-cream-100">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="font-body font-light">Cooking video coming soon</p>
              </div>
            </div>
            {/* Uncomment when video is available:
            <video
              src="/media/videos/cooking/chef-preparing-dishes.mp4"
              poster="/media/videos/cooking/chef-preparing-dishes-poster.jpg"
              controls
              className="w-full h-full object-cover"
            />
            */}
          </div>
          <p className="text-center text-muted-foreground mt-4 font-body font-light">
            Watch our chef prepare our signature Attieke dish from start to finish
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: "/media/images/team/chef-at-work-1.jpg",
              alt: "Chef preparing ingredients",
            },
            {
              src: "/media/images/team/kitchen-action-1.jpg",
              alt: "Kitchen in action",
            },
            {
              src: "/media/images/team/plating-dish.jpg",
              alt: "Plating a dish",
            },
            {
              src: "/media/images/team/team-photo.jpg",
              alt: "Our culinary team",
            },
          ].map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


