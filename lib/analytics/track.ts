/**
 * Fires analytics events when gtag (GA4) or dataLayer (GTM) is present.
 * Safe on server and when no analytics script is installed.
 */

declare global {
  interface Window {
    /** Google Analytics / gtag.js */
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return
  const clean = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined)
      ) as Record<string, string | number | boolean>
    : undefined

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, clean ?? {})
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...clean })
    }
  } catch {
    // ignore analytics failures
  }
}
