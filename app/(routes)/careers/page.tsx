import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, Briefcase, Users, Utensils, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers - Join Our Team | Chez Amis Bar and Grill",
  description: "Join the Chez Amis family. We're looking for passionate individuals who share our love for exceptional food and hospitality.",
}

export default function CareersPage() {
  const positions = [
    {
      title: "Line Cook",
      department: "Kitchen",
      type: "Full-time",
      description: "Join our culinary team and help create our signature dishes. Experience with West African cuisine preferred.",
    },
    {
      title: "Server",
      department: "Front of House",
      type: "Full-time / Part-time",
      description: "Provide exceptional service to our guests. Previous restaurant experience preferred but not required.",
    },
    {
      title: "Bartender",
      department: "Bar",
      type: "Full-time / Part-time",
      description: "Craft cocktails and provide excellent bar service. Knowledge of wine and spirits preferred.",
    },
    {
      title: "Host/Hostess",
      department: "Front of House",
      type: "Part-time",
      description: "Welcome guests and manage reservations. Friendly, organized, and detail-oriented individuals wanted.",
    },
  ]

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Environment",
      description: "Join a supportive, collaborative team that values each member",
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Culinary Growth",
      description: "Learn from experienced chefs and expand your culinary skills",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Food",
      description: "Work in an environment that celebrates authentic West African cuisine",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career Development",
      description: "Opportunities for growth and advancement within the restaurant",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-cream-200/80">
              Be part of a team that&apos;s passionate about exceptional food and hospitality
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Why Work With Us */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
                Why Work at Chez Amis?
              </h2>
              <p className="text-lg font-body font-light text-muted-foreground leading-relaxed">
                At Chez Amis, we believe that great food comes from great people. We&apos;re looking for individuals who share our passion for authentic West African cuisine and exceptional hospitality.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-cream-50 rounded-lg p-6 space-y-4">
                  <div className="text-gold-600">{benefit.icon}</div>
                  <h3 className="text-xl font-display font-light text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-body font-light">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Open Positions */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-foreground">
                Open Positions
              </h2>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="bg-cream-50 rounded-lg p-6 md:p-8 border border-charcoal-200/20 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-display font-light text-foreground mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="font-medium">{position.department}</span>
                          <span>•</span>
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-body font-light leading-relaxed mb-4">
                      {position.description}
                    </p>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="border-2 border-gold-500/50 text-gold-600 hover:bg-gold-500/10 hover:border-gold-500 font-heading font-light"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* General Application */}
            <div className="bg-charcoal-900 text-cream-100 rounded-lg p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-light">
                Don&apos;t See a Position That Fits?
              </h2>
              <p className="text-cream-200/80 font-body font-light leading-relaxed">
                We&apos;re always looking for talented individuals to join our team. Even if you don&apos;t see a specific position listed, we&apos;d love to hear from you. Send us your resume and let us know how you&apos;d like to contribute to the Chez Amis experience.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gold-500" />
                  <div>
                    <p className="font-heading font-medium text-cream-100">Email</p>
                    <a
                      href="mailto:careers@chezamis.com"
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      careers@chezamis.com
                    </a>
                  </div>
                </div>
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
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 font-heading font-light"
                  >
                    Contact Us
                  </Button>
                </Link>
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

