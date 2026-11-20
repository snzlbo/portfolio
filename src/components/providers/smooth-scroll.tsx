"use client"

import { ReactLenis } from "lenis/react"
import { useReducedMotion } from "motion/react"

/** Lenis smooth scrolling, switched off for people who prefer reduced motion. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <>{children}</>

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  )
}
