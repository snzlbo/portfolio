import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { facts } from "@/content/site"

export function Facts() {
  return (
    <section
      aria-label="At a glance"
      className="container-page grid grid-cols-2 gap-x-8 gap-y-9 border-b py-12 md:py-20 lg:grid-cols-4"
    >
      {facts.map((fact, i) => (
        <Reveal key={fact.label} delay={i * 0.08} className="flex flex-col gap-2.5">
          <span className="font-display text-[clamp(32px,4vw,58px)] leading-none font-bold tracking-tight">
            {fact.value === null ? fact.display : <CountUp value={fact.value} />}
            {"suffix" in fact && fact.suffix}
          </span>
          <span className="text-[15px] text-muted-foreground md:text-base">{fact.label}</span>
        </Reveal>
      ))}
    </section>
  )
}
