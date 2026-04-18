"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const WHATSAPP_LINK =
  "https://wa.me/233243952339?text=Hello%20Chez%20Amis%2C%20I%27d%20like%20to%20make%20an%20order%20or%20reservation."

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Chez Amis on WhatsApp"
      className={cn(
        "fixed right-4 z-[95] inline-flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-xl transition-transform duration-200",
        "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]",
        "bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-6"
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
