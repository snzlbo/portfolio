import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => cleanup())

// jsdom has no matchMedia or IntersectionObserver; Motion and the reveal components need both.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ""
  thresholds = []
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
})

// cmdk (the command menu) measures its list and scrolls the active item into view.
class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
Object.defineProperty(window, "ResizeObserver", { writable: true, value: MockResizeObserver })
Element.prototype.scrollIntoView = vi.fn()

// Node 22+ exposes its own experimental global localStorage, which is undefined unless
// --localstorage-file is passed and shadows jsdom's. Swap in an in-memory Storage.
function createMemoryStorage(): Storage {
  let store = new Map<string, string>()
  return {
    get length() {
      return store.size
    },
    clear: () => {
      store = new Map()
    },
    getItem: (key) => store.get(String(key)) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => {
      store.delete(String(key))
    },
    setItem: (key, value) => {
      store.set(String(key), String(value))
    },
  }
}
for (const name of ["localStorage", "sessionStorage"] as const) {
  let usable = false
  try {
    usable = typeof window[name]?.getItem === "function"
  } catch {
    // Accessing the getter can throw; treat it as unusable.
  }
  if (!usable) {
    const storage = createMemoryStorage()
    Object.defineProperty(window, name, { configurable: true, value: storage })
    Object.defineProperty(globalThis, name, { configurable: true, value: storage })
  }
}
