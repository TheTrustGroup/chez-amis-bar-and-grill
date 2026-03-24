import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react"

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
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="hero-title tracking-tight">
              Press & Media
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-white/80">
              We welcome media inquiries and are happy to provide information, images, and interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Press Contact */}
            <div className="rounded-sm border border-border/30 bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 p-8 md:p-12 space-y-6">
              <h2 className="section-title text-neutral-900 dark:text-white">
                Media Inquiries
              </h2>
              <p className="text-lg font-body font-light text-muted-foreground leading-relaxed">
                For press inquiries, interview requests, or media coverage, please contact our team. We&apos;re available to provide:
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

              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-foreground">Email</p>
                    <a
                      href="mailto:chez@chezamisrestaurant.com"
                      className="text-terra-600 hover:text-terra-700 transition-colors"
                    >
                      chez@chezamisrestaurant.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-foreground">Phone</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+233557032312"
                        className="block text-terra-600 hover:text-terra-700 transition-colors"
                      >
                        +233 055 703 2312
                      </a>
                      <a
                        href="tel:+233557032335"
                        className="block text-terra-600 hover:text-terra-700 transition-colors"
                      >
                        +233 055 703 2335
                      </a>
                    <a
                      href="tel:+233243952339"
                        className="block text-terra-600 hover:text-terra-700 transition-colors"
                    >
                      +233 024 395 2339
                    </a>
                      <a
                        href="tel:+233502432037"
                        className="block text-terra-600 hover:text-terra-700 transition-colors"
                      >
                        +233 050 243 2037
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="section-title text-neutral-900 dark:text-white">
                About Chez Amis
              </h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground font-body font-light leading-relaxed">
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
            <div className="bg-green-600 text-white rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-light mb-6">
                Key Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Back Button */}
            <div className="pt-8">
              <Link href="/">
                <Button
                  variant="outline"
                  className="group border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-body font-light tracking-wide"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
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




