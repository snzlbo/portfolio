import Image from "next/image"

import type { Motif, Project } from "@/content/projects"
import { cn } from "@/lib/utils"

/** Line-art covers shown until a real screenshot is added to the project. */
const motifs: Record<Motif, React.ReactNode> = {
  track: (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 96h44l28-64h44l28 64h28" strokeDasharray="6 9" />
      <circle cx="14" cy="96" r="9" className="fill-secondary" />
      <circle cx="86" cy="32" r="9" className="fill-secondary" />
      <circle cx="130" cy="32" r="9" className="fill-secondary" />
      <circle cx="186" cy="96" r="11" fill="currentColor" />
    </svg>
  ),
  chat: (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 14h116a10 10 0 0 1 10 10v36a10 10 0 0 1-10 10H44L22 88V70H12A10 10 0 0 1 2 60V24a10 10 0 0 1 10-10Z" />
      <path d="M188 62v44a10 10 0 0 1-10 10h-6v16l-20-16H88a10 10 0 0 1-10-10V90" />
      <circle cx="46" cy="42" r="4" fill="currentColor" />
      <circle cx="70" cy="42" r="4" fill="currentColor" />
      <circle cx="94" cy="42" r="4" fill="currentColor" />
    </svg>
  ),
  rings: (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="100" cy="100" r="92" opacity=".35" />
      <circle cx="100" cy="100" r="64" opacity=".6" />
      <circle cx="100" cy="100" r="36" />
      <circle cx="100" cy="100" r="9" fill="currentColor" />
      <circle cx="164" cy="100" r="7" fill="currentColor" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 200 140" fill="currentColor">
      <rect x="8" y="104" width="26" height="30" rx="4" />
      <rect x="50" y="80" width="26" height="54" rx="4" />
      <rect x="92" y="54" width="26" height="80" rx="4" />
      <rect x="134" y="28" width="26" height="106" rx="4" opacity=".45" />
      <rect x="176" y="4" width="20" height="130" rx="4" opacity=".2" />
    </svg>
  ),
  boxes: (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      <rect x="16" y="86" width="76" height="62" rx="4" />
      <rect x="108" y="86" width="76" height="62" rx="4" />
      <rect x="62" y="12" width="76" height="62" rx="4" />
      <path d="M54 86v22M146 86v22M100 12v22" />
    </svg>
  ),
}

interface ProjectCoverProps {
  project: Project
  className?: string
  motifClassName?: string
  priority?: boolean
  sizes?: string
}

export function ProjectCover({
  project,
  className,
  motifClassName,
  priority,
  sizes,
}: ProjectCoverProps) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(#262a31_1.2px,transparent_1.2px)] bg-size-[22px_22px]" />
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} screenshot`}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 820px) 50vw, 100vw"}
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 grid place-items-center text-brand transition-transform duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.07] [&_svg]:h-auto [&_svg]:w-[min(46%,300px)] [&_svg]:overflow-visible",
            motifClassName,
          )}
        >
          {motifs[project.motif]}
        </div>
      )}
    </div>
  )
}
