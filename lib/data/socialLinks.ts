export type SocialPlatform = "instagram" | "facebook" | "snapchat" | "tiktok"

export type SocialLink = {
  id: SocialPlatform
  label: string
  href: string
  active: boolean
}

/**
 * Update social links here only.
 * - Set `active: true/false` to control visibility across header/footer.
 * - Keep one entry per platform; rendering uses dedupe guard as backup.
 */
const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/chez_amis_restaurant?igsh=dWFmbnA5MzlqaWk5",
    active: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1Eh4cywpM5/?mibextid=wwXIfr",
    active: true,
  },
  {
    id: "snapchat",
    label: "Snapchat",
    href: "https://www.snapchat.com/add/chez_amis",
    active: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@chezamisrestaurant?_r=1&_t=ZM-920yX90ahAW",
    active: true,
  },
]

export function getActiveSocialLinks(
  allowedIds?: SocialPlatform[],
): SocialLink[] {
  const links = SOCIAL_LINKS.filter((link) => link.active)
  const scoped = allowedIds
    ? links.filter((link) => allowedIds.includes(link.id))
    : links

  // Guard against accidental duplicates if entries are edited later.
  const seen = new Set<string>()
  return scoped.filter((link) => {
    const key = `${link.id}:${link.href}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
