import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { TrustIndicators } from "@/components/sections/trust-indicators"
import { WhyKazakhstan } from "@/components/sections/why-kazakhstan"
import { Universities } from "@/components/sections/universities"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Benefits } from "@/components/sections/benefits"
import { FadeIn } from "@/components/fade-in"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <FadeIn>
          <TrustIndicators />
        </FadeIn>
        <FadeIn delay={100}>
          <WhyKazakhstan />
        </FadeIn>
        <FadeIn delay={100}>
          <Benefits />
        </FadeIn>
        <FadeIn delay={100}>
          <Universities />
        </FadeIn>
        <FadeIn delay={100}>
          <HowItWorks />
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}
