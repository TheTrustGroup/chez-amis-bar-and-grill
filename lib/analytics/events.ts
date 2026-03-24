import { trackEvent } from "./track"

export function trackReservationClick(source: string): void {
  trackEvent("cta_reservation", { source })
}

export function trackOrderClick(source: string): void {
  trackEvent("cta_order", { source })
}

export function trackMenuClick(source: string): void {
  trackEvent("cta_menu", { source })
}

export function trackPhoneClick(label: string): void {
  trackEvent("click_phone", { label })
}

export function trackDirectionsClick(source: string): void {
  trackEvent("click_directions", { source })
}

export function trackCartOpen(source: string): void {
  trackEvent("view_cart", { source })
}
