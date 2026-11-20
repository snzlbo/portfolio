import { RevealItem } from "@/components/motion/reveal"
import { experience } from "@/content/experience"
import { SectionHeading } from "./section-heading"

export function Experience() {
  return (
    <section id="experience" className="container-page scroll-mt-24 py-20 md:py-36">
      <SectionHeading index="05" label="Experience" lines={["Experience"]} />
      <ol className="border-t border-line-strong">
        {experience.map((item) => (
          <RevealItem
            key={`${item.period}-${item.title}`}
            className="group relative isolate -mx-4 grid gap-x-10 gap-y-2.5 border-b px-4 py-6 transition-colors duration-500 md:grid-cols-[170px_minmax(0,1fr)_minmax(0,1fr)] md:py-8 [@media(hover:hover)]:hover:text-background"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] [@media(hover:hover)]:group-hover:scale-y-100"
            />
            <span className="pt-1.5 font-mono text-sm text-muted-foreground transition-colors [@media(hover:hover)]:group-hover:text-[#23262c]">
              {item.period}
            </span>
            <div>
              <h3 className="text-[clamp(20px,2vw,26px)] leading-snug font-semibold">
                {item.title}
              </h3>
              <span className="text-base text-muted-foreground transition-colors [@media(hover:hover)]:group-hover:text-[#23262c]">
                {item.org}
              </span>
            </div>
            <p className="text-base text-pretty">{item.summary}</p>
          </RevealItem>
        ))}
      </ol>
    </section>
  )
}
