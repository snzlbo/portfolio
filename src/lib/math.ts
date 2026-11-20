export interface Box {
  left: number
  top: number
  width: number
  height: number
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/**
 * Tilt angles (degrees) for a card, from a pointer position inside its box.
 * The centre of the box is flat; corners reach ±max.
 */
export function tiltFromPointer(box: Box | null, x: number, y: number, max = 8) {
  if (!box || box.width <= 0 || box.height <= 0) return { rotateX: 0, rotateY: 0 }
  const px = clamp((x - box.left) / box.width, 0, 1) - 0.5
  const py = clamp((y - box.top) / box.height, 0, 1) - 0.5
  return { rotateX: -py * 2 * max, rotateY: px * 2 * max }
}

/** Offset that pulls a magnetic element toward the pointer. */
export function magnetOffset(box: Box | null, x: number, y: number, strength = 0.3) {
  if (!box) return { x: 0, y: 0 }
  return {
    x: (x - (box.left + box.width / 2)) * strength,
    y: (y - (box.top + box.height / 2)) * strength,
  }
}
