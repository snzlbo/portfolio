"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { useFinePointer } from "@/hooks/use-fine-pointer"
import { cn } from "@/lib/utils"

type CursorState = "idle" | "link" | "view"

/**
 * Accent ring that trails the mouse. Grows over links, and over anything with
 * data-cursor="View" it fills in and shows that label. Mouse only.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const [visible, setVisible] = React.useState(false)
  const [state, setState] = React.useState<CursorState>("idle")
  const [label, setLabel] = React.useState("")
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.5 })
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.5 })

  React.useEffect(() => {
    if (!fine || reduce) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target as Element | null
      const view = target?.closest<HTMLElement>("[data-cursor]")
      if (view) {
        setState("view")
        setLabel(view.dataset.cursor ?? "")
      } else {
        setState(target?.closest("a, button, [role='button']") ? "link" : "idle")
        setLabel("")
      }
    }
    const onLeave = () => setVisible(false)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  const size = state === "view" ? 92 : state === "link" ? 56 : 36

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed top-0 left-0 z-[70]"
    >
      <motion.div
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className={cn(
          "grid place-items-center rounded-full border-[1.5px] border-brand transition-colors",
          state === "link" && "bg-brand/15",
          state === "view" && "bg-brand",
        )}
      >
        <AnimatePresence>
          {state === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-xs font-bold tracking-wider text-background uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
