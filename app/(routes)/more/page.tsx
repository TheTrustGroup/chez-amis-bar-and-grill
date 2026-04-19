"use client"

import Link from "next/link"
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  HelpCircle,
  MapPin,
  Phone,
  ShoppingBag,
  Users,
} from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

const quickActions = [
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

const moreLinks = [
  { href: "/about", label: "About", icon: BookOpen },
  { href: "/faq", label: "FAQs", icon: HelpCircle },
  { href: "/private-events", label: "Private Dining", icon: Users },
  { href: "/catering", label: "Catering", icon: ShoppingBag },
]

const supportLinks = [
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
              Quick links for actions and key pages.
            </p>
          </div>

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {quickActions.map((item) => {
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
            <h2 className="ui-title text-lg">Navigation</h2>
            <div className="grid grid-cols-1 gap-1">
              {moreLinks.map((item) => {
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

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Support</h2>
            <div className="grid grid-cols-1 gap-1">
              {supportLinks.map((item) => {
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

          <div className="ui-panel ui-stack-md">
            <h2 className="ui-title text-lg">Legal</h2>
            <div className="grid grid-cols-1 gap-1">
              {legalLinks.map((item) => {
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

          <p className={cn("text-xs md:text-sm", isDark ? "text-white/70" : "text-muted-foreground")}>
            Need help? Open Contact from Quick Actions.
          </p>
        </div>
      </section>
    </div>
  )
}
