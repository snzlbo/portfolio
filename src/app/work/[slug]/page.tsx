import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"
import { ProjectCover } from "@/components/project/project-cover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getNextProject, getProject, projects } from "@/content/projects"
import { indexLabel } from "@/lib/text"
import { Fragment } from "react"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} case study`,
    description: project.summary,
    openGraph: { title: `${project.title} — case study`, description: project.summary },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const position = projects.indexOf(project) + 1
  const next = getNextProject(project.slug)
  const sections = [
    { title: "The problem", body: project.problem ? [project.problem] : [] },
    { title: "What I did", body: project.approach ?? [] },
    { title: "Outcome", body: project.outcome ? [project.outcome] : [] },
  ].filter((section) => section.body.length > 0)

  return (
    <article className="pt-19">
      <header className="dot-grid">
        <div className="container-page pt-10 pb-12 md:pt-16 md:pb-16">
          <Button asChild variant="outline" size="sm" className="mb-10 h-11">
            <Link href="/#work">
              <ArrowLeft /> All work
            </Link>
          </Button>
          <p className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-[13px] tracking-wider text-muted-foreground uppercase">
            <span>
              Case study <b className="font-semibold text-brand">{indexLabel(position)}</b> /{" "}
              {indexLabel(projects.length)}
            </span>
            <span>{project.kind}</span>
          </p>
          <TextReveal
            as="h1"
            immediate
            lines={[
              <Fragment key="case-study">
                {project.title}
                <span className="text-brand">.</span>
              </Fragment>,
            ]}
            className="mt-7 font-display text-[clamp(48px,12vw,190px)] leading-[0.98] font-extrabold tracking-[-0.04em] wrap-anywhere"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-255 font-serif text-[clamp(24px,3.2vw,46px)] leading-[1.14] text-pretty italic">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-line-strong pt-6 sm:grid-cols-2 lg:grid-cols-4">
              <MetaItem label="Role">{project.role}</MetaItem>
              {project.years && <MetaItem label="Timeline">{project.years}</MetaItem>}
              <MetaItem label="Stack">
                <span className="flex flex-wrap gap-1.5">
                  {project.stack.map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                  ))}
                </span>
              </MetaItem>
              {project.link && (
                <MetaItem label="Live">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mt-2.5 inline-flex min-h-11 items-center gap-2 text-brand hover:underline"
                  >
                    {project.link.label} <ArrowUpRight className="size-4" />
                  </a>
                </MetaItem>
              )}
            </dl>
          </Reveal>
        </div>
      </header>

      <ProjectCover
        project={project}
        priority
        sizes="100vw"
        className="h-[clamp(240px,46vw,680px)] border-y"
        motifClassName="[&_svg]:w-[min(30%,380px)]"
      />

      {sections.length > 0 && (
        <div className="container-page grid gap-x-16 gap-y-12 py-14 md:grid-cols-2 md:py-28">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.08}>
              <section>
                <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-4 text-lg text-pretty md:text-[19px]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="container-page grid gap-5 pb-14 md:grid-cols-2 md:pb-28">
          {project.gallery.map((src) => (
            <ProjectCover
              key={src}
              project={{ ...project, cover: src }}
              className="aspect-4/3 rounded-lg border"
            />
          ))}
        </div>
      )}

      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-wrap items-center justify-between gap-x-10 gap-y-5 bg-brand px-5 py-14 text-background sm:px-8 md:py-22 lg:px-20"
        >
          <span>
            <span className="mb-3 block text-[13px] font-bold tracking-[0.14em] uppercase">
              Next project
            </span>
            <span className="font-display text-[clamp(32px,7vw,100px)] leading-none font-extrabold tracking-[-0.03em]">
              {next.title}
            </span>
          </span>
          <ArrowRight
            strokeWidth={1.8}
            className="size-[clamp(48px,7vw,110px)] transition-transform duration-500 group-hover:translate-x-3.5"
          />
        </Link>
      )}
    </article>
  )
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1.5 text-[13px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-lg font-medium">{children}</dd>
    </div>
  )
}
