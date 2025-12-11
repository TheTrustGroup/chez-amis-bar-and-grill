import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import { Montserrat } from "next/font/google"
import { Lora } from "next/font/google"
import { Italiana } from "next/font/google"
import "@/styles/globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BottomNavigation } from "@/components/mobile/BottomNavigation"
import { CartProvider } from "@/lib/context/CartContext"
import { ToastContainer } from "@/components/ui/toast"
import { ConditionalLayout } from "@/components/layout/ConditionalLayout"

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap", // Ensures fonts load while showing fallback
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
})

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap", // Ensures fonts load while showing fallback
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
})

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap", // Ensures fonts load while showing fallback
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
})

const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap", // Ensures fonts load while showing fallback
  preload: true,
  fallback: ["Brush Script MT", "cursive"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://chezamis.com'),
  title: {
    default: "Chez Amis Restaurant",
    template: "%s | Chez Amis Restaurant"
  },
  description: "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, reservations, and private events. Open daily 9:30 AM - 12 AM.",
  keywords: [
    "Chez Amis",
    "restaurant Accra",
    "fine dining Accra",
    "Attieke Accra",
    "Ivorian restaurant Ghana",
    "Ghanaian restaurant",
    "West African cuisine",
    "premium dining Accra",
    "restaurant reservations Accra",
    "private dining Accra",
    "catering Accra",
    "Bar and Grill Accra",
    "East Legon restaurant",
    "Boundary Road restaurant",
    "best restaurant Accra",
    "gourmet food Ghana",
    "culinary experience Accra"
  ],
  authors: [{ name: "Chez Amis Bar and Grill" }],
  creator: "Chez Amis Bar and Grill",
  publisher: "Chez Amis Bar and Grill",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://chezamis.com",
    siteName: "Chez Amis Restaurant",
    title: "Chez Amis Restaurant",
    description: "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, and private events.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chez Amis Bar and Grill - Premium Dining Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chez Amis Restaurant",
    description: "Experience exceptional culinary artistry and warm hospitality. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine.",
    images: ["/images/og-image.jpg"],
    creator: "@chezamisrestaurant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://chezamis.com",
  },
  // Comprehensive favicon configuration for all platforms
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for better performance */}
        <link
          rel="preload"
          href="/_next/static/media/acaa31bcd8de99a2-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/5c0c2bcbaa4149ca-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cormorantGaramond.variable} ${montserrat.variable} ${lora.variable} ${italiana.variable} font-body`}>
        <CartProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  )
}
