import { act, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { accents } from "@/content/site"
import { AccentProvider, useAccent } from "./accent-provider"

function Probe() {
  const { accent, setAccent } = useAccent()
  return (
    <button type="button" onClick={() => setAccent(accents[1].value)}>
      {accent}
    </button>
  )
}

describe("<AccentProvider>", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.style.removeProperty("--brand")
  })

  it("starts on the default accent and writes it to --brand", () => {
    render(
      <AccentProvider>
        <Probe />
      </AccentProvider>,
    )
    expect(screen.getByRole("button")).toHaveTextContent(accents[0].value)
    expect(document.documentElement.style.getPropertyValue("--brand")).toBe(accents[0].value)
  })

  it("switches and remembers the accent", () => {
    render(
      <AccentProvider>
        <Probe />
      </AccentProvider>,
    )
    act(() => screen.getByRole("button").click())
    expect(document.documentElement.style.getPropertyValue("--brand")).toBe(accents[1].value)
    expect(window.localStorage.getItem("sa-accent")).toBe(accents[1].value)
  })

  it("restores a saved accent and ignores unknown values", () => {
    window.localStorage.setItem("sa-accent", accents[2].value)
    const { unmount } = render(
      <AccentProvider>
        <Probe />
      </AccentProvider>,
    )
    expect(screen.getByRole("button")).toHaveTextContent(accents[2].value)
    unmount()

    window.localStorage.setItem("sa-accent", "#123456")
    render(
      <AccentProvider>
        <Probe />
      </AccentProvider>,
    )
    expect(screen.getByRole("button")).toHaveTextContent(accents[0].value)
  })

  it("throws a helpful error outside the provider", () => {
    expect(() => render(<Probe />)).toThrow(/AccentProvider/)
  })
})
