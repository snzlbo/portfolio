import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center gap-6 pt-[76px]">
      <p className="font-mono text-[13px] font-semibold tracking-wider text-brand uppercase">404</p>
      <h1 className="font-display text-[clamp(40px,8vw,110px)] leading-none font-extrabold tracking-[-0.03em]">
        Nothing <em className="text-brand">here.</em>
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        That page doesn&apos;t exist, or it moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to the homepage</Link>
      </Button>
    </section>
  )
}
