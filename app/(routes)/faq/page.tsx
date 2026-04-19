"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTheme } from "@/lib/context/ThemeContext"
import { cn } from "@/lib/utils"
import { PHONE_DISPLAY_COMMA, SITE_EMAIL } from "@/lib/data/siteContact"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showMoreQuestions, setShowMoreQuestions] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open 24 hours a day, 7 days a week. We welcome guests for lunch, dinner, and late-night dining.",
    },
    {
      question: "Do you take reservations?",
      answer: `Yes, we accept reservations. You can make a reservation online through our reservations page, call us at ${PHONE_DISPLAY_COMMA}, or visit us in person. We also welcome walk-ins.`,
    },
    {
      question: "What is Attieke?",
      answer: "Attieke is our signature dish - a fermented cassava couscous with a delicate, slightly tangy flavor. It's a traditional Ivorian dish that we serve with various grilled proteins like tilapia, chicken, and more. It's a must-try when visiting Chez Amis!",
    },
    {
      question: "Do you offer vegetarian or vegan options?",
      answer: "Yes, we have vegetarian and vegan options available. Please inform your server about any dietary restrictions, and we'll be happy to accommodate your needs. Many of our dishes can be customized to suit dietary preferences.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we have parking available for our guests. Please ask our staff for assistance with parking when you arrive.",
    },
    {
      question: "Do you offer private dining or event spaces?",
      answer: "Yes, we offer private dining spaces for special occasions, corporate events, and celebrations. Our private spaces can accommodate groups from 10 to 100 guests. Visit our Private Events page or contact us for more information and to discuss your event needs.",
    },
    {
      question: "Do you offer catering services?",
      answer: `Yes, we provide catering services for events, corporate functions, and special occasions. We can customize menus to suit your needs. Minimum order is for 10 guests, and we recommend 48 hours advance notice. Contact us at ${SITE_EMAIL} or call us for more information.`,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, mobile money, and card payments at the restaurant. For website orders, you pay when your order is delivered or when you pick it up. Online payment is coming soon.",
    },
    {
      question: "Do you offer delivery or takeaway?",
      answer: "Yes, we offer both delivery and takeaway services. You can place orders through our website or by calling us directly. Delivery is available in Accra and surrounding areas.",
    },
    {
      question: "Can I modify my reservation?",
      answer: "Yes, you can modify or cancel your reservation. We require 24 hours notice for cancellations. Please call us or use the modification link in your confirmation email.",
    },
    {
      question: "Do you accommodate large groups?",
      answer: "Yes, we can accommodate large groups. For parties of 8 or more, we recommend making a reservation in advance. For groups of 12 or more, please contact us directly to discuss arrangements and potential private dining options.",
    },
    {
      question: "Is the restaurant wheelchair accessible?",
      answer: "Yes, our restaurant is wheelchair accessible. Please let us know if you have any specific accessibility needs when making your reservation, and we'll ensure you have a comfortable dining experience.",
    },
    {
      question: "Do you have a dress code?",
      answer: "We don't have a strict dress code, but we recommend smart casual attire. We want all our guests to feel comfortable while enjoying their dining experience.",
    },
    {
      question: "Can I bring my own wine or alcohol?",
      answer: "We have a full bar and beverage selection available. Please contact us in advance if you'd like to discuss bringing your own beverages, as corkage fees may apply.",
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes, we offer gift cards that make perfect gifts for food lovers. Please contact us or visit the restaurant to purchase gift cards.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const primaryFaqs = faqs.slice(0, 8)
  const secondaryFaqs = faqs.slice(8)

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-green-700" : "bg-neutral-50")}>
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Find answers to common questions about dining at Chez Amis
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={cn("section-shell", isDark ? "bg-green-700" : "bg-neutral-50")}>
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto space-y-3.5 md:space-y-4">
            <div className="ui-card-compact p-4 md:p-5 bg-green-600/10 border-green-500/30">
              <p className="text-sm md:text-base font-body font-light text-foreground">
                Start with the most common questions below. If you still need help, use Contact Us
                and our team will respond quickly.
              </p>
            </div>
            {primaryFaqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "ui-card-compact overflow-hidden transition-all md:hover:shadow-md",
                  isDark ? "bg-green-600/40 border-green-700/50" : "bg-neutral-50 border-border/30",
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 md:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-terra-500/50 rounded-lg"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base md:text-lg font-display font-light text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-terra-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-terra-600 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-neutral-200/20">
                      <p className="text-muted-foreground font-body font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {secondaryFaqs.length > 0 && (
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowMoreQuestions((prev) => !prev)}
                  className="w-full border-2 border-terra-500/50 text-terra-400 md:hover:bg-terra-500/10 active:bg-terra-500/10 md:hover:border-terra-500 active:border-terra-500 font-body font-light"
                >
                  {showMoreQuestions ? "Hide More Questions" : "Show More Questions"}
                </Button>
              </div>
            )}
            {showMoreQuestions &&
              secondaryFaqs.map((faq, extraIndex) => {
                const index = primaryFaqs.length + extraIndex
                return (
                  <div
                    key={index}
                    className={cn(
                      "ui-card-compact overflow-hidden transition-all md:hover:shadow-md",
                      isDark ? "bg-green-600/40 border-green-700/50" : "bg-neutral-50 border-border/30",
                    )}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-5 py-4 md:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-terra-500/50 rounded-lg"
                      aria-expanded={openIndex === index}
                    >
                      <h3 className="text-base md:text-lg font-display font-light text-foreground pr-4">
                        {faq.question}
                      </h3>
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-terra-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-terra-600 flex-shrink-0" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-5">
                        <div className="pt-2 border-t border-neutral-200/20">
                          <p className="text-muted-foreground font-body font-light leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>

          {/* Contact Section */}
          <div className="max-w-3xl mx-auto mt-10 md:mt-12 ui-card-compact bg-green-600 text-white p-6 md:p-8 text-center space-y-5 border-green-500/40">
            <h2 className="text-xl md:text-2xl font-display font-light">
              Still have questions?
            </h2>
            <p className="text-white/80 font-body font-light leading-relaxed">
              Our team can help with reservations, orders, and event requests.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button className="bg-foreground text-background md:hover:bg-foreground/90 active:bg-foreground/90">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




