import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

interface SectionHeadingProps {
  index: string
  label: string
  lines: React.ReactNode[]
  lede?: string
}

/** The numbered heading block shared by every section on the home page. */
export function SectionHeading({ index, label, lines, lede }: SectionHeadingProps) {
  return (
    <header className="mb-10 grid items-end gap-x-14 gap-y-5 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <Reveal className="font-mono text-[13px] font-semibold tracking-wider text-brand uppercase md:col-span-2">
        {index} — {label}
      </Reveal>
      <TextReveal
        lines={lines}
        className="font-display text-[clamp(34px,5.6vw,84px)] leading-[1.04] font-bold tracking-[-0.03em] [&_em]:text-[1.1em] [&_em]:leading-[0.9] [&_em]:text-brand"
      />
      {lede && (
        <Reveal className="pb-2 text-[17px] text-pretty text-muted-foreground">{lede}</Reveal>
      )}
    </header>
  )
}
