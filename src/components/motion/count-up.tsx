"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({ value, duration = 1.4 }: { value: number; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  React.useEffect(() => {
    const node = ref.current
    if (!inView || !node || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString()
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  // Server-render the final number so it is correct without JavaScript.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}
