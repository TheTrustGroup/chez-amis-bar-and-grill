"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { StarRating } from "@/components/ui/StarRating"

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

const arrowBtnClass =
  "w-12 h-12 rounded-full bg-white border-2 border-green-500 text-green-600 md:hover:bg-green-500 md:hover:text-white flex items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

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
    <section className="section-shell bg-neutral-50" aria-labelledby="testimonials-heading">
      <div className="section-shell-inner">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="testimonials-heading"
            className="section-title text-foreground mb-4"
          >
            Guest Testimonials
          </h2>
          <div className="w-20 h-px bg-terra-500 mx-auto mb-6"></div>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest testimonials"
        >
          <button
            type="button"
            className={cn(arrowBtnClass, "absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 md:-translate-x-8")}
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            className={cn(arrowBtnClass, "absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 md:translate-x-8")}
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="relative px-12 md:px-20 py-12 md:py-16">
            <div className="absolute top-0 left-8 md:left-12 text-8xl md:text-9xl font-display text-terra-200 leading-none">
              &ldquo;
            </div>

            <blockquote
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-light text-neutral-800 leading-relaxed mb-8 md:mb-10 text-center relative z-10"
              aria-live="polite"
            >
              {currentTestimonial.quote}
            </blockquote>

            <div className="text-center space-y-3">
              <div className="flex items-center justify-center">
                <StarRating count={currentTestimonial.rating} />
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-body font-light">
                {currentTestimonial.author}, {currentTestimonial.occasion}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-terra-500"
                    : "w-1.5 bg-muted-foreground/30 md:hover:bg-muted-foreground/50"
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
