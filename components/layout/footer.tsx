"use client"

import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, Calendar, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import {
  trackOrderClick,
  trackReservationClick,
} from "@/lib/analytics"
import { CHECKOUT_PATH, FOOTER_PHONE_LINES, SITE_EMAIL } from "@/lib/data/siteContact"
import { getActiveSocialLinks } from "@/lib/data/socialLinks"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const socialLinks = getActiveSocialLinks(["instagram", "facebook"])

  return (
    <footer
      className={cn(
        "border-t-4 border-terra-500 transition-colors duration-300",
        isDark ? "bg-green-700 text-white" : "bg-green-600 text-white"
      )}
      role="contentinfo"
    >
      <div className="section-shell-inner py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="space-y-2">
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-2xl font-light text-terra-400">Chez Amis</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">Bar and Grill</span>
            </Link>
            <p className={cn("text-sm font-body font-light", isDark ? "text-white/80" : "text-white/70")}>
              Where passion meets palate
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-2 text-sm"
            aria-label="Footer quick links"
          >
            {[
              { href: "/menu", label: "Menu" },
              { href: "/reservations", label: "Reserve" },
              { href: "/contact", label: "Contact" },
              { href: "/more", label: "More" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-white/80 transition-colors md:hover:text-terra-300 active:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3">
            <a
              href={`tel:${FOOTER_PHONE_LINES[0]?.tel ?? ""}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors md:hover:text-terra-300"
            >
              <Phone className="h-4 w-4" />
              {FOOTER_PHONE_LINES[0]?.display}
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="block text-sm text-white/80 transition-colors md:hover:text-terra-300 break-all [overflow-wrap:anywhere]"
            >
              {SITE_EMAIL}
            </a>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/75 transition-colors md:hover:bg-white/10 md:hover:text-terra-300 active:bg-white/15"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.id === "instagram" ? (
                    <Instagram className="h-4 w-4" />
                  ) : (
                    <Facebook className="h-4 w-4" />
                  )}
                </a>
              ))}
              <Link
                href="/reservations"
                className="ml-1 inline-flex items-center gap-1 rounded-md border border-terra-500/40 px-3 py-2 text-xs font-body font-medium uppercase tracking-wider text-terra-300 transition-colors md:hover:bg-terra-500/10 active:bg-terra-500/10"
                onClick={() => trackReservationClick("footer")}
              >
                <Calendar className="h-3.5 w-3.5" />
                Reserve
              </Link>
              <Link
                href={CHECKOUT_PATH}
                className="inline-flex items-center gap-1 rounded-md border border-terra-500/40 px-3 py-2 text-xs font-body font-medium uppercase tracking-wider text-terra-300 transition-colors md:hover:bg-terra-500/10 active:bg-terra-500/10"
                onClick={() => trackOrderClick("footer")}
              >
                <UtensilsCrossed className="h-3.5 w-3.5" />
                Order
              </Link>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "border-t border-white/10 mt-6 pt-4 md:mt-8",
            "flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-body"
          )}
        >
          <p>
            © {currentYear} Chez Amis Bar &amp; Grill. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="md:hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="md:hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

