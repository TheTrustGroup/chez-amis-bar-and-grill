import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonLd'

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  return <JsonLd data={buildBreadcrumbJsonLd(items)} />
}
