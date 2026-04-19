import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ActionButtonTone = 'default' | 'primary' | 'danger' | 'ghost'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ActionButtonTone
  icon?: ReactNode
}

const toneClassMap: Record<ActionButtonTone, string> = {
  default: 'border-border text-foreground md:hover:bg-muted/40 active:bg-muted/40',
  primary: 'border-terra-500 text-terra-700 md:hover:bg-terra-50 active:bg-terra-50',
  danger: 'border-red-300 text-red-700 md:hover:bg-red-50 active:bg-red-50',
  ghost: 'border-transparent text-muted-foreground md:hover:bg-muted/30 md:hover:text-foreground active:bg-muted/30 active:text-foreground',
}

export function ActionButton({
  tone = 'default',
  icon,
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-60',
        toneClassMap[tone],
        className
      )}
      {...props}
    >
      {icon ? <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      {children}
    </button>
  )
}
