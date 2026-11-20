"use client"

import { Check, Copy } from "lucide-react"

import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"
import { Button } from "@/components/ui/button"
import { site } from "@/content/site"
import { useCopyEmail } from "@/hooks/use-copy-email"

export function Contact() {
  const { copy, copied } = useCopyEmail()

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-brand pt-24 pb-20 text-background selection:bg-background selection:text-brand md:pt-40 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgb(7_8_10/.16)_1.2px,transparent_1.2px)] bg-[size:28px_28px]"
      />
      <div className="relative container-page">
        <Reveal className="mb-8 text-[13px] font-bold tracking-[0.14em] uppercase md:mb-12">
          Open to Full-Stack, Software Engineer, Front-End and UI/UX roles in Toronto
        </Reveal>
        <TextReveal
          lines={["Let's build", <em key="em">something.</em>]}
          className="font-display text-[clamp(42px,9.4vw,148px)] leading-[0.98] font-extrabold tracking-[-0.035em] [&_em]:text-[1.08em]"
        />
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-x-12 gap-y-7 border-t-2 border-background pt-8 md:mt-16">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_2px] bg-bottom-left bg-no-repeat pb-1 font-display text-[clamp(18px,2.8vw,40px)] font-medium tracking-tight [overflow-wrap:anywhere] transition-[background-size] duration-500 hover:bg-[length:0_2px] hover:bg-bottom-right"
            >
              {site.email}
            </a>
            <Button variant="ink-outline" size="sm" onClick={copy} className="h-11">
              {copied ? <Check /> : <Copy />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild variant="ink-outline" size="lg">
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="ink-outline" size="lg">
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="ink" size="lg">
                <a href={site.resume} target="_blank" rel="noopener noreferrer">
                  Download résumé
                </a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
