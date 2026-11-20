import { Reveal } from "@/components/motion/reveal"
import { SpotlightCard } from "@/components/motion/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { aiTools, workflowSteps } from "@/content/ai-workflow"
import { indexLabel } from "@/lib/text"
import { SectionHeading } from "./section-heading"
import { TestTerminal } from "./test-terminal"

export function AiWorkflow() {
  return (
    <section id="ai" className="scroll-mt-24 border-y bg-surface py-20 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="02"
          label="AI workflow"
          lines={["AI in the loop,", <em key="em">every day.</em>]}
          lede="AI tools are part of how I work, not a side project. They take the repetitive parts so my time goes to design decisions, architecture and review."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {aiTools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col gap-4 bg-secondary p-6 sm:p-8">
                <Badge variant="mono">Daily</Badge>
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {tool.name}
                </h3>
                <p className="text-base text-pretty text-muted-foreground">{tool.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal>
            <ol
              aria-label="How a feature moves through my workflow"
              className="flex h-full flex-col rounded-lg border bg-secondary p-5 sm:p-7"
            >
              {workflowSteps.map((item, i) => (
                <li
                  key={item.step}
                  className="relative flex min-h-13 items-center justify-between gap-4 border-b py-3 pl-13 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-0 grid size-8.5 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-background font-mono text-[11px] text-muted-foreground"
                    style={{ animation: `workflow-step 7.2s ${i * 1.2}s infinite` }}
                  >
                    {indexLabel(i + 1)}
                  </span>
                  <span className="font-display text-[17px] font-medium">{item.step}</span>
                  <span className="text-right font-mono text-[13px] text-muted-foreground">
                    {item.tool}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <TestTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
