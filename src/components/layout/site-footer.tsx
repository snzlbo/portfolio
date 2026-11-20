import Link from "next/link"

import { site } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-sm text-muted-foreground">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui and Motion.</span>
      <Link
        href="/#top"
        className="flex min-h-11 items-center text-foreground transition-colors hover:text-brand"
      >
        Back to top
      </Link>
    </footer>
  )
}
