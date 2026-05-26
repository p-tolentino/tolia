import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { greetings } from "@/lib/content/socials"

export const metadata: Metadata = {
  title: "Greetings",
  description: "Birthday greetings and celebrations for TOLIA agents.",
}

export default function GreetingsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={greetings.title} description={greetings.description} />
      <div className="mt-8">
        <ContentSection sections={greetings.sections} />
      </div>
    </SectionWrapper>
  )
}
