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

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn(isDark ? "bg-green-700" : "bg-neutral-50")}>
      <section className={cn("w-full overflow-hidden py-5 md:py-6", isDark ? "bg-green-700" : "bg-neutral-50")}>
        <div className="section-shell-inner ui-stack-sm">
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
        </div>
      </section>
    </div>
  )
}
