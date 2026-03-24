"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Testimonial } from "@/lib/types"
import { cn } from "@/lib/utils"

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mensah",
    rating: 5,
    comment:
      "The best restaurant in Accra! The ambiance is perfect and the food is absolutely divine. Highly recommend the grilled salmon!",
    date: new Date("2024-01-15"),
    image: "/media/images/img-8209.jpg",
  },
  {
    id: "2",
    name: "Kwame Asante",
    rating: 5,
    comment:
      "Chez Amis has become my go-to spot for both family dinners and business meetings. Professional service every time.",
    date: new Date("2024-01-20"),
    image: "/media/images/img-6740.jpg",
  },
  {
    id: "3",
    name: "Ama Osei",
    rating: 5,
    comment:
      "Their jollof rice is exceptional! Fast delivery and food arrived hot and fresh. Will definitely order again.",
    date: new Date("2024-01-25"),
    image: "/media/images/img-7189.jpg",
  },
  {
    id: "4",
    name: "Kofi Adjei",
    rating: 5,
    comment:
      "Outstanding experience from start to finish. The wagyu burger is a must-try, and the staff goes above and beyond.",
    date: new Date("2024-02-01"),
    image: "/media/images/img-8021.jpg",
  },
  {
    id: "5",
    name: "Efua Boateng",
    rating: 5,
    comment:
      "Perfect for date nights! Romantic atmosphere, delicious food, and impeccable service. We'll be back soon!",
    date: new Date("2024-02-05"),
    image: "/media/images/img-0821-2.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

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

  // Determine visible count based on screen size
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2) // Tablet: 2 cards
      } else {
        setVisibleCount(1) // Mobile: 1 card
      }
    }
    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const visible: Testimonial[] = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section
      className="section-shell bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="section-shell-inner">
        {/* Section Header */}
        <div className="text-center section-heading-margin">
          <h2
            id="testimonials-heading"
            className="section-title text-foreground mb-4"
          >
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 md:-translate-x-8 min-h-[48px] min-w-[48px] h-12 w-12 rounded-full bg-background shadow-lg hover:bg-accent border border-border"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 md:translate-x-8 min-h-[48px] min-w-[48px] h-12 w-12 rounded-full bg-background shadow-lg hover:bg-accent border border-border"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap-section">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="animate-fade-in-up"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="card-padding">
        {/* Star Rating */}
        <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < testimonial.rating
                  ? "fill-amber-500 text-amber-500"
                  : "fill-gray-200 text-gray-200"
              )}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mb-6">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic relative pl-6">
            <span className="absolute left-0 top-0 text-4xl md:text-5xl text-primary/20 font-display leading-none">
              &ldquo;
            </span>
            {testimonial.comment}
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex-shrink-0">
            {testimonial.image ? (
              // In production, use Next.js Image
              // <Image
              //   src={testimonial.image}
              //   alt={testimonial.name}
              //   fill
              //   className="object-cover"
              // />
              <div className="w-full h-full flex items-center justify-center text-2xl">
                {testimonial.name.charAt(0)}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-primary">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name and Date */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">
              {testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonial.date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

