import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      {children}
    </>
  )
}
