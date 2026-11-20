export const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]=+*#"

/**
 * One frame of a scramble transition between two words (progress 0 → 1).
 * Characters settle left to right; the rest show random glyphs.
 * `random` is injectable so the function is deterministic in tests.
 */
export function scrambleFrame(
  from: string,
  to: string,
  progress: number,
  random: () => number = Math.random,
) {
  const p = Math.min(1, Math.max(0, progress))
  if (p >= 1) return to
  const length = Math.round(from.length + (to.length - from.length) * p)
  const settled = Math.floor(to.length * p)
  let out = ""
  for (let i = 0; i < length; i += 1) {
    if (i < settled) out += to[i]
    else if (to[i] === " ") out += " "
    else
      out += SCRAMBLE_GLYPHS[Math.floor(random() * SCRAMBLE_GLYPHS.length) % SCRAMBLE_GLYPHS.length]
  }
  return out
}

/** "15:32" for a time zone, or an empty string if the zone is unknown. */
export function clockIn(timeZone: string, date: Date = new Date()) {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date)
  } catch {
    return ""
  }
}

/** Zero-padded index label: 1 → "01". */
export const indexLabel = (n: number) => String(n).padStart(2, "0")

/** Parse "#rrggbb" into an [r, g, b] tuple in 0–1, or null if malformed. */
export function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!match) return null
  return [match[1], match[2], match[3]].map((c) => parseInt(c!, 16) / 255) as [
    number,
    number,
    number,
  ]
}
