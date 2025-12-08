import { HeroSection } from "@/components/sections/HeroSection"
import { IntroSection } from "@/components/sections/IntroSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { SignatureCreations } from "@/components/sections/SignatureCreations"
import { PrivateEventsSection } from "@/components/sections/PrivateEventsSection"
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel"
import { VisitUsSection } from "@/components/sections/VisitUsSection"
import { FeaturedGallerySection } from "@/components/sections/FeaturedGallerySection"
import { Metadata } from "next"
import { StructuredData } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Chez Amis Restaurant",
  description: "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, reservations, and private events. Open daily 9:30 AM - 12 AM at 40 Boundary Rd, Accra.",
  keywords: [
    "Chez Amis",
    "restaurant Accra",
    "fine dining Accra",
    "Attieke Accra",
    "Ivorian restaurant Ghana",
    "Ghanaian restaurant",
    "West African cuisine",
    "premium dining Accra",
    "restaurant reservations Accra",
    "private dining Accra",
    "catering Accra",
    "Bar and Grill Accra",
    "East Legon restaurant",
    "Boundary Road restaurant",
    "best restaurant Accra",
    "gourmet food Ghana",
    "culinary experience Accra"
  ],
  openGraph: {
    title: "Chez Amis Restaurant",
    description: "Experience exceptional culinary artistry and warm hospitality. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, and private events.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://chezamis.com",
    siteName: "Chez Amis Restaurant",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chez Amis Bar and Grill - Premium Dining Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chez Amis Restaurant",
    description: "Experience exceptional culinary artistry and warm hospitality. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://chezamis.com",
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex flex-col">
        <HeroSection />
        <IntroSection />
        <ExperienceSection />
        <SignatureCreations />
        <FeaturedGallerySection />
        <PrivateEventsSection />
        <TestimonialsCarousel />
        <VisitUsSection />
      </div>
    </>
  )
}
