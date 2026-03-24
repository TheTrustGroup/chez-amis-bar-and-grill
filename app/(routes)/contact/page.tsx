"use client"

import { useState } from "react"
import { ContactInfo } from "@/components/contact/ContactInfo"
import { ContactForm } from "@/components/contact/ContactForm"
import { MapSection } from "@/components/contact/MapSection"
import { Instagram, MapPin, Navigation, ChevronDown } from "lucide-react"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { SITE_ADDRESS_LINES } from "@/lib/data/siteContact"

export default function ContactPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [showMobileForm, setShowMobileForm] = useState(false)

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      {/* Hero Section - Premium */}
      <section className={cn(
        "relative h-[40vh] md:h-[45vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-green-700 via-green-600 to-green-900"
      )}>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark ? "bg-black/40" : "bg-black/50"
        )} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className={cn(
            "hero-title tracking-tight mb-6 md:mb-8",
            "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )}>
            Get in Touch
          </h1>
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-6 md:mb-8 shadow-lg shadow-terra-500/50" />
          <p className={cn(
            "text-lg md:text-xl lg:text-2xl font-body font-light leading-relaxed max-w-3xl mx-auto",
            "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            We&apos;re here to help and look forward to connecting with you
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className={cn(
        "section-shell transition-colors duration-300",
        isDark ? "bg-green-700/50" : "bg-neutral-50"
      )} aria-labelledby="contact-info-heading">
        <div className="section-shell-inner">
          <ContactInfo />
        </div>
      </section>

      {/* Contact Form */}
      <section className={cn(
        "section-shell transition-colors duration-300",
        isDark ? "bg-green-700" : "bg-neutral-50"
      )} aria-labelledby="contact-form-heading">
        <div className="section-shell-inner">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2
                id="contact-form-heading"
                className={cn(
                  "section-title mb-4 transition-colors duration-300",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                Send Us a Message
              </h2>
              <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-terra-500 to-transparent mx-auto mb-4 shadow-lg shadow-terra-500/50" />
              <p className={cn(
                "text-base md:text-lg font-body font-light transition-colors duration-300",
                isDark ? "text-white/80" : "text-muted-foreground"
              )}>
                Fill out the form below and we&apos;ll get back to you soon
              </p>
            </div>

            <div className="md:hidden mb-4">
              <button
                type="button"
                onClick={() => setShowMobileForm((prev) => !prev)}
                className={cn(
                  "flex w-full min-h-[48px] items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                  isDark
                    ? "border-green-600 bg-green-600/40 text-white hover:bg-green-600/60"
                    : "border-border/40 bg-background text-foreground hover:bg-muted/40"
                )}
                aria-expanded={showMobileForm}
                aria-controls="mobile-contact-form"
              >
                <span className="font-body text-sm font-light tracking-wide">
                  {showMobileForm ? "Hide Contact Form" : "Open Contact Form"}
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", showMobileForm && "rotate-180")} />
              </button>
            </div>

            <div
              id="mobile-contact-form"
              className={cn(
                "rounded-xl border card-padding shadow-lg transition-all duration-300",
                isDark ? "bg-green-600/50 border-green-700/50" : "bg-neutral-50 border-border/30",
                "md:block",
                showMobileForm ? "block" : "hidden"
              )}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Compact Location (Mobile) */}
      <section
        className={cn(
          "section-shell md:hidden transition-colors duration-300",
          isDark ? "bg-green-700/80" : "bg-neutral-50"
        )}
        aria-labelledby="location-heading-mobile"
      >
        <div className="section-shell-inner">
          <div
            className={cn(
              "mx-auto max-w-2xl rounded-xl border card-padding shadow-md",
              isDark ? "border-green-600 bg-green-600/40" : "border-border/30 bg-background"
            )}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-terra-500/10">
                <MapPin className="h-5 w-5 text-terra-600" />
              </div>
              <h2
                id="location-heading-mobile"
                className={cn("text-lg font-display font-light", isDark ? "text-white" : "text-foreground")}
              >
                Visit Us
              </h2>
            </div>
            <p className={cn("font-body text-sm font-light leading-relaxed", isDark ? "text-white/85" : "text-muted-foreground")}>
              {SITE_ADDRESS_LINES[0]}
              <br />
              {SITE_ADDRESS_LINES[1]}
            </p>
            <a
              href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-terra-500/60 px-4 py-2.5 font-body text-sm font-light tracking-wide text-foreground transition-colors hover:bg-terra-500/10"
              aria-label="Get directions to Chez Amis"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Map Section (Tablet/Desktop) */}
      <div className="hidden md:block">
        <MapSection />
      </div>

      {/* Social & Quick Contact */}
      <section
        className={cn(
          "section-shell transition-colors duration-300",
          isDark ? "bg-green-700/80" : "bg-neutral-50",
        )}
      >
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className={cn(
                "section-title mb-3",
                isDark ? "text-white" : "text-neutral-900",
              )}>
                Follow Us
              </h2>
              <p className={cn(
                "text-base md:text-lg font-body font-light",
                isDark ? "text-white/80" : "text-muted-foreground",
              )}>
                Find updates, specials, and behind-the-scenes moments
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:justify-center md:gap-6">
              <a
                href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 rounded-lg border border-border/50 px-4 py-3 transition-all duration-300 hover:border-terra-500/50 hover:bg-terra-500/5 md:px-6"
                aria-label="Follow us on Instagram"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-body font-light tracking-wide">Instagram</span>
              </a>

              <a
                href="https://www.snapchat.com/add/chez_amis"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 rounded-lg border border-border/50 px-4 py-3 transition-all duration-300 hover:border-terra-500/50 hover:bg-terra-500/5 md:px-6"
                aria-label="Follow us on Snapchat"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 group-hover:scale-110 transition-transform">
                  <SnapchatIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-body font-light tracking-wide">Snapchat</span>
              </a>

              <a
                href="https://www.tiktok.com/@chezamisrestaurant?_r=1&_t=ZM-920yX90ahAW"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 rounded-lg border border-border/50 px-4 py-3 transition-all duration-300 hover:border-terra-500/50 hover:bg-terra-500/5 md:px-6"
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
                <span className="text-sm font-body font-light tracking-wide">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
