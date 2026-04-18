import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataSectionCardProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function DataSectionCard({
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName,
}: DataSectionCardProps) {
  return (
    <section className={cn('ui-panel p-0', className)}>
      <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      <div className={cn('p-4 md:p-5', contentClassName)}>{children}</div>
    </section>
  )
}
