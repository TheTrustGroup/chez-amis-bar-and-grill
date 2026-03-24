'use client'

import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Keeps keyboard focus inside a container while active (e.g. modal / lightbox).
 * Pass `syncKey` when focusable children change (e.g. slide index).
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  syncKey?: number | string,
): void {
  useEffect(() => {
    if (!active || !containerRef.current) return

    const root = containerRef.current
    const getFocusable = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
      )

    const focusable = getFocusable()
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const prevActive = document.activeElement as HTMLElement | null

    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => {
      root.removeEventListener('keydown', onKeyDown)
      prevActive?.focus?.()
    }
  }, [active, containerRef, syncKey])
}
