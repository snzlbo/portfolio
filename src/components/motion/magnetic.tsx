"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { useFinePointer } from "@/hooks/use-fine-pointer"
import { magnetOffset } from "@/lib/math"

/** Pulls its child gently toward the pointer, then springs back. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const enabled = fine && !reduce

  const onPointerMove = (event: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const offset = magnetOffset(
      ref.current.getBoundingClientRect(),
      event.clientX,
      event.clientY,
      strength,
    )
    x.set(offset.x)
    y.set(offset.y)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={className ?? "inline-flex"}
    >
      {children}
    </motion.div>
  )
}
