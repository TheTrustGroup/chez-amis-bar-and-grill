import type { MenuItem } from '@/lib/data/menuData'
import { PHONE_LINES } from '@/lib/data/siteContact'
import { SITE_URL } from '@/lib/seo/site'
import { openingHoursSpecificationSchema } from '@/lib/utils/restaurantHours'

function absUrl(path: string): string {
  if (path.startsWith('http')) return path
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${p}`
}

export function buildRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Chez Amis Bar and Grill',
    image: [`${SITE_URL}/media/images/img-0821-2.jpg`],
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: PHONE_LINES.map((p) => p.tel),
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '40 Boundary Rd',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.6037,
      longitude: -0.187,
    },
    openingHoursSpecification: openingHoursSpecificationSchema,
    servesCuisine: ['Ivorian', 'Ghanaian', 'West African', 'Fusion', 'Ivorian-Ghanaian Fusion'],
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: true,
    description:
      'Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, and private events.',
    // Keep in sync with verifiable third-party reviews (e.g. Google Business).
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '2500',
    },
    sameAs: [
      'https://www.instagram.com/chez_amis_restaurant',
      'https://www.snapchat.com/add/chez_amis',
      'https://www.tiktok.com/@chezamisrestaurant',
    ],
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chez Amis Bar and Grill',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/media/images/img-0821-2.jpg`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+233557032312',
        contactType: 'customer service',
        areaServed: 'GH',
        availableLanguage: ['en', 'fr'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+233557032335',
        contactType: 'reservations',
        areaServed: 'GH',
        availableLanguage: ['en', 'fr'],
      },
    ],
    sameAs: [
      'https://www.instagram.com/chez_amis_restaurant',
      'https://www.snapchat.com/add/chez_amis',
      'https://www.tiktok.com/@chezamisrestaurant',
    ],
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function buildMenuSectionJsonLd(items: MenuItem[]): Record<string, unknown> {
  const hasMenuItem = items.map((item) => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    image: absUrl(item.image),
    offers: {
      '@type': 'Offer',
      price: String(item.price),
      priceCurrency: 'GHS',
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'MenuSection',
    name: "Chef's selections",
    description: 'Featured dishes from the Chez Amis menu.',
    hasMenuItem,
  }
}
