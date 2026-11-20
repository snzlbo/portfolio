"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"

import { ContourBackground } from "@/components/effects/contour-background"
import { Magnetic } from "@/components/motion/magnetic"
import { ScrambleText } from "@/components/motion/scramble-text"
import { TextReveal } from "@/components/motion/text-reveal"
import { Button } from "@/components/ui/button"
import { site } from "@/content/site"
import { layers, type Layer } from "@/content/stack"
import { clockIn } from "@/lib/text"
import { StackVisual } from "./stack-visual"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] as const },
})

export function Hero() {
  const [layerIndex, setLayerIndex] = React.useState(0)
  const [pausedUntil, setPausedUntil] = React.useState(0)
  const [time, setTime] = React.useState("")

  // Cycle through the layers; hovering a slab pauses the cycle for a few seconds.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() < pausedUntil) return
      setLayerIndex((i) => (i + 1) % layers.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [pausedUntil])

  React.useEffect(() => {
    const paint = () => setTime(clockIn(site.timeZone))
    paint()
    const id = window.setInterval(paint, 20_000)
    return () => window.clearInterval(id)
  }, [])

  const activeLayer = layers[layerIndex] as Layer
  const onHover = (layer: Layer) => {
    setLayerIndex(layers.indexOf(layer))
    setPausedUntil(Date.now() + 4000)
  }

  return (
    <section
      id="top"
      className="relative flex overflow-hidden pt-28 pb-16 lg:min-h-[min(100svh,980px)]"
    >
      <div className="absolute inset-0 dot-grid" aria-hidden="true" />
      <ContourBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-background"
      />

      <div className="relative container-page flex flex-col gap-8 lg:gap-14">
        <motion.div
          {...fadeUp(0)}
          className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
        >
          <span>Portfolio — {new Date().getFullYear()}</span>
          <span>
            {site.location}
            {time && <span className="ml-2 font-mono tracking-wide text-foreground">· {time}</span>}
          </span>
        </motion.div>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="flex min-w-0 flex-col items-start">
            <motion.p
              {...fadeUp(0.05)}
              className="mb-5 flex items-center gap-3 text-[15px] font-semibold tracking-[0.14em] text-brand uppercase before:h-0.5 before:w-9 before:bg-brand"
            >
              {site.name}
            </motion.p>

            <TextReveal
              as="h1"
              immediate
              lines={[
                "Full-Stack",
                <span key="dev" className="text-outline">
                  Developer
                </span>,
              ]}
              className="font-display text-[clamp(44px,8.6vw,132px)] leading-none font-extrabold tracking-[-0.035em]"
            />

            <motion.p
              {...fadeUp(0.35)}
              className="mt-6 flex min-h-11 flex-wrap items-center gap-x-4 gap-y-2 lg:mt-9"
            >
              <span className="flex items-center gap-3.5 text-[13px] font-semibold tracking-[0.14em] text-muted-foreground uppercase after:h-px after:w-10 after:bg-line-strong">
                Every layer
              </span>
              <span className="font-mono text-[clamp(20px,2.2vw,30px)] font-semibold whitespace-nowrap text-brand">
                <ScrambleText words={layers} index={layerIndex} />
                <span aria-hidden="true" className="animate-blink">
                  _
                </span>
              </span>
            </motion.p>

            <motion.p
              {...fadeUp(0.45)}
              className="mt-5 max-w-155 text-[clamp(17px,1.5vw,21px)] leading-relaxed text-pretty [&_em]:text-[1.2em] [&_em]:leading-tight"
            >
              Six years building e-commerce and AI products end to end:{" "}
              <em>
                the interface, the front end, the APIs, the AI features and the cloud they run on.
              </em>
            </motion.p>

            <motion.div {...fadeUp(0.55)} className="mt-8 flex w-full flex-wrap gap-3.5 sm:w-auto">
              <Magnetic className="flex-1 sm:flex-none">
                <Button asChild size="lg" className="w-full">
                  <Link href="#work">
                    See selected work <ArrowDown className="size-4.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic className="flex-1 sm:flex-none">
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="#contact">Get in touch</Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.3)}>
            <StackVisual active={activeLayer} onHover={onHover} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
