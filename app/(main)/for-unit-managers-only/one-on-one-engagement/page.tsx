import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { oneOnOneEngagement } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "One-on-One Engagement",
  description: "Tools and templates for one-on-one coaching sessions.",
}

export default function OneOnOneEngagementPage() {
  return (
    <SectionWrapper>
      <PageHeader title={oneOnOneEngagement.title} description={oneOnOneEngagement.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only/one-on-one-engagement")}
      />
      <div className="mt-8">
        <ContentSection sections={oneOnOneEngagement.sections} />
      </div>
    </SectionWrapper>
  )
}
