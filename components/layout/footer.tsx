"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import { getActiveSocialLinks } from "@/lib/data/socialLinks"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const socialLinks = getActiveSocialLinks(["instagram", "snapchat", "tiktok"])

  const renderSocialIcon = (socialId: string) => {
    if (socialId === "instagram") return <Instagram className="h-4 w-4" />
    if (socialId === "snapchat") return <SnapchatIcon className="h-4 w-4" />
    return (
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    )
  }

  return (
    <footer
      className={cn(
        "border-t-4 border-terra-500 transition-colors duration-300",
        isDark ? "bg-green-700 text-white" : "bg-green-600 text-white"
      )}
      role="contentinfo"
    >
      <div className="section-shell-inner py-7 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:py-9 lg:pb-9">
        <div className="grid gap-6 md:grid-cols-[1.1fr_auto] md:items-center">
          <div className="space-y-1.5">
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-2xl font-light text-terra-400">Chez Amis</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">Bar and Grill</span>
            </Link>
            <p className={cn("text-sm font-body font-light", isDark ? "text-white/80" : "text-white/70")}>
              East Legon, Accra
            </p>
          </div>

          <div className="md:justify-self-end">
            <div className="flex items-center gap-1 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/75 transition-colors md:hover:bg-white/10 md:hover:text-terra-300 active:bg-white/15"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {renderSocialIcon(social.id)}
                </a>
              ))}
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors md:hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors md:hover:text-white/70"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

