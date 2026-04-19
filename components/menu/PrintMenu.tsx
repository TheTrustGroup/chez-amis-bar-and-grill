"use client"

import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PrintMenuProps = {
  /** Ghost single-button style for menu hero (top-right). */
  variant?: "default" | "header"
}

export function PrintMenu({ variant = "default" }: PrintMenuProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  if (variant === "header") {
    return (
      <Button
        type="button"
        onClick={handlePrint}
        variant="ghost"
        className={cn(
          "min-h-[44px] touch-manipulation",
          "border border-terra-500/40 text-terra-600 dark:text-terra-400",
          "md:hover:bg-terra-500/10 font-body uppercase tracking-widest text-xs",
        )}
      >
        <Printer className="w-4 h-4 mr-2 shrink-0" aria-hidden />
        Print menu
      </Button>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button
        onClick={handlePrint}
        variant="outline"
        className="border-terra-500/50 text-foreground md:hover:bg-terra-500/10"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print Menu
      </Button>
      <Button
        onClick={handleDownloadPDF}
        variant="outline"
        className="border-terra-500/50 text-foreground md:hover:bg-terra-500/10"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
    </div>
  )
}
