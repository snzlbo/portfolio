import { describe, expect, it } from "vitest"

import { SCRAMBLE_GLYPHS, clockIn, hexToRgb, indexLabel, scrambleFrame } from "./text"

describe("scrambleFrame", () => {
  it("returns the target word once progress reaches 1", () => {
    expect(scrambleFrame("Design", "Backend", 1)).toBe("Backend")
    expect(scrambleFrame("Design", "Backend", 3)).toBe("Backend")
  })

  it("settles characters from the left", () => {
    const frame = scrambleFrame("Design", "Frontend", 0.5, () => 0)
    expect(frame.slice(0, 4)).toBe("Fron")
    expect(frame).toHaveLength(7)
  })

  it("only uses glyphs from the scramble alphabet for unsettled characters", () => {
    const frame = scrambleFrame("AI", "Infrastructure", 0.1)
    for (const ch of frame.slice(1)) expect(SCRAMBLE_GLYPHS).toContain(ch)
  })

  it("is deterministic with an injected random source", () => {
    const random = () => 0.5
    expect(scrambleFrame("Design", "AI", 0.3, random)).toBe(
      scrambleFrame("Design", "AI", 0.3, random),
    )
  })

  it("treats negative progress as the start", () => {
    expect(scrambleFrame("Design", "AI", -1, () => 0)).toHaveLength("Design".length)
  })
})

describe("clockIn", () => {
  const noonUtc = new Date("2026-01-15T17:05:00Z")

  it("formats a 24-hour time in the requested zone", () => {
    expect(clockIn("America/Toronto", noonUtc)).toBe("12:05")
    expect(clockIn("Asia/Ulaanbaatar", noonUtc)).toBe("01:05")
  })

  it("returns an empty string for an unknown zone", () => {
    expect(clockIn("Nowhere/Land")).toBe("")
  })
})

describe("indexLabel", () => {
  it("pads single digits", () => {
    expect(indexLabel(1)).toBe("01")
    expect(indexLabel(12)).toBe("12")
  })
})

describe("hexToRgb", () => {
  it("parses six-digit hex colours into 0–1 channels", () => {
    expect(hexToRgb("#ffffff")).toEqual([1, 1, 1])
    expect(hexToRgb("#000000")).toEqual([0, 0, 0])
    expect(hexToRgb("#C8FF3E")?.[1]).toBe(1)
  })

  it("rejects malformed values", () => {
    expect(hexToRgb("c8ff3e")).toBeNull()
    expect(hexToRgb("#fff")).toBeNull()
    expect(hexToRgb("#gggggg")).toBeNull()
  })
})
