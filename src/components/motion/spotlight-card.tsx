"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A card with a soft accent glow and a lit border that follow the pointer.
 * Pure CSS driven by two custom properties, so it costs nothing when idle.
 */
export function SpotlightCard({ className, children, ...props }: React.ComponentProps<"div">) {
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`)
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-lg border bg-card",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:bg-[radial-gradient(460px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--brand)_14%,transparent),transparent_62%)]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent opacity-0 transition-opacity duration-500 [background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),var(--brand),transparent_70%)_border-box] [mask:linear-gradient(#000_0_0)_padding-box_exclude,linear-gradient(#000_0_0)] group-hover/spot:opacity-100"
      />
      {children}
    </div>
  )
}
