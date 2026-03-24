import { JsonLd } from '@/components/seo/JsonLd'
import {
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildRestaurantJsonLd,
} from '@/lib/seo/jsonLd'

/** Home page: Restaurant + Organization + single-item breadcrumb */
export function RestaurantJsonLd() {
  return (
    <>
      <JsonLd data={buildRestaurantJsonLd()} />
      <JsonLd data={buildOrganizationJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }])}
      />
    </>
  )
}
