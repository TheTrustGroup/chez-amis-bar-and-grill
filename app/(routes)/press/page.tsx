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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light">
              Press & Media
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-cream-200/80">
              We welcome media inquiries and are happy to provide information, images, and interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Press Contact */}
            <div className="bg-cream-50 rounded-lg p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
                Media Inquiries
              </h2>
              <p className="text-lg font-body font-light text-muted-foreground leading-relaxed">
                For press inquiries, interview requests, or media coverage, please contact our team. We&apos;re available to provide:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>High-resolution images of our dishes and restaurant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>Chef interviews and behind-the-scenes access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>Restaurant information and background</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>Press releases and announcements</span>
                </li>
              </ul>

              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gold-500" />
                  <div>
                    <p className="font-heading font-medium text-foreground">Email</p>
                    <a
                      href="mailto:press@chezamis.com"
                      className="text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      press@chezamis.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gold-500" />
                  <div>
                    <p className="font-heading font-medium text-foreground">Phone</p>
                    <a
                      href="tel:+233243952339"
                      className="text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      +233 024 395 2339
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
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
                  We are open daily from 9:30 AM to 12:00 AM, welcoming guests for lunch, dinner, and late-night dining. Our restaurant also offers private dining spaces for special events and celebrations.
                </p>
              </div>
            </div>

            {/* Key Facts */}
            <div className="bg-charcoal-900 text-cream-100 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-light mb-6">
                Key Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Established</p>
                  <p className="text-cream-200/80">2024</p>
                </div>
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Location</p>
                  <p className="text-cream-200/80">40 Boundary Rd, East Legon, Accra</p>
                </div>
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Signature Dish</p>
                  <p className="text-cream-200/80">Attieke with Grilled Tilapia</p>
                </div>
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Cuisine</p>
                  <p className="text-cream-200/80">West African, Ivorian, Ghanaian</p>
                </div>
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Capacity</p>
                  <p className="text-cream-200/80">Private dining: 10-100 guests</p>
                </div>
                <div>
                  <p className="text-gold-500 font-heading font-medium mb-2">Hours</p>
                  <p className="text-cream-200/80">Daily 9:30 AM - 12:00 AM</p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-8">
              <Link href="/">
                <Button
                  variant="outline"
                  className="group border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-heading font-light tracking-wide"
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

