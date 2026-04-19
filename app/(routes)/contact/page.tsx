"use client"

import { useState } from "react"
import { ContactInfo } from "@/components/contact/ContactInfo"
import { ContactForm } from "@/components/contact/ContactForm"
import { MapSection } from "@/components/contact/MapSection"
import { MapPin, Navigation, ChevronDown } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { FOOTER_PHONE_LINES, SITE_ADDRESS_LINES, SITE_EMAIL } from "@/lib/data/siteContact"
import { PageIntro } from "@/components/layout/PageIntro"

export default function ContactPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [showMobileForm, setShowMobileForm] = useState(false)

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-green-700" : "bg-neutral-50"
    )}>
      <PageIntro
        title="Get in Touch"
        description="We're here to help and look forward to connecting with you."
      />

      {/* Contact Information */}
      <section className={cn(
        "section-shell transition-colors duration-300",
        isDark ? "bg-green-700/50" : "bg-neutral-50"
      )} aria-labelledby="contact-info-heading">
        <div className="section-shell-inner">
          <div className="mb-6 md:mb-8 ui-card-compact p-4 md:p-5">
            <h2
              id="contact-info-heading"
              className={cn("text-lg md:text-xl font-display font-light mb-3", isDark ? "text-white" : "text-foreground")}
            >
              Quick Contact
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href={`tel:${FOOTER_PHONE_LINES[0]?.tel ?? ""}`}
                className="ui-link-row"
              >
                Call {FOOTER_PHONE_LINES[0]?.display}
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="ui-link-row"
              >
                Email {SITE_EMAIL}
              </a>
              <a
                href="https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra"
                target="_blank"
                rel="noopener noreferrer"
                className="ui-link-row"
              >
                Open Directions
              </a>
            </div>
          </div>
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
            <div className="text-center mb-8 md:mb-10">
              <h2
                id="contact-form-heading"
                className={cn(
                  "section-title mb-3 transition-colors duration-300",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                Send Us a Message
              </h2>
              <p className={cn(
                "text-sm md:text-base font-body font-light transition-colors duration-300",
                isDark ? "text-white/80" : "text-muted-foreground"
              )}>
                Fill out the form below and we&apos;ll get back to you soon
              </p>
            </div>

            <div className="md:hidden mb-3">
              <button
                type="button"
                onClick={() => setShowMobileForm((prev) => !prev)}
                className={cn(
                  "ui-link-row w-full justify-between px-4 py-3 text-left",
                  isDark
                    ? "border-green-600 bg-green-600/40 text-white md:hover:bg-green-600/60 active:bg-green-600/60"
                    : "bg-background text-foreground"
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
                "ui-card-compact card-padding transition-all duration-300",
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
              "ui-card-compact mx-auto max-w-2xl card-padding",
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
              className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-terra-500/60 px-4 py-2.5 font-body text-sm font-light tracking-wide text-foreground transition-colors md:hover:bg-terra-500/10 active:bg-terra-500/10"
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

    </div>
  )
}
