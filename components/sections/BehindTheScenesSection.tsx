"use client"

import Image from "next/image"
import { Play } from "lucide-react"

export function BehindTheScenesSection() {
  return (
    <section className="section-shell bg-neutral-50">
      <div className="section-shell-inner">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="section-title text-foreground mb-4">
            Behind the Scenes
          </h2>
          <div className="w-20 h-px bg-terra-500 mx-auto mb-4" />
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Step into our kitchen and see the passion, precision, and artistry that goes into every dish
          </p>
        </div>

        {/* Video Feature */}
        <div className="mb-12 md:mb-16">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-green-600">
            {/* Placeholder for video - replace with actual video when available */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="font-body font-light">Cooking video coming soon</p>
              </div>
            </div>
            {/* Uncomment when a dedicated hero cooking clip is ready:
            <video
              src="/media/videos/filtered-a59206d7-3709-4278-9712-9f5b1f6dc8bf.mp4"
              poster="/images/placeholders/video-placeholder.svg"
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
              src: "/media/images/img-8209.jpg",
              alt: "Chef preparing ingredients",
            },
            {
              src: "/media/images/img-6740.jpg",
              alt: "Kitchen in action",
            },
            {
              src: "/media/images/img-7189.jpg",
              alt: "Plating a dish",
            },
            {
              src: "/media/images/img-8021.jpg",
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


