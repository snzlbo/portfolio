"use client"

import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number
  y?: number
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 28, className, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Same as <Reveal>, rendered as an <li> so it can sit directly inside a list. */
export function RevealItem({
  delay = 0,
  y = 28,
  className,
  children,
  ...props
}: HTMLMotionProps<"li"> & { delay?: number; y?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.li>
  )
}
