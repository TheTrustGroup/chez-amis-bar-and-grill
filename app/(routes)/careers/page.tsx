import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Briefcase, Users, Utensils, Heart } from "lucide-react"
import { FOOTER_PHONE_LINES, SITE_EMAIL } from "@/lib/data/siteContact"
import { PageIntro } from "@/components/layout/PageIntro"

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
      <PageIntro
        title="Join Our Team"
        description="Build your career with a team focused on great food and service."
      />

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
                We hire people who care about craft, consistency, and hospitality.
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
                  </div>
                ))}
              </div>
            </div>

            {/* General Application */}
            <div className="ui-card-compact bg-green-600 text-white border-green-500/40 p-6 md:p-8 space-y-5">
              <h2 className="text-xl md:text-2xl font-display font-light">
                Apply to Our Team
              </h2>
              <p className="text-white/80 font-body font-light leading-relaxed">
                Share your resume and preferred role. We review applications for both listed and upcoming openings.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-white">Email</p>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="text-terra-400 md:hover:text-terra-300 transition-colors"
                    >
                      {SITE_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-terra-500" />
                  <div>
                    <p className="font-body font-medium text-white">Phone</p>
                    <a
                      href={`tel:${FOOTER_PHONE_LINES[0]?.tel ?? ""}`}
                      className="block text-terra-400 md:hover:text-terra-300 transition-colors"
                    >
                      {FOOTER_PHONE_LINES[0]?.display}
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <a href={`mailto:${SITE_EMAIL}`}>
                  <Button className="bg-foreground text-background md:hover:bg-foreground/90 active:bg-foreground/90">
                    Send Application
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
