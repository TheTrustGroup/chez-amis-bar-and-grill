"use client"

import { cn } from "@/lib/utils"

interface MenuCategoryProps {
  name: string
  description?: string
  className?: string
}

export function MenuCategory({ name, description, className }: MenuCategoryProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-foreground">
          {name}
        </h2>
        {/* Decorative underline */}
        <div className="flex-1 h-px bg-gradient-to-r from-gold-500 via-gold-500/50 to-transparent"></div>
      </div>
      {description && (
        <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}



