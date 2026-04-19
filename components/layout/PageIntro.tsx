"use client"

import { cn } from "@/lib/utils"

type PageIntroProps = {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageIntro({ title, description, className, children }: PageIntroProps) {
  return (
    <section className={cn("border-b border-border/70 bg-background/95", className)}>
      <div className="section-shell-inner py-10 md:py-14">
        <div className="max-w-3xl space-y-3 md:space-y-4">
          <h1 className="nav-page-heading text-foreground">{title}</h1>
          {description ? <p className="nav-page-subheading text-muted-foreground">{description}</p> : null}
          {children}
        </div>
      </div>
    </section>
  )
}
