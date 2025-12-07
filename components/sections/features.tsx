import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ChefHat, Heart, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Locally sourced, farm-fresh ingredients in every dish",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description: "Culinary masters with decades of combined experience",
  },
  {
    icon: Heart,
    title: "Cozy Atmosphere",
    description: "Warm, inviting ambiance perfect for any occasion",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep",
  },
]

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-muted/50" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
          >
            Why Choose Chez Amis
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative overflow-hidden transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-2",
                  "border-0 bg-card"
                )}
              >
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    {/* Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
                      <div className="relative bg-primary/5 rounded-full p-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

