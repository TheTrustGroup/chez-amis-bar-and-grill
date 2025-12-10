"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VenueGrid } from "@/components/events/VenueCard"
import { MenuPackages } from "@/components/events/MenuPackages"
import { EventRequestForm } from "@/components/events/EventRequestForm"
import {
  Briefcase,
  Heart,
  Cake,
  Calendar,
  Gift,
  Users,
  CheckCircle2,
  UtensilsCrossed,
  Music,
  FileText,
  Wine,
  Phone,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

const occasions = [
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Business dinners, team building, client entertainment",
  },
  {
    icon: Heart,
    title: "Weddings & Receptions",
    description: "Intimate ceremonies and elegant receptions",
  },
  {
    icon: Cake,
    title: "Birthday Celebrations",
    description: "Milestone birthdays and special celebrations",
  },
  {
    icon: Calendar,
    title: "Anniversary Dinners",
    description: "Romantic dinners for two or larger gatherings",
  },
  {
    icon: Gift,
    title: "Holiday Parties",
    description: "Festive celebrations for the holiday season",
  },
  {
    icon: Users,
    title: "Bridal/Baby Showers",
    description: "Intimate gatherings to celebrate life's special moments",
  },
]

const includedFeatures = [
  { icon: Users, text: "Dedicated event coordinator" },
  { icon: UtensilsCrossed, text: "Customized menu planning with chef" },
  { icon: CheckCircle2, text: "Premium table settings" },
  { icon: Music, text: "Sound system" },
  { icon: FileText, text: "Personalized menus" },
  { icon: Wine, text: "Complimentary tastings for events 50+" },
]

const testimonials = [
  {
    id: "1",
    quote: "Our corporate event at Chez Amis exceeded all expectations. The private dining room was perfect, the food was exceptional, and the service was impeccable. Our clients were thoroughly impressed.",
    author: "David Mensah",
    company: "Tech Solutions Ghana",
    event: "Corporate Dinner",
  },
  {
    id: "2",
    quote: "We celebrated our 25th wedding anniversary in The Wine Room, and it was absolutely magical. The intimate setting, personalized menu, and attention to detail made it a night we'll never forget.",
    author: "Grace & Kofi Asante",
    event: "Anniversary Celebration",
  },
  {
    id: "3",
    quote: "The team at Chez Amis made our daughter's bridal shower absolutely perfect. From the beautiful Garden Terrace setting to the custom menu, everything was flawless. Highly recommend!",
    author: "Ama Osei",
    event: "Bridal Shower",
  },
]

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 4-6 weeks in advance for private events, especially for weekends and holidays. For larger events (50+ guests), we suggest 8-12 weeks notice.",
  },
  {
    question: "What is the deposit requirement?",
    answer:
      "A 50% deposit is required to secure your date. For events over GH₵ 10,000, we may require a higher deposit. The remaining balance is due 7 days before your event.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 30+ days in advance receive a full refund. 14-30 days: 50% refund. Less than 14 days: deposit is non-refundable. We understand emergencies happen and will work with you when possible.",
  },
  {
    question: "Can we customize the menu?",
    answer:
      "Absolutely! All our menu packages are fully customizable. Our chef will work with you to create a menu that perfectly matches your preferences, dietary requirements, and budget.",
  },
  {
    question: "Is service staff included?",
    answer:
      "Yes, professional service staff are included for all private events. For events over 50 guests, we provide additional staff to ensure seamless service throughout your event.",
  },
  {
    question: "Can we bring our own decorations?",
    answer:
      "Yes, you're welcome to bring decorations. We ask that you coordinate with our event team to ensure everything is set up properly and doesn't interfere with other guests or our operations.",
  },
]

export default function PrivateEventsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[40vh] min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-cream-100 mb-4">
            Private Dining & Special Events
          </h1>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-cream-200/90 font-body font-light max-w-2xl mx-auto">
            Intimate gatherings. Grand celebrations. Unforgettable moments.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-background" aria-labelledby="overview-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2
              id="overview-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Your Exclusive Space
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light leading-relaxed">
              At Chez Amis, we believe that every celebration deserves a setting as special as the
              occasion itself. Our private dining spaces are designed to provide an intimate,
              elegant atmosphere where your guests can connect, celebrate, and create lasting
              memories.
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
              Whether you&apos;re hosting an intimate dinner for 10 or a grand celebration for 100,
              we offer flexible spaces, customizable menus, and dedicated service to ensure your
              event is nothing short of extraordinary.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-light text-foreground mb-1">
                  10-100
                </p>
                <p className="text-muted-foreground font-body font-light">Guests</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-light text-foreground mb-1">
                  Custom
                </p>
                <p className="text-muted-foreground font-body font-light">Menus</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-light text-foreground mb-1">
                  Dedicated
                </p>
                <p className="text-muted-foreground font-body font-light">Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Spaces */}
      <VenueGrid />

      {/* Occasion Ideas */}
      <section className="section-padding bg-cream-50" aria-labelledby="occasions-heading">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="occasions-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Occasion Ideas
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
              We&apos;ve hosted countless celebrations, each one unique and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {occasions.map((occasion, index) => {
              const Icon = occasion.icon
              return (
                <Card
                  key={index}
                  className="group border-0 bg-background hover:shadow-elegant transition-all duration-500 text-center"
                >
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-lg bg-gold-500/10 group-hover:bg-gold-500/20 transition-colors">
                        <Icon className="h-8 w-8 text-gold-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-light text-foreground">
                      {occasion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body font-light">
                      {occasion.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-background" aria-labelledby="included-heading">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="included-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              What&apos;s Included
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
              Every detail thoughtfully arranged for your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {includedFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-gold-500/10">
                    <Icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <p className="text-base font-body font-light text-foreground pt-1">
                    {feature.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sample Menus */}
      <MenuPackages />

      {/* Request Form */}
      <section id="request-form" className="section-padding bg-background" aria-labelledby="request-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cream-50 rounded-lg border border-border/30 p-6 md:p-8 lg:p-12">
              <EventRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-cream-50" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Our Clients&apos; Celebrations
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-0 bg-background hover:shadow-elegant transition-all duration-500"
              >
                <CardContent className="p-6 md:p-8">
                  <blockquote className="text-base md:text-lg text-foreground font-body font-light leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-display font-light text-foreground mb-1">
                      {testimonial.author}
                    </p>
                    {testimonial.company && (
                      <p className="text-sm text-muted-foreground font-body font-light mb-1">
                        {testimonial.company}
                      </p>
                    )}
                    <p className="text-sm text-gold-600 font-body font-light">
                      {testimonial.event}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="faq-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
            >
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border border-border/30 hover:border-gold-500/50 transition-colors"
              >
                <CardContent className="p-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                    aria-expanded={openFaq === index}
                  >
                    <h3 className="text-lg font-display font-light text-foreground">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                        openFaq === index && "transform rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="mt-4 text-base text-muted-foreground font-body font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-light text-foreground mb-4">
              Ready to Plan Your Event?
            </h2>
            <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground font-body font-light">
              Let&apos;s discuss how we can make your celebration unforgettable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="#request-form">
                <Button
                  size="lg"
                  className="font-heading font-light tracking-wide bg-foreground text-background hover:bg-foreground/90 text-base md:text-lg px-8 py-3 md:py-4 min-h-[48px] md:min-h-[52px]"
                >
                  Request Proposal
                </Button>
              </Link>
              <a
                href="tel:+233243952339"
                className="flex items-center justify-center gap-2 px-8 py-3 md:py-4 rounded-lg border-2 border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide min-h-[48px] md:min-h-[52px]"
                aria-label="Call us to plan your event"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

