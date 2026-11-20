import { Reveal } from "@/components/motion/reveal"
import { ProjectCard } from "@/components/project/project-card"
import { projects } from "@/content/projects"
import { SectionHeading } from "./section-heading"
import { Fragment } from "react"

export function WorkSection() {
  return (
    <section id="work" className="container-page scroll-mt-24 py-20 md:py-36">
      <SectionHeading
        index="03"
        label="Work"
        lines={[
          <Fragment key="work">
            Selected <em>work</em>
          </Fragment>,
        ]}
        lede="Products I designed, built or both. Open one for the role I played, the stack and the layers I touched."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 0.08}
            className={project.featured ? "h-full md:col-span-2" : "h-full"}
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
