'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BottomNavigation } from '@/components/mobile/BottomNavigation'

/**
 * Conditionally renders Header, Footer, and BottomNavigation
 * Hides them on admin routes to prevent overlap with admin dashboard
 */
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Don't render Header, Footer, or BottomNavigation on admin routes
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Render normal layout for all other routes
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen mobile-bottom-padding">{children}</main>
      <Footer />
      <BottomNavigation />
    </>
  )
}

