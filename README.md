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

## Deploying

Import the repository in Vercel; it detects Next.js automatically. Every push to `main` runs CI
(lint, typecheck, tests, build) in GitHub Actions.