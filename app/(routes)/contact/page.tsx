"use client"

import Link from "next/link"
import { ContactInfo } from "@/components/contact/ContactInfo"
import { ContactForm } from "@/components/contact/ContactForm"
import { MapSection } from "@/components/contact/MapSection"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Instagram } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900">
          {/* In production, use Next.js Image */}
          {/* <Image
            src="/images/restaurant-warm.jpg"
            alt="Warm, inviting restaurant"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute inset-0 flex items-center justify-center text-cream-200/20 font-display text-4xl">
            Warm Restaurant Interior
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-cream-100 mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-lg md:text-xl text-cream-200/90 font-body font-light">
            Whether you have questions, feedback, or special requests
          </p>
        </div>
      </section>

      {/* Contact Information - Three Columns */}
      <section className="section-padding bg-cream-50" aria-labelledby="contact-info-heading">
        <div className="container-custom">
          <ContactInfo />
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-background" aria-labelledby="contact-form-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="contact-form-heading"
                className="text-3xl md:text-4xl font-display font-light text-foreground mb-4"
              >
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground font-body font-light">
                We&apos;re here to help and look forward to serving you
              </p>
            </div>

            <div className="bg-cream-50 rounded-lg border border-border/30 p-6 md:p-8 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Connect With Us */}
      <section className="section-padding bg-cream-50" aria-labelledby="social-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2
              id="social-heading"
              className="text-3xl md:text-4xl font-display font-light text-foreground mb-4"
            >
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground font-body font-light">
              Follow our culinary journey
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="https://instagram.com/chezamis"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
              aria-label="Follow us on Instagram"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-heading font-light tracking-wide">Instagram</span>
            </a>

            <a
              href="https://snapchat.com/add/chezamis"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
              aria-label="Follow us on Snapchat"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 group-hover:scale-110 transition-transform">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.15c-.012.75-.042 1.688.376 2.508.208.405.49.77.82 1.103.495.5 1.04.95 1.617 1.35.157.11.316.216.473.325.64.445 1.3.87 1.88 1.36.47.4.93.87 1.24 1.44.26.48.35 1.04.35 1.59 0 .66-.19 1.31-.57 1.89-.38.58-.95 1.04-1.62 1.35-.67.31-1.42.46-2.18.46-.48 0-.97-.06-1.44-.18-.47-.12-.93-.3-1.35-.54-.42-.24-.81-.54-1.15-.9-.34-.36-.64-.77-.88-1.22-.24-.45-.42-.93-.54-1.42-.12-.49-.18-1-.18-1.52 0-.52.06-1.03.18-1.52.12-.49.3-.97.54-1.42.24-.45.54-.86.88-1.22.34-.36.73-.66 1.15-.9.42-.24.88-.42 1.35-.54.47-.12.96-.18 1.44-.18.76 0 1.51.15 2.18.46.67.31 1.24.77 1.62 1.35.38.58.57 1.23.57 1.89 0 .55-.09 1.11-.35 1.59-.31.57-.77 1.04-1.24 1.44-.58.49-1.24.915-1.88 1.36-.157.109-.316.215-.473.325-.577.4-1.122.85-1.617 1.35-.33.333-.612.698-.82 1.103-.418.82-.388 1.758-.376 2.508l.003.15c.104 1.628.23 3.654-.299 4.847-1.583 3.545-4.94 3.821-5.93 3.821-.99 0-4.347-.276-5.93-3.821-.529-1.193-.403-3.219-.299-4.847l.003-.15c.012-.75.042-1.688-.376-2.508-.208-.405-.49-.77-.82-1.103-.495-.5-1.04-.95-1.617-1.35-.157-.11-.316-.216-.473-.325-.64-.445-1.3-.87-1.88-1.36-.47-.4-.93-.87-1.24-1.44-.26-.48-.35-1.04-.35-1.59 0-.66.19-1.31.57-1.89.38-.58.95-1.04 1.62-1.35.67-.31 1.42-.46 2.18-.46.48 0 .97.06 1.44.18.47.12.93.3 1.35.54.42.24.81.54 1.15.9.34.36.64.77.88 1.22.24.45.42.93.54 1.42.12.49.18 1 .18 1.52 0 .52-.06 1.03-.18 1.52-.12.49-.3.97-.54 1.42-.24.45-.54.86-.88 1.22-.34.36-.73.66-1.15.9-.42.24-.88.42-1.35.54-.47.12-.96.18-1.44.18-.76 0-1.51-.15-2.18-.46-.67-.31-1.24-.77-1.62-1.35-.38-.58-.57-1.23-.57-1.89 0-.55.09-1.11.35-1.59.31-.57.77-1.04 1.24-1.44.58-.49 1.24-.915 1.88-1.36.157-.109.316-.215.473-.325.577-.4 1.122-.85 1.617-1.35.33-.333.612-.698.82-1.103.418-.82.388-1.758.376-2.508l-.003-.15c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/>
                </svg>
              </div>
              <span className="text-sm font-heading font-light tracking-wide">Snapchat</span>
            </a>

            <a
              href="https://tiktok.com/@chezamis"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
              aria-label="Follow us on TikTok"
            >
              <div className="p-4 rounded-full bg-black group-hover:scale-110 transition-transform">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <span className="text-sm font-heading font-light tracking-wide">TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground mb-4">
                Prefer to Speak With Us?
              </h2>
              <p className="text-lg text-muted-foreground font-body font-light">
                We&apos;re just a call or message away
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+233243952339"
                className="flex items-center justify-center gap-3 px-8 py-6 rounded-lg border-2 border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-lg"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </a>
              <a
                href="https://wa.me/233243952339"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-6 rounded-lg border-2 border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>

            <p className="text-base text-muted-foreground font-body font-light italic pt-4 border-t border-border/30">
              Your satisfaction is our priority
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
