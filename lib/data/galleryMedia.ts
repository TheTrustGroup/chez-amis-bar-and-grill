export type MediaType = 'image' | 'video'
export type MediaCategory = 
  | 'all'
  | 'signature-dishes'
  | 'grill-specialties'
  | 'restaurant-ambiance'
  | 'behind-scenes'
  | 'events'

export interface MediaItem {
  id: string
  type: MediaType
  src: string
  thumbnail: string
  alt: string
  category: MediaCategory
  title: string
  description?: string
  dishName?: string // For menu integration
}

// Gallery media items - Populated from uploaded images
export const galleryMedia: MediaItem[] = [
  // Signature Attieke Dishes
  {
    id: 'attieke-tilapia-001',
    type: 'image',
    src: '/media/images/dishes/attieke/attieke-grilled-tilapia-001.jpg',
    thumbnail: '/media/images/dishes/attieke/attieke-grilled-tilapia-001-thumb.jpg',
    alt: 'Signature Attieke with Grilled Tilapia - Traditional Ivorian couscous with perfectly grilled whole tilapia',
    category: 'signature-dishes',
    title: 'Attieke with Grilled Tilapia',
    description: 'Our signature dish - fermented cassava couscous with perfectly grilled whole tilapia, house-made pepper sauce, and fresh tomato salsa',
    dishName: 'Attieke with Grilled Tilapia',
  },
  {
    id: 'attieke-fish-platter-001',
    type: 'image',
    src: '/media/images/dishes/attieke/attieke-fish-platter-001.jpg',
    thumbnail: '/media/images/dishes/attieke/attieke-fish-platter-001-thumb.jpg',
    alt: 'Attieke with fried fish platter - Traditional meal with whole fried fish and accompaniments',
    category: 'signature-dishes',
    title: 'Attieke with Fried Fish Platter',
    description: 'Traditional Attieke served with crispy whole fried fish, hard-boiled eggs, and fresh condiments',
    dishName: 'Attieke with Fried Fish',
  },
  {
    id: 'acheke-promo-001',
    type: 'image',
    src: '/media/images/dishes/attieke/acheke-promo-001.jpg',
    thumbnail: '/media/images/dishes/attieke/acheke-promo-001-thumb.jpg',
    alt: 'Acheke promotional image - Signature dish with fried fish, plantains, and fresh salad',
    category: 'signature-dishes',
    title: 'Acheke - Our Signature Dish',
    description: 'Experience our famous Acheke with perfectly grilled fish, fried plantains, and fresh vegetables',
    dishName: 'Acheke',
  },
  
  // Grill Specialties
  {
    id: 'grilled-fish-001',
    type: 'image',
    src: '/media/images/dishes/grill/grilled-fish-001.jpg',
    thumbnail: '/media/images/dishes/grill/grilled-fish-001-thumb.jpg',
    alt: 'Grilled whole fish with traditional accompaniments',
    category: 'grill-specialties',
    title: 'Grilled Whole Fish',
    description: 'Perfectly grilled whole fish with traditional West African spices, served with fresh vegetables and condiments',
    dishName: 'Grilled Whole Fish',
  },
  {
    id: 'mixed-grill-001',
    type: 'image',
    src: '/media/images/dishes/grill/mixed-grill-001.jpg',
    thumbnail: '/media/images/dishes/grill/mixed-grill-001-thumb.jpg',
    alt: 'Mixed grill platter with grilled meat, plantains, and couscous',
    category: 'grill-specialties',
    title: 'Mixed Grill Platter',
    description: 'A hearty combination of grilled meat chops, fried plantains, and light couscous with fresh vegetable salsa',
    dishName: 'Mixed Grill',
  },
  {
    id: 'grilled-fish-board-001',
    type: 'image',
    src: '/media/images/dishes/grill/grilled-fish-board-001.jpg',
    thumbnail: '/media/images/dishes/grill/grilled-fish-board-001-thumb.jpg',
    alt: 'Grilled fish on wooden board with fresh accompaniments',
    category: 'grill-specialties',
    title: 'Grilled Fish Special',
    description: 'Two large grilled fish pieces with green herb marinade, served with fresh onions, peppers, and couscous',
    dishName: 'Grilled Fish Special',
  },
  
  // Restaurant Ambiance
  {
    id: 'takeaway-packaging-001',
    type: 'image',
    src: '/media/images/restaurant/ambiance/takeaway-packaging-001.jpg',
    thumbnail: '/media/images/restaurant/ambiance/takeaway-packaging-001-thumb.jpg',
    alt: 'Professional takeaway packaging with Chez Amis branding',
    category: 'restaurant-ambiance',
    title: 'Professional Takeaway Service',
    description: 'Our meals are carefully packaged for takeaway and delivery, maintaining quality and presentation',
  },
  
  // Events & Promotions
  {
    id: 'promo-acheke-001',
    type: 'image',
    src: '/media/images/events/promo-acheke-001.jpg',
    thumbnail: '/media/images/events/promo-acheke-001-thumb.jpg',
    alt: 'Acheke promotional advertisement with delivery information',
    category: 'events',
    title: 'Acheke Promotion',
    description: 'Special promotion featuring our signature Acheke dish - "Obiaa wor ne taste! But go and taste Acheke from Chez Amis and see!"',
  },
  {
    id: 'promo-general-001',
    type: 'image',
    src: '/media/images/events/promo-general-001.jpg',
    thumbnail: '/media/images/events/promo-general-001-thumb.jpg',
    alt: 'General restaurant promotion with food images',
    category: 'events',
    title: 'A Good Meal is a Good Deal',
    description: 'Experience the best of West African cuisine at Chez Amis Bar and Grill',
  },
]

// Gallery categories
export const galleryCategories = [
  { id: 'all' as MediaCategory, label: 'All' },
  { id: 'signature-dishes' as MediaCategory, label: 'Signature Dishes' },
  { id: 'grill-specialties' as MediaCategory, label: 'Grill Specialties' },
  { id: 'restaurant-ambiance' as MediaCategory, label: 'Restaurant Ambiance' },
  { id: 'behind-scenes' as MediaCategory, label: 'Behind the Scenes' },
  { id: 'events' as MediaCategory, label: 'Events & Promotions' },
]

// Featured media for home page
export const featuredMedia = [
  {
    type: 'image' as MediaType,
    src: '/media/images/dishes/attieke/attieke-grilled-tilapia-001.jpg',
    alt: 'Signature Attieke with Grilled Tilapia',
  },
  {
    type: 'image' as MediaType,
    src: '/media/images/dishes/grill/mixed-grill-001.jpg',
    alt: 'Mixed Grill Platter',
  },
  {
    type: 'image' as MediaType,
    src: '/media/images/dishes/grill/grilled-fish-001.jpg',
    alt: 'Grilled Whole Fish',
  },
  {
    type: 'image' as MediaType,
    src: '/media/images/restaurant/ambiance/takeaway-packaging-001.jpg',
    alt: 'Professional Takeaway Service',
  },
]

// Social media posts (Instagram-style)
export const instagramPosts = [
  { id: 1, src: '/media/images/social/post-1.jpg', alt: 'Instagram post 1' },
  { id: 2, src: '/media/images/social/post-2.jpg', alt: 'Instagram post 2' },
  { id: 3, src: '/media/images/social/post-3.jpg', alt: 'Instagram post 3' },
  { id: 4, src: '/media/images/social/post-4.jpg', alt: 'Instagram post 4' },
  { id: 5, src: '/media/images/social/post-5.jpg', alt: 'Instagram post 5' },
  { id: 6, src: '/media/images/social/post-6.jpg', alt: 'Instagram post 6' },
]

