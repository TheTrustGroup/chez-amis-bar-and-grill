"use client"

import Link from "next/link"
import {
  Calendar,
  ExternalLink,
  FileText,
  HelpCircle,
  MapPin,
  Phone,
  ShoppingBag,
  Users,
  UtensilsCrossed,
} from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

const essentialActions = [
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/reservations", label: "Reserve a Table", icon: Calendar },
  { href: "/place-order", label: "Order Delivery", icon: ShoppingBag },
  { href: "/contact", label: "Contact Us", icon: Phone },
  {
    href: "https://maps.google.com/?q=Chez+Amis+Bar+and+Grill+40+Boundary+Rd+Accra",
    label: "Get Directions",
    icon: MapPin,
    external: true,
  },
]

const exploreLinks = [
  { href: "/about", label: "About", icon: FileText },
  { href: "/faq", label: "FAQs", icon: HelpCircle },
  { href: "/private-events", label: "Private Dining", icon: FileText },
  { href: "/catering", label: "Catering", icon: ShoppingBag },
  { href: "/careers", label: "Careers", icon: Users },
  { href: "/press", label: "Press & Media", icon: FileText },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy", icon: FileText },
  { href: "/terms", label: "Terms of Service", icon: FileText },
]

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn("min-h-screen", isDark ? "bg-green-700" : "bg-neutral-50")}>
      <section className={cn("section-shell pb-6 md:pb-8", isDark ? "bg-green-700" : "bg-neutral-50")}>
        <div className="section-shell-inner ui-stack-lg">
          <div className="ui-stack-sm">
            <h1 className={cn("nav-page-heading", isDark ? "text-white" : "text-foreground")}>
              More
            </h1>
            <p className={cn("nav-page-subheading max-w-xl", isDark ? "text-white/80" : "text-muted-foreground")}>
              Essential links, kept simple.
            </p>
          </div>

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Essentials</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {essentialActions.map((item) => {
                const Icon = item.icon
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-link-row min-h-[46px] justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-terra-600" />
                        {item.label}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="ui-link-row min-h-[46px]"
                  >
                    <Icon className="h-4 w-4 text-terra-600" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Explore</h2>
            <div className="grid grid-cols-1 gap-1">
              {exploreLinks.map((item) => {
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
