"use client"

import Link from "next/link"
import { Instagram, Mail, Phone, MapPin, Clock } from "lucide-react"
import { NewsletterSignup } from "./NewsletterSignup"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-900 text-cream-100" role="contentinfo">
      {/* Top Section - Four Columns */}
      <div className="container-custom py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Column 1: About Chez Amis */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="inline-block group">
                <div className="flex flex-col items-start">
                  <span className="text-4xl font-script text-gold-500 group-hover:text-gold-400 transition-colors">
                    Chez Amis
                  </span>
                  <span className="text-xs font-heading font-light tracking-[0.2em] uppercase text-cream-200/80">
                    Bar and Grill
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-sm font-body font-light text-cream-200/80 italic">
              Where passion meets palate
            </p>
            <p className="text-sm font-body font-light text-cream-200/70 leading-relaxed">
              An intimate culinary journey in the heart of Accra. We craft unforgettable dining
              experiences with locally sourced ingredients and time-honored techniques.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200/70 hover:text-gold-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.snapchat.com/add/chez_amis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200/70 hover:text-gold-500 transition-colors"
                aria-label="Follow us on Snapchat"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.15c-.012.75-.042 1.688.376 2.508.208.405.49.77.82 1.103.495.5 1.04.95 1.617 1.35.157.11.316.216.473.325.64.445 1.3.87 1.88 1.36.47.4.93.87 1.24 1.44.26.48.35 1.04.35 1.59 0 .66-.19 1.31-.57 1.89-.38.58-.95 1.04-1.62 1.35-.67.31-1.42.46-2.18.46-.48 0-.97-.06-1.44-.18-.47-.12-.93-.3-1.35-.54-.42-.24-.81-.54-1.15-.9-.34-.36-.64-.77-.88-1.22-.24-.45-.42-.93-.54-1.42-.12-.49-.18-1-.18-1.52 0-.52.06-1.03.18-1.52.12-.49.3-.97.54-1.42.24-.45.54-.86.88-1.22.34-.36.73-.66 1.15-.9.42-.24.88-.42 1.35-.54.47-.12.96-.18 1.44-.18.76 0 1.51.15 2.18.46.67.31 1.24.77 1.62 1.35.38.58.57 1.23.57 1.89 0 .55-.09 1.11-.35 1.59-.31.57-.77 1.04-1.24 1.44-.58.49-1.24.915-1.88 1.36-.157.109-.316.215-.473.325-.577.4-1.122.85-1.617 1.35-.33.333-.612.698-.82 1.103-.418.82-.388 1.758-.376 2.508l.003.15c.104 1.628.23 3.654-.299 4.847-1.583 3.545-4.94 3.821-5.93 3.821-.99 0-4.347-.276-5.93-3.821-.529-1.193-.403-3.219-.299-4.847l.003-.15c.012-.75.042-1.688-.376-2.508-.208-.405-.49-.77-.82-1.103-.495-.5-1.04-.95-1.617-1.35-.157-.11-.316-.216-.473-.325-.64-.445-1.3-.87-1.88-1.36-.47-.4-.93-.87-1.24-1.44-.26-.48-.35-1.04-.35-1.59 0-.66.19-1.31.57-1.89.38-.58.95-1.04 1.62-1.35.67-.31 1.42-.46 2.18-.46.48 0 .97.06 1.44.18.47.12.93.3 1.35.54.42.24.81.54 1.15.9.34.36.64.77.88 1.22.24.45.42.93.54 1.42.12.49.18 1 .18 1.52 0 .52-.06 1.03-.18 1.52-.12.49-.3.97-.54 1.42-.24.45-.54.86-.88 1.22-.34.36-.73.66-1.15.9-.42.24-.88.42-1.35.54-.47.12-.96.18-1.44.18-.76 0-1.51-.15-2.18-.46-.67-.31-1.24-.77-1.62-1.35-.38-.58-.57-1.23-.57-1.89 0-.55.09-1.11.35-1.59.31-.57.77-1.04 1.24-1.44.58-.49 1.24-.915 1.88-1.36.157-.109.316-.215.473-.325.577-.4 1.122-.85 1.617-1.35.33-.333.612-.698.82-1.103.418-.82.388-1.758.376-2.508l-.003-.15c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@chezamisrestaurant?_r=1&_t=ZM-920yX90ahAW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200/70 hover:text-gold-500 transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-light text-cream-100">
              Quick Links
            </h3>
            <nav className="space-y-3" aria-label="Footer navigation">
              <Link
                href="/about"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                About Our Story
              </Link>
              <Link
                href="/menu"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                View Menu
              </Link>
              <Link
                href="/reservations"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Reservations
              </Link>
              <Link
                href="/private-events"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Private Dining
              </Link>
              <Link
                href="/careers"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/press"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Press & Media
              </Link>
            </nav>
          </div>

          {/* Column 3: Guest Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-light text-cream-100">
              Guest Services
            </h3>
            <nav className="space-y-3" aria-label="Guest services navigation">
              <Link
                href="/contact"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/gift-cards"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Gift Cards
              </Link>
              <Link
                href="/catering"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Catering
              </Link>
              <Link
                href="/dietary"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Dietary Information
              </Link>
              <Link
                href="/accessibility"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors"
              >
                Accessibility
              </Link>
            </nav>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-light text-cream-100">
              Stay Connected
            </h3>
            <NewsletterSignup />
            <div className="pt-4">
              <p className="text-xs font-heading font-light tracking-wide uppercase text-cream-200/60 mb-3">
                Awards & Recognition
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Award icons - placeholder for actual award logos */}
                <div className="w-12 h-12 rounded bg-charcoal-800/50 border border-charcoal-700 flex items-center justify-center">
                  <span className="text-xs text-cream-200/50">★</span>
                </div>
                <div className="w-12 h-12 rounded bg-charcoal-800/50 border border-charcoal-700 flex items-center justify-center">
                  <span className="text-xs text-cream-200/50">★</span>
                </div>
                <div className="w-12 h-12 rounded bg-charcoal-800/50 border border-charcoal-700 flex items-center justify-center">
                  <span className="text-xs text-cream-200/50">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Contact Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-sm font-body font-light text-cream-200/70">
            <a
              href="https://maps.google.com/?q=40+Boundary+Rd+Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold-500 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>40 Boundary Rd, Accra</span>
            </a>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <a
              href="tel:+233243952339"
              className="flex items-center gap-2 hover:text-gold-500 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>024 395 2339 / 050 243 2037</span>
            </a>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <a
              href="mailto:info@chezamis.com"
              className="flex items-center gap-2 hover:text-gold-500 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>info@chezamis.com</span>
            </a>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Daily 9:30 am - 12 am</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body font-light text-cream-200/60">
            <div className="text-center md:text-left">
              © {currentYear} Chez Amis Bar and Grill. All rights reserved.
            </div>
            <nav className="flex items-center gap-4 flex-wrap justify-center" aria-label="Legal navigation">
              <Link
                href="/privacy"
                className="hover:text-gold-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gold-500/30">|</span>
              <Link
                href="/terms"
                className="hover:text-gold-500 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gold-500/30">|</span>
              <Link
                href="/sitemap"
                className="hover:text-gold-500 transition-colors"
              >
                Sitemap
              </Link>
            </nav>
            <div className="text-center md:text-right italic">
              Crafted with passion in Accra, Ghana
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

