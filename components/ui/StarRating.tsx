interface StarRatingProps {
  count?: number
  max?: number
  size?: number
  color?: string
}

export function StarRating({
  count = 5,
  max = 5,
  size = 16,
  color = "#C4622D",
}: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${count} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < count ? color : "none"}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}
