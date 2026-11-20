"use client"

import * as React from "react"
import { toast } from "sonner"

import { site } from "@/content/site"

/** Copies the contact email and reports the result with a toast. */
export function useCopyEmail() {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      toast("Email copied")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast(site.email)
    }
  }, [])

  return { copy, copied }
}
