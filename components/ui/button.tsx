import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base md:text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-border/50 bg-background hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/80 hover:border-gold-500/50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 hover:scale-[1.05] active:scale-[0.95]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-all duration-200",
        premium: "bg-gradient-to-r from-gold-500 via-gold-500 to-gold-600 text-charcoal-900 hover:from-gold-400 hover:via-gold-400 hover:to-gold-500 active:from-gold-600 active:via-gold-600 active:to-gold-700 shadow-xl hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-[1.05] active:scale-[0.98] hover:-translate-y-1 font-bold border-2 border-gold-400/30",
      },
      size: {
        default: "h-11 md:h-10 px-4 py-2 min-h-[44px]",
        sm: "h-10 md:h-9 rounded-md px-3 min-h-[44px]",
        lg: "h-14 md:h-12 rounded-lg px-8 md:px-10 py-4 md:py-5 min-h-[52px] md:min-h-[56px] text-base md:text-lg",
        icon: "h-11 w-11 md:h-10 md:w-10 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shine effect on hover for premium buttons */}
        {variant === "premium" && (
          <>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Subtle glow effect */}
            <span className="absolute inset-0 bg-gold-500/20 blur-xl group-hover:bg-gold-500/30 transition-colors duration-500 opacity-0 group-hover:opacity-100" />
          </>
        )}
        {/* Subtle shine for outline buttons */}
        {variant === "outline" && (
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">{props.children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

