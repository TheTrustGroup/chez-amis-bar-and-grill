import { Metadata } from "next"
import Link from "next/link"
import { PageIntro } from "@/components/layout/PageIntro"
import { footerNavigation, legalNavigation, primaryNavigation } from "@/lib/data/navigation"

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
    ...primaryNavigation,
    ...footerNavigation,
    { href: "/press", label: "Press & Media" },
    ...legalNavigation,
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      <PageIntro title="Sitemap" description="Navigate our website easily." />

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto">
            <div className="ui-card-compact p-6 md:p-8 dark:bg-green-600/40 dark:border-green-700/50">
              <h2 className="section-title text-neutral-900 dark:text-white mb-4">
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
          </div>
        </div>
      </section>
    </div>
  )
}
