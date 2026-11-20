# sainzolboo.vercel.app

Personal portfolio of Sainzolboo Anujin, senior full-stack engineer.

**Stack:** Next.js 15 (App Router, React Server Components) · TypeScript (strict) · Tailwind CSS v4 ·
shadcn/ui (Radix UI) · Motion · Lenis · cmdk · Sonner · Vitest + Testing Library · GitHub Actions

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Commit the `package-lock.json` that `npm install` creates; CI uses `npm ci`.

| Script              | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server with Turbopack              |
| `npm run build`     | Production build                       |
| `npm run lint`      | ESLint (Next.js core-web-vitals rules) |
| `npm run typecheck` | `tsc --noEmit`                         |
| `npm test`          | Vitest unit and component tests        |
| `npm run check`     | Lint, typecheck and test in one go     |
| `npm run format`    | Prettier, with Tailwind class sorting  |

## Project structure

```
src/
├── app/                      Routes (App Router)
│   ├── layout.tsx            Fonts, metadata, providers, header and footer
│   ├── page.tsx              Home page: composes the sections
│   ├── work/[slug]/page.tsx  Case-study pages, statically generated per project
│   ├── not-found.tsx
│   ├── sitemap.ts · robots.ts
│   └── globals.css           Tailwind v4 theme and shadcn design tokens
├── components/
│   ├── ui/                   shadcn/ui primitives (button, badge, card, command, dialog, sheet…)
│   ├── layout/               Site header, mobile nav, command menu, footer
│   ├── sections/             One component per home-page section
│   ├── project/              Project card and cover
│   ├── motion/               Reusable animation primitives (reveal, magnetic, count-up…)
│   ├── effects/              WebGL contour background
│   └── providers/            Motion config, Lenis smooth scroll, accent colour, tooltips, toasts
├── content/                  All copy and data, typed: site, projects, stack, experience, AI workflow
├── hooks/                    Small client hooks (active section, copy email, pointer type)
└── lib/                      Pure utilities and the WebGL shader, unit-tested
```

Conventions:

- **Content is data.** Every word on the site lives in `src/content/*.ts`. Components only render it.
- **Server by default.** Only components that need state, effects or pointer events are marked `"use client"`.
- **Logic lives in `lib/`** as pure functions, so it can be tested without a browser.
- **Motion respects the user.** `MotionConfig reducedMotion="user"` plus explicit checks turn off
  smooth scroll, the custom cursor, tilt and the shader animation for people who prefer reduced motion.
- **shadcn/ui** components are in `components/ui` and can be updated with `npx shadcn@latest add <name>`.

## Editing content

| What                         | Where                                                    |
| ---------------------------- | -------------------------------------------------------- |
| Projects and case-study text | `src/content/projects.ts`                                |
| Project screenshots          | `public/projects/<slug>/…`, then set `cover` / `gallery` |
| Skills and stack             | `src/content/stack.ts`                                   |
| Experience timeline          | `src/content/experience.ts`                              |
| Email, socials, résumé, nav  | `src/content/site.ts`                                    |
| Résumé PDF                   | `public/Sainzolboo-Anujin-Resume.pdf`                    |
| Colours, fonts, radii        | `src/app/globals.css` and `src/app/layout.tsx`           |

A case study only renders "The problem", "What I did" and "Outcome" when those fields have text.

## Deploying

Import the repository in Vercel; it detects Next.js automatically. Every push to `main` runs CI
(lint, typecheck, tests, build) in GitHub Actions.

## Keyboard

`Ctrl/⌘ + K` opens the command menu: jump to sections, open case studies, copy the email,
open the résumé or change the accent colour.
