import type { Layer } from "./stack"

export type Motif = "track" | "chat" | "rings" | "signal" | "boxes"

export interface Project {
  slug: string
  title: string
  kind: string
  summary: string
  role: string
  years?: string
  layers: Layer[]
  stack: string[]
  link?: { label: string; href: string }
  motif: Motif
  featured?: boolean
  /** Path under /public, e.g. "/projects/stora/cover.jpg". Until set, a line-art cover is shown. */
  cover?: string
  gallery?: string[]
  /** Case-study sections. Empty sections are not rendered. */
  problem?: string
  approach?: string[]
  outcome?: string
}

export const projects: Project[] = [
  {
    slug: "stora",
    title: "Stora",
    kind: "E-commerce platform",
    summary:
      "Mongolia's first dropshipping e-commerce platform, with delivery tracking from checkout to doorstep.",
    role: "UI/UX designer, then full-stack and senior developer",
    years: "2019 – 2023",
    layers: ["Design", "Frontend", "Backend"],
    stack: ["Next.js", "React", "Node.js", "GraphQL", "Figma"],
    link: { label: "stora.mn", href: "https://www.stora.mn" },
    motif: "track",
    featured: true,
    cover: "/projects/stora-cover.png",
    approach: [
      "Joined at the MVP stage and built the product alongside the co-founders, helping the start-up grow into one of the major technology companies in Mongolia.",
      "Designed the e-commerce experience in Figma, built the storefront in Next.js, and wrote the Node.js services and GraphQL API behind it.",
      "As senior developer, coded, tested and reviewed new features to improve the platform's performance and user experience.",
    ],
  },
  {
    slug: "agromentor",
    title: "Agro Mentor",
    kind: "Conversational AI · AgriTech",
    summary:
      "A GPT-4 chatbot that gives farmers real-time advice from expert advisor personas, covering crops, irrigation, pest control and sustainability.",
    role: "Design and full-stack development",
    layers: ["Design", "Frontend", "Backend", "AI", "Infrastructure"],
    stack: ["Astro", "TypeScript", "Python", "OpenAI GPT-4", "IndexedDB", "Vercel"],
    motif: "chat",
    cover: "/projects/agromentor-cover.png",
    link: { label: "agromentor.ai", href: "https://multi-chat-talk-app.vercel.app/" },
    problem:
      "Farmers rarely have an agronomist on call. General-purpose chatbots answer farming questions too vaguely to act on, and they lose context between visits.",
    approach: [
      "Designed advisor personas with distinct expertise and communication styles. Each persona is a structured profile that shapes the system prompt, so answers stay specific to its field.",
      "Built the front end in Astro with SSR/SSG for fast loading: advisor directory, persona detail views and a chat interface with markdown rendering and image upload.",
      "Implemented a Python 3 back end on Render, reached through an Astro API route, that holds conversation context, calls the OpenAI GPT-4 API and returns structured, step-by-step guidance.",
      "Kept conversation history in the browser with IndexedDB, so users can come back to past advice without creating an account.",
      "Deployed on Vercel behind its WAF and load balancer, and added analytics to monitor response quality and improve the prompts over time.",
    ],
  },
  {
    slug: "ddam-ai",
    title: "DDAM.ai",
    kind: "Company landing page",
    summary: "Landing page for Dentsu Data Artist Mongol, an AI-based enterprise.",
    role: "UI/UX designer",
    layers: ["Design"],
    stack: ["Figma", "Animation", "Illustration", "Branding"],
    motif: "rings",
    cover: "/projects/ddam-cover.png",
    link: { label: "Figma", href: "https://www.figma.com/community/file/1705521110260970351" },
    problem:
      "The old brand and website didn't reflect what DDAM had become: an AI and data company. The visuals felt generic, the message was hard to follow, and visitors couldn't quickly tell what the company does or why it matters to their business.",
    approach: [
      "Started with UX research: interviewed stakeholders, reviewed competitors and mapped the main visitor groups, then used the findings to set the page structure and the core message.",
      "Led a complete rebrand, including the logo, color palette, typography and visual language, to give DDAM a modern, confident identity that fits a data-driven AI company.",
      "Created a custom illustration set that turns abstract ideas like data, AI and analytics into clear, friendly visuals.",
      "Designed motion and micro-interactions that guide visitors through the story and make the brand feel alive without getting in the way of the content.",
      "Brought it all together in a responsive landing page in Figma, with a clear hierarchy, scannable sections and strong calls to action.",
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

/** The project after `slug`, wrapping around at the end. */
export function getNextProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return undefined
  return projects[(index + 1) % projects.length]
}
