"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/context/ThemeContext"
import { getActiveSocialLinks } from "@/lib/data/socialLinks"
import { SnapchatIcon } from "@/components/ui/snapchat-icon"
import { legalNavigation } from "@/lib/data/navigation"

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
        "border-t border-border/80 transition-colors duration-300",
        isDark ? "bg-green-700 text-white" : "bg-background text-foreground"
      )}
      role="contentinfo"
    >
      <div className="section-shell-inner py-7 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:py-9 lg:pb-9">
        <div className="grid gap-8 md:grid-cols-[1.1fr_auto] md:items-start">
          <div className="space-y-4">
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-2xl font-light text-terra-500">Chez Amis</span>
              <span className={cn("text-[11px] uppercase tracking-[0.2em]", isDark ? "text-white/70" : "text-muted-foreground")}>
                Bar and Grill
              </span>
            </Link>
            <p className={cn("text-sm font-body font-light", isDark ? "text-white/80" : "text-muted-foreground")}>
              East Legon, Accra
            </p>
          </div>

          <div className="md:justify-self-end md:text-right">
            <div className="flex items-center gap-1 pt-1 md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                    isDark
                      ? "text-white/75 md:hover:bg-white/10 md:hover:text-terra-300 active:bg-white/15"
                      : "text-muted-foreground md:hover:bg-muted md:hover:text-terra-500 active:bg-muted"
                  )}
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
            "border-t mt-6 pt-4 md:mt-8",
            isDark ? "border-white/10" : "border-border/80",
            "flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body",
            isDark ? "text-white/40" : "text-muted-foreground"
          )}
        >
          <p>
            © {currentYear} Chez Amis Bar &amp; Grill. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("transition-colors", isDark ? "md:hover:text-white/70" : "md:hover:text-foreground")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

