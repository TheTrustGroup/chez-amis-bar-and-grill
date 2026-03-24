/**
 * Full-bleed strip below hero — quick facts, mobile-first horizontal scroll.
 */
import { StarRating } from "@/components/ui/StarRating"

export function HeroIntroStrip() {
  const items = [
    "Est. 2024",
    "Bar & Grill",
    "Accra, Ghana",
  ] as const

  return (
    <section
      className="w-full border-y border-terra-600/20 bg-terra-500 py-3 text-white"
      aria-label="Restaurant at a glance"
    >
      <div className="section-shell-inner w-full">
        <ul className="scrollbar-hide flex snap-x snap-mandatory flex-wrap justify-center gap-3 overflow-x-auto pb-0.5 md:gap-4">
          {items.map((label) => (
            <li
              key={label}
              className="flex min-h-[48px] shrink-0 snap-center items-center rounded-full border border-white/20 bg-white/15 px-4 py-2 font-body text-xs font-medium uppercase tracking-wide"
            >
              {label}
            </li>
          ))}
          <li className="flex min-h-[48px] shrink-0 snap-center items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 font-body text-xs font-medium uppercase tracking-wide">
            <StarRating count={5} size={12} color="#FFFFFF" />
            <span>Accra&apos;s Finest</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
