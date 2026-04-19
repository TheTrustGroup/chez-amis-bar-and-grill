import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { FOOTER_PHONE_LINES, SITE_EMAIL } from "@/lib/data/siteContact"

export const metadata: Metadata = {
  title: "Press & Media - Chez Amis Bar and Grill",
  description: "Media resources, press inquiries, and contact information for journalists and media professionals.",
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Press & Media
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Media resources and press contact for interviews or features.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
            {/* Press Contact */}
            <div className="ui-card-compact p-6 md:p-8 space-y-5 dark:bg-green-600/40 dark:border-green-700/50">
              <h2 className="section-title text-neutral-900 dark:text-white">
                Media Inquiries
              </h2>
              <p className="text-base md:text-lg font-body font-light text-muted-foreground leading-relaxed">
                For coverage requests, our team can share:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-terra-500 mt-1">•</span>
                  <span>High-resolution images of our dishes and restaurant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terra-500 mt-1">•</span>
                  <span>Chef interviews and behind-the-scenes access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terra-500 mt-1">•</span>
                  <span>Restaurant information and background</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terra-500 mt-1">•</span>
                  <span>Press releases and announcements</span>
                </li>
              </ul>

              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="text-terra-600 md:hover:text-terra-700 transition-colors"
                    >
                      {SITE_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-foreground">Phone</p>
                    <a
                      href={`tel:${FOOTER_PHONE_LINES[0]?.tel ?? ""}`}
                      className="block text-terra-600 md:hover:text-terra-700 transition-colors"
                    >
                      {FOOTER_PHONE_LINES[0]?.display}
                    </a>
                  </div>
                </div>
                <div className="pt-2">
                  <a href={`mailto:${SITE_EMAIL}`}>
                    <Button className="bg-foreground text-background md:hover:bg-foreground/90 active:bg-foreground/90">
                      Send Press Inquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-5">
              <h2 className="section-title text-neutral-900 dark:text-white">
                About Chez Amis
              </h2>
              <div className="prose prose-lg max-w-none space-y-3 text-muted-foreground font-body font-light leading-relaxed">
                <p>
                  Chez Amis Bar and Grill is a premier dining destination in Accra, Ghana, specializing in authentic West African cuisine with a modern twist. Our signature dish, Attieke, has become a beloved favorite among locals and visitors alike.
                </p>
                <p>
                  Located at 40 Boundary Road in East Legon, we offer an intimate dining experience that celebrates the rich culinary traditions of Côte d&apos;Ivoire and Ghana. Our menu features expertly grilled proteins, fresh seafood, and traditional dishes crafted with locally sourced ingredients.
                </p>
                <p>
                  We are open 24 hours a day, 7 days a week, welcoming guests for lunch, dinner, and late-night dining. Our restaurant also offers private dining spaces for special events and celebrations.
                </p>
              </div>
            </div>

            {/* Key Facts */}
            <div className="ui-card-compact bg-green-600 text-white border-green-500/40 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-display font-light mb-5">
                Key Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Established</p>
                  <p className="text-white/80">2024</p>
                </div>
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Location</p>
                  <p className="text-white/80">40 Boundary Rd, East Legon, Accra</p>
                </div>
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Signature Dish</p>
                  <p className="text-white/80">Attieke with Grilled Tilapia</p>
                </div>
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Cuisine</p>
                  <p className="text-white/80">West African, Ivorian, Ghanaian</p>
                </div>
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Capacity</p>
                  <p className="text-white/80">Private dining: 10-100 guests</p>
                </div>
                <div>
                  <p className="text-terra-500 font-body font-medium mb-2">Hours</p>
                  <p className="text-white/80">Open 24/7</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}




