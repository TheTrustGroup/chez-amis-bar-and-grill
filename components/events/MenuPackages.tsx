"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MenuPackage {
  id: string
  name: string
  price: number
  description: string
  courses: {
    appetizer: string[]
    main: string[]
    dessert: string[]
  }
}

const menuPackages: MenuPackage[] = [
  {
    id: "classic",
    name: "Classic",
    price: 95,
    description: "A refined selection of our most beloved dishes",
    courses: {
      appetizer: ["Seasonal Soup", "Garden Salad", "Bruschetta Selection"],
      main: ["Grilled Chicken", "Herb-Crusted Fish", "Vegetarian Risotto"],
      dessert: ["Chocolate Mousse", "Fresh Fruit Platter"],
    },
  },
  {
    id: "premium",
    name: "Premium",
    price: 145,
    description: "Elevated flavors with premium ingredients",
    courses: {
      appetizer: ["Lobster Bisque", "Wagyu Carpaccio", "Truffle Arancini"],
      main: ["Wagyu Ribeye", "Pan-Seared Halibut", "Duck Confit"],
      dessert: ["Chocolate Soufflé", "Crème Brûlée", "Artisan Cheese Board"],
    },
  },
  {
    id: "signature",
    name: "Signature",
    price: 195,
    description: "Our chef's most celebrated creations, fully customizable",
    courses: {
      appetizer: ["Chef's Tasting Selection", "Premium Seafood Platter"],
      main: ["Wagyu Tasting", "Lobster Thermidor", "Chef's Special"],
      dessert: ["Grand Dessert Platter", "Petit Fours", "Champagne Pairing"],
    },
  },
]

export function MenuPackages() {
  return (
    <section className="section-padding bg-cream-50" aria-labelledby="menus-heading">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="menus-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground mb-4"
          >
            Sample Menus
          </h2>
          <div className="w-20 h-px bg-gold-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Three curated packages, each fully customizable to your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {menuPackages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={cn(
                "relative overflow-hidden border-0 bg-background hover:shadow-elegant transition-all duration-500 h-full flex flex-col",
                index === 1 && "border-2 border-gold-500/30"
              )}
            >
              {index === 1 && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
                  <span className="text-xs font-heading font-light tracking-wide uppercase text-gold-600">
                    Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl md:text-3xl font-display font-light text-foreground">
                  {pkg.name}
                </CardTitle>
                <p className="text-muted-foreground font-body font-light mt-2">
                  {pkg.description}
                </p>
                <div className="pt-4">
                  <p className="text-3xl font-display font-light text-gold-600">
                    GH₵ {pkg.price}
                  </p>
                  <p className="text-sm text-muted-foreground font-body font-light">
                    per person
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div>
                  <h4 className="text-sm font-heading font-light tracking-wide uppercase text-muted-foreground mb-3">
                    Appetizers
                  </h4>
                  <ul className="space-y-2">
                    {pkg.courses.appetizer.map((item, i) => (
                      <li key={i} className="text-sm text-foreground font-body font-light">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-heading font-light tracking-wide uppercase text-muted-foreground mb-3">
                    Main Courses
                  </h4>
                  <ul className="space-y-2">
                    {pkg.courses.main.map((item, i) => (
                      <li key={i} className="text-sm text-foreground font-body font-light">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-heading font-light tracking-wide uppercase text-muted-foreground mb-3">
                    Desserts
                  </h4>
                  <ul className="space-y-2">
                    {pkg.courses.dessert.map((item, i) => (
                      <li key={i} className="text-sm text-foreground font-body font-light">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/30 mt-auto">
                  <p className="text-xs text-muted-foreground font-body font-light italic">
                    Fully customizable to accommodate dietary preferences and special requests
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



