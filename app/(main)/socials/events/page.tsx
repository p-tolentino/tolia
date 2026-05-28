import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { TabbedContent } from "@/components/shared/tabbed-content"
import { socialsEvents } from "@/lib/content/socials"

export const metadata: Metadata = {
  title: "Events",
  description: "Event photos and videos.",
}

export default function SocialsEventsPage() {
  const tabs = socialsEvents.sections.map((s) => ({ label: s.heading, section: s }))
  return (
    <SectionWrapper>
      <PageHeader title={socialsEvents.title} description={socialsEvents.description} 
        breadcrumbs={getBreadcrumbs("/socials/events")}
      />
      <TabbedContent tabs={tabs} />
    </SectionWrapper>
  )
}
