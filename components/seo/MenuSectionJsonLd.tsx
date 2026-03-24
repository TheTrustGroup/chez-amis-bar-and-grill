import { JsonLd } from '@/components/seo/JsonLd'
import type { MenuItem } from '@/lib/data/menuData'
import { buildMenuSectionJsonLd } from '@/lib/seo/jsonLd'

export function MenuSectionJsonLd({ items }: { items: MenuItem[] }) {
  return <JsonLd data={buildMenuSectionJsonLd(items)} />
}
