import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap - Chez Amis Bar and Grill",
  description: "Site map and navigation guide for Chez Amis Bar and Grill website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SitemapPage() {
  const pages = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/private-events", label: "Private Events" },
    { href: "/catering", label: "Catering" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press & Media" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Sitemap
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Navigate our website easily
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="ui-card-compact p-8 md:p-10 dark:bg-green-600/40 dark:border-green-700/50">
              <h2 className="section-title text-neutral-900 dark:text-white mb-6">
                All Pages
              </h2>
              <ul className="space-y-3">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-terra-600 md:hover:text-terra-700 font-body font-light transition-colors underline underline-offset-2"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back Button */}
            <div className="pt-8">
              <Link href="/">
                <Button
                  variant="outline"
                  className="group border-2 border-foreground/20 text-foreground md:hover:bg-foreground/5 active:bg-foreground/5 md:hover:border-foreground/40 active:border-foreground/40 font-body font-light tracking-wide"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform md:group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
