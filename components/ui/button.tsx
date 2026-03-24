import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-body font-medium tracking-widest uppercase text-xs ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation relative overflow-hidden group min-h-[48px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--btn-primary-hover)] shadow-[var(--shadow-green)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] px-8",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-[var(--btn-secondary-border)] bg-transparent text-[var(--btn-secondary-text)] hover:bg-green-50 hover:border-green-500 px-8",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 hover:scale-[1.05] active:scale-[0.95]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-all duration-200",
        premium:
          "bg-terra-500 text-white hover:bg-terra-600 shadow-[var(--shadow-terra)] hover:shadow-lg hover:-translate-y-0.5 border-0 px-8",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2.5 min-h-[44px]",
        lg: "px-10 py-4 min-h-[52px] text-sm",
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
            <span className="absolute inset-0 bg-terra-500/20 blur-xl group-hover:bg-terra-500/30 transition-colors duration-500 opacity-0 group-hover:opacity-100" />
          </>
        )}
        {/* Subtle shine for outline buttons */}
        {variant === "outline" && (
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-terra-500/10 to-transparent" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">{props.children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

