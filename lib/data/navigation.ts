export type NavigationItem = {
  href: string
  label: string
}

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/private-events", label: "Private Events" },
  { href: "/contact", label: "Contact" },
]

export const footerNavigation: NavigationItem[] = [
  { href: "/reservations", label: "Reservations" },
  { href: "/catering", label: "Catering" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
]

export const legalNavigation: NavigationItem[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/sitemap", label: "Sitemap" },
]
