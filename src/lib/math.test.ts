import { describe, expect, it } from "vitest"

import { clamp, magnetOffset, tiltFromPointer } from "./math"

const box = { left: 100, top: 50, width: 200, height: 100 }

describe("clamp", () => {
  it("keeps a value inside its range", () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-3, 0, 10)).toBe(0)
    expect(clamp(42, 0, 10)).toBe(10)
  })
})

describe("tiltFromPointer", () => {
  it("is flat at the centre of the box", () => {
    const { rotateX, rotateY } = tiltFromPointer(box, 200, 100, 8)
    expect(Math.abs(rotateX)).toBe(0)
    expect(Math.abs(rotateY)).toBe(0)
  })

  it("reaches the maximum angle at the corners", () => {
    expect(tiltFromPointer(box, 300, 50, 8)).toEqual({ rotateX: 8, rotateY: 8 })
    expect(tiltFromPointer(box, 100, 150, 8)).toEqual({ rotateX: -8, rotateY: -8 })
  })

  it("clamps pointers outside the box", () => {
    expect(tiltFromPointer(box, 9999, -9999, 6)).toEqual({ rotateX: 6, rotateY: 6 })
  })

  it("returns no tilt for a missing or empty box", () => {
    expect(tiltFromPointer(null, 1, 1)).toEqual({ rotateX: 0, rotateY: 0 })
    expect(tiltFromPointer({ left: 0, top: 0, width: 0, height: 0 }, 1, 1)).toEqual({
      rotateX: 0,
      rotateY: 0,
    })
  })
})

describe("magnetOffset", () => {
  it("pulls toward the pointer, scaled by strength", () => {
    expect(magnetOffset(box, 200, 100, 0.3)).toEqual({ x: 0, y: 0 })
    expect(magnetOffset(box, 220, 90, 0.5)).toEqual({ x: 10, y: -5 })
  })

  it("does nothing without a box", () => {
    expect(magnetOffset(null, 1, 1)).toEqual({ x: 0, y: 0 })
  })
})
