export const layers = ["Design", "Frontend", "Backend", "AI", "Infrastructure"] as const
export type Layer = (typeof layers)[number]

export interface StackGroup {
  title: string
  layer?: Layer
  summary: string
  items: string[]
}

export const stackGroups: StackGroup[] = [
  {
    title: "Design",
    layer: "Design",
    summary: "Research, flows and interface design. Led a five-person UX team at DDAM.",
    items: ["UX design", "UI design", "Prototyping", "UX copywriting", "Figma", "Adobe XD"],
  },
  {
    title: "Frontend",
    layer: "Frontend",
    summary: "Component-driven interfaces in TypeScript that match the design and stay fast.",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Material UI",
      "Vuetify",
    ],
  },
  {
    title: "Backend",
    layer: "Backend",
    summary: "The APIs and data models behind the interface.",
    items: ["Node.js · Express", "Python · FastAPI", "GraphQL", "REST APIs", "DynamoDB", "Aurora"],
  },
  {
    title: "AI",
    layer: "AI",
    summary: "LLM features and chatbots in production; AI and machine learning at MSc level.",
    items: [
      "Amazon Bedrock",
      "Amazon SageMaker",
      "LLM integration",
      "Chatbots",
      "Machine learning",
    ],
  },
  {
    title: "Infrastructure",
    layer: "Infrastructure",
    summary: "AWS workloads defined in code and shipped through pipelines.",
    items: [
      "EC2",
      "Lambda",
      "ECS · Fargate",
      "S3",
      "CloudFront",
      "Route 53",
      "WAF",
      "Docker",
      "Terraform",
      "CI/CD",
    ],
  },
  {
    title: "Testing & delivery",
    summary: "Tests and review before anything ships, in Agile/Scrum teams.",
    items: ["Jest", "Cypress", "Vitest", "Code review", "Agile · Scrum", "GitHub", "Jira"],
  },
]

/** Short labels for the isometric stack in the hero, bottom layer first. */
export const stackVisual: { layer: Layer; caption: string }[] = [
  { layer: "Infrastructure", caption: "AWS · Docker · Terraform" },
  { layer: "Backend", caption: "Node.js · FastAPI · GraphQL" },
  { layer: "AI", caption: "Bedrock · SageMaker · LLMs" },
  { layer: "Frontend", caption: "React · Next.js · Vue.js" },
  { layer: "Design", caption: "UX · UI · Figma" },
]
