"use client"

import { motion } from "motion/react"

const lines = [
  { text: "$ npm test", dim: true },
  { ok: true, name: "lib/math", detail: "tilt · magnet · clamp" },
  { ok: true, name: "lib/text", detail: "scramble · clock · color parsing" },
  { ok: true, name: "content", detail: "every project is complete" },
  { ok: true, name: "components", detail: "project card · command menu" },
  { done: true, text: "Test Files  all passed" },
]

/** A terminal that "runs" this repo's own test suite as it scrolls into view. */
export function TestTerminal() {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-lg border bg-[#050607]">
      <figcaption className="flex items-center gap-3.5 border-b px-4 py-3 font-mono text-xs text-muted-foreground">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-line-strong" />
          ))}
        </span>
        This site&apos;s own test suite (Vitest)
      </figcaption>
      <motion.pre
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.45, delayChildren: 0.3 }}
        aria-label="Vitest run for this website: all test files passing"
        className="flex-1 overflow-x-auto p-5 font-mono text-[clamp(12.5px,1.05vw,15px)] leading-loose sm:p-7"
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.01 }}
            className="block"
          >
            {"name" in line ? (
              <>
                <span className="text-brand">✓</span> {line.name?.padEnd(11)}
                <span className="text-dim">{line.detail}</span>
              </>
            ) : (
              <span className={line.dim ? "text-dim" : "text-brand"}>
                {line.text}
                {line.done && (
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-block h-[1.1em] w-[0.6em] animate-blink bg-brand align-[-0.2em]"
                  />
                )}
              </span>
            )}
          </motion.span>
        ))}
      </motion.pre>
    </figure>
  )
}
