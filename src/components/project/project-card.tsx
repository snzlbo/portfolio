"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { Badge } from "@/components/ui/badge"
import type { Project } from "@/content/projects"
import { useFinePointer } from "@/hooks/use-fine-pointer"
import { tiltFromPointer } from "@/lib/math"
import { indexLabel } from "@/lib/text"
import { cn } from "@/lib/utils"
import { ProjectCover } from "./project-cover"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const maxTilt = project.featured ? 2 : 4
  const number = indexLabel(index + 1)

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!fine || reduce) return
    const tilt = tiltFromPointer(
      event.currentTarget.getBoundingClientRect(),
      event.clientX,
      event.clientY,
      maxTilt,
    )
    rotateX.set(tilt.rotateX)
    rotateY.set(tilt.rotateY)
  }
  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "group [perspective-1400px] block h-full rounded-lg focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
      )}
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-colors duration-300 group-hover:border-line-strong"
      >
        <div className="relative border-b">
          <ProjectCover
            project={project}
            priority={project.featured}
            className={project.featured ? "h-[clamp(260px,38vw,540px)]" : "aspect-16/10"}
            motifClassName={project.featured ? "[&_svg]:w-[min(34%,420px)]" : undefined}
          />
          {/* <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 bottom-[-0.22em] font-display text-[clamp(110px,14vw,220px)] leading-none font-extrabold tracking-[-0.05em] text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
          >
            {number}
          </span> */}
          {project.featured && (
            <Badge variant="default" className="absolute top-4 left-4 text-xs font-bold">
              Featured
            </Badge>
          )}
        </div>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-4 p-5 sm:p-8">
          <div>
            <p className="mb-2 flex gap-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              <span className="font-semibold text-brand">{number}</span>
              <span>{[project.kind, project.years].filter(Boolean).join(" · ")}</span>
            </p>
            <h3
              className={cn(
                "font-display leading-tight font-bold tracking-tight",
                project.featured ? "text-[clamp(30px,4vw,58px)]" : "text-[clamp(24px,2.6vw,38px)]",
              )}
            >
              {project.title}
            </h3>
            <p className="mt-2.5 max-w-155 text-base text-pretty text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.layers.map((layer) => (
                <Badge key={layer}>{layer}</Badge>
              ))}
            </div>
          </div>
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center self-end rounded-full border border-[#5a5f69] transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-background"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </motion.article>
    </Link>
  )
}
