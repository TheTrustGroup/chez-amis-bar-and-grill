import { HeroSection } from "@/components/sections/HeroSection"
import { IntroSection } from "@/components/sections/IntroSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { SignatureCreations } from "@/components/sections/SignatureCreations"
import { PrivateEventsSection } from "@/components/sections/PrivateEventsSection"
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel"
import { VisitUsSection } from "@/components/sections/VisitUsSection"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroSection />
      <ExperienceSection />
      <SignatureCreations />
      <PrivateEventsSection />
      <TestimonialsCarousel />
      <VisitUsSection />
    </div>
  )
}

