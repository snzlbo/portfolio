"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface TextRevealProps {
  /** Each entry is one line; it slides up from behind a mask. */
  lines: React.ReactNode[]
  as?: "h1" | "h2" | "p"
  className?: string
  lineClassName?: string
  /** Animate on mount instead of on scroll (for the hero). */
  immediate?: boolean
}

export function TextReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  immediate = false,
}: TextRevealProps) {
  const Tag = motion[as]
  const trigger = immediate ? { animate: "visible" } : { whileInView: "visible" }

  return (
    <Tag
      initial="hidden"
      {...trigger}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.1, delayChildren: immediate ? 0.15 : 0 }}
      className={className}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{ hidden: { y: "112%" }, visible: { y: 0 } }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
