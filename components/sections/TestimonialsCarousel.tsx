"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  quote: string
  author: string
  occasion: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "An extraordinary evening that exceeded every expectation. The attention to detail, from the presentation to the service, was impeccable. We felt truly cared for.",
    author: "Sarah M.",
    occasion: "Anniversary Dinner",
    rating: 5,
  },
  {
    id: "2",
    quote: "The culinary artistry on display here is remarkable. Each course was a revelation, and the wine pairings were perfectly curated. A dining experience we'll never forget.",
    author: "Kwame A.",
    occasion: "Business Celebration",
    rating: 5,
  },
  {
    id: "3",
    quote: "From the moment we arrived, we were treated like honored guests. The private dining room was elegant, the food exceptional, and the service flawless. Simply perfect.",
    author: "Ama O.",
    occasion: "Family Gathering",
    rating: 5,
  },
  {
    id: "4",
    quote: "Chez Amis has redefined fine dining for us. The chef's passion is evident in every dish, and the ambiance creates an atmosphere of pure sophistication and warmth.",
    author: "Kofi D.",
    occasion: "Date Night",
    rating: 5,
  },
  {
    id: "5",
    quote: "The most memorable dining experience we've had in Accra. The seasonal menu showcased incredible creativity, and the service team anticipated our needs beautifully.",
    author: "Efua B.",
    occasion: "Birthday Celebration",
    rating: 5,
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-cream-50" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Guest Testimonials
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 md:-translate-x-8 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm shadow-soft hover:bg-background border border-border/50"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 md:translate-x-8 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm shadow-soft hover:bg-background border border-border/50"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          {/* Testimonial Content */}
          <div className="relative px-12 md:px-20 py-12 md:py-16">
            {/* Decorative Opening Quote */}
            <div className="absolute top-0 left-8 md:left-12 text-8xl md:text-9xl font-display text-gold-500/20 leading-none">
              &ldquo;
            </div>

            {/* Quote Text */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-foreground leading-relaxed mb-8 md:mb-10 text-center relative z-10">
              {currentTestimonial.quote}
            </blockquote>

            {/* Attribution */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 md:h-5 md:w-5",
                      i < currentTestimonial.rating
                        ? "fill-gold-500 text-gold-500"
                        : "fill-muted text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-body font-light">
                — {currentTestimonial.author}, {currentTestimonial.occasion}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-gold-500"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



