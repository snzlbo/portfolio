"use client"

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"

import { stackVisual, type Layer } from "@/content/stack"
import { useFinePointer } from "@/hooks/use-fine-pointer"
import { cn } from "@/lib/utils"

interface StackVisualProps {
  active: Layer
  onHover: (layer: Layer) => void
}

/** Five isometric slabs, one per layer of the stack. The active one lifts and glows. */
export function StackVisual({ active, onHover }: StackVisualProps) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateZ = useSpring(useTransform(px, [-0.5, 0.5], [-53, -37]), {
    stiffness: 80,
    damping: 20,
  })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [63, 53]), {
    stiffness: 80,
    damping: 20,
  })

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      className="relative grid h-[380px] place-items-center [perspective:1600px] sm:h-[440px] lg:h-[520px]"
    >
      <motion.div
        style={{ rotateX, rotateZ, transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative mt-28 size-[200px] [--gap:44px] sm:size-[240px] sm:[--gap:50px] lg:mt-36 lg:size-[320px] lg:[--gap:62px]"
      >
        {stackVisual.map(({ layer, caption }, i) => {
          const isActive = layer === active
          return (
            <motion.div
              key={layer}
              onPointerEnter={() => onHover(layer)}
              style={{ transform: `translateZ(calc(${i} * var(--gap) + ${isActive ? 22 : 0}px))` }}
              className={cn(
                "absolute inset-0 flex flex-col justify-end gap-0.5 border p-4 transition-[transform,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                "bg-[linear-gradient(rgb(255_255_255/.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.05)_1px,transparent_1px)] bg-[size:32px_32px]",
                isActive
                  ? "border-brand bg-brand/15 shadow-[0_0_80px_color-mix(in_oklab,var(--brand)_28%,transparent)]"
                  : "border-line-strong bg-card/85",
              )}
            >
              <span
                className={cn(
                  "font-display text-[15px] font-bold tracking-tight transition-colors lg:text-[19px]",
                  isActive && "text-brand",
                )}
              >
                {layer}
              </span>
              <span className="hidden font-mono text-[12px] whitespace-nowrap text-muted-foreground sm:block">
                {caption}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
