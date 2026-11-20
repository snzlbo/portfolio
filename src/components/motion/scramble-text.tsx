"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { scrambleFrame } from "@/lib/text"

interface ScrambleTextProps {
  words: readonly string[]
  /** Controlled index; when omitted the component cycles on its own. */
  index?: number
  interval?: number
  className?: string
}

/** Shows one word at a time, decoding each new word through random glyphs. */
export function ScrambleText({ words, index, interval = 2600, className }: ScrambleTextProps) {
  const reduce = useReducedMotion()
  const [ownIndex, setOwnIndex] = React.useState(0)
  const current = index ?? ownIndex
  const target = words[current % words.length] ?? ""
  const [text, setText] = React.useState(target)
  const previous = React.useRef(target)

  React.useEffect(() => {
    if (index !== undefined) return
    const id = window.setInterval(() => {
      if (!document.hidden) setOwnIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [index, interval, words.length])

  React.useEffect(() => {
    const from = previous.current
    previous.current = target
    if (reduce || from === target) {
      setText(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = (now - start) / 620
      setText(scrambleFrame(from, target, progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduce])

  return (
    <span className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{target}</span>
    </span>
  )
}
