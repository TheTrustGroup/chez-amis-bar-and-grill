export interface ExtendedMenuItem {
  id: string
  name: string
  description: string
  preparation?: string
  price: number
  category: string
  image: string
  dietary: ("vegetarian" | "vegan" | "gluten-free" | "spicy")[]
  pairingSuggestion?: string | null
  chefRecommended?: boolean
  seasonal?: boolean
  portionSize?: {
    small?: number
    regular: number
    large?: number
  }
  available: boolean
}

export const menuCategories = [
  { id: "appetizers", label: "Appetizers & Starters" },
  { id: "soups-salads", label: "Soups & Salads" },
  { id: "grill", label: "From the Grill" },
  { id: "signatures", label: "Chef's Signatures" },
  { id: "seafood", label: "Seafood Selections" },
  { id: "pasta", label: "Pasta & Risotto" },
  { id: "sides", label: "Sides & Accompaniments" },
  { id: "desserts", label: "Desserts & Pastries" },
  { id: "beverages", label: "Beverages & Wine List" },
]

export const extendedMenuItems: ExtendedMenuItem[] = [
  // Appetizers & Starters
  {
    id: "app-1",
    name: "Truffle Arancini",
    description: "Crispy risotto balls infused with black truffle, served with parmesan cream and microgreens. A delicate balance of earthy flavors and creamy texture.",
    preparation: "Hand-rolled and pan-fried to golden perfection",
    price: 45,
    category: "appetizers",
    image: "/images/menu/arancini.jpg",
    dietary: ["vegetarian"],
    pairingSuggestion: "Prosecco, Pinot Grigio",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "app-2",
    name: "Seared Scallops",
    description: "Pan-seared diver scallops with cauliflower purée, crispy pancetta, and balsamic reduction. Each scallop is perfectly caramelized on the outside, tender within.",
    preparation: "Seared to perfection, served immediately",
    price: 65,
    category: "appetizers",
    image: "/images/menu/scallops.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Chardonnay, Sauvignon Blanc",
    chefRecommended: true,
    seasonal: true,
    available: true,
  },
  {
    id: "app-3",
    name: "Wagyu Beef Carpaccio",
    description: "Thinly sliced premium Wagyu beef, arugula, shaved parmesan, truffle oil, and capers. A celebration of simplicity and quality ingredients.",
    preparation: "Hand-sliced to paper-thin perfection",
    price: 75,
    category: "appetizers",
    image: "/images/menu/carpaccio.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Barolo, Cabernet Sauvignon",
    chefRecommended: false,
    seasonal: false,
    available: true,
  },

  // Soups & Salads
  {
    id: "soup-1",
    name: "Lobster Bisque",
    description: "Rich and velvety soup made with fresh lobster, cognac, and cream. Finished with a touch of sherry and fresh herbs. Served with a lobster claw garnish.",
    preparation: "Slow-simmered for hours to develop depth of flavor",
    price: 55,
    category: "soups-salads",
    image: "/images/menu/lobster-bisque.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Chardonnay, Champagne",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "salad-1",
    name: "Heritage Tomato Salad",
    description: "Heirloom tomatoes, burrata, basil oil, aged balsamic, and flaky sea salt. A tribute to summer's finest produce, celebrating the natural sweetness of tomatoes.",
    preparation: "Served at room temperature to enhance flavors",
    price: 42,
    category: "soups-salads",
    image: "/images/menu/tomato-salad.jpg",
    dietary: ["vegetarian", "gluten-free"],
    pairingSuggestion: "Rosé, Pinot Grigio",
    chefRecommended: false,
    seasonal: true,
    available: true,
  },

  // From the Grill
  {
    id: "grill-1",
    name: "Wagyu Ribeye",
    description: "Prime Wagyu ribeye, dry-aged for 28 days, grilled over charcoal. Served with roasted bone marrow, confit garlic, and herb butter. A carnivore's dream.",
    preparation: "Grilled to your preferred temperature",
    price: 125,
    category: "grill",
    image: "/images/menu/wagyu-ribeye.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Cabernet Sauvignon, Malbec",
    chefRecommended: true,
    seasonal: false,
    portionSize: {
      regular: 125,
      large: 180,
    },
    available: true,
  },
  {
    id: "grill-2",
    name: "Herb-Crusted Lamb Chops",
    description: "Frenched lamb chops with rosemary and thyme crust, mint chimichurri, roasted vegetables, and potato gratin. Tender, flavorful, and elegantly presented.",
    preparation: "Grilled to medium-rare perfection",
    price: 95,
    category: "grill",
    image: "/images/menu/lamb-chops.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Syrah, Pinot Noir",
    chefRecommended: false,
    seasonal: false,
    available: true,
  },

  // Chef's Signatures
  {
    id: "sig-1",
    name: "Atlantic Salmon",
    description: "Pan-seared Norwegian salmon, roasted asparagus, lemon beurre blanc, herb-infused fingerling potatoes. The salmon is cooked skin-side down for a crispy exterior and moist interior.",
    preparation: "Grilled to perfection",
    price: 85,
    category: "signatures",
    image: "/images/menu/salmon.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Chardonnay, Sauvignon Blanc",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "sig-2",
    name: "Duck Confit",
    description: "Slow-cooked duck leg confit, cherry gastrique, roasted root vegetables, and potato purée. The duck is cured overnight, then cooked in its own fat until fall-off-the-bone tender.",
    preparation: "Confit for 8 hours, then pan-seared",
    price: 88,
    category: "signatures",
    image: "/images/menu/duck-confit.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Pinot Noir, Côtes du Rhône",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },

  // Seafood Selections
  {
    id: "sea-1",
    name: "Lobster Thermidor",
    description: "Fresh lobster, removed from shell, mixed with béchamel, gruyère, and cognac, then returned to shell and gratinéed. A classic French preparation with modern refinement.",
    preparation: "Baked until golden and bubbling",
    price: 110,
    category: "seafood",
    image: "/images/menu/lobster-thermidor.jpg",
    dietary: [],
    pairingSuggestion: "Chardonnay, Champagne",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "sea-2",
    name: "Pan-Seared Halibut",
    description: "Wild-caught halibut, saffron risotto, braised fennel, and lemon butter sauce. The halibut is seared to create a golden crust while maintaining a flaky, moist interior.",
    preparation: "Pan-seared with crispy skin",
    price: 78,
    category: "seafood",
    image: "/images/menu/halibut.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: "Sauvignon Blanc, Pinot Grigio",
    chefRecommended: false,
    seasonal: true,
    available: true,
  },

  // Pasta & Risotto
  {
    id: "pasta-1",
    name: "Black Truffle Risotto",
    description: "Creamy Arborio rice, shaved black truffle, parmesan, white wine, and truffle oil. Each grain of rice is perfectly al dente, enveloped in rich, aromatic sauce.",
    preparation: "Stirred continuously for 20 minutes",
    price: 72,
    category: "pasta",
    image: "/images/menu/truffle-risotto.jpg",
    dietary: ["vegetarian"],
    pairingSuggestion: "Barolo, Pinot Noir",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "pasta-2",
    name: "Lobster Ravioli",
    description: "House-made pasta filled with fresh lobster, ricotta, and herbs. Served with a light tomato cream sauce, fresh basil, and parmesan. Each ravioli is hand-crafted.",
    preparation: "Fresh pasta made daily",
    price: 68,
    category: "pasta",
    image: "/images/menu/lobster-ravioli.jpg",
    dietary: [],
    pairingSuggestion: "Chardonnay, Pinot Grigio",
    chefRecommended: false,
    seasonal: false,
    available: true,
  },

  // Sides & Accompaniments
  {
    id: "side-1",
    name: "Truffle Mashed Potatoes",
    description: "Creamy Yukon Gold potatoes, black truffle, butter, and cream. Whipped to silky perfection, finished with truffle oil and chives.",
    price: 28,
    category: "sides",
    image: "/images/menu/truffle-potatoes.jpg",
    dietary: ["vegetarian", "gluten-free"],
    pairingSuggestion: null,
    chefRecommended: false,
    seasonal: false,
    available: true,
  },
  {
    id: "side-2",
    name: "Roasted Seasonal Vegetables",
    description: "Market-fresh vegetables, roasted with olive oil, herbs, and sea salt. Changes daily based on what's in season and at peak flavor.",
    price: 22,
    category: "sides",
    image: "/images/menu/roasted-vegetables.jpg",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    pairingSuggestion: null,
    chefRecommended: false,
    seasonal: true,
    available: true,
  },

  // Desserts & Pastries
  {
    id: "dessert-1",
    name: "Chocolate Soufflé",
    description: "Warm chocolate soufflé with a molten center, served with vanilla ice cream and fresh berries. Light, airy, and decadently rich. Requires 20 minutes preparation.",
    preparation: "Baked to order",
    price: 38,
    category: "desserts",
    image: "/images/menu/chocolate-souffle.jpg",
    dietary: ["vegetarian"],
    pairingSuggestion: "Port, Dessert Wine",
    chefRecommended: true,
    seasonal: false,
    available: true,
  },
  {
    id: "dessert-2",
    name: "Crème Brûlée",
    description: "Classic vanilla bean crème brûlée with a perfectly caramelized sugar top. Silky smooth custard, served with seasonal berries and a delicate tuile cookie.",
    price: 32,
    category: "desserts",
    image: "/images/menu/creme-brulee.jpg",
    dietary: ["vegetarian", "gluten-free"],
    pairingSuggestion: "Sauternes, Moscato",
    chefRecommended: false,
    seasonal: false,
    available: true,
  },

  // Beverages & Wine List
  {
    id: "bev-1",
    name: "Wine Selection",
    description: "Curated selection of fine wines from around the world. Our sommelier is available to assist with pairings. Ask for our wine list.",
    price: 0,
    category: "beverages",
    image: "/images/menu/wine-selection.jpg",
    dietary: ["gluten-free"],
    pairingSuggestion: null,
    chefRecommended: false,
    seasonal: false,
    available: true,
  },
]

