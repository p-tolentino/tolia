import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, UserPlus, Headset, MessageSquare, Shield, Zap, Calendar as CalendarIcon, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { homeContent, heroContent } from "@/lib/content/home"

export const metadata: Metadata = {
  title: { absolute: "TOLIA (Tolentino Life Insurance Agency) \u2014 Pru Life UK" },
  description: "Empowering Pru Life UK agents to succeed with resources, training, and support.",
}

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "New Recruits": UserPlus,
  "Agent Support": Headset,
  "From BM's Desk": MessageSquare,
  "For UMs Only": Shield,
  LEAP: Zap,
  Assemblies: CalendarIcon,
  Socials: Share2,
}

export default function HomePage() {
  const quickLinks = homeContent.sections[0]?.items ?? []
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              {heroContent.headline}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              {heroContent.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="transition-all hover:brightness-95 hover:shadow-lg" asChild>
                <Link href={heroContent.cta.href}>
                  {heroContent.cta.label} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground transition-all hover:bg-white hover:text-primary" asChild>
                <Link href={heroContent.ctaSecondary.href}>
                  {heroContent.ctaSecondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-muted/30">
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          Quick Access
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((section) => {
            const Icon = section.label ? sectionIcons[section.label] : null
            return (
              <Link key={section.href} href={section.href}>
                {/* Mobile: compact inline row */}
                <div className="flex sm:hidden items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-300 hover:bg-primary hover:border-primary cursor-pointer group">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">
                    <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {Icon && <Icon className="size-5" />}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-white truncate">{section.label}</div>
                    <div className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-white/80 truncate">{section.description}</div>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-white" />
                </div>
                {/* Desktop: full card */}
                <Card className="hidden sm:block group h-full cursor-pointer transition-all duration-300 hover:bg-primary hover:border-primary">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">
                      <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {Icon && <Icon className="size-5" />}
                      </span>
                    </div>
                    <CardTitle className="text-base transition-colors duration-300 group-hover:text-white">{section.label}</CardTitle>
                    <CardDescription className="transition-colors duration-300 group-hover:text-white/80">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-white">
                      View <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </SectionWrapper>
    </>
  )
}
