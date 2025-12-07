export interface Beverage {
  id: string
  name: string
  description: string
  price: number
  category: BeverageCategory
  image?: string
  servingSize?: 'Glass' | 'Bottle' | 'Pitcher' | 'Cup' | 'Can'
  abv?: number // Alcohol by volume percentage
  temperature?: 'Hot' | 'Cold' | 'Frozen' | 'Room Temperature'
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[]
  tags?: ('chef-special' | 'bestseller' | 'new' | 'house-favorite')[]
  available?: boolean
  origin?: string // For wines and spirits
  vintage?: number // For wines
  volume?: string // e.g., "750ml", "330ml"
}

export type BeverageCategory =
  | 'hot-beverages'
  | 'fresh-juices-smoothies'
  | 'soft-drinks'
  | 'beers'
  | 'wines'
  | 'cocktails'
  | 'spirits'
  | 'mocktails'
  | 'shisha'

export interface BeverageCategoryInfo {
  id: BeverageCategory
  name: string
  description?: string
  icon: string
  items: Beverage[]
}

