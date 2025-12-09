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

// Gallery media items - Videos and uploaded images
export const galleryMedia: MediaItem[] = [
  // Videos - Behind the Scenes
  {
    id: 'video-behind-scenes-1',
    type: 'video',
    src: '/media/videos/filtered-B59B103F-F34D-4B58-A62D-C66524AD5ACE.MP4',
    thumbnail: '/media/videos/filtered-B59B103F-F34D-4B58-A62D-C66524AD5ACE.MP4', // Video will use first frame
    alt: 'Chef preparing signature dishes at Chez Amis',
    category: 'behind-scenes',
    title: 'Behind the Scenes: Kitchen Excellence',
    description: 'Watch our talented chefs craft our signature dishes with passion and precision',
  },
  {
    id: 'video-cooking-1',
    type: 'video',
    src: '/media/videos/filtered-A59206D7-3709-4278-9712-9F5B1F6DC8BF.MP4',
    thumbnail: '/media/videos/filtered-A59206D7-3709-4278-9712-9F5B1F6DC8BF.MP4',
    alt: 'Culinary artistry in action',
    category: 'behind-scenes',
    title: 'Culinary Artistry',
    description: 'Experience the skill and dedication that goes into every dish',
  },
  {
    id: 'video-ambiance-1',
    type: 'video',
    src: '/media/videos/CE5847CE-3349-4C26-8792-C56BFAF29FDA.MP4',
    thumbnail: '/media/videos/CE5847CE-3349-4C26-8792-C56BFAF29FDA.MP4',
    alt: 'Experience the ambiance of Chez Amis',
    category: 'restaurant-ambiance',
    title: 'Restaurant Ambiance',
    description: 'Immerse yourself in the warm and inviting atmosphere of Chez Amis',
  },
  {
    id: 'video-experience-1',
    type: 'video',
    src: '/media/videos/IMG_6983.MOV',
    thumbnail: '/media/videos/IMG_6983.MOV',
    alt: 'A taste of what awaits at Chez Amis',
    category: 'restaurant-ambiance',
    title: 'A Taste of Excellence',
    description: 'Discover the exceptional dining experience that awaits you',
  },
  {
    id: 'video-additional-1',
    type: 'video',
    src: '/media/videos/IMG_0025.MOV',
    thumbnail: '/media/videos/IMG_0025.MOV',
    alt: 'Additional restaurant content',
    category: 'behind-scenes',
    title: 'More from Chez Amis',
    description: 'Additional behind-the-scenes content from our kitchen',
  },
  
  // Uploaded Images - Signature Dishes
  {
    id: 'image-0821',
    type: 'image',
    src: '/media/images/IMG_0821%202.JPG',
    thumbnail: '/media/images/IMG_0821%202.JPG',
    alt: 'Signature dish presentation at Chez Amis',
    category: 'signature-dishes',
    title: 'Signature Dish',
    description: 'Our expertly crafted signature dish, prepared with passion and attention to detail',
  },
  {
    id: 'image-0822',
    type: 'image',
    src: '/media/images/IMG_0822%202.JPG',
    thumbnail: '/media/images/IMG_0822%202.JPG',
    alt: 'Chef special preparation',
    category: 'signature-dishes',
    title: 'Chef Special',
    description: 'A special creation from our kitchen, showcasing our culinary expertise',
  },
  {
    id: 'image-0863',
    type: 'image',
    src: '/media/images/IMG_0863.JPG',
    thumbnail: '/media/images/IMG_0863.JPG',
    alt: 'Grilled specialty dish',
    category: 'grill-specialties',
    title: 'Grilled Specialty',
    description: 'Perfectly grilled to perfection, our specialty from the grill',
  },
  {
    id: 'image-0864',
    type: 'image',
    src: '/media/images/IMG_0864.JPG',
    thumbnail: '/media/images/IMG_0864.JPG',
    alt: 'Grilled dish presentation',
    category: 'grill-specialties',
    title: 'From the Grill',
    description: 'Expertly grilled with aromatic spices and traditional techniques',
  },
  {
    id: 'image-6740',
    type: 'image',
    src: '/media/images/IMG_6740.jpg',
    thumbnail: '/media/images/IMG_6740.jpg',
    alt: 'Restaurant ambiance and dining experience',
    category: 'restaurant-ambiance',
    title: 'Dining Experience',
    description: 'Experience the warm and inviting atmosphere of Chez Amis',
  },
  {
    id: 'image-7141',
    type: 'image',
    src: '/media/images/IMG_7141.JPG',
    thumbnail: '/media/images/IMG_7141.JPG',
    alt: 'Restaurant interior and ambiance',
    category: 'restaurant-ambiance',
    title: 'Restaurant Ambiance',
    description: 'The elegant and welcoming atmosphere of our dining space',
  },
  {
    id: 'image-7189',
    type: 'image',
    src: '/media/images/IMG_7189.JPG',
    thumbnail: '/media/images/IMG_7189.JPG',
    alt: 'Signature dish presentation',
    category: 'signature-dishes',
    title: 'Culinary Excellence',
    description: 'A beautifully presented dish showcasing our commitment to excellence',
  },
  {
    id: 'image-8021',
    type: 'image',
    src: '/media/images/IMG_8021.JPG',
    thumbnail: '/media/images/IMG_8021.JPG',
    alt: 'Grilled dish specialty',
    category: 'grill-specialties',
    title: 'Grill Masterpiece',
    description: 'A masterpiece from our grill, cooked to perfection',
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

// Featured media for home page - Using actual videos
export interface FeaturedMediaItem {
  id: string
  type: MediaType
  src: string
  poster?: string // For videos - will use video first frame if not provided
  alt: string
  title?: string
}

export const featuredMedia: FeaturedMediaItem[] = [
  // Mix of videos and images for variety
  {
    id: 'video-1',
    type: 'video',
    src: '/media/videos/filtered-B59B103F-F34D-4B58-A62D-C66524AD5ACE.MP4',
    alt: 'Chef preparing signature dishes at Chez Amis',
    title: 'Behind the Scenes',
  },
  {
    id: 'image-7189',
    type: 'image',
    src: '/media/images/IMG_7189.JPG',
    alt: 'Culinary excellence at Chez Amis',
    title: 'Culinary Excellence',
  },
  {
    id: 'video-2',
    type: 'video',
    src: '/media/videos/filtered-A59206D7-3709-4278-9712-9F5B1F6DC8BF.MP4',
    alt: 'Culinary artistry in action',
    title: 'Culinary Artistry',
  },
  {
    id: 'image-0863',
    type: 'image',
    src: '/media/images/IMG_0863.JPG',
    alt: 'Grilled specialty dish',
    title: 'From the Grill',
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

