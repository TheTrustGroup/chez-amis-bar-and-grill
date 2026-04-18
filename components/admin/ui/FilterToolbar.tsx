import type { ReactNode } from 'react'

interface FilterToolbarProps {
  children: ReactNode
}

export function FilterToolbar({ children }: FilterToolbarProps) {
  return <div className="ui-panel"><div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">{children}</div></div>
}
