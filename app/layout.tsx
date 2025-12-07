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

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Chez Amis Bar and Grill | Premium Dining Experience",
  description: "Experience exceptional culinary artistry and warm hospitality in the heart of Accra. Where every meal is a celebration of flavor and elegance.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${montserrat.variable} ${lora.variable} ${italiana.variable} font-body`}>
        <CartProvider>
          <Header />
          <main id="main-content" className="min-h-screen mobile-bottom-padding">{children}</main>
          <Footer />
          <BottomNavigation />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  )
}

