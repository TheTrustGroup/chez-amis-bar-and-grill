import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      {children}
    </>
  )
}
