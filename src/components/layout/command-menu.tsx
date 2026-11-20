"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Briefcase, ExternalLink, FileText, Hash, Mail, Palette } from "lucide-react"

import { useAccent } from "@/components/providers/accent-provider"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { projects } from "@/content/projects"
import { accents, navItems, site } from "@/content/site"
import { useCopyEmail } from "@/hooks/use-copy-email"

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Ctrl/⌘ + K menu: jump to sections, open case studies, copy the email, change the accent. */
export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter()
  const { accent, setAccent } = useAccent()
  const { copy } = useCopyEmail()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  const run = (action: () => void) => {
    onOpenChange(false)
    action()
  }
  const openExternal = (href: string) => window.open(href, "_blank", "noopener,noreferrer")

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Jump to a section, open a project or copy my email"
    >
      <CommandInput placeholder="Jump to a section, open a project, copy email…" />
      <CommandList>
        <CommandEmpty>Nothing matches. Try “work” or “email”.</CommandEmpty>

        <CommandGroup heading="Go to">
          {[{ label: "About", href: "/#about" }, ...navItems].map((item) => (
            <CommandItem
              key={item.href}
              value={`go ${item.label}`}
              onSelect={() => run(() => router.push(item.href))}
            >
              <Hash />
              {item.label}
              <CommandShortcut>Section</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.slug}
              value={`${project.title} ${project.kind} ${project.layers.join(" ")}`}
              onSelect={() => run(() => router.push(`/work/${project.slug}`))}
            >
              <Briefcase />
              {project.title}
              <CommandShortcut>Case study</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem value="copy email address contact hire" onSelect={() => run(copy)}>
            <Mail />
            Copy email address
            <CommandShortcut>{site.email}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="open resume cv pdf"
            onSelect={() => run(() => openExternal(site.resume))}
          >
            <FileText />
            Open résumé
            <CommandShortcut>PDF</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="open github code"
            onSelect={() => run(() => openExternal(site.socials.github))}
          >
            <ExternalLink />
            Open GitHub
          </CommandItem>
          <CommandItem
            value="open linkedin profile"
            onSelect={() => run(() => openExternal(site.socials.linkedin))}
          >
            <ExternalLink />
            Open LinkedIn
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Accent colour">
          {accents.map((item) => (
            <CommandItem
              key={item.id}
              value={`accent colour color theme ${item.label}`}
              onSelect={() => run(() => setAccent(item.value))}
            >
              <Palette />
              <span
                className="size-3.5 rounded-full border border-black/30"
                style={{ background: item.value }}
              />
              {item.label}
              {accent === item.value && <CommandShortcut>Current</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
