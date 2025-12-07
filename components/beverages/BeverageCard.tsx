"use client"

import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { Coffee, Droplets, Beer, Wine, GlassWater, Sparkles, ThermometerSun, Snowflake } from "lucide-react"
import { Beverage } from "@/lib/types/beverage"
import { useOrder } from "@/lib/hooks/useOrder"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BeverageCardProps {
  beverage: Beverage
}

const categoryIcons: Record<string, React.ReactNode> = {
  'hot-beverages': <Coffee className="w-5 h-5" />,
  'fresh-juices-smoothies': <Droplets className="w-5 h-5" />,
  'soft-drinks': <Sparkles className="w-5 h-5" />,
  'beers': <Beer className="w-5 h-5" />,
  'wines': <Wine className="w-5 h-5" />,
  'cocktails': <GlassWater className="w-5 h-5" />,
  'spirits': <Wine className="w-5 h-5" />,
  'mocktails': <GlassWater className="w-5 h-5" />,
  'shisha': <Sparkles className="w-5 h-5" />,
}

const temperatureIcons: Record<string, React.ReactNode> = {
  'Hot': <ThermometerSun className="w-4 h-4 text-red-500" />,
  'Cold': <Snowflake className="w-4 h-4 text-blue-500" />,
  'Frozen': <Snowflake className="w-4 h-4 text-cyan-500" />,
  'Room Temperature': <ThermometerSun className="w-4 h-4 text-gray-500" />,
}

export function BeverageCard({ beverage }: BeverageCardProps) {
  const { handleAddToOrder } = useOrder()

  const handleAddToOrderClick = () => {
    // Convert Beverage to cart format
    const cartItem: any = {
      id: beverage.id,
      name: beverage.name,
      description: beverage.description,
      price: beverage.price,
      category: beverage.category,
      image: beverage.image || "/images/beverages/placeholder.jpg",
      tags: beverage.tags || [],
      available: beverage.available !== false,
      popular: false,
    }

    handleAddToOrder(cartItem, 1)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
      {/* Header with Icon and Price */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-amber-600 group-hover:text-amber-700 transition-colors">
            {categoryIcons[beverage.category] || <GlassWater className="w-5 h-5" />}
          </div>
          <h4 className="text-lg font-serif text-gray-900">{beverage.name}</h4>
        </div>
        <span className="text-lg font-medium text-amber-700">
          GH₵ {beverage.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 font-light leading-relaxed">
        {beverage.description}
      </p>

      {/* Image for alcoholic beverages */}
      {beverage.category === 'beers' || beverage.category === 'wines' || beverage.category === 'spirits' ? (
        <div className="relative w-full h-32 mb-4 rounded overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={beverage.image}
            alt={beverage.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fallbackSrc="/images/beverages/placeholder-bottle.jpg"
          />
        </div>
      ) : null}

      {/* Badges */}
      {beverage.tags && beverage.tags.length > 0 && (
        <div className="flex gap-2 mb-4">
          {beverage.tags.includes('chef-special') && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
              Chef&apos;s Special
            </span>
          )}
          {beverage.tags.includes('new') && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
          {beverage.tags.includes('bestseller') && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>
      )}

      {/* Details Row */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
        {beverage.servingSize && (
          <span className="flex items-center gap-1">
            <span className="font-medium">Size:</span>
            {beverage.servingSize}
          </span>
        )}
        {beverage.abv && (
          <span className="flex items-center gap-1">
            <span className="font-medium">ABV:</span>
            {beverage.abv}%
          </span>
        )}
        {beverage.temperature && (
          <span className="flex items-center gap-1">
            {temperatureIcons[beverage.temperature]}
            {beverage.temperature}
          </span>
        )}
        {beverage.volume && (
          <span className="flex items-center gap-1">
            <span className="font-medium">Vol:</span>
            {beverage.volume}
          </span>
        )}
      </div>

      {/* Additional Info */}
      {(beverage.origin || beverage.vintage) && (
        <div className="text-xs text-gray-500 mb-4">
          {beverage.origin && <span className="block">Origin: {beverage.origin}</span>}
          {beverage.vintage && <span className="block">Vintage: {beverage.vintage}</span>}
        </div>
      )}

      {/* Dietary Icons */}
      {beverage.dietary && beverage.dietary.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          {beverage.dietary.includes('vegetarian') && (
            <span className="text-green-600" title="Vegetarian">🌱</span>
          )}
          {beverage.dietary.includes('vegan') && (
            <span className="text-green-600" title="Vegan">🌿</span>
          )}
          {beverage.dietary.includes('gluten-free') && (
            <span className="text-amber-600" title="Gluten-Free">🌾</span>
          )}
          {beverage.dietary.includes('dairy-free') && (
            <span className="text-blue-600" title="Dairy-Free">🥛</span>
          )}
        </div>
      )}

      {/* Add to Order Button */}
      <Button
        onClick={handleAddToOrderClick}
        disabled={beverage.available === false}
        className={cn(
          "w-full mt-4 border-2 rounded-md transition-all duration-200",
          beverage.available !== false
            ? "border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        )}
      >
        {beverage.available !== false ? "Add to Order" : "Currently Unavailable"}
      </Button>
    </div>
  )
}

