"use client"

import { MotionConfig } from "motion/react"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AccentProvider } from "./accent-provider"
import { SmoothScroll } from "./smooth-scroll"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <AccentProvider>
        <TooltipProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />
        </TooltipProvider>
      </AccentProvider>
    </MotionConfig>
  )
}
