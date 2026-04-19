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
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Catering Services
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Bring the authentic flavors of Chez Amis to your event, office, or special occasion
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
            {/* Overview */}
            <div className="space-y-5">
              <h2 className="section-title text-neutral-900 dark:text-white">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="ui-card-compact p-5 md:p-6 space-y-3.5 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-terra-500/10">
                    <Users className="h-6 w-6 text-terra-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground">
                    Corporate Events
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Professional catering for business meetings, conferences, team lunches, and corporate celebrations.
                </p>
              </div>

              <div className="ui-card-compact p-5 md:p-6 space-y-3.5 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-terra-500/10">
                    <Calendar className="h-6 w-6 text-terra-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground">
                    Special Occasions
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Birthday parties, anniversaries, graduations, and family gatherings made memorable with our cuisine.
                </p>
              </div>

              <div className="ui-card-compact p-5 md:p-6 space-y-3.5 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-terra-500/10">
                    <Utensils className="h-6 w-6 text-terra-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground">
                    Custom Menus
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Tailored menus designed to match your event theme, dietary needs, and budget requirements.
                </p>
              </div>

              <div className="ui-card-compact p-5 md:p-6 space-y-3.5 dark:bg-green-600/40 dark:border-green-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-terra-500/10">
                    <Phone className="h-6 w-6 text-terra-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground">
                    Full Service
                  </h3>
                </div>
                <p className="text-muted-foreground font-body font-light">
                  Complete setup, professional service staff, and cleanup included for a seamless experience.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="ui-card-compact bg-green-600 text-white border-green-500/40 p-6 md:p-8 space-y-5">
              <h2 className="text-xl md:text-2xl font-display font-light">
                Request a Catering Quote
              </h2>
              <p className="text-white/80 font-body font-light leading-relaxed">
                Contact us to discuss your catering needs. We&apos;ll work with you to create a customized menu and service plan for your event.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-white">Phone</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+233557032312"
                        className="block text-terra-400 md:hover:text-terra-300 transition-colors"
                      >
                        +233 055 703 2312
                      </a>
                      <a
                        href="tel:+233557032335"
                        className="block text-terra-400 md:hover:text-terra-300 transition-colors"
                      >
                        +233 055 703 2335
                      </a>
                    <a
                      href="tel:+233243952339"
                        className="block text-terra-400 md:hover:text-terra-300 transition-colors"
                    >
                        +233 024 395 2339
                      </a>
                      <a
                        href="tel:+233502432037"
                        className="block text-terra-400 md:hover:text-terra-300 transition-colors"
                      >
                        +233 050 243 2037
                    </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-white">Email</p>
                    <a
                      href="mailto:chez@chezamisrestaurant.com"
                      className="text-terra-400 md:hover:text-terra-300 transition-colors"
                    >
                      chez@chezamisrestaurant.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-terra-500/50 text-terra-400 md:hover:bg-terra-500/10 active:bg-terra-500/10 md:hover:border-terra-500 active:border-terra-500 font-body font-light"
                  >
                    Contact Us for Catering
                  </Button>
                </Link>
              </div>
            </div>

            {/* Minimum Requirements */}
            <div className="ui-card-compact p-6 md:p-8 space-y-4 dark:bg-green-600/40 dark:border-green-700/50">
              <h3 className="text-xl md:text-2xl font-display font-light text-foreground">
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
            <div className="pt-6">
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
