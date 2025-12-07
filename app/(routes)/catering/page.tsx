import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone, Mail, Calendar, Users, Utensils } from "lucide-react"

export const metadata: Metadata = {
  title: "Catering Services - Chez Amis Bar and Grill",
  description: "Professional catering services for events, corporate functions, and special occasions. Bring the flavors of Chez Amis to your venue.",
}

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light">
              Catering Services
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-cream-200/80">
              Bring the authentic flavors of Chez Amis to your event, office, or special occasion
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
                Professional Catering for Every Occasion
              </h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground font-body font-light leading-relaxed">
                <p>
                  Whether you&apos;re hosting a corporate event, celebrating a milestone, or organizing a gathering, our catering services bring the same quality and attention to detail that defines the Chez Amis dining experience.
                </p>
                <p>
                  Our signature Attieke dishes, expertly grilled proteins, and traditional West African cuisine can be customized to suit your event size, dietary requirements, and preferences.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Users className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-display font-light text-foreground">
                    Corporate Events
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Professional catering for business meetings, conferences, team lunches, and corporate celebrations.
                </p>
              </div>

              <div className="bg-cream-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Calendar className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-display font-light text-foreground">
                    Special Occasions
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Birthday parties, anniversaries, graduations, and family gatherings made memorable with our cuisine.
                </p>
              </div>

              <div className="bg-cream-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Utensils className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-display font-light text-foreground">
                    Custom Menus
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Tailored menus designed to match your event theme, dietary needs, and budget requirements.
                </p>
              </div>

              <div className="bg-cream-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gold-500/10">
                    <Phone className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-display font-light text-foreground">
                    Full Service
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Complete setup, professional service staff, and cleanup included for a seamless experience.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-charcoal-900 text-cream-100 rounded-lg p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-light">
                Request a Catering Quote
              </h2>
              <p className="text-cream-200/80 font-body font-light leading-relaxed">
                Contact us to discuss your catering needs. We&apos;ll work with you to create a customized menu and service plan for your event.
              </p>
              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gold-500" />
                  <div>
                    <p className="font-heading font-medium text-cream-100">Phone</p>
                    <a
                      href="tel:+233243952339"
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      +233 024 395 2339 / 050 243 2037
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gold-500" />
                  <div>
                    <p className="font-heading font-medium text-cream-100">Email</p>
                    <a
                      href="mailto:catering@chezamis.com"
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      catering@chezamis.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 font-heading font-light"
                  >
                    Contact Us for Catering
                  </Button>
                </Link>
              </div>
            </div>

            {/* Minimum Requirements */}
            <div className="bg-cream-50 rounded-lg p-8 space-y-4">
              <h3 className="text-2xl font-display font-light text-foreground">
                Catering Information
              </h3>
              <div className="space-y-3 text-muted-foreground font-body font-light">
                <p>
                  <strong className="text-foreground">Minimum Order:</strong> 10 guests
                </p>
                <p>
                  <strong className="text-foreground">Advance Notice:</strong> 48 hours recommended, 24 hours minimum
                </p>
                <p>
                  <strong className="text-foreground">Service Area:</strong> Accra and surrounding areas
                </p>
                <p>
                  <strong className="text-foreground">Setup & Service:</strong> Available upon request
                </p>
                <p>
                  <strong className="text-foreground">Customization:</strong> Menus can be tailored to dietary requirements and preferences
                </p>
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

