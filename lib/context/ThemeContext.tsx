"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("light")
  const [resolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Force a single visual mode for consistency across the app.
    const root = document.documentElement
    root.classList.remove("dark")
    localStorage.removeItem("theme")
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {}, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  
  // During SSR or when context is not available, return safe defaults
  if (context === undefined) {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // In browser but no provider - this shouldn't happen, but provide fallback
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      return {
        theme: "system" as Theme,
        setTheme: () => {},
        resolvedTheme: systemTheme,
      }
    }
    // During SSR, return light theme as default
    return {
      theme: "system" as Theme,
      setTheme: () => {},
      resolvedTheme: "light" as const,
    }
  }
  
  return context
}
