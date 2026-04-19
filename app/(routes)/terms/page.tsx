"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      {/* Hero Section */}
      <section className="section-shell bg-gradient-to-b from-green-600 via-green-700 to-green-600 text-white">
        <div className="section-shell-inner">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="nav-page-heading md:text-5xl tracking-tight">
              Terms of Service
            </h1>
            <p className="nav-page-subheading text-white/85 md:text-lg">
              Please read these terms carefully
            </p>
            <p className="text-sm font-body font-light text-white/60">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert ui-card-compact bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 p-8 md:p-10 space-y-8">
              <div className="space-y-6 text-muted-foreground font-body font-light leading-relaxed">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Agreement to Terms
                  </h2>
                  <p>
                    By accessing or using the Chez Amis Bar and Grill website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Use of Our Services
                  </h2>
                  <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use our services in any way that violates applicable laws or regulations</li>
                    <li>Interfere with or disrupt the operation of our website or services</li>
                    <li>Attempt to gain unauthorized access to any part of our website or systems</li>
                    <li>Use automated systems to access our website without permission</li>
                    <li>Transmit any viruses, malware, or harmful code</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Reservations
                  </h2>
                  <p className="mb-4">When making a reservation through our website:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reservations are subject to availability and confirmation</li>
                    <li>We reserve the right to cancel or modify reservations at our discretion</li>
                    <li>Reservations are held for 15 minutes past the reserved time</li>
                    <li>We require 24 hours notice for cancellations or modifications</li>
                    <li>For groups of 8 or more, a deposit may be required</li>
                    <li>We reserve the right to refuse service to anyone</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Orders and Payments
                  </h2>
                  <p className="mb-4">When placing orders through our website:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are in Ghana Cedis (GH₵) and are subject to change without notice</li>
                    <li>We accept cash, mobile money, and card payments</li>
                    <li>Payment must be completed before order confirmation</li>
                    <li>We reserve the right to refuse or cancel orders at our discretion</li>
                    <li>Delivery times are estimates and not guaranteed</li>
                    <li>Refunds are subject to our refund policy</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Intellectual Property
                  </h2>
                  <p>
                    All content on our website, including text, graphics, logos, images, and software, is the property of Chez Amis Bar and Grill or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our written permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Disclaimers
                  </h2>
                  <p className="mb-4">
                    Our website and services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>That the website will be uninterrupted or error-free</li>
                    <li>That defects will be corrected</li>
                    <li>That the website is free of viruses or other harmful components</li>
                    <li>The accuracy, completeness, or reliability of any information on the website</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Limitation of Liability
                  </h2>
                  <p>
                    To the maximum extent permitted by law, Chez Amis Bar and Grill shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Indemnification
                  </h2>
                  <p>
                    You agree to indemnify and hold harmless Chez Amis Bar and Grill, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of our services or violation of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Modifications to Terms
                  </h2>
                  <p>
                    We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Governing Law
                  </h2>
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white mb-4">
                    Contact Information
                  </h2>
                  <p className="mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="ui-card-compact bg-green-600/5 p-6 space-y-2 text-foreground">
                    <p><strong>Chez Amis Bar and Grill</strong></p>
                    <p>40 Boundary Rd, Accra, Ghana</p>
                    <p>
                      Email: <a href="mailto:chez@chezamisrestaurant.com" className="text-terra-600 md:hover:text-terra-700 underline">chez@chezamisrestaurant.com</a>
                    </p>
                    <p>
                      Phone: <a href="tel:+233557032312" className="text-terra-600 md:hover:text-terra-700 underline">055 703 2312</a> / <a href="tel:+233557032335" className="text-terra-600 md:hover:text-terra-700 underline">055 703 2335</a> / <a href="tel:+233243952339" className="text-terra-600 md:hover:text-terra-700 underline">024 395 2339</a> / <a href="tel:+233502432037" className="text-terra-600 md:hover:text-terra-700 underline">050 243 2037</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
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




