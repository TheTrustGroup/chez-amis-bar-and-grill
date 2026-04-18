import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  trendTone?: 'positive' | 'negative' | 'neutral'
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendTone = 'neutral',
}: StatCardProps) {
  return (
    <div className="ui-panel">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-terra-100 text-terra-700">
          <Icon className="h-5 w-5" />
        </span>
        {trend ? (
          <span
            className={
              trendTone === 'positive'
                ? 'text-xs font-semibold text-green-700'
                : trendTone === 'negative'
                  ? 'text-xs font-semibold text-red-700'
                  : 'text-xs font-semibold text-muted-foreground'
            }
          >
            {trend}
          </span>
        ) : null}
      </div>
      <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
