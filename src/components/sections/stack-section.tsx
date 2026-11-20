import { Reveal } from "@/components/motion/reveal"
import { SpotlightCard } from "@/components/motion/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { stackGroups } from "@/content/stack"
import { indexLabel } from "@/lib/text"
import { SectionHeading } from "./section-heading"

export function StackSection() {
  return (
    <section id="stack" className="container-page scroll-mt-24 py-20 md:py-36">
      <SectionHeading
        index="01"
        label="Stack"
        lines={["The whole stack.", <em key="em">No handoffs.</em>]}
        lede="I don't have a favourite layer. I've led design teams and engineering teams, written the APIs behind my own interfaces, and deployed both to AWS. Each layer gets the same care."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.06} className="h-full">
            <SpotlightCard className="flex h-full flex-col gap-4 p-6 sm:p-8">
              <header className="flex items-baseline gap-3.5">
                <span className="font-mono text-[13px] text-brand">{indexLabel(i + 1)}</span>
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {group.title}
                </h3>
              </header>
              <p className="text-base text-pretty text-muted-foreground">{group.summary}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge className="transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
