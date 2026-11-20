"use client"

import * as React from "react"

/** True on devices with a mouse or trackpad; hover-only effects are skipped on touch. */
export function useFinePointer() {
  const [fine, setFine] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setFine(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return fine
}
