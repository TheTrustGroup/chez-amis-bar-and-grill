import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu - Attieke & Fine Dining",
  description: "Explore our signature Attieke dishes and diverse menu featuring grilled specialties, fresh seafood, and Ghanaian-inspired cuisine at Chez Amis in Accra. Our signature Attieke with grilled tilapia, chicken, and more.",
  keywords: "Attieke Accra, Ghanaian restaurant, fine dining Accra, grilled tilapia, West African cuisine, signature Attieke, Chez Amis menu",
  openGraph: {
    title: "Menu - Attieke & Fine Dining | Chez Amis Bar and Grill",
    description: "Explore our signature Attieke dishes and diverse menu featuring grilled specialties, fresh seafood, and Ghanaian-inspired cuisine.",
    type: "website",
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

