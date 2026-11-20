import Image from "next/image"

import { Reveal } from "@/components/motion/reveal"

export function About() {
  return (
    <section id="about" className="container-page scroll-mt-24 py-14 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-24">
        <Reveal className="relative aspect-4/5 max-w-75 overflow-hidden rounded-t-full rounded-b-md border border-line-strong bg-card md:max-w-none">
          <Image
            src="/profile.png"
            alt="Portrait of Sainzolboo Anujin"
            fill
            sizes="(min-width: 768px) 360px, 300px"
            className="object-cover object-[50%_70%]"
          />
        </Reveal>

        <div className="flex flex-col gap-7">
          <Reveal className="font-mono text-[13px] font-semibold tracking-wider text-brand uppercase">
            04 — About
          </Reveal>
          <Reveal>
            <p className="font-serif text-[clamp(26px,3vw,44px)] leading-[1.18] tracking-[-0.01em] text-pretty">
              I started as a UI/UX intern in Ulaanbaatar, joined a start-up at its MVP stage and
              grew with it into senior engineering, then led engineers and designers building AI
              products for Japanese enterprise clients. I moved to Canada for an MSc in Computer
              Science focused on AI, and I&apos;m now looking for a full-stack role in Toronto.
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono text-[13px] tracking-wider text-muted-foreground uppercase">
            <span>Ulaanbaatar</span>
            <span
              aria-hidden="true"
              className="h-px w-16 bg-[linear-gradient(90deg,var(--line-strong)_50%,transparent_50%)] bg-size-[8px_1px]"
            />
            <span>Thunder Bay</span>
            <span
              aria-hidden="true"
              className="h-px w-16 bg-[linear-gradient(90deg,var(--line-strong)_50%,transparent_50%)] bg-size-[8px_1px]"
            />
            <span className="rounded-sm bg-brand px-2.5 py-0.5 font-semibold text-background">
              Toronto
            </span>
          </Reveal>
          <Reveal>
            <dl className="grid gap-x-10 gap-y-5 border-t pt-6 sm:grid-cols-2">
              <div>
                <dt className="mb-1.5 text-[13px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Languages
                </dt>
                <dd className="text-lg">English and Mongolian</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-[13px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Also
                </dt>
                <dd className="text-lg">
                  Copyright holder of a Mongolian hyphenation algorithm used in publishing
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
