"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { useToast } from "@/lib/hooks/useCart"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

export function ToastContainer() {
  const { subscribe, removeToast } = useToast()
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    return subscribe(setToasts)
  }, [subscribe])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full sm:w-auto">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm animate-fade-in-up",
            toast.type === "success" &&
              "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
            toast.type === "error" &&
              "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100",
            toast.type === "info" &&
              "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100"
          )}
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === "success" && <CheckCircle2 className="h-5 w-5" />}
            {toast.type === "error" && <AlertCircle className="h-5 w-5" />}
            {toast.type === "info" && <Info className="h-5 w-5" />}
          </div>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}



