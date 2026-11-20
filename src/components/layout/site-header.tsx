"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"

import { Magnetic } from "@/components/motion/magnetic"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { navItems, site } from "@/content/site"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"
import { CommandMenu } from "./command-menu"
import { MobileNav } from "./mobile-nav"

const sectionIds = navItems.map((item) => item.href.replace("/#", ""))

export function SiteHeader() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [stuck, setStuck] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [isMac, setIsMac] = React.useState(false)
  const active = useActiveSection(sectionIds)

  React.useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent)), [])

  // Glass background once scrolled; hide while scrolling down, show on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setStuck(y > 24)
    setHidden(y > 700 && y > previous + 4)
  })

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-19 items-center justify-between gap-6 border-b border-transparent px-5 transition-[background-color,border-color] duration-500 sm:px-8 lg:px-20",
          stuck && "border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="flex min-h-11 items-center font-display text-base font-bold tracking-wide"
        >
          Sei<span className="text-brand">/</span>26
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1.5 text-[15px] font-medium md:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === "/" && active === item.href.replace("/#", "")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex min-h-11 items-center px-3.5 text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3.5 bottom-2 h-0.5 bg-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2.5 rounded-full border border-line-strong bg-background/50 px-4 py-2 text-sm font-medium whitespace-nowrap xl:flex">
            <span aria-hidden="true" className="size-2 animate-ping-soft rounded-full bg-brand" />
            Open to work · Toronto
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setMenuOpen(true)}
                aria-label="Open command menu"
                className="size-11 px-0 text-muted-foreground md:w-auto md:px-3"
              >
                <Search />
                <kbd className="hidden font-mono text-[11px] md:inline">
                  {isMac ? "⌘ K" : "Ctrl K"}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search the site</TooltipContent>
          </Tooltip>
          <Magnetic className="hidden sm:inline-flex">
            <Button asChild>
              <a href={site.resume} target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            </Button>
          </Magnetic>
          <MobileNav />
        </div>
      </motion.header>
      <CommandMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  )
}
