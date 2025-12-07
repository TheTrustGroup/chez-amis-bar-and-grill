"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function SitemapPage() {
  const siteStructure = [
    {
      category: "Main Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "About Our Story", href: "/about" },
        { name: "Menu", href: "/menu" },
        { name: "Beverages", href: "/beverages" },
      ],
    },
    {
      category: "Dining & Services",
      links: [
        { name: "Reservations", href: "/reservations" },
        { name: "Private Dining & Events", href: "/private-events" },
        { name: "Catering", href: "/catering" },
        { name: "Order for Delivery", href: "/order-summary" },
      ],
    },
    {
      category: "Information",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" },
        { name: "Press & Media", href: "/press" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      category: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light">
              Sitemap
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-cream-200/80">
              Find everything you need on our website
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream-50 rounded-lg border border-charcoal-200/20 p-8 md:p-12">
              <div className="space-y-8">
                {siteStructure.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-foreground border-b border-charcoal-200/20 pb-2">
                      {section.category}
                    </h2>
                    <nav className="space-y-2" aria-label={`${section.category} navigation`}>
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="flex items-center gap-2 text-muted-foreground hover:text-gold-600 transition-colors font-body font-light group"
                        >
                          <span className="w-2 h-2 rounded-full bg-gold-500/30 group-hover:bg-gold-500 transition-colors"></span>
                          <span>{link.name}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-charcoal-200/20">
                <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="bg-charcoal-900/5 rounded-lg p-6 space-y-3 text-foreground">
                  <p className="font-body font-light">
                    <strong className="font-medium">Chez Amis Bar and Grill</strong>
                  </p>
                  <p className="font-body font-light">
                    40 Boundary Rd, Accra, Ghana
                  </p>
                  <p className="font-body font-light">
                    Email:{" "}
                    <a
                      href="mailto:chez@chezamisrestaurant.com"
                      className="text-gold-600 hover:text-gold-700 underline"
                    >
                      chez@chezamisrestaurant.com
                    </a>
                  </p>
                  <p className="font-body font-light">
                    Phone:{" "}
                    <a
                      href="tel:+233243952339"
                      className="text-gold-600 hover:text-gold-700 underline"
                    >
                      024 395 2339
                    </a>{" "}
                    /{" "}
                    <a
                      href="tel:+233502432037"
                      className="text-gold-600 hover:text-gold-700 underline"
                    >
                      050 243 2037
                    </a>
                  </p>
                  <p className="font-body font-light">
                    Hours: Daily 9:30 AM - 12:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Link href="/">
                <Button
                  variant="outline"
                  className="group border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-heading font-light tracking-wide"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

