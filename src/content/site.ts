export const site = {
  name: "Sainzolboo Anujin",
  shortName: "Sei",
  title: "Sainzolboo Anujin — Senior Full-Stack Engineer",
  description:
    "Senior full-stack engineer in Toronto working across design, front end, back end, AI and AWS infrastructure. Six years building e-commerce and AI products.",
  url: "https://sainzolboo.vercel.app",
  location: "Toronto, ON",
  timeZone: "America/Toronto",
  email: "sainzolboo@gmail.com",
  resume: "/Sainzolboo-Anujin-Resume.pdf",
  socials: {
    github: "https://github.com/snzlbo",
    // TODO: replace with your profile URL.
    linkedin: "https://www.linkedin.com/",
  },
  roles: ["Full-Stack Developer", "Software Engineer", "Front-End Developer", "UI/UX Designer"],
} as const

export const navItems = [
  { label: "Stack", href: "/#stack" },
  { label: "AI workflow", href: "/#ai" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const

export const facts = [
  { value: 6, suffix: " yrs", label: "shipping product, 2019 – 2025" },
  { value: 10, suffix: " + 5", label: "engineers and designers led at DDAM" },
  { value: 30, suffix: "", label: "projects contributed to" },
  { value: null, display: "MSc", label: "Computer Science, AI focus" },
] as const

export const accents = [
  { id: "blue", label: "Blue", value: "#6e9bff" },
  { id: "lime", label: "Lime", value: "#c8ff3e" },
  { id: "magenta", label: "Magenta", value: "#ff5ca8" },
  { id: "orange", label: "Orange", value: "#ff7a2f" },
] as const

export type Accent = (typeof accents)[number]
