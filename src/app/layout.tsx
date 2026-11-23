import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk, Unbounded } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Cursor } from "@/components/motion/cursor"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { accentInitScript } from "@/components/providers/accent-provider"
import { Providers } from "@/components/providers/providers"
import { site } from "@/content/site"

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "Senior Full-Stack Engineer",
    "Full-Stack Developer Toronto",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "UI/UX",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
}

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      // The accent script below sets --brand on <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-100 translate-y-[-200%] rounded-full bg-brand px-4 py-3 font-bold text-background focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <Cursor />
        </Providers>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-55 grain opacity-[0.07]"
        />
        <Analytics />
      </body>
    </html>
  )
}
