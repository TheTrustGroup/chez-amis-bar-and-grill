"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
})

type FormData = z.infer<typeof schema>

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: FormData) => {
    setStatus("idle")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h4 className="text-lg font-display font-light text-white mb-2">
          Join our table
        </h4>
        <p className="text-sm text-white/70 font-body font-light mb-4">
          Exclusive offers and culinary updates
        </p>
      </div>

      {status === "success" ? (
        <div className="text-sm text-terra-400 font-body font-light" role="status">
          Thank you. Welcome to the Chez Amis family.
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
              placeholder="your.email@example.com"
              className="flex-1 bg-green-700/50 border-green-700 text-white placeholder:text-neutral-400/80 focus:border-terra-500/50 focus:ring-terra-500/20 font-body min-h-[44px]"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-terra-500 text-neutral-900 hover:bg-terra-600 active:bg-terra-700 font-body font-light tracking-wide px-6 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-terra-500 focus:ring-offset-2 focus:ring-offset-green-600"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      )}
    </form>
  )
}
