import { cn } from '@/lib/utils'

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface StatusBadgeProps {
  label: string
  tone?: StatusTone
  className?: string
}

const toneClassMap: Record<StatusTone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
}

export function StatusBadge({ label, tone = 'neutral', className }: StatusBadgeProps) {
  return <span className={cn('ui-status-pill', toneClassMap[tone], className)}>{label}</span>
}
