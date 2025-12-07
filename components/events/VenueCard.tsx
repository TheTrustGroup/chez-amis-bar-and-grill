"use client"

import { Users, Wine, Sun, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface Venue {
  id: string
  name: string
  capacity: string
  features: string[]
  idealFor: string[]
  minimum: number
  icon: typeof Users
  image: string
}

const venues: Venue[] = [
  {
    id: "wine-room",
    name: "The Wine Room",
    capacity: "10-16 guests",
    features: ["Climate-controlled wine cellar", "Intimate lighting", "Private sommelier service"],
    idealFor: ["Business dinners", "Intimate celebrations", "Wine tastings"],
    minimum: 2000,
    icon: Wine,
    image: "/images/venues/wine-room.jpg",
  },
  {
    id: "garden-terrace",
    name: "The Garden Terrace",
    capacity: "20-40 guests",
    features: ["Outdoor setting", "String lights", "Lush greenery", "Weather protection"],
    idealFor: ["Cocktail receptions", "Brunch gatherings", "Al fresco dining"],
    minimum: 3500,
    icon: Sun,
    image: "/images/venues/garden-terrace.jpg",
  },
  {
    id: "grand-hall",
    name: "The Grand Hall",
    capacity: "50-100 guests",
    features: ["Full venue buyout", "Custom setup", "Dance floor", "Stage area"],
    idealFor: ["Weddings", "Corporate events", "Galas", "Large celebrations"],
    minimum: 8000,
    icon: Building2,
    image: "/images/venues/grand-hall.jpg",
  },
]

export function VenueCard({ venue }: { venue: Venue }) {
  const Icon = venue.icon
  return (
    <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500 h-full">
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900">
          {/* In production, use Next.js Image */}
          {/* <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          /> */}
          <div className="absolute inset-0 flex items-center justify-center text-cream-200/30 font-display text-2xl">
            {venue.name}
          </div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 p-3 rounded-lg bg-background/80 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-gold-600" />
        </div>
      </div>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-light text-foreground mb-2">
            {venue.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground font-body font-light">
            <Users className="h-4 w-4" />
            <span>{venue.capacity}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-heading font-light tracking-wide uppercase text-muted-foreground mb-3">
            Features
          </h4>
          <ul className="space-y-2">
            {venue.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground font-body font-light">
                <span className="text-gold-600 mt-1.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-heading font-light tracking-wide uppercase text-muted-foreground mb-3">
            Ideal For
          </h4>
          <div className="flex flex-wrap gap-2">
            {venue.idealFor.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-body font-light bg-cream-50 border border-border/30 text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground font-body font-light mb-2">
            Minimum spend
          </p>
          <p className="text-2xl font-display font-light text-gold-600">
            GH₵ {venue.minimum.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function VenueGrid() {
  return (
    <section className="section-padding bg-background" aria-labelledby="venues-heading">
      <div className="container-custom">
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="venues-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Venue Spaces
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Each space thoughtfully designed for different occasions and group sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { venues }



