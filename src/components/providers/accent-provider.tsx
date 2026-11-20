"use client"

import * as React from "react"

import { accents } from "@/content/site"

export const ACCENT_STORAGE_KEY = "sa-accent"
const STORAGE_KEY = ACCENT_STORAGE_KEY
const DEFAULT_ACCENT = accents[0].value

/**
 * Inline script for <head>: applies the saved accent before first paint so a returning
 * visitor never sees the default colour flash. Keep the logic in sync with readSavedAccent.
 */
export const accentInitScript = `(function(){try{var a=${JSON.stringify(
  accents.map((a) => a.value),
)};var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(s&&a.indexOf(s)>-1)document.documentElement.style.setProperty("--brand",s)}catch(e){}})()`

function readSavedAccent(): string {
  if (typeof window === "undefined") return DEFAULT_ACCENT
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && accents.some((a) => a.value === saved)) return saved
  } catch {
    // Storage can be unavailable (private mode, sandboxed frames); the default is fine.
  }
  return DEFAULT_ACCENT
}

interface AccentContextValue {
  accent: string
  setAccent: (value: string) => void
}

const AccentContext = React.createContext<AccentContextValue | null>(null)

/** Holds the switchable brand colour, mirrors it to the --brand CSS variable and remembers it. */
export function AccentProvider({ children }: { children: React.ReactNode }) {
  // Read synchronously so the first client render already has the saved accent; nothing
  // in the server markup depends on it, so this can't cause a hydration mismatch.
  const [accent, setAccentState] = React.useState<string>(readSavedAccent)

  React.useEffect(() => {
    document.documentElement.style.setProperty("--brand", accent)
  }, [accent])

  const setAccent = React.useCallback((value: string) => {
    setAccentState(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }, [])

  const value = React.useMemo(() => ({ accent, setAccent }), [accent, setAccent])
  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
}

export function useAccent() {
  const context = React.useContext(AccentContext)
  if (!context) throw new Error("useAccent must be used inside <AccentProvider>")
  return context
}
