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
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Join Our Team
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Be part of a team that&apos;s passionate about exceptional food and hospitality
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
            {/* Why Work With Us */}
            <div className="space-y-5">
              <h2 className="section-title text-neutral-900 dark:text-white">
                Why Work at Chez Amis?
              </h2>
              <p className="text-base md:text-lg font-body font-light text-muted-foreground leading-relaxed">
                At Chez Amis, we believe that great food comes from great people. We&apos;re looking for individuals who share our passion for authentic West African cuisine and exceptional hospitality.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="ui-card-compact p-5 md:p-6 space-y-3.5 dark:bg-green-600/40 dark:border-green-700/50">
                  <div className="text-terra-600">{benefit.icon}</div>
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-body font-light">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Open Positions */}
            <div className="space-y-5">
              <h2 className="section-title text-neutral-900 dark:text-white">
                Open Positions
              </h2>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="ui-card-compact bg-neutral-50 dark:bg-green-600/40 p-5 md:p-6 dark:border-green-700/50 md:hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-display font-light text-foreground mb-2">
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
                        className="border-2 border-terra-500/50 text-terra-600 md:hover:bg-terra-500/10 active:bg-terra-500/10 md:hover:border-terra-500 active:border-terra-500 font-body font-light"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* General Application */}
            <div className="ui-card-compact bg-green-600 text-white border-green-500/40 p-6 md:p-8 space-y-5">
              <h2 className="text-xl md:text-2xl font-display font-light">
                Don&apos;t See a Position That Fits?
              </h2>
              <p className="text-white/80 font-body font-light leading-relaxed">
                We&apos;re always looking for talented individuals to join our team. Even if you don&apos;t see a specific position listed, we&apos;d love to hear from you. Send us your resume and let us know how you&apos;d like to contribute to the Chez Amis experience.
              </p>
              <div className="pt-4 space-y-4">
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
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-terra-500/50 text-terra-400 md:hover:bg-terra-500/10 active:bg-terra-500/10 md:hover:border-terra-500 active:border-terra-500 font-body font-light"
                  >
                    Contact Us
                  </Button>
                </Link>
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
