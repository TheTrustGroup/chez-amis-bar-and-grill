"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Metadata } from "next"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open daily from 9:30 AM to 12:00 AM (midnight). We welcome guests for lunch, dinner, and late-night dining.",
    },
    {
      question: "Do you take reservations?",
      answer: "Yes, we accept reservations. You can make a reservation online through our reservations page, call us at +233 055 703 2312, +233 055 703 2335, +233 024 395 2339, or +233 050 243 2037, or visit us in person. We also welcome walk-ins.",
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
      answer: "Yes, we provide catering services for events, corporate functions, and special occasions. We can customize menus to suit your needs. Minimum order is for 10 guests, and we recommend 48 hours advance notice. Contact us at chez@chezamisrestaurant.com or call us for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, mobile money, and card payments. For online orders, we accept mobile money and card payments.",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-cream-200/80">
              Find answers to common questions about dining at Chez Amis
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-cream-50 rounded-lg border border-charcoal-200/20 overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-gold-500/50 rounded-lg"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg md:text-xl font-display font-light text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gold-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold-600 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-charcoal-200/20">
                      <p className="text-muted-foreground font-body font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="max-w-3xl mx-auto mt-12 bg-charcoal-900 text-cream-100 rounded-lg p-8 md:p-12 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-light">
              Still have questions?
            </h2>
            <p className="text-cream-200/80 font-body font-light leading-relaxed">
              We&apos;re here to help! Contact us and we&apos;ll be happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 font-heading font-light"
                >
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+233557032312">
                <Button
                  variant="outline"
                  className="border-2 border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 font-heading font-light"
                >
                  Call Us
                </Button>
              </a>
            </div>
          </div>

          {/* Back Button */}
          <div className="max-w-3xl mx-auto mt-12">
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
      </section>
    </div>
  )
}




