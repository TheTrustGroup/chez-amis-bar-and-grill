/**
 * Single source of truth for public contact info (phones, email, address).
 * Import from here in UI; keep env-specific overrides in API routes only.
 */

export const SITE_EMAIL = "chez@chezamisrestaurant.com" as const

export const SITE_ADDRESS_LINES = ["40 Boundary Rd", "Accra, Ghana"] as const

export type PhoneLine = {
  id: string
  label: string
  /** Local display e.g. 055 703 2312 */
  display: string
  /** E.164 without spaces */
  tel: string
}

/** All published lines (contact page, visit section, FAQ copy, etc.) */
export const PHONE_LINES: PhoneLine[] = [
  { id: "main", label: "Main Line", display: "055 703 2312", tel: "+233557032312" },
  {
    id: "reservations",
    label: "Reservations",
    display: "055 703 2335",
    tel: "+233557032335",
  },
  { id: "whatsapp", label: "WhatsApp", display: "024 395 2339", tel: "+233243952339" },
  { id: "events", label: "Events", display: "050 243 2037", tel: "+233502432037" },
]

/** Footer and compact blocks: two primary numbers + “view all” on /contact */
export const FOOTER_PHONE_LINES: PhoneLine[] = PHONE_LINES.filter((p) =>
  ["main", "reservations"].includes(p.id)
)

export const PRIMARY_PHONE = PHONE_LINES[0]
/** Change the WhatsApp line in `PHONE_LINES` (id: "whatsapp") to update this globally. */
export const WHATSAPP_PHONE =
  PHONE_LINES.find((line) => line.id === "whatsapp") ?? PRIMARY_PHONE

const getWhatsAppDigits = (tel: string) => tel.replace(/\D/g, "")

export const WHATSAPP_NUMBER_DIGITS = getWhatsAppDigits(WHATSAPP_PHONE.tel)

/** Default prefilled message used by floating and fallback WhatsApp CTAs. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Chez Amis, I'd like to make an order or reservation." as const

/** Build wa.me links from one source to avoid hardcoded numbers/messages in UI files. */
export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(message)}`
}

/** Single string for print headers, etc. */
export const PHONE_DISPLAY_ALL = PHONE_LINES.map((p) => p.display).join(" · ")

/** Comma-separated for sentences (FAQ, etc.) */
export const PHONE_DISPLAY_COMMA = PHONE_LINES.map((p) => p.display).join(", ")

/** Cart / selection review. Legacy `/order-summary` redirects here (see next.config). */
export const CART_PATH = "/cart" as const

/** Checkout flow after cart review */
export const CHECKOUT_PATH = "/place-order" as const
