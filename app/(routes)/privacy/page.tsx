"use client"

import { PHONE_LINES, SITE_ADDRESS_LINES, SITE_EMAIL } from "@/lib/data/siteContact"
import { PageIntro } from "@/components/layout/PageIntro"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-green-700 transition-colors">
      <PageIntro title="Privacy Policy" description="Your privacy is important to us.">
        <p className="text-xs md:text-sm font-body text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </PageIntro>

      {/* Main Content */}
      <section className="section-shell">
        <div className="section-shell-inner">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert ui-card-compact bg-neutral-50 dark:bg-green-600/40 dark:border-green-700/50 p-6 md:p-8 space-y-6">
              <div className="space-y-5 text-muted-foreground font-body font-light leading-relaxed">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Introduction
                  </h2>
                  <p>
                    At Chez Amis Bar and Grill (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make reservations, place orders, or interact with our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Information We Collect
                  </h2>
                  <p className="mb-4">We may collect information about you in various ways:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when making reservations, placing orders, or contacting us.
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Payment details processed securely through our payment providers. We do not store full credit card information on our servers.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.
                    </li>
                    <li>
                      <strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience and analyze website traffic.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and manage your reservations and orders</li>
                    <li>Communicate with you about your reservations, orders, and inquiries</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our website, services, and customer experience</li>
                    <li>Comply with legal obligations and protect our rights</li>
                    <li>Analyze website usage and trends</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Information Sharing and Disclosure
                  </h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                    <li>When required by law or to protect our rights and safety</li>
                    <li>In connection with a business transfer or merger</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Data Security
                  </h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Your Rights
                  </h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Request correction of inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your information</li>
                    <li>Withdraw consent for marketing communications at any time</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Cookies
                  </h2>
                  <p>
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings, but disabling cookies may affect website functionality.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Third-Party Links
                  </h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Children&apos;s Privacy
                  </h2>
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Changes to This Privacy Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-white mb-3">
                    Contact Us
                  </h2>
                  <p className="mb-4">
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  <div className="ui-card-compact bg-green-600/5 p-6 space-y-2 text-foreground">
                    <p><strong>Chez Amis Bar and Grill</strong></p>
                    <p>{SITE_ADDRESS_LINES.join(", ")}</p>
                    <p>
                      Email:{" "}
                      <a href={`mailto:${SITE_EMAIL}`} className="text-terra-600 md:hover:text-terra-700 underline">
                        {SITE_EMAIL}
                      </a>
                    </p>
                    <p>
                      Phone:{" "}
                      {PHONE_LINES.map((line, index) => (
                        <span key={line.id}>
                          {index > 0 ? " / " : ""}
                          <a href={`tel:${line.tel}`} className="text-terra-600 md:hover:text-terra-700 underline">
                            {line.display}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




