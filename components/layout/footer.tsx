"use client"

import Link from "next/link"
import { Instagram, Mail, Phone, MapPin, Clock } from "lucide-react"
import { NewsletterSignup } from "./NewsletterSignup"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"
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
                <SnapchatIcon className="h-5 w-5" />
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
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                About Our Story
              </Link>
              <Link
                href="/menu"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                View Menu
              </Link>
              <Link
                href="/reservations"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                Reservations
              </Link>
              <Link
                href="/private-events"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                Private Dining
              </Link>
              <Link
                href="/careers"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                Careers
              </Link>
              <Link
                href="/press"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
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
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                FAQs
              </Link>
              <Link
                href="/catering"
                className="block text-sm font-body font-light text-cream-200/70 hover:text-gold-500 transition-colors py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center"
              >
                Catering
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
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>40 Boundary Rd, Accra</span>
            </a>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a
                href="tel:+233557032312"
                className="hover:text-gold-500 transition-colors"
              >
                055 703 2312
              </a>
              <span className="text-gold-500/30">•</span>
              <a
                href="tel:+233557032335"
                className="hover:text-gold-500 transition-colors"
              >
                055 703 2335
              </a>
              <span className="text-gold-500/30">•</span>
              <a
                href="tel:+233243952339"
                className="hover:text-gold-500 transition-colors"
              >
                024 395 2339
              </a>
              <span className="text-gold-500/30">•</span>
              <a
                href="tel:+233502432037"
                className="hover:text-gold-500 transition-colors"
              >
                050 243 2037
              </a>
            </div>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <a
              href="mailto:chez@chezamisrestaurant.com"
              className="flex items-center gap-2 hover:text-gold-500 transition-colors"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>chez@chezamisrestaurant.com</span>
            </a>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>We&apos;re Open 24/7</span>
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

