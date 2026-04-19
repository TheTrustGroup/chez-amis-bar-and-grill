"use client"

import Link from "next/link"
import { FileText, HelpCircle, ShoppingBag, Users } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"

const groupedLinks = [
  {
    title: "Planning",
    items: [
      {
        href: "/private-events",
        label: "Private Dining",
        description: "Host birthdays, business dinners, and celebrations.",
        icon: Users,
      },
      {
        href: "/catering",
        label: "Catering",
        description: "Menus and service for events at your location.",
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        href: "/careers",
        label: "Careers",
        description: "Join the Chez Amis team.",
        icon: Users,
      },
      {
        href: "/press",
        label: "Press & Media",
        description: "Brand details and media contact information.",
        icon: FileText,
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        href: "/faq",
        label: "FAQs",
        description: "Answers to common reservation and order questions.",
        icon: HelpCircle,
      },
    ],
  },
]

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn(isDark ? "bg-green-700" : "bg-neutral-50")}>
      <section className={cn("w-full overflow-hidden py-4 md:py-5", isDark ? "bg-green-700" : "bg-neutral-50")}>
        <div className="section-shell-inner ui-stack-sm">
          <div className="space-y-1.5">
            <h1 className={cn("nav-page-heading", isDark ? "text-white" : "text-foreground")}>
              More
            </h1>
            <p className={cn("nav-page-subheading max-w-lg", isDark ? "text-white/80" : "text-muted-foreground")}>
              Quick links for planning, support, and business information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {groupedLinks.map((group) => (
              <div key={group.title} className="ui-panel ui-stack-md">
                <h2 className="ui-title text-lg">{group.title}</h2>
                <div className="grid grid-cols-1 gap-2">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-md border border-border/60 p-3 transition-colors md:hover:bg-muted/40 active:bg-muted/40"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <Icon className="h-4 w-4 text-terra-600" />
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
