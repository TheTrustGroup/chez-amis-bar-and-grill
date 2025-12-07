"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  specialty: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Chez Amis",
    role: "Chez Amis",
    bio: "Trained in Paris under Michelin-starred chefs, Chef Kwame brings over 20 years of culinary excellence to Chez Amis. His innovative approach to combining French techniques with local Ghanaian flavors has earned him recognition as one of Accra's most celebrated chefs.",
    specialty: "Ivorian - Ghanaian fusion",
    image: "/images/team/head-chef.jpg",
  },
  {
    id: "2",
    name: "Chef Ama Osei",
    role: "Sous Chef",
    bio: "With a passion for seasonal ingredients and sustainable cooking, Chef Ama oversees our daily kitchen operations. Her meticulous attention to detail ensures every dish meets our exacting standards.",
    specialty: "Seasonal Cuisine",
    image: "/images/team/sous-chef.jpg",
  },
  {
    id: "3",
    name: "Pastry Chef Sarah Adjei",
    role: "Pastry Chef",
    bio: "A master of the sweet arts, Chef Sarah creates desserts that are both visually stunning and delightfully delicious. Her background in patisserie brings an elegant touch to our dessert menu.",
    specialty: "Artisan Pastries",
    image: "/images/team/pastry-chef.jpg",
  },
  {
    id: "4",
    name: "Kofi Asante",
    role: "Sommelier",
    bio: "Our resident wine expert, Kofi curates our extensive wine selection and creates perfect pairings for every dish. His knowledge and passion for wine enhance the dining experience for our guests.",
    specialty: "Wine Pairing",
    image: "/images/team/sommelier.jpg",
  },
  {
    id: "5",
    name: "Efua Boateng",
    role: "General Manager",
    bio: "Efua ensures that every aspect of your visit exceeds expectations. With a background in hospitality management, she orchestrates the seamless flow of service that makes Chez Amis special.",
    specialty: "Guest Experience",
    image: "/images/team/gm.jpg",
  },
]

export function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <section className="section-padding bg-background" aria-labelledby="team-heading">
      <div className="container-custom">
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="team-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Meet the Artisans Behind Your Experience
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            A team of passionate professionals dedicated to creating exceptional moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className={cn(
                "group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-500",
                "hover:shadow-elegant hover:-translate-y-2"
              )}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
                  {/* In production, use Next.js Image */}
                  {/* <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  /> */}
                  <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-xl">
                    {member.name}
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-6">
                    <p className="text-cream-100 font-body font-light text-sm leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-display font-light text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gold-600 font-heading font-light tracking-wide uppercase mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground font-body font-light">
                  {member.specialty}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedMember && (
          <>
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in"
              onClick={() => setSelectedMember(null)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elegant animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Member Image */}
                  <div className="relative w-full h-[300px] md:h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
                      {/* In production, use Next.js Image */}
                      <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-2xl">
                        {selectedMember.name}
                      </div>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div>
                      <h3 className="text-3xl font-display font-light text-foreground mb-2">
                        {selectedMember.name}
                      </h3>
                      <p className="text-lg text-gold-600 font-heading font-light tracking-wide uppercase mb-4">
                        {selectedMember.role}
                      </p>
                      <p className="text-base text-muted-foreground font-body font-light mb-4">
                        Specialty: {selectedMember.specialty}
                      </p>
                      <p className="text-base md:text-lg text-foreground font-body font-light leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}



