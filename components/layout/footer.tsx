"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Mail, Phone, MapPin, Clock, UtensilsCrossed, Calendar } from "lucide-react"
import { NewsletterSignup } from "./NewsletterSignup"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className={cn(
      "transition-colors duration-300",
      isDark ? "bg-charcoal-950 text-cream-100" : "bg-charcoal-900 text-cream-100"
    )} role="contentinfo">
      {/* Top Section - Four Columns - Premium */}
      <div className="container-custom py-12 md:py-16 lg:py-20">
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16",
          "animate-fade-in-up"
        )}>
          {/* Column 1: About Chez Amis - Premium Branding */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="inline-block group">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-0.5 w-8 bg-gold-500 group-hover:w-12 transition-all duration-300" aria-hidden="true"></div>
                  </div>
                  <span className={cn(
                    "text-4xl md:text-5xl font-display font-light transition-colors duration-300",
                    "text-gold-500 group-hover:text-gold-400"
                  )}>
                    Chez Amis
                  </span>
                  <span className={cn(
                    "text-xs font-heading font-light tracking-[0.2em] uppercase transition-colors duration-300",
                    isDark ? "text-cream-200/80" : "text-cream-200/70"
                  )}>
                    Bar and Grill
                  </span>
                </div>
              </Link>
            </div>
            <p className={cn(
              "text-sm font-body font-light italic transition-colors duration-300",
              isDark ? "text-cream-200/80" : "text-cream-200/70"
            )}>
              Where passion meets palate
            </p>
            <p className={cn(
              "text-sm font-body font-light leading-relaxed transition-colors duration-300",
              isDark ? "text-cream-200/70" : "text-cream-200/60"
            )}>
              An intimate culinary journey in the heart of Accra. We craft unforgettable dining
              experiences with locally sourced ingredients and time-honored techniques.
            </p>
            
            {/* Social Media Icons - Premium */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative transition-all duration-300 rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  "group/social",
                  isDark
                    ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/10"
                    : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/10",
                  "hover:scale-110 active:scale-95",
                  "border border-transparent hover:border-gold-500/30"
                )}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 transition-transform duration-300 group-hover/social:scale-110" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover/social:from-purple-500/10 group-hover/social:to-pink-500/10 transition-all duration-300" />
              </a>
              <a
                href="https://www.snapchat.com/add/chez_amis"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative transition-all duration-300 rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  "group/social",
                  isDark
                    ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/10"
                    : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/10",
                  "hover:scale-110 active:scale-95",
                  "border border-transparent hover:border-gold-500/30"
                )}
                aria-label="Follow us on Snapchat"
              >
                <SnapchatIcon className="h-5 w-5 transition-transform duration-300 group-hover/social:scale-110" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/0 to-yellow-500/0 group-hover/social:from-yellow-400/10 group-hover/social:to-yellow-500/10 transition-all duration-300" />
              </a>
              <a
                href="https://www.tiktok.com/@chezamisrestaurant?_r=1&_t=ZM-920yX90ahAW"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative transition-all duration-300 rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  "group/social",
                  isDark
                    ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/10"
                    : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/10",
                  "hover:scale-110 active:scale-95",
                  "border border-transparent hover:border-gold-500/30"
                )}
                aria-label="Follow us on TikTok"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover/social:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="absolute inset-0 rounded-full bg-black/0 group-hover/social:bg-black/10 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links - Premium */}
          <div className="space-y-6">
            <h3 className={cn(
              "text-lg md:text-xl font-display font-light transition-colors duration-300",
              isDark ? "text-cream-100" : "text-cream-100"
            )}>
              Quick Links
            </h3>
            <nav className="space-y-2 md:space-y-3" aria-label="Footer navigation">
              {[
                { href: "/about", label: "About Our Story" },
                { href: "/menu", label: "View Menu" },
                { href: "/reservations", label: "Reservations" },
                { href: "/private-events", label: "Private Dining" },
                { href: "/careers", label: "Careers" },
                { href: "/press", label: "Press & Media" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block text-sm md:text-base font-body font-light transition-all duration-300",
                    "py-2 md:py-1.5 min-h-[44px] md:min-h-0 flex items-center group/link relative",
                    "rounded-md px-2 -ml-2",
                    isDark
                      ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/5"
                      : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/5"
                  )}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500/0 group-hover/link:bg-gold-500 transition-all duration-300" />
                    {link.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300",
                      "bg-gradient-to-r from-gold-500 to-gold-400",
                      "group-hover/link:w-full"
                    )} />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Guest Services - Premium */}
          <div className="space-y-6">
            <h3 className={cn(
              "text-lg md:text-xl font-display font-light transition-colors duration-300",
              isDark ? "text-cream-100" : "text-cream-100"
            )}>
              Guest Services
            </h3>
            <nav className="space-y-2 md:space-y-3" aria-label="Guest services navigation">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "FAQs" },
                { href: "/catering", label: "Catering" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block text-sm md:text-base font-body font-light transition-all duration-300",
                    "py-2 md:py-1.5 min-h-[44px] md:min-h-0 flex items-center group/link relative",
                    "rounded-md px-2 -ml-2",
                    isDark
                      ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/5"
                      : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/5"
                  )}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500/0 group-hover/link:bg-gold-500 transition-all duration-300" />
                    {link.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300",
                      "bg-gradient-to-r from-gold-500 to-gold-400",
                      "group-hover/link:w-full"
                    )} />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact & Hours - Premium */}
          <div className="space-y-6">
            <h3 className={cn(
              "text-lg md:text-xl font-display font-light transition-colors duration-300",
              isDark ? "text-cream-100" : "text-cream-100"
            )}>
              Contact & Hours
            </h3>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3 group">
                <div className={cn(
                  "flex-shrink-0 mt-1 p-2 rounded-lg transition-all duration-300",
                  "bg-gold-500/10 group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <MapPin className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isDark ? "text-gold-400" : "text-gold-500"
                  )} />
                </div>
                <div>
                  <p className={cn(
                    "text-sm md:text-base font-body font-light leading-relaxed transition-colors duration-300",
                    isDark ? "text-cream-200/80" : "text-cream-200/70"
                  )}>
                    <a
                      href="https://maps.google.com/?q=40+Boundary+Rd+Accra+Ghana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "hover:text-gold-400 transition-colors duration-300",
                        "underline-offset-2 hover:underline"
                      )}
                    >
                      40 Boundary Rd<br />
                      Accra, Ghana
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 group">
                <div className={cn(
                  "flex-shrink-0 mt-1 p-2 rounded-lg transition-all duration-300",
                  "bg-gold-500/10 group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <Phone className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isDark ? "text-gold-400" : "text-gold-500"
                  )} />
                </div>
                <div className="space-y-1">
                  {[
                    { tel: "+233557032312", display: "055 703 2312" },
                    { tel: "+233557032335", display: "055 703 2335" },
                  ].map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className={cn(
                        "block text-sm md:text-base font-body font-light transition-colors duration-300",
                        isDark
                          ? "text-cream-200/70 hover:text-gold-400"
                          : "text-cream-200/60 hover:text-gold-500"
                      )}
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className={cn(
                  "flex-shrink-0 mt-1 p-2 rounded-lg transition-all duration-300",
                  "bg-gold-500/10 group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <Mail className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isDark ? "text-gold-400" : "text-gold-500"
                  )} />
                </div>
                <div>
                  <a
                    href="mailto:chez@chezamisrestaurant.com"
                    className={cn(
                      "text-sm md:text-base font-body font-light transition-colors duration-300 break-all",
                      "underline-offset-2 hover:underline",
                      isDark
                        ? "text-cream-200/70 hover:text-gold-400"
                        : "text-cream-200/60 hover:text-gold-500"
                    )}
                  >
                    chez@chezamisrestaurant.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 group">
                <div className={cn(
                  "flex-shrink-0 mt-1 p-2 rounded-lg transition-all duration-300",
                  "bg-gold-500/10 group-hover:bg-gold-500/20 group-hover:scale-110"
                )}>
                  <Clock className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isDark ? "text-gold-400" : "text-gold-500"
                  )} />
                </div>
                <div>
                  <p className={cn(
                    "text-sm md:text-base font-body font-light transition-colors duration-300",
                    isDark ? "text-cream-200/80" : "text-cream-200/70"
                  )}>
                    We&apos;re Open 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 space-y-3">
              <Link
                href="/reservations"
                className={cn(
                  "flex items-center gap-2 text-sm font-heading font-medium transition-all duration-300",
                  "px-4 py-2 rounded-lg min-h-[44px]",
                  "border border-gold-500/30",
                  isDark
                    ? "text-gold-400 bg-gold-500/5 hover:bg-gold-500/10 hover:border-gold-500/50"
                    : "text-gold-500 bg-gold-500/5 hover:bg-gold-500/10 hover:border-gold-500/50",
                  "hover:scale-105 active:scale-95"
                )}
              >
                <Calendar className="h-4 w-4" />
                Reserve a Table
              </Link>
              <Link
                href="/order-summary"
                className={cn(
                  "flex items-center gap-2 text-sm font-heading font-medium transition-all duration-300",
                  "px-4 py-2 rounded-lg min-h-[44px]",
                  "border border-gold-500/30",
                  isDark
                    ? "text-gold-400 bg-gold-500/5 hover:bg-gold-500/10 hover:border-gold-500/50"
                    : "text-gold-500 bg-gold-500/5 hover:bg-gold-500/10 hover:border-gold-500/50",
                  "hover:scale-105 active:scale-95"
                )}
              >
                <UtensilsCrossed className="h-4 w-4" />
                Order Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Contact Bar - Premium */}
      <div className={cn(
        "border-t transition-colors duration-300",
        isDark ? "border-charcoal-800/50" : "border-charcoal-800"
      )}>
        <div className="container-custom py-6 md:py-8">
          <div className={cn(
            "flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6",
            "text-sm md:text-base font-body font-light",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.2s" }}>
            <a
              href="https://maps.google.com/?q=40+Boundary+Rd+Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 transition-all duration-300 min-h-[44px] md:min-h-0",
                "px-3 py-2 rounded-lg",
                isDark
                  ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/5"
                  : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/5"
              )}
            >
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>40 Boundary Rd, Accra</span>
            </a>
            <span className={cn(
              "hidden md:inline transition-colors duration-300",
              isDark ? "text-gold-500/30" : "text-gold-500/40"
            )}>|</span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Phone className="h-4 w-4 flex-shrink-0" />
              {[
                { tel: "+233557032312", display: "055 703 2312" },
                { tel: "+233557032335", display: "055 703 2335" },
                { tel: "+233243952339", display: "024 395 2339" },
                { tel: "+233502432037", display: "050 243 2037" },
              ].map((phone, index) => (
                <span key={phone.tel} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className={cn(
                      "transition-colors duration-300",
                      isDark ? "text-gold-500/30" : "text-gold-500/40"
                    )}>•</span>
                  )}
                  <a
                    href={`tel:${phone.tel}`}
                    className={cn(
                      "transition-all duration-300 px-2 py-1 rounded",
                      isDark
                        ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/5"
                        : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/5"
                    )}
                  >
                    {phone.display}
                  </a>
                </span>
              ))}
            </div>
            <span className={cn(
              "hidden md:inline transition-colors duration-300",
              isDark ? "text-gold-500/30" : "text-gold-500/40"
            )}>|</span>
            <a
              href="mailto:chez@chezamisrestaurant.com"
              className={cn(
                "flex items-center gap-2 transition-all duration-300 min-h-[44px] md:min-h-0",
                "px-3 py-2 rounded-lg break-all",
                isDark
                  ? "text-cream-200/70 hover:text-gold-400 hover:bg-gold-500/5"
                  : "text-cream-200/60 hover:text-gold-500 hover:bg-gold-500/5"
              )}
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">chez@chezamisrestaurant.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <span className={cn(
              "hidden md:inline transition-colors duration-300",
              isDark ? "text-gold-500/30" : "text-gold-500/40"
            )}>|</span>
            <div className={cn(
              "flex items-center gap-2 transition-colors duration-300",
              isDark ? "text-cream-200/70" : "text-cream-200/60"
            )}>
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>We&apos;re Open 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Premium */}
      <div className={cn(
        "border-t transition-colors duration-300",
        isDark ? "border-charcoal-800/50" : "border-charcoal-800"
      )}>
        <div className="container-custom py-6 md:py-8">
          <div className={cn(
            "flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6",
            "text-sm font-body font-light",
            "animate-fade-in-up"
          )} style={{ animationDelay: "0.3s" }}>
            <div className={cn(
              "text-center md:text-left transition-colors duration-300",
              isDark ? "text-cream-200/60" : "text-cream-200/50"
            )}>
              © {currentYear} Chez Amis Bar and Grill. All rights reserved.
            </div>
            <nav className="flex items-center gap-3 md:gap-4 flex-wrap justify-center" aria-label="Legal navigation">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/sitemap", label: "Sitemap" },
              ].map((link, index) => (
                <span key={link.href} className="flex items-center gap-3 md:gap-4">
                  {index > 0 && (
                    <span className={cn(
                      "transition-colors duration-300",
                      isDark ? "text-gold-500/30" : "text-gold-500/40"
                    )}>|</span>
                  )}
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-all duration-300 px-2 py-1 rounded",
                      "hover:underline underline-offset-2",
                      isDark
                        ? "text-cream-200/60 hover:text-gold-400 hover:bg-gold-500/5"
                        : "text-cream-200/50 hover:text-gold-500 hover:bg-gold-500/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
            <div className={cn(
              "text-center md:text-right italic transition-colors duration-300",
              isDark ? "text-cream-200/50" : "text-cream-200/40"
            )}>
              Crafted with passion in Accra, Ghana
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

