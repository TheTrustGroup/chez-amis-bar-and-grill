"use client"

import { ContactInfo } from "@/components/contact/ContactInfo"
import { ContactForm } from "@/components/contact/ContactForm"
import { MapSection } from "@/components/contact/MapSection"
import { Phone, Instagram } from "lucide-react"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-burgundy-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-cream-100 mb-4">
            Get in Touch
          </h1>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-cream-200/90 font-body font-light max-w-2xl mx-auto">
            We&apos;re here to help and look forward to connecting with you
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-cream-50" aria-labelledby="contact-info-heading">
        <div className="container-custom">
          <ContactInfo />
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-background" aria-labelledby="contact-form-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2
                id="contact-form-heading"
                className="text-3xl md:text-4xl font-display font-light text-foreground mb-3"
              >
                Send Us a Message
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-body font-light">
                Fill out the form below and we&apos;ll get back to you soon
              </p>
            </div>

            <div className="bg-cream-50 rounded-lg border border-border/30 p-6 md:p-8 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Social & Quick Contact */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-3">
                Connect With Us
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-body font-light">
                Follow our culinary journey on social media
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12">
              <a
                href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 min-h-[44px]"
                aria-label="Follow us on Instagram"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-heading font-light tracking-wide">Instagram</span>
              </a>

              <a
                href="https://www.snapchat.com/add/chez_amis"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 min-h-[44px]"
                aria-label="Follow us on Snapchat"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 group-hover:scale-110 transition-transform">
                  <SnapchatIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-heading font-light tracking-wide">Snapchat</span>
              </a>

              <a
                href="https://www.tiktok.com/@chezamisrestaurant?_r=1&_t=ZM-920yX90ahAW"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 min-h-[44px]"
                aria-label="Follow us on TikTok"
              >
                <div className="p-2 rounded-full bg-black group-hover:scale-110 transition-transform">
                  <svg
                    className="h-5 w-5 text-white"
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

            <div className="text-center pt-8 border-t border-border/30">
              <p className="text-sm md:text-base text-muted-foreground font-body font-light mb-4">
                Prefer to call? We&apos;re just a phone call away
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:+233557032312"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-base min-h-[44px]"
                >
                  <Phone className="h-5 w-5" />
                  055 703 2312
                </a>
                <a
                  href="tel:+233557032335"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-base min-h-[44px]"
                >
                  <Phone className="h-5 w-5" />
                  055 703 2335
                </a>
                <a
                  href="tel:+233243952339"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-base min-h-[44px]"
                >
                  <Phone className="h-5 w-5" />
                  024 395 2339
                </a>
                <a
                  href="tel:+233502432037"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold-500/60 text-foreground hover:bg-gold-500/10 transition-all font-heading font-light tracking-wide text-base min-h-[44px]"
                >
                  <Phone className="h-5 w-5" />
                  050 243 2037
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
