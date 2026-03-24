import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
      />
      {children}
    </>
  )
}
