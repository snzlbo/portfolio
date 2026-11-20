import { About } from "@/components/sections/about"
import { AiWorkflow } from "@/components/sections/ai-workflow"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Facts } from "@/components/sections/facts"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { StackSection } from "@/components/sections/stack-section"
import { WorkSection } from "@/components/sections/work-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Facts />
      <StackSection />
      <AiWorkflow />
      <WorkSection />
      <About />
      <Experience />
      <Contact />
    </>
  )
}
