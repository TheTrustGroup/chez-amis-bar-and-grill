export interface MenuItem {
  id: string
  name: string
  description: string
  price?: number // Optional if portionSizes is used
  category: string
  image?: string
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[]
  spicyLevel?: 0 | 1 | 2 | 3 // 0 = not spicy, 3 = very spicy
  tags?: ('signature' | 'chef-special' | 'bestseller' | 'new' | 'house-favorite')[]
  available?: boolean
  portionSizes?: {
    size: string
    price: number
  }[]
  pairingSuggestion?: string
  preparationTime?: string // e.g., "15-20 minutes"
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

// Helper function to generate menu items with proteins
const createProteinVariations = (
  baseName: string,
  baseDescription: string,
  baseCategory: string,
  proteins: Array<{
    name: string
    price: number
    portionSizes?: Array<{ size: string; price: number }>
    spicyLevel?: 0 | 1 | 2 | 3
  }>,
  isSignature?: boolean // For marking signature dishes like Attieke
): MenuItem[] => {
  return proteins.map((protein, index) => {
    // Extract preparation method and protein name
    let preparation = ''
    let proteinName = protein.name.trim()
    
    // Handle "Grilled And Spicy" or "Spicy Grilled" pattern first
    if (proteinName.match(/Grilled\s+And\s+Spicy|Spicy\s+Grilled/gi)) {
      preparation = 'Spicy Grilled'
      proteinName = proteinName.replace(/Grilled\s+And\s+Spicy|Spicy\s+Grilled/gi, '').trim()
    }
    // Handle "Spicy" pattern (but not if it's part of "Spicy Grilled")
    else if (proteinName.includes('Spicy') && !proteinName.includes('Grilled')) {
      preparation = 'Spicy'
      proteinName = proteinName.replace(/Spicy/gi, '').trim()
    }
    // Handle "Grilled" pattern (but not if it's part of "Spicy Grilled")
    else if (proteinName.includes('Grilled') && !proteinName.includes('Spicy')) {
      preparation = 'Grilled'
      proteinName = proteinName.replace(/Grilled/gi, '').trim()
    }
    // Handle "Fried" pattern
    else if (proteinName.includes('Fried')) {
      preparation = 'Fried'
      proteinName = proteinName.replace(/Fried/gi, '').trim()
    }
    
    // Clean up any remaining "And" or extra spaces
    proteinName = proteinName.replace(/\s+And\s+/gi, ' ').replace(/\s+/g, ' ').trim()
    
    // Format the name: "Base with Preparation Protein" (preparation comes after "with")
    const formattedName = preparation
      ? `${baseName} with ${preparation} ${proteinName}`
      : `${baseName} with ${proteinName}`
    
    // Enhanced description for signature dishes
    let enhancedDescription = baseDescription
    if (isSignature && baseName.toLowerCase() === 'attieke') {
      const proteinDesc = proteinName.toLowerCase()
      if (proteinDesc.includes('tilapia')) {
        enhancedDescription = `${baseDescription}, paired with perfectly grilled whole tilapia, seasoned with aromatic herbs and spices, served with our house-made pepper sauce and fresh tomato salsa. A harmonious blend of textures and flavors.`
      } else if (proteinDesc.includes('chicken')) {
        enhancedDescription = `${baseDescription}, paired with succulent grilled chicken, marinated in our signature blend of West African spices, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('turkey')) {
        enhancedDescription = `${baseDescription}, paired with tender grilled turkey, expertly seasoned and grilled to perfection, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('salmon')) {
        enhancedDescription = `${baseDescription}, paired with a perfectly grilled salmon fillet, rich in flavor and flaky in texture, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('redfish')) {
        enhancedDescription = `${baseDescription}, paired with robust grilled redfish, marinated in zesty herbs and spices, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('catfish')) {
        enhancedDescription = `${baseDescription}, paired with fiery grilled catfish, generously coated in our special blend of traditional West African spices, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('goat')) {
        enhancedDescription = `${baseDescription}, paired with tender spicy goat meat, slow-cooked to perfection and infused with rich, aromatic spices, served with our house-made pepper sauce and fresh accompaniments.`
      } else if (proteinDesc.includes('snails')) {
        enhancedDescription = `${baseDescription}, paired with plump spicy snails, sautéed in a vibrant and spicy tomato-based sauce, served with our house-made pepper sauce and fresh accompaniments.`
      } else {
        enhancedDescription = `${baseDescription}, paired with ${protein.name.toLowerCase()}, served with our house-made pepper sauce and fresh accompaniments.`
      }
    } else {
      enhancedDescription = `${baseDescription}, served with ${protein.name.toLowerCase()}.`
    }
    
    return {
      id: `${baseName.toLowerCase().replace(/\s+/g, '-')}-${protein.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: formattedName,
      description: enhancedDescription,
      price: protein.portionSizes ? undefined : protein.price,
      category: baseCategory,
      // Use uploaded gallery images when available, otherwise fallback to default
      image: baseName.toLowerCase() === 'attieke' && protein.name.toLowerCase().includes('tilapia')
        ? '/media/images/dishes/attieke/attieke-grilled-tilapia-001.jpg'
        : baseName.toLowerCase() === 'attieke' && protein.name.toLowerCase().includes('fish')
        ? '/media/images/dishes/attieke/attieke-fish-platter-001.jpg'
        : `/images/menu/${baseName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      portionSizes: protein.portionSizes,
      spicyLevel: protein.spicyLevel,
      dietary: protein.name.toLowerCase().includes('vegetable') ? ['vegetarian', 'vegan'] : undefined,
      tags: isSignature ? ['signature', 'chef-special', 'house-favorite'] : undefined,
      available: true,
    }
  })
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'pasta-rice-dishes',
    name: 'Pasta & Rice Dishes',
    description: 'Savor our expertly prepared pasta and rice dishes, crafted with fresh ingredients and rich flavors.',
    items: [
      // Assorted Fried Rice variations
      ...createProteinVariations(
        'Assorted Fried Rice',
        'Fragrant assorted fried rice, perfectly seasoned',
        'Pasta & Rice Dishes',
        [
          { name: 'Grilled Tilapia', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }, { size: 'Extra Large', price: 450 }] },
          { name: 'Grilled Chicken', price: 300 },
          { name: 'Grilled Turkey', price: 350 },
          { name: 'Grilled Salmon', price: 300 },
          { name: 'Grilled Redfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }] },
          { name: 'Spicy Grilled Catfish', price: 350, portionSizes: [{ size: 'Regular', price: 350 }, { size: 'Large', price: 400 }], spicyLevel: 1 },
          { name: 'Spicy Goat', price: 450, spicyLevel: 1 },
          { name: 'Spicy Snails', price: 550, spicyLevel: 1 },
        ]
      ),
      // Spaghetti variations
      ...createProteinVariations(
        'Spaghetti',
        'Al dente spaghetti tossed in a savory sauce',
        'Pasta & Rice Dishes',
        [
          { name: 'Grilled Tilapia', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Grilled Redfish', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }] },
          { name: 'Spicy Grilled Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 1 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 1 },
          { name: 'Spicy Snails', price: 500, spicyLevel: 1 },
        ]
      ),
    ],
  },
  {
    id: 'main-course-entrees',
    name: 'Main Course / Entrées',
    description: 'Indulge in our signature main courses, expertly prepared to deliver an unforgettable dining experience.',
    items: [
      // Boiled Yam variations
      ...createProteinVariations(
        'Boiled Yam with Egg Sauce',
        'Soft, perfectly boiled yam served with a rich, savory egg sauce',
        'Main Course / Entrées',
        [
          { name: 'Grilled Tilapia', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }, { size: 'Extra Large', price: 450 }] },
          { name: 'Grilled Chicken', price: 300 },
          { name: 'Grilled Turkey', price: 350 },
          { name: 'Grilled Salmon', price: 300 },
          { name: 'Grilled Redfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }] },
          { name: 'Grilled Spicy Catfish', price: 350, portionSizes: [{ size: 'Regular', price: 350 }, { size: 'Large', price: 400 }], spicyLevel: 1 },
          { name: 'Spicy Goat', price: 450, spicyLevel: 1 },
          { name: 'Spicy Snails', price: 550, spicyLevel: 1 },
        ]
      ),
      // Fried Yam variations
      ...createProteinVariations(
        'Fried Yam',
        'Crispy fried yam sticks, golden and perfectly seasoned',
        'Main Course / Entrées',
        [
          { name: 'Grilled Tilapia', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Medium', price: 320 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Grilled Redfish', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }] },
          { name: 'Spicy Grilled Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 2 },
          { name: 'Spicy Snails', price: 500, spicyLevel: 2 },
        ]
      ),
      // Plain Rice variations
      ...createProteinVariations(
        'Plain Rice',
        'Fluffy white rice, perfectly steamed',
        'Main Course / Entrées',
        [
          { name: 'Grilled Tilapia', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Medium', price: 350 }, { size: 'Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 300 },
          { name: 'Grilled Turkey', price: 350 },
          { name: 'Grilled Redfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }] },
          { name: 'Grilled Salmon', price: 300 },
          { name: 'Spicy Grilled Catfish', price: 350, portionSizes: [{ size: 'Regular', price: 350 }, { size: 'Large', price: 400 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 450, spicyLevel: 2 },
          { name: 'Spicy Snails', price: 550, spicyLevel: 2 },
        ]
      ),
      // Assorted Jollof Rice variations
      ...createProteinVariations(
        'Assorted Jollof Rice',
        'Our signature assorted jollof rice, rich in flavor and vibrant in color',
        'Main Course / Entrées',
        [
          { name: 'Grilled Tilapia', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Medium', price: 400 }, { size: 'Large', price: 450 }] },
          { name: 'Grilled Chicken', price: 300 },
          { name: 'Grilled Turkey', price: 350 },
          { name: 'Grilled Salmon', price: 300 },
          { name: 'Grilled Redfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 400 }] },
          { name: 'Spicy Grilled Catfish', price: 350, portionSizes: [{ size: 'Regular', price: 350 }, { size: 'Large', price: 400 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 450, spicyLevel: 2 },
          { name: 'Spicy Snails', price: 550, spicyLevel: 2 },
        ]
      ),
    ],
  },
  {
    id: 'from-the-grill',
    name: 'From the Grill',
    description: 'Savor our expertly grilled selections, cooked to perfection with aromatic spices.',
    items: [
      // Attieke variations - SIGNATURE DISH
      ...createProteinVariations(
        'Attieke',
        'Our signature Attieke - traditional Ivorian couscous made from fermented cassava with a delicate, slightly tangy flavor that pairs beautifully with grilled proteins. Light, fluffy, and perfectly textured, served with our house-made pepper sauce and fresh accompaniments',
        'From the Grill',
        [
          { name: 'Grilled Tilapia', price: 250, portionSizes: [{ size: 'Small', price: 250 }, { size: 'Medium', price: 320 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Grilled Redfish', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }] },
          { name: 'Grilled And Spicy Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 2 },
          { name: 'Spicy Snails', price: 500, spicyLevel: 2 },
        ],
        true // Mark Attieke as signature dish
      ),
      // Banku variations
      ...createProteinVariations(
        'Banku',
        'Traditional Ghanaian fermented corn and cassava dough, a dense and satisfying staple',
        'From the Grill',
        [
          { name: 'Tilapia', price: 250, portionSizes: [{ size: 'Small', price: 250 }, { size: 'Medium', price: 320 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Grilled Redfish', price: 250 },
          { name: 'Spicy Grilled Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 2 },
          { name: 'Spicy Snails', price: 500, spicyLevel: 2 },
        ]
      ),
      // Vegetable Jollof variations
      ...createProteinVariations(
        'Vegetable Jollof',
        'Fragrant Jollof rice, cooked with a medley of fresh vegetables',
        'From the Grill',
        [
          { name: 'Tilapia', price: 250, portionSizes: [{ size: 'Small', price: 250 }, { size: 'Medium', price: 320 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Grilled Redfish', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }] },
          { name: 'Grilled Spicy Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 2 },
          { name: 'Spicy Snails', price: 500, spicyLevel: 2 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 2 },
        ]
      ),
      // Noodles variations
      ...createProteinVariations(
        'Noodles',
        'Savory noodles, perfectly prepared with aromatic spices',
        'From the Grill',
        [
          { name: 'Grilled Tilapia', price: 250, portionSizes: [{ size: 'Regular', price: 250 }, { size: 'Large', price: 350 }, { size: 'Extra Large', price: 400 }] },
          { name: 'Grilled Chicken', price: 250 },
          { name: 'Grilled Turkey', price: 300 },
          { name: 'Grilled Redfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }] },
          { name: 'Grilled Salmon', price: 250 },
          { name: 'Spicy Grilled Catfish', price: 300, portionSizes: [{ size: 'Regular', price: 300 }, { size: 'Large', price: 350 }], spicyLevel: 2 },
          { name: 'Spicy Goat', price: 400, spicyLevel: 3 },
        ]
      ),
    ],
  },
  {
    id: 'seafood-selections',
    name: 'Seafood Selections',
    description: 'Dive into our fresh and expertly prepared seafood dishes, a true taste of the ocean.',
    items: [
      {
        id: 'fried-tilapia',
        name: 'Fried Tilapia',
        description: 'Whole fried tilapia, seasoned with a blend of local spices, crispy on the outside and tender and juicy on the inside.',
        price: 270,
        category: 'Seafood Selections',
        image: '/images/menu/fried-tilapia.jpg',
        portionSizes: [
          { size: 'Small', price: 270 },
          { size: 'Medium', price: 340 },
          { size: 'Large', price: 370 },
          { size: 'Extra Large', price: 420 },
        ],
        available: true,
      },
      {
        id: 'fried-salmon',
        name: 'Fried Salmon',
        description: 'Perfectly fried salmon fillet, offering a rich, flaky texture with a golden, crispy exterior, seasoned to perfection.',
        price: 270,
        category: 'Seafood Selections',
        image: '/images/menu/fried-salmon.jpg',
        available: true,
      },
      {
        id: 'fried-redfish',
        name: 'Fried Redfish',
        description: 'Delicious fried redfish, seasoned with our special blend of spices and cooked until golden brown, a popular and flavorful choice.',
        price: 270,
        category: 'Seafood Selections',
        image: '/images/menu/fried-redfish.jpg',
        portionSizes: [
          { size: 'Regular', price: 270 },
          { size: 'Large', price: 370 },
        ],
        available: true,
      },
      {
        id: 'noodles-spicy-snails',
        name: 'Noodles Spicy Snails',
        description: 'Exotic and tender snails, pan-fried with a vibrant mix of aromatic spices and a fiery kick, served with a hearty plate of savory noodles.',
        price: 500,
        category: 'Seafood Selections',
        image: '/images/menu/noodles-spicy-snails.jpg',
        spicyLevel: 2,
        available: true,
      },
    ],
  },
  {
    id: 'sides-accompaniments',
    name: 'Sides & Accompaniments',
    description: 'Enhance your meal with our selection of traditional and fresh side dishes.',
    items: [
      {
        id: 'jollof',
        name: 'Jollof',
        description: 'Our classic West African jollof rice, cooked in a rich tomato-based sauce with aromatic spices, a timeless favorite.',
        price: 70,
        category: 'Sides & Accompaniments',
        image: '/images/menu/jollof.jpg',
        dietary: ['vegetarian', 'vegan'],
        available: true,
      },
      {
        id: 'fried-rice',
        name: 'Fried Rice',
        description: 'Flavorful fried rice, stir-fried with a medley of fresh mixed vegetables and a hint of savory soy, a perfect accompaniment or light meal.',
        price: 70,
        category: 'Sides & Accompaniments',
        image: '/images/menu/fried-rice.jpg',
        dietary: ['vegetarian', 'vegan'],
        available: true,
      },
      {
        id: 'assorted-jollof',
        name: 'Assorted Jollof',
        description: 'A generous serving of our classic jollof rice, enhanced with a delightful medley of assorted meats or fresh seasonal vegetables.',
        price: 100,
        category: 'Sides & Accompaniments',
        image: '/images/menu/assorted-jollof.jpg',
        available: true,
      },
      {
        id: 'assorted-fried',
        name: 'Assorted Fried Rice',
        description: 'Our delicious fried rice, elevated with a selection of assorted fried proteins or a vibrant mix of fresh vegetables.',
        price: 100,
        category: 'Sides & Accompaniments',
        image: '/images/menu/assorted-fried.jpg',
        available: true,
      },
      {
        id: 'assorted-spaghetti',
        name: 'Assorted Spaghetti',
        description: 'Spaghetti tossed in a rich, savory sauce with a medley of assorted meats or fresh vegetables, creating a hearty and satisfying dish.',
        price: 150,
        category: 'Sides & Accompaniments',
        image: '/images/menu/assorted-spaghetti.jpg',
        available: true,
      },
      {
        id: 'assorted-noodles',
        name: 'Assorted Noodles',
        description: 'A vibrant mix of stir-fried noodles, combined with assorted proteins and crisp fresh vegetables, seasoned to perfection.',
        price: 150,
        category: 'Sides & Accompaniments',
        image: '/images/menu/assorted-noodles.jpg',
        available: true,
      },
      {
        id: 'attieke',
        name: 'Attieke',
        description: 'Traditional Ivorian couscous made from fermented cassava, light and fluffy, perfect as a refreshing side to any main dish.',
        price: 70,
        category: 'Sides & Accompaniments',
        image: '/images/menu/attieke.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'plantain',
        name: 'Plantain',
        description: 'Sweet fried plantains, caramelized to perfection, offering a delightful balance of sweetness and texture to complement any meal.',
        price: 70,
        category: 'Sides & Accompaniments',
        image: '/images/menu/plantain.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'banku',
        name: 'Banku',
        description: 'Traditional Ghanaian fermented corn and cassava dough, a dense and satisfying staple accompaniment for soups and stews.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/banku.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'egg',
        name: 'Egg',
        description: 'A perfectly cooked egg, a simple yet versatile and nutritious addition to enhance any meal.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/egg.jpg',
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'avocado',
        name: 'Avocado',
        description: 'Freshly sliced avocado, creamy and nutritious, offering a healthy and refreshing complement to your dish.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/avocado.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'green-pepper',
        name: 'Green Pepper',
        description: 'Crisp green pepper slices, adding a fresh, vibrant crunch and a subtle peppery note to your meal.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/green-pepper.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'red-pepper',
        name: 'Red Pepper',
        description: 'Sweet red pepper slices, offering a colorful and flavorful addition with a mild, sweet taste.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/red-pepper.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'sauce',
        name: 'Sauce',
        description: 'Our house-made special sauce, crafted with a unique blend of spices, perfect for enhancing the flavors of your meal.',
        price: 20,
        category: 'Sides & Accompaniments',
        image: '/images/menu/sauce.jpg',
        available: true,
      },
      {
        id: 'fried-chicken',
        name: 'Fried Chicken',
        description: 'Crispy and juicy fried chicken pieces, marinated in our special blend of spices and cooked to a golden, irresistible perfection.',
        price: 270,
        category: 'Sides & Accompaniments',
        image: '/images/menu/fried-chicken.jpg',
        available: true,
      },
      {
        id: 'fried-turkey',
        name: 'Fried Turkey',
        description: 'Flavorful fried turkey, tender and succulent, offering a hearty and satisfying protein option for your meal.',
        price: 320,
        category: 'Sides & Accompaniments',
        image: '/images/menu/fried-turkey.jpg',
        available: true,
      },
    ],
  },
  {
    id: 'cold-beverages',
    name: 'Cold Beverages',
    description: 'Refresh yourself with our selection of cold beverages, from fresh juices to soft drinks.',
    items: [
      {
        id: 'water',
        name: 'Water',
        description: 'Refreshing purified drinking water, served chilled.',
        price: 10,
        category: 'Cold Beverages',
        image: '/images/menu/water.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'alvaro',
        name: 'Alvaro',
        description: 'A crisp and non-alcoholic malt beverage, perfect for a light refreshment.',
        price: 30,
        category: 'Cold Beverages',
        image: '/images/menu/alvaro.jpg',
        dietary: ['vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'soda-water',
        name: 'Soda Water',
        description: 'Effervescent soda water, ideal for mixing or enjoying on its own.',
        price: 30,
        category: 'Cold Beverages',
        image: '/images/menu/soda-water.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'malt',
        name: 'Malt',
        description: 'A rich and wholesome malt drink, offering a sweet and satisfying taste.',
        price: 50,
        category: 'Cold Beverages',
        image: '/images/menu/malt.jpg',
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'fanta',
        name: 'Fanta',
        description: 'The vibrant and fruity orange-flavored carbonated soft drink.',
        price: 50,
        category: 'Cold Beverages',
        image: '/images/menu/fanta.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'coca-cola',
        name: 'Coca-Cola',
        description: 'The iconic, refreshing carbonated soft drink with a timeless taste.',
        price: 50,
        category: 'Cold Beverages',
        image: '/images/menu/coca-cola.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'sprite',
        name: 'Sprite',
        description: 'A crisp and clear lemon-lime flavored carbonated soft drink.',
        price: 50,
        category: 'Cold Beverages',
        image: '/images/menu/sprite.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      // Pineapple Juice variations
      {
        id: 'pineapple-beetroot',
        name: 'Pineapple Beetroot',
        description: 'A vibrant and refreshing blend of sweet pineapple and earthy beetroot, offering a unique and healthy taste experience.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-beetroot.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-mango',
        name: 'Pineapple Mango',
        description: 'A tropical delight combining the tangy sweetness of fresh pineapple with the rich, smooth flavor of ripe mango.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-mango.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-mint',
        name: 'Pineapple Mint',
        description: 'A cooling and invigorating juice featuring the crisp sweetness of pineapple perfectly balanced with fresh, aromatic mint leaves.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-mint.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-ginger',
        name: 'Pineapple Ginger',
        description: 'A zesty and warming juice, blending the sweet and tangy notes of pineapple with the spicy kick of fresh ginger.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-ginger.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-passion',
        name: 'Pineapple Passion',
        description: 'An exotic and tangy juice, combining the tropical sweetness of pineapple with the vibrant, aromatic flavor of passion fruit.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-passion.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-cucumber',
        name: 'Pineapple Cucumber',
        description: 'A crisp and hydrating juice, blending the refreshing taste of cucumber with the sweet and tangy notes of pineapple.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-cucumber.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-watermelon',
        name: 'Pineapple Watermelon',
        description: 'A sweet and incredibly refreshing juice, combining the juicy sweetness of watermelon with the tropical tang of pineapple.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-watermelon.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'pineapple-juice',
        name: 'Pineapple Juice',
        description: 'Pure, freshly squeezed pineapple juice, offering a classic tropical taste that is both sweet and tangy.',
        price: 70,
        category: 'Cold Beverages',
        image: '/images/menu/pineapple-juice.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      // Ice Tea
      {
        id: 'arizona',
        name: 'Arizona',
        description: 'A classic, refreshing Arizona iced tea, known for its crisp and balanced flavor.',
        price: 100,
        category: 'Cold Beverages',
        image: '/images/menu/arizona.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'snapple-ice-tea',
        name: 'Snapple Ice Tea',
        description: 'A popular Snapple iced tea, offering a variety of refreshing and natural fruit-flavored options.',
        price: 100,
        category: 'Cold Beverages',
        image: '/images/menu/snapple-ice-tea.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'raspberry-lemon-peach-tea',
        name: 'Raspberry, Lemon and Peach Tea',
        description: 'A delightful and fruity iced tea blend, combining the sweet tartness of raspberry, the bright zest of lemon, and the subtle sweetness of peach.',
        price: 100,
        category: 'Cold Beverages',
        image: '/images/menu/raspberry-lemon-peach-tea.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    description: 'Indulge in our selection of premium mocktails, perfect for a refreshing non-alcoholic experience.',
    items: [
      // Signature Mocktails
      {
        id: 'soleil-vanille-petillant',
        name: 'Soleil Vanillé Pétillant (Sparkling Vanilla Sun)',
        description: 'A delightful blend of vanilla, orange, soda, and lemon juice, crafted with our signature bar recipe for a sparkling, refreshing experience.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/soleil-vanille-petillant.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'midnight-aurora',
        name: 'Midnight Aurora',
        description: 'A captivating blend of cranberry juice, mint syrup, and lemon, crafted with our signature bar recipe for a refreshing and vibrant mocktail.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/midnight-aurora.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'itz-chezzy-cream-pie',
        name: 'Itz Chezzy Cream Pie',
        description: 'A creamy and indulgent mocktail featuring banana syrup, pineapple juice, milk, and lemon, crafted with our signature bar recipe.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/itz-chezzy-cream-pie.jpg',
        dietary: ['vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'milky-way',
        name: 'Milky Way',
        description: 'A smooth and creamy blend of pineapple juice, orange juice, milk, and lemon juice, crafted with our signature bar recipe.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/milky-way.jpg',
        dietary: ['vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'ghana-classic',
        name: 'Ghana Classic',
        description: 'A refreshing blend of ginger, grenadine, and pineapple juice, offering a classic Ghanaian taste experience.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/ghana-classic.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'chez-amis-sobolo',
        name: 'Chez Amis Sobolo',
        description: 'A unique blend of hibiscus juice, pineapple, mint, and ginger, offering a refreshing and aromatic taste of Ghana.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/chez-amis-sobolo.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'safari',
        name: 'Safari',
        description: 'A tropical blend of mint leaves, passion fruit, pineapple juice, and mango puree, offering an exotic and refreshing experience.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/safari.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'river-side',
        name: 'River Side',
        description: 'A refreshing blend of cucumber, orange juice, apple juice, and mango juice, crafted with our signature bar recipe.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/river-side.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      // Classic Mocktails
      {
        id: 'virgin-mojito',
        name: 'Virgin Mojito / Strawberry / Blueberry / Raspberry',
        description: 'A refreshing blend of fresh lemon juice, zesty lime, sweet simple syrup, invigorating mint, and topped with soda. Available with your choice of strawberry, blueberry, or raspberry for a fruity twist.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/virgin-mojito.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'lemonade',
        name: 'Lemonade / Strawberry / Mango / Raspberry',
        description: 'A classic, crisp lemonade made with fresh lemon juice and simple syrup. Customize it with a burst of strawberry, tropical mango, or tangy raspberry flavor.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/lemonade.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'virgin-colada',
        name: 'Virgin Colada',
        description: 'A creamy, tropical delight featuring rich coconut cream and sweet pineapple juice, blended to perfection for a smooth, refreshing taste.',
        price: 100,
        category: 'Mocktails',
        image: '/images/menu/virgin-colada.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'safe-sex-on-the-beach',
        name: 'Safe Sex on the Beach',
        description: 'A vibrant and fruity concoction of sweet orange juice, luscious peach, and tart cranberry, creating a delightful and refreshing mocktail.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/safe-sex-on-the-beach.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'virgin-strawberry-daiquiri',
        name: 'Virgin Strawberry Daiquiri',
        description: 'A sweet and tangy classic, blended with smooth strawberry puree, simple syrup, and a hint of fresh lemon juice for a perfectly balanced, icy treat.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/virgin-strawberry-daiquiri.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'chapman',
        name: 'Chapman',
        description: 'A popular Nigerian mocktail, combining crisp cucumber slices, effervescent Fanta and Sprite, a squeeze of fresh lime, a dash of Angostura bitters, and a splash of grenadine for a complex and refreshing flavor.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/chapman.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'shirley-temple',
        name: 'Shirley Temple',
        description: 'A timeless classic, featuring crisp ginger ale, a splash of fresh lemon juice, and a sweet touch of grenadine, typically garnished with a cherry.',
        price: 90,
        category: 'Mocktails',
        image: '/images/menu/shirley-temple.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
    ],
  },
  {
    id: 'alcoholic-beverages',
    name: 'Alcoholic Beverages',
    description: 'A curated selection of spirits, cocktails, and beverages to elevate your evening.',
    items: [
      // Soft Drinks/Alcoholic Mixers
      {
        id: 'vodka-soda',
        name: 'Vodka Soda',
        description: 'A classic, clean mix of premium vodka and sparkling soda water.',
        price: 30,
        category: 'Alcoholic Beverages',
        image: '/images/menu/vodka-soda.jpg',
        available: true,
      },
      {
        id: 'bb-cocktail',
        name: 'BB Cocktail',
        description: 'A delightful and expertly mixed cocktail, offering a balanced blend of flavors.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/bb-cocktail.jpg',
        available: true,
      },
      {
        id: 'smirnoff-pineapple-bottle',
        name: 'Smirnoff Pineapple Bottle',
        description: 'A ready-to-drink, refreshing pineapple-flavored vodka beverage in a convenient bottle.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/smirnoff-pineapple-bottle.jpg',
        available: true,
      },
      {
        id: 'smirnoff-black-bottle',
        name: 'Smirnoff Black Bottle',
        description: 'A premium, ready-to-drink vodka beverage with a distinct, smooth flavor profile in a sleek black bottle.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/smirnoff-black-bottle.jpg',
        available: true,
      },
      {
        id: 'orijin-can',
        name: 'Orijin Can',
        description: 'A unique alcoholic blend infused with African herbs and fruits, served in a convenient can.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/orijin-can.jpg',
        available: true,
      },
      {
        id: 'vody',
        name: 'Vody',
        description: 'A smooth and versatile vodka, ideal for cocktails or neat enjoyment.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/vody.jpg',
        available: true,
      },
      {
        id: 'red-bull',
        name: 'Red Bull',
        description: 'The popular energy drink, known for its stimulating effect.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/red-bull.jpg',
        dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
        available: true,
      },
      {
        id: 'savanna',
        name: 'Savanna',
        description: 'A crisp and dry cider, offering a refreshing apple taste.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/savanna.jpg',
        available: true,
      },
      {
        id: 'hunters',
        name: 'Hunters',
        description: 'A popular cider known for its crisp and invigorating flavor.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/hunters.jpg',
        available: true,
      },
      {
        id: 'smirnoff-pineapple-can',
        name: 'Smirnoff Pineapple Can',
        description: 'A convenient canned version of the refreshing pineapple-flavored vodka beverage.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/smirnoff-pineapple-can.jpg',
        available: true,
      },
      {
        id: 'smirnoff-black-can',
        name: 'Smirnoff Black Can',
        description: 'A convenient canned version of the premium, smooth black-flavored vodka beverage.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/smirnoff-black-can.jpg',
        available: true,
      },
      {
        id: 'smirnoff-ice-guarana',
        name: 'Smirnoff Ice Guarana',
        description: 'A zesty, ready-to-drink vodka mix with the stimulating kick of guarana.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/smirnoff-ice-guarana.jpg',
        available: true,
      },
      {
        id: 'guinness',
        name: 'Guinness',
        description: 'The iconic Irish dry stout, known for its dark color, creamy head, and rich, complex flavor.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/guinness.jpg',
        available: true,
      },
      {
        id: 'gulder',
        name: 'Gulder',
        description: 'A popular Nigerian lager beer, known for its rich and distinctive taste.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/gulder.jpg',
        available: true,
      },
      {
        id: 'shandy-big-bottle',
        name: 'Shandy Big Bottle',
        description: 'A large bottle of refreshing shandy, a blend of beer and lemonade.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/shandy-big-bottle.jpg',
        available: true,
      },
      {
        id: 'origin-big-bottle',
        name: 'Origin Big Bottle',
        description: 'A large bottle of Origin, an alcoholic beverage infused with African herbs.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/origin-big-bottle.jpg',
        available: true,
      },
      {
        id: 'star-70-cedis',
        name: 'Star 70 Cedis',
        description: 'A large bottle of Star Lager Beer, a popular local brew.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/star-70-cedis.jpg',
        available: true,
      },
      {
        id: 'club-big-bottle',
        name: 'Club Big Bottle',
        description: 'A large bottle of Club Beer, a well-known Ghanaian lager.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/club-big-bottle.jpg',
        available: true,
      },
      {
        id: 'kiss-bottle',
        name: 'Kiss Bottle',
        description: 'A sweet and fruity alcoholic beverage, perfect for a light and enjoyable drink.',
        price: 70,
        category: 'Alcoholic Beverages',
        image: '/images/menu/kiss-bottle.jpg',
        available: true,
      },
      {
        id: 'corona-extra',
        name: 'Corona Extra',
        description: 'A classic Mexican lager, light and refreshing, often served with a lime wedge.',
        price: 100,
        category: 'Alcoholic Beverages',
        image: '/images/menu/corona-extra.jpg',
        available: true,
      },
      {
        id: 'stella-artois',
        name: 'Stella Artois',
        description: 'A premium Belgian pilsner, known for its crisp, clean taste and distinctive bitterness.',
        price: 100,
        category: 'Alcoholic Beverages',
        image: '/images/menu/stella-artois.jpg',
        available: true,
      },
      {
        id: 'heineken',
        name: 'Heineken',
        description: 'A globally recognized Dutch pale lager, celebrated for its balanced, refreshing flavor.',
        price: 100,
        category: 'Alcoholic Beverages',
        image: '/images/menu/heineken.jpg',
        available: true,
      },
      {
        id: 'kiss-can',
        name: 'Kiss Can',
        description: 'A convenient canned version of the sweet and fruity alcoholic Kiss beverage.',
        price: 100,
        category: 'Alcoholic Beverages',
        image: '/images/menu/kiss-can.jpg',
        available: true,
      },
      // Shots
      {
        id: 'jaggerbomb',
        name: 'Jaggerbomb',
        description: 'An energizing shot combining the bold herbal notes of Jägermeister with the invigorating kick of Red Bull.',
        price: 80,
        category: 'Alcoholic Beverages',
        image: '/images/menu/jaggerbomb.jpg',
        available: true,
      },
      {
        id: 'b-52',
        name: 'B-52',
        description: 'A classic layered shot featuring the rich coffee liqueur Kahlua, creamy Baileys Irish Cream, and a hint of citrus from Triple Sec.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/b-52.jpg',
        available: true,
      },
      {
        id: 'kamikaze',
        name: 'Kamikaze',
        description: 'A crisp and zesty shot made with premium Vodka, sweet Triple Sec, and a refreshing squeeze of fresh Lime.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/kamikaze.jpg',
        available: true,
      },
      {
        id: 'mind-eraser',
        name: 'Mind Eraser',
        description: 'A vibrant and effervescent shot blending Kahlua coffee liqueur, smooth Vodka, and a splash of Club Soda for a refreshing finish.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/mind-eraser.jpg',
        portionSizes: [
          { size: 'Single', price: 50 },
          { size: 'Double', price: 100 },
        ],
        available: true,
      },
      {
        id: 'bmw',
        name: 'BMW',
        description: 'A luxurious shot combining the creamy sweetness of Baileys Irish Cream, tropical Malibu rum, and the warming depth of Whiskey.',
        price: 50,
        category: 'Alcoholic Beverages',
        image: '/images/menu/bmw.jpg',
        portionSizes: [
          { size: 'Single', price: 50 },
          { size: 'Double', price: 100 },
        ],
        available: true,
      },
      {
        id: 'wild-afrika',
        name: 'Wild Afrika',
        description: 'A unique and creamy shot featuring the distinctive Wild Africa Irish Cream paired with the smooth character of Sheepdog Whiskey.',
        price: 45,
        category: 'Alcoholic Beverages',
        image: '/images/menu/wild-afrika.jpg',
        available: true,
      },
      // Classic Cocktails
      {
        id: 'lemon-drop',
        name: 'Lemon Drop',
        description: 'A refreshing cocktail featuring vodka, lemon juice, and triple sec, perfectly balanced for a crisp and zesty experience.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/lemon-drop.jpg',
        available: true,
      },
      {
        id: 'tequila-sunrise',
        name: 'Tequila Sunrise',
        description: 'A vibrant cocktail combining orange juice, tequila, and grenadine, creating a beautiful sunrise gradient.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/tequila-sunrise.jpg',
        available: true,
      },
      {
        id: 'margarita',
        name: 'Margarita',
        description: 'A classic cocktail made with tequila, triple sec, and lemon, offering a perfect balance of sweet and sour.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/margarita.jpg',
        available: true,
      },
      {
        id: 'old-fashioned',
        name: 'Old Fashioned',
        description: 'A timeless and robust classic, meticulously crafted with premium whiskey, a hint of sweetness from a sugar cube, and aromatic Angostura Bitters, stirred over ice to achieve perfect balance.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/old-fashioned.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'frozen-strawberry-daiquiri',
        name: 'Frozen Strawberry Daiquiri',
        description: 'Indulge in this vibrant and refreshing frozen cocktail, a delightful blend of smooth white rum, zesty fresh lime juice, a touch of simple syrup, and luscious strawberry puree, creating a perfectly sweet and tangy experience.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/frozen-strawberry-daiquiri.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'manhattan',
        name: 'Manhattan',
        description: 'A sophisticated and elegant cocktail, expertly mixed with rich whiskey, sweet red vermouth (Martini Rosso), and a dash of Angostura Bitters, stirred and served chilled for a smooth, aromatic finish.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/manhattan.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'classic-mojito',
        name: 'Classic Mojito / Strawberry / Blueberry',
        description: 'A quintessential refreshing cocktail, muddled with fresh mint and lime, balanced with simple syrup, smooth white rum, and topped with sparkling soda. Available in classic, sweet strawberry, or tangy blueberry variations.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/classic-mojito.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'negroni',
        name: 'Negroni',
        description: 'A bold and iconic Italian aperitif, featuring a harmonious blend of aromatic gin, sweet Martini Rosso vermouth, and the distinctive bitter notes of Campari, stirred over ice for a perfectly balanced and complex flavor.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/negroni.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'pina-colada',
        name: 'Pina Colada',
        description: 'Escape to the tropics with this creamy and sweet cocktail, a delightful fusion of rich coconut cream, smooth white rum, and tangy pineapple juice, blended to a velvety perfection.',
        price: 140,
        category: 'Alcoholic Beverages',
        image: '/images/menu/pina-colada.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'tom-collins',
        name: 'Tom Collins',
        description: 'A crisp and invigorating highball cocktail, combining the botanical notes of gin with freshly squeezed lemon juice, a touch of simple syrup, and topped with effervescent soda water for a light and refreshing sip.',
        price: 110,
        category: 'Alcoholic Beverages',
        image: '/images/menu/tom-collins.jpg',
        available: true,
      },
      {
        id: 'cosmopolitan',
        name: 'Cosmopolitan',
        description: 'A chic and vibrant cocktail, perfectly balanced with premium vodka, the citrusy sweetness of Cointreau, tart cranberry juice, and a squeeze of fresh lime juice, creating a sophisticated and tangy drink.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/cosmopolitan.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'amaretto-sour',
        name: 'Amaretto Sour',
        description: 'A classic blend of Amaretto Liqueur and fresh Lemon Juice. Optionally crafted with Egg White for a frothy texture and Bourbon for added depth.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/amaretto-sour.jpg',
        available: true,
      },
      {
        id: 'french-martini',
        name: 'French Martini',
        description: 'A sophisticated mix featuring crisp Vodka, sweet Raspberry Liqueur, and tropical Pineapple Juice.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/french-martini.jpg',
        available: true,
      },
      {
        id: 'whiskey-sour',
        name: 'Whiskey Sour',
        description: 'A timeless cocktail made with robust Bourbon Whiskey, tangy Lemon Juice, and a touch of Simple Syrup. Optionally enhanced with Egg White for a silky finish and Angostura Bitters for aromatic complexity.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/whiskey-sour.jpg',
        available: true,
      },
      {
        id: 'white-russian',
        name: 'White Russian',
        description: 'A creamy and rich concoction of smooth Vodka, coffee-flavored Kahlua, and fresh Milk.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/white-russian.jpg',
        available: true,
      },
      {
        id: 'long-island',
        name: 'Long Island',
        description: 'A potent and refreshing mix of Gin, Tequila, White Rum, Vodka, and Triple Sec, balanced with Lemon Juice, Simple Syrup, and topped with Coke.',
        price: 180,
        category: 'Alcoholic Beverages',
        image: '/images/menu/long-island.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'sex-on-the-beach',
        name: 'Sex on the Beach',
        description: 'A vibrant and fruity cocktail combining Vodka, sweet Peach Schnapps, zesty Orange Juice, and tart Cranberry Juice.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/sex-on-the-beach.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'daiquiri',
        name: 'Daiquiri',
        description: 'A classic tropical delight crafted with crisp White Rum, fresh Lemon Juice, and a hint of Simple Syrup.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/daiquiri.jpg',
        available: true,
      },
      // Signature Cocktails
      {
        id: 'makola-mule',
        name: 'Makola Mule',
        description: 'A unique twist on the classic mule, featuring whiskey, vanilla, lemon, and our signature bar recipe for a sophisticated and refreshing experience.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/makola-mule.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'sankofa',
        name: 'Sankofa',
        description: 'A vibrant cocktail featuring tequila, lemon, watermelon juice, and our signature bar recipe, inspired by Ghanaian flavors.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/sankofa.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'hangouts',
        name: 'Hangouts',
        description: 'A tropical delight combining pineapple juice, passion, lemon, Malibu, and white rum for a refreshing and exotic experience.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/hangouts.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'spicy-virtuoso',
        name: 'Spicy Virtuoso',
        description: 'A bold and unique cocktail featuring coconut syrup, fresh milk, pineapple, white rum, and blue curaçao for a vibrant and creamy experience.',
        price: 160,
        category: 'Alcoholic Beverages',
        image: '/images/menu/spicy-virtuoso.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'chezzy-fireball',
        name: 'Chezzy Fireball',
        description: 'A warming cocktail featuring Fireball whiskey, cinnamon, orange, and our signature bar recipe for a spicy and invigorating experience.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/chezzy-fireball.jpg',
        tags: ['chef-special'],
        spicyLevel: 1,
        available: true,
      },
      {
        id: 'the-sheepdog',
        name: 'The Sheepdog',
        description: 'A sophisticated cocktail featuring Sheepdog whiskey, banana syrup, and orange liqueur for a smooth and flavorful experience.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/the-sheepdog.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'screaming-orgasm',
        name: 'Screaming Orgasm',
        description: 'A rich and indulgent cocktail featuring vodka, Kahlua, amaretto, Baileys, and milk for a creamy and decadent experience.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/screaming-orgasm.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'vodka-sunrise',
        name: 'Vodka Sunrise',
        description: 'A vibrant cocktail featuring vodka, orange, and grenadine, creating a beautiful sunrise gradient.',
        price: 140,
        category: 'Alcoholic Beverages',
        image: '/images/menu/vodka-sunrise.jpg',
        available: true,
      },
      {
        id: 'whispering-popcorn',
        name: 'Whispering Popcorn',
        description: 'A unique and creative cocktail featuring whiskey, egg white, lemon juice, popcorn syrup, and Angostura bitters for an innovative and delightful experience.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/whispering-popcorn.jpg',
        tags: ['chef-special', 'new'],
        available: true,
      },
      {
        id: 'jeffrey-rockstar',
        name: 'Jeffrey Rockstar',
        description: 'A refreshing cocktail featuring pineapple, mint, tequila, lemon, and our signature bar recipe for a vibrant and invigorating experience.',
        price: 140,
        category: 'Alcoholic Beverages',
        image: '/images/menu/jeffrey-rockstar.jpg',
        tags: ['bestseller'],
        available: true,
      },
      {
        id: 'aperol-lemon-drop-martini',
        name: 'Aperol Lemon Drop Martini',
        description: 'A sophisticated martini featuring vodka, Aperol, orange liqueur, lemon juice, and optional Angostura bitters for a perfectly balanced and elegant experience.',
        price: 120,
        category: 'Alcoholic Beverages',
        image: '/images/menu/aperol-lemon-drop-martini.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'naughty-or-nice',
        name: 'Naughty or Nice',
        description: 'A complex and exotic cocktail featuring rum, vodka, passionfruit, ginger, pineapple, hibiscus, mint, and our signature bar recipe for a truly unique experience.',
        price: 150,
        category: 'Alcoholic Beverages',
        image: '/images/menu/naughty-or-nice.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'akwaaba',
        name: 'Akwaaba',
        description: 'A welcoming cocktail featuring tequila, orange juice, lemon juice, passion, and our signature bar recipe, inspired by Ghanaian hospitality.',
        price: 130,
        category: 'Alcoholic Beverages',
        image: '/images/menu/akwaaba.jpg',
        tags: ['chef-special'],
        available: true,
      },
      {
        id: 'gye-nyame',
        name: 'Gye Nyame',
        description: 'A powerful and complex cocktail featuring rum, gin, triple sec, vodka, tequila, lemon, and strawberry, inspired by Ghanaian culture.',
        price: 160,
        category: 'Alcoholic Beverages',
        image: '/images/menu/gye-nyame.jpg',
        tags: ['chef-special'],
        available: true,
      },
    ],
  },
  {
    id: 'shisha',
    name: 'Shisha',
    description: 'Indulge in our selection of premium shisha flavors, perfect for a relaxing evening.',
    items: [
      {
        id: 'shisha-havana',
        name: 'Havana',
        description: 'An aromatic Havana shisha, offering a smooth and relaxing experience with rich, classic notes.',
        price: 300,
        category: 'Shisha',
        image: '/images/menu/shisha-havana.jpg',
        available: true,
      },
      {
        id: 'shisha-babylon',
        name: 'Babylon',
        description: 'Experience the exotic allure of Babylon shisha, a unique blend designed for a truly memorable session.',
        price: 300,
        category: 'Shisha',
        image: '/images/menu/shisha-babylon.jpg',
        available: true,
      },
      {
        id: 'shisha-mirage',
        name: 'Mirage',
        description: 'A captivating Mirage shisha, delivering a refreshing and mysterious flavor profile.',
        price: 300,
        category: 'Shisha',
        image: '/images/menu/shisha-mirage.jpg',
        available: true,
      },
      {
        id: 'shisha-izmir-romantic',
        name: 'Izmir Romantic',
        description: 'Savor the sweet and enchanting notes of Izmir Romantic shisha, perfect for a delightful and intimate experience.',
        price: 300,
        category: 'Shisha',
        image: '/images/menu/shisha-izmir-romantic.jpg',
        available: true,
      },
      {
        id: 'shisha-love-66',
        name: 'Love 66',
        description: 'A popular and beloved Love 66 shisha, known for its sweet and fruity blend that delights the senses.',
        price: 250,
        category: 'Shisha',
        image: '/images/menu/shisha-love-66.jpg',
        available: true,
      },
      {
        id: 'shisha-mint-flavor',
        name: 'Mint Flavor',
        description: 'A classic Mint Flavor shisha, providing a cool, crisp, and invigorating smoking experience.',
        price: 250,
        category: 'Shisha',
        image: '/images/menu/shisha-mint-flavor.jpg',
        available: true,
      },
      {
        id: 'shisha-gum-mint',
        name: 'Gum Mint',
        description: 'Enjoy the refreshing taste of Gum Mint shisha, a delightful blend of sweet gum and cool mint.',
        price: 250,
        category: 'Shisha',
        image: '/images/menu/shisha-gum-mint.jpg',
        available: true,
      },
      {
        id: 'shisha-double-apple',
        name: 'Double Apple',
        description: 'The timeless and rich flavor of Double Apple shisha, offering a sweet and anise-like aroma.',
        price: 250,
        category: 'Shisha',
        image: '/images/menu/shisha-double-apple.jpg',
        available: true,
      },
      {
        id: 'shisha-pomegranate',
        name: 'Pomegranate',
        description: 'A vibrant Pomegranate shisha, bursting with sweet and tart fruity notes for a refreshing session.',
        price: 250,
        category: 'Shisha',
        image: '/images/menu/shisha-pomegranate.jpg',
        available: true,
      },
      {
        id: 'shisha-blue-ice-berry',
        name: 'Blue Ice Berry',
        description: 'A cool and fruity Blue Ice Berry shisha, combining sweet berries with an icy menthol finish.',
        price: 350,
        category: 'Shisha',
        image: '/images/menu/shisha-blue-ice-berry.jpg',
        available: true,
      },
      {
        id: 'shisha-watermelon-ice',
        name: 'Watermelon Ice',
        description: 'Experience the refreshing taste of Watermelon Ice shisha, a juicy watermelon flavor with a cool, crisp menthol kick.',
        price: 350,
        category: 'Shisha',
        image: '/images/menu/shisha-watermelon-ice.jpg',
        available: true,
      },
    ],
  },
]

// Flatten all items for easy access
export const allMenuItems: MenuItem[] = menuCategories.flatMap((category) => category.items)

// Get category by ID
export const getCategoryById = (id: string): MenuCategory | undefined => {
  return menuCategories.find((cat) => cat.id === id)
}

// Get items by category
export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  const category = getCategoryById(categoryId)
  return category ? category.items : []
}

// Search items
export const searchMenuItems = (query: string): MenuItem[] => {
  const lowerQuery = query.toLowerCase()
  return allMenuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  )
}

