"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { useAccent } from "@/components/providers/accent-provider"
import { createContourRenderer, type ContourRenderer } from "@/lib/shaders/contour"
import { hexToRgb } from "@/lib/text"
import { cn } from "@/lib/utils"

/** WebGL contour-line background. Falls back to the CSS dot grid if WebGL2 is missing. */
export function ContourBackground({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rendererRef = React.useRef<ContourRenderer | null>(null)
  const [ready, setReady] = React.useState(false)
  const reduce = useReducedMotion()
  const { accent } = useAccent()

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      rendererRef.current = createContourRenderer(canvas, { animate: !reduce })
      setReady(Boolean(rendererRef.current))
    } catch (error) {
      console.warn("Contour background disabled:", error)
    }
    return () => {
      rendererRef.current?.destroy()
      rendererRef.current = null
    }
  }, [reduce])

  React.useEffect(() => {
    const rgb = hexToRgb(accent)
    if (rgb) rendererRef.current?.setAccent(rgb)
  }, [accent, ready])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 size-full transition-opacity duration-[1400ms]",
        ready ? "opacity-55 lg:opacity-100" : "opacity-0",
        className,
      )}
    />
  )
}
