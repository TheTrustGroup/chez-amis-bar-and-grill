"use client"

import { ContactInfo } from "@/components/contact/ContactInfo"
import { ContactForm } from "@/components/contact/ContactForm"
import { MapSection } from "@/components/contact/MapSection"
import { Phone, Instagram } from "lucide-react"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { PHONE_LINES } from "@/lib/data/siteContact"

export default function ContactPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

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

            <div className={cn(
              "rounded-xl border card-padding shadow-lg transition-all duration-300",
              isDark 
                ? "bg-green-600/50 border-green-700/50" 
                : "bg-neutral-50 border-border/30"
            )}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

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
                Connect With Us
              </h2>
              <p className={cn(
                "text-base md:text-lg font-body font-light",
                isDark ? "text-white/80" : "text-muted-foreground",
              )}>
                Follow our culinary journey on social media
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12">
              <a
                href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-terra-500/50 hover:bg-terra-500/5 transition-all duration-300 min-h-[48px]"
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
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-terra-500/50 hover:bg-terra-500/5 transition-all duration-300 min-h-[48px]"
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
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-border/50 hover:border-terra-500/50 hover:bg-terra-500/5 transition-all duration-300 min-h-[48px]"
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

            <div className="text-center pt-8 border-t border-border/30">
              <p className="text-sm md:text-base text-muted-foreground font-body font-light mb-4">
                Prefer to call? We&apos;re just a phone call away
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {PHONE_LINES.map((phone) => (
                  <a
                    key={phone.id}
                    href={`tel:${phone.tel}`}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-terra-500/60 px-6 py-3 font-body text-base font-light tracking-wide text-foreground transition-all hover:bg-terra-500/10"
                  >
                    <Phone className="h-5 w-5 shrink-0" />
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
