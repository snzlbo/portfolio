export const aiTools = [
  {
    name: "Claude",
    body: "Planning, pair programming and code review. I talk an approach through, let it challenge the design, then read the diff myself.",
  },
  {
    name: "Codex",
    body: "Scaffolding and test generation. Boilerplate and the first pass of unit tests, so the hard parts get my attention.",
  },
  {
    name: "Mermaid",
    body: "Architecture and user flows as diagrams-as-code, generated from a prompt and kept in the repo beside the code they describe.",
  },
] as const

export const workflowSteps = [
  { step: "Plan", tool: "Claude" },
  { step: "Diagram", tool: "Mermaid" },
  { step: "Build", tool: "Claude · Codex" },
  { step: "Test", tool: "Jest · Cypress · Vitest" },
  { step: "Review", tool: "Me, every line" },
  { step: "Ship", tool: "CI/CD" },
] as const
