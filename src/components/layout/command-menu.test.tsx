import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AccentProvider } from "@/components/providers/accent-provider"
import { projects } from "@/content/projects"
import { CommandMenu } from "./command-menu"

const push = vi.fn()
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }))
vi.mock("sonner", () => ({ toast: vi.fn() }))

function renderMenu(onOpenChange = vi.fn()) {
  render(
    <AccentProvider>
      <CommandMenu open onOpenChange={onOpenChange} />
    </AccentProvider>,
  )
  return { onOpenChange }
}

describe("<CommandMenu>", () => {
  beforeEach(() => push.mockClear())

  it("lists sections, every project and the actions", () => {
    renderMenu()
    expect(screen.getByText("Experience")).toBeInTheDocument()
    for (const project of projects) expect(screen.getByText(project.title)).toBeInTheDocument()
    expect(screen.getByText("Copy email address")).toBeInTheDocument()
  })

  it("filters as you type", async () => {
    renderMenu()
    await userEvent.type(screen.getByRole("combobox"), "stora")
    expect(screen.getByText("Stora")).toBeInTheDocument()
    expect(screen.queryByText("Copy email address")).not.toBeInTheDocument()
  })

  it("opens a case study and closes itself", async () => {
    const project = projects[0]!
    const { onOpenChange } = renderMenu()
    await userEvent.click(screen.getByText(project.title))
    expect(push).toHaveBeenCalledWith(`/work/${project.slug}`)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("toggles with Ctrl+K", async () => {
    const { onOpenChange } = renderMenu()
    await userEvent.keyboard("{Control>}k{/Control}")
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
