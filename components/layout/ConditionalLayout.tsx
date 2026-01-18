'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BottomNavigation } from '@/components/mobile/BottomNavigation'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { initSmoothScroll } from '@/lib/utils/smoothScroll'

/**
 * Conditionally renders Header, Footer, and BottomNavigation
 * Hides them on admin routes to prevent overlap with admin dashboard
 * Initializes smooth scrolling for anchor links
 */
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Initialize smooth scroll for anchor links
  useEffect(() => {
    if (isAdminRoute) return
    
    const cleanup = initSmoothScroll({
      offset: 100, // Account for fixed header
      behavior: 'smooth',
    })

    return cleanup
  }, [isAdminRoute])

  // Don't render Header, Footer, or BottomNavigation on admin routes
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Render normal layout for all other routes
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="min-h-screen mobile-bottom-padding">{children}</main>
      <Footer />
      <BottomNavigation />
    </>
  )
}

