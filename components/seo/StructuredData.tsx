"use client"

export function StructuredData() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Chez Amis Bar and Grill",
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}/images/hero-background.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}/images/og-image.jpg`
    ],
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}`,
    "telephone": "+233243952339",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "40 Boundary Rd",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra",
      "addressCountry": "GH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "5.6037",
      "longitude": "-0.1870"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:30",
        "closes": "00:00"
      }
    ],
    "servesCuisine": [
      "Ivorian",
      "Ghanaian",
      "West African",
      "Fusion",
      "Ivorian-Ghanaian Fusion"
    ],
    "menu": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}/menu`,
    "acceptsReservations": "True",
    "hasMenu": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}/menu`,
    "description": "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, and private events.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "2500"
    },
    "sameAs": [
      "https://www.instagram.com/chez_amis_restaurant",
      "https://www.snapchat.com/add/chez_amis",
      "https://www.tiktok.com/@chezamisrestaurant"
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chez Amis Bar and Grill",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}`,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+233243952339",
      "contactType": "Customer Service",
      "areaServed": "GH",
      "availableLanguage": ["en", "fr"]
    },
    "sameAs": [
      "https://www.instagram.com/chez_amis_restaurant",
      "https://www.snapchat.com/add/chez_amis",
      "https://www.tiktok.com/@chezamisrestaurant"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

