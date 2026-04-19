"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/data/siteContact"

const WHATSAPP_LINK = buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Chez Amis on WhatsApp"
      className={cn(
        "fixed right-3 z-[95] inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-xl transition-transform duration-200",
        "md:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]",
        "bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-5"
      )}
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  )
}
