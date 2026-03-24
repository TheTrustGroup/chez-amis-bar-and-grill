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
  dishName?: string
  fallbackType?: 'dish' | 'video' | 'restaurant'
}

/**
 * Paths use hyphenated lowercase filenames under public/media/
 * (see public/media/videos and public/media/images).
 */
export const galleryMedia: MediaItem[] = [
  {
    id: 'video-behind-scenes-1',
    type: 'video',
    src: '/media/videos/filtered-b59b103f-f34d-4b58-a62d-c66524ad5ace.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Chef preparing signature dishes at Chez Amis',
    category: 'behind-scenes',
    title: 'Behind the Scenes: Kitchen Excellence',
    description:
      'Watch our talented chefs craft our signature dishes with passion and precision',
    fallbackType: 'video',
  },
  {
    id: 'video-cooking-1',
    type: 'video',
    src: '/media/videos/filtered-a59206d7-3709-4278-9712-9f5b1f6dc8bf.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Culinary artistry in action',
    category: 'behind-scenes',
    title: 'Culinary Artistry',
    description: 'Experience the skill and dedication that goes into every dish',
  },
  {
    id: 'video-ambiance-1',
    type: 'video',
    src: '/media/videos/ce5847ce-3349-4c26-8792-c56bfa29fda.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Experience the ambiance of Chez Amis',
    category: 'behind-scenes',
    title: 'Restaurant Ambiance',
    description: 'Immerse yourself in the warm and inviting atmosphere of Chez Amis',
  },
  {
    id: 'video-experience-1',
    type: 'video',
    src: '/media/videos/img-6983.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'A taste of what awaits at Chez Amis',
    category: 'behind-scenes',
    title: 'A Taste of Excellence',
    description: 'Discover the exceptional dining experience that awaits you',
  },
  {
    id: 'video-additional-1',
    type: 'video',
    src: '/media/videos/img-0025.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Additional restaurant content',
    category: 'behind-scenes',
    title: 'More from Chez Amis',
    description: 'Additional behind-the-scenes content from our kitchen',
  },
  {
    id: 'video-new-1',
    type: 'video',
    src: '/media/videos/12-09-2025-00-43-33-1.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Signature dish showcase at Chez Amis',
    category: 'signature-dishes',
    title: 'Signature Dish Showcase',
    description: 'Experience our signature dishes prepared with passion and precision',
  },
  {
    id: 'video-new-2',
    type: 'video',
    src: '/media/videos/12-09-2025-00-44-04-1.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Grill specialties preparation at Chez Amis',
    category: 'grill-specialties',
    title: 'Grill Mastery',
    description: 'Watch our grill masters create perfection with every dish',
  },
  {
    id: 'video-new-3',
    type: 'video',
    src: '/media/videos/12-09-2025-00-46-49-1.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Restaurant ambiance and dining atmosphere',
    category: 'behind-scenes',
    title: 'Warm Ambiance',
    description: 'Immerse yourself in our warm and inviting dining atmosphere',
  },
  {
    id: 'video-new-4',
    type: 'video',
    src: '/media/videos/12-09-2025-00-46-49-1-2.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Behind the scenes kitchen action',
    category: 'behind-scenes',
    title: 'Kitchen in Action',
    description: 'A glimpse into our bustling kitchen where magic happens',
  },
  {
    id: 'video-new-5',
    type: 'video',
    src: '/media/videos/12-09-2025-00-46-49-1-3.mp4',
    thumbnail: '/images/placeholders/video-placeholder.svg',
    alt: 'Special event celebration at Chez Amis',
    category: 'events',
    title: 'Special Celebrations',
    description: 'Celebrating special moments and creating unforgettable memories',
  },

  {
    id: 'image-0821',
    type: 'image',
    src: '/media/images/img-0821-2.jpg',
    thumbnail: '/media/images/img-0821-2.jpg',
    alt: 'Signature dish presentation at Chez Amis',
    category: 'signature-dishes',
    title: 'Signature Dish',
    description:
      'Our expertly crafted signature dish, prepared with passion and attention to detail',
  },
  {
    id: 'image-0822',
    type: 'image',
    src: '/media/images/img-0822-2.jpg',
    thumbnail: '/media/images/img-0822-2.jpg',
    alt: 'Chef special preparation',
    category: 'signature-dishes',
    title: 'Chef Special',
    description: 'A special creation from our kitchen, showcasing our culinary expertise',
  },
  {
    id: 'image-6740',
    type: 'image',
    src: '/media/images/img-6740.jpg',
    thumbnail: '/media/images/img-6740.jpg',
    alt: 'Restaurant ambiance and dining experience',
    category: 'behind-scenes',
    title: 'Dining Experience',
    description: 'Experience the warm and inviting atmosphere of Chez Amis',
  },
  {
    id: 'image-7189',
    type: 'image',
    src: '/media/images/img-7189.jpg',
    thumbnail: '/media/images/img-7189.jpg',
    alt: 'Signature dish presentation',
    category: 'signature-dishes',
    title: 'Culinary Excellence',
    description: 'A beautifully presented dish showcasing our commitment to excellence',
  },
  {
    id: 'image-8021',
    type: 'image',
    src: '/media/images/img-8021.jpg',
    thumbnail: '/media/images/img-8021.jpg',
    alt: 'Grilled dish specialty',
    category: 'grill-specialties',
    title: 'Grill Masterpiece',
    description: 'A masterpiece from our grill, cooked to perfection',
  },
  {
    id: 'image-8209',
    type: 'image',
    src: '/media/images/img-8209.jpg',
    thumbnail: '/media/images/img-8209.jpg',
    alt: 'The Culinary Artist behind our exquisite dishes',
    category: 'behind-scenes',
    title: 'The Culinary Artist',
    description:
      'The mastermind behind every delightful creation, crafting culinary excellence with passion and precision',
  },
]

export const galleryCategories = [
  { id: 'all' as MediaCategory, label: 'All' },
  { id: 'signature-dishes' as MediaCategory, label: 'Signature Dishes' },
  { id: 'grill-specialties' as MediaCategory, label: 'Grill Specialties' },
  { id: 'restaurant-ambiance' as MediaCategory, label: 'Restaurant Ambiance' },
  { id: 'behind-scenes' as MediaCategory, label: 'Behind the Scenes' },
  { id: 'events' as MediaCategory, label: 'Events & Promotions' },
]

export interface FeaturedMediaItem {
  id: string
  type: MediaType
  src: string
  poster?: string
  alt: string
  title?: string
}

export const featuredMedia: FeaturedMediaItem[] = [
  {
    id: 'video-1',
    type: 'video',
    src: '/media/videos/filtered-b59b103f-f34d-4b58-a62d-c66524ad5ace.mp4',
    poster: '/images/placeholders/video-placeholder.svg',
    alt: 'Chef preparing signature dishes at Chez Amis',
    title: 'Behind the Scenes',
  },
  {
    id: 'image-7189',
    type: 'image',
    src: '/media/images/img-7189.jpg',
    alt: 'Culinary excellence at Chez Amis',
    title: 'Culinary Excellence',
  },
  {
    id: 'video-2',
    type: 'video',
    src: '/media/videos/filtered-a59206d7-3709-4278-9712-9f5b1f6dc8bf.mp4',
    poster: '/images/placeholders/video-placeholder.svg',
    alt: 'Culinary artistry in action',
    title: 'Culinary Artistry',
  },
  {
    id: 'image-8021',
    type: 'image',
    src: '/media/images/img-8021.jpg',
    alt: 'Grilled specialty dish',
    title: 'From the Grill',
  },
]

export const instagramPosts = [
  { id: 1, src: '/media/images/img-0821-2.jpg', alt: 'Instagram post 1' },
  { id: 2, src: '/media/images/img-0822-2.jpg', alt: 'Instagram post 2' },
  { id: 3, src: '/media/images/img-6740.jpg', alt: 'Instagram post 3' },
  { id: 4, src: '/media/images/img-7189.jpg', alt: 'Instagram post 4' },
  { id: 5, src: '/media/images/img-8021.jpg', alt: 'Instagram post 5' },
  { id: 6, src: '/media/images/img-8209.jpg', alt: 'Instagram post 6' },
]
