import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { projects } from "@/content/projects"
import { ProjectCard } from "./project-card"

const featured = projects.find((p) => p.featured)!
const regular = projects.find((p) => !p.featured)!

describe("<ProjectCard>", () => {
  it("links to the project's case study", () => {
    render(<ProjectCard project={regular} index={1} />)
    expect(screen.getByRole("link")).toHaveAttribute("href", `/work/${regular.slug}`)
  })

  it("shows the title, summary, index and every layer", () => {
    render(<ProjectCard project={regular} index={1} />)
    expect(screen.getByRole("heading", { name: regular.title })).toBeInTheDocument()
    expect(screen.getByText(regular.summary)).toBeInTheDocument()
    expect(screen.getAllByText("02").length).toBeGreaterThan(0)
    for (const layer of regular.layers) expect(screen.getByText(layer)).toBeInTheDocument()
  })

  it("marks only the featured project", () => {
    const { unmount } = render(<ProjectCard project={featured} index={0} />)
    expect(screen.getByText("Featured")).toBeInTheDocument()
    unmount()
    render(<ProjectCard project={regular} index={1} />)
    expect(screen.queryByText("Featured")).not.toBeInTheDocument()
  })
})
