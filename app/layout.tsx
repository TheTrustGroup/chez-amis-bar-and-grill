import type { Metadata } from "next"
import Script from "next/script"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import "@/styles/globals.css"
import { CartProvider } from "@/lib/context/CartContext"
import { ThemeProvider } from "@/lib/context/ThemeContext"
import { ToastContainer } from "@/components/ui/toast"
import { ConditionalLayout } from "@/components/layout/ConditionalLayout"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chezamisrestaurant.com"
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chez Amis Restaurant",
    template: "%s | Chez Amis Restaurant",
  },
  description:
    "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, reservations, and private events. Open 24 hours, 7 days a week.",
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
    "culinary experience Accra",
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
    url: siteUrl,
    siteName: "Chez Amis Restaurant",
    title: "Chez Amis Restaurant",
    description:
      "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine, fine dining, and private events.",
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
    description:
      "Experience exceptional culinary artistry and warm hospitality. Signature Attieke dishes, Ivorian-Ghanaian fusion cuisine.",
    images: ["/images/og-image.jpg"],
    creator: "@chezamisrestaurant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var resolvedTheme = theme === 'system' 
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : theme;
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-body antialiased`}>
        <ThemeProvider>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ToastContainer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
