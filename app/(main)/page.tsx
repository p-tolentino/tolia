import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { QuickAccessCards } from "@/components/home/quick-access-cards"
import { heroContent } from "@/lib/content/home"

export const metadata: Metadata = {
  title: {
    absolute: "TOLIA (Tolentino Life Insurance Agency) \u2014 Pru Life UK",
  },
  description:
    "Empowering Pru Life UK agents to succeed with resources, training, and support.",
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-primary/65 to-primary">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Welcome to TOLIA Web Suite
            </h1>
            <p className="mt-2 text-lg text-primary-foreground/80 sm:text-xl">
              Empowering agents to succeed.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                asChild
              >
                <Link href={heroContent.cta.href}>
                  {heroContent.cta.label} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:shadow-lg"
                asChild
              >
                <Link href={heroContent.ctaSecondary.href}>
                  {heroContent.ctaSecondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-muted/30">
        <QuickAccessCards />
      </SectionWrapper>
    </>
  )
}
