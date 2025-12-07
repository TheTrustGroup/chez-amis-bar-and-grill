"use client"

import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { menuCategories } from "@/lib/data/menuData"
import { beverageCategories } from "@/lib/data/beverages"

export function PrintMenu() {
  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // In production, this would generate a PDF
    // For now, we'll use the browser's print to PDF functionality
    window.print()
  }

  return (
    <div className="flex gap-3 mb-8">
      <Button
        onClick={handlePrint}
        variant="outline"
        className="border-amber-500 text-amber-700 hover:bg-amber-50"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print Menu
      </Button>
      <Button
        onClick={handleDownloadPDF}
        variant="outline"
        className="border-amber-500 text-amber-700 hover:bg-amber-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
    </div>
  )
}

