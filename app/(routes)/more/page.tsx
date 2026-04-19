"use client"

import Link from "next/link"
import {
  FileText,
  HelpCircle,
  ShoppingBag,
  Users,
} from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

const utilityLinks = [
  { href: "/private-events", label: "Private Dining", icon: Users },
  { href: "/catering", label: "Catering", icon: ShoppingBag },
  { href: "/careers", label: "Careers", icon: Users },
  { href: "/press", label: "Press & Media", icon: FileText },
  { href: "/faq", label: "FAQs", icon: HelpCircle },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy", icon: FileText },
  { href: "/terms", label: "Terms of Service", icon: FileText },
]

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn(isDark ? "bg-green-700" : "bg-neutral-50")}>
      <section className={cn("w-full overflow-hidden py-6 md:py-8", isDark ? "bg-green-700" : "bg-neutral-50")}>
        <div className="section-shell-inner ui-stack-md">
          <div className="ui-stack-sm">
            <h1 className={cn("nav-page-heading", isDark ? "text-white" : "text-foreground")}>
              More
            </h1>
            <p className={cn("nav-page-subheading max-w-xl", isDark ? "text-white/80" : "text-muted-foreground")}>
              Utility pages and policies.
            </p>
          </div>

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Utility</h2>
            <div className="grid grid-cols-1 gap-1">
              {utilityLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="ui-list-row"
                  >
                    <Icon className="h-4 w-4 text-terra-600" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className={cn("text-xs uppercase tracking-wider", isDark ? "text-white/60" : "text-muted-foreground")}>
              Legal
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="ui-link-row min-h-[40px] px-3 py-1.5">
                  <FileText className="h-3.5 w-3.5 text-terra-600" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
