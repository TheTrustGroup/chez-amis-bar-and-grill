/**
 * Central Menu Type Definitions
 * Consolidated types for menu items and categories
 */

export type DietaryTag = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'

export type MenuTag = 
  | 'signature'
  | 'chef-special'
  | 'bestseller'
  | 'new'
  | 'house-favorite'

export type MenuCategoryType = 
  | 'appetizers'
  | 'soups-salads'
  | 'from-the-grill'
  | 'main-course-entrees'
  | 'seafood-selections'
  | 'pasta-rice-dishes'
  | 'sides-accompaniments'
  | 'desserts'
  | 'cold-beverages'
  | 'hot-beverages'
  | 'alcoholic-beverages'
  | 'mocktails'
  | 'shisha'

export interface MenuItem {
  id: string
  name: string
  description: string
  price?: number // Optional if portionSizes is used
  category: string
  image?: string
  dietary?: DietaryTag[]
  spicyLevel?: 0 | 1 | 2 | 3 // 0 = not spicy, 3 = very spicy
  tags?: MenuTag[]
  available?: boolean
  portionSizes?: {
    size: string
    price: number
  }[]
  pairingSuggestion?: string
  preparationTime?: string // e.g., "15-20 minutes"
}

export interface MenuCategoryGroup {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

