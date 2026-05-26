import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { eventsContent } from "@/lib/content/events"

export const metadata: Metadata = {
  title: "Events",
  description: "Event photos, videos, and highlights.",
}

export default function EventsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={eventsContent.title} description={eventsContent.description} />
      <div className="mt-8">
        <ContentSection sections={eventsContent.sections} />
      </div>
    </SectionWrapper>
  )
}
