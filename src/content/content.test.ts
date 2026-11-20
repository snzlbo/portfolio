import { describe, expect, it } from "vitest"

import { experience } from "./experience"
import { getNextProject, getProject, projects } from "./projects"
import { accents, navItems, site } from "./site"
import { layers, stackGroups, stackVisual } from "./stack"

describe("projects", () => {
  it("have the fields the cards and case studies need", () => {
    for (const project of projects) {
      for (const key of ["slug", "title", "kind", "summary", "role"] as const) {
        expect(project[key].trim(), `${project.slug}.${key}`).not.toBe("")
      }
      expect(project.layers.length, `${project.slug} has no layers`).toBeGreaterThan(0)
      expect(project.stack.length, `${project.slug} has no stack`).toBeGreaterThan(0)
    }
  })

  it("use unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/)
  })

  it("only tag known layers of the stack", () => {
    for (const project of projects) {
      for (const layer of project.layers) expect(layers).toContain(layer)
    }
  })

  it("have exactly one featured project", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1)
  })

  it("link out over https and point covers at /public", () => {
    for (const project of projects) {
      if (project.link) expect(project.link.href).toMatch(/^https:\/\//)
      if (project.cover) expect(project.cover).toMatch(/^\//)
      for (const image of project.gallery ?? []) expect(image).toMatch(/^\//)
    }
  })
})

describe("project lookups", () => {
  it("find a project by slug", () => {
    expect(getProject("stora")?.title).toBe("Stora")
    expect(getProject("missing")).toBeUndefined()
  })

  it("walk to the next project and wrap at the end", () => {
    expect(getNextProject(projects[0]!.slug)).toBe(projects[1])
    expect(getNextProject(projects.at(-1)!.slug)).toBe(projects[0])
    expect(getNextProject("missing")).toBeUndefined()
  })
})

describe("site content", () => {
  it("has a valid contact email and https socials", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/)
    for (const href of Object.values(site.socials)) expect(href).toMatch(/^https:\/\//)
  })

  it("offers six-digit hex accent colours", () => {
    for (const accent of accents) expect(accent.value).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it("links navigation to home-page anchors", () => {
    for (const item of navItems) expect(item.href).toMatch(/^\/#[a-z]+$/)
  })

  it("shows every layer exactly once in the hero stack, and a skills card per layer", () => {
    expect(stackVisual.map((s) => s.layer).sort()).toEqual([...layers].sort())
    for (const layer of layers) expect(stackGroups.some((g) => g.layer === layer)).toBe(true)
  })

  it("lists experience newest first", () => {
    const starts = experience.map((item) => Number(item.period.slice(0, 4)))
    const work = starts.slice(1, -1)
    expect(work).toEqual([...work].sort((a, b) => b - a))
  })
})
