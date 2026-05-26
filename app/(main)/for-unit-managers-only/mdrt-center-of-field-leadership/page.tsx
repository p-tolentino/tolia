import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { TabbedContent } from "@/components/shared/tabbed-content"
import { mdrtCenterOfFieldLeadership } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "MDRT Center of Field Leadership",
  description: "MDRT leadership development resources — Recruitment and Activation.",
}

export default function MdrtCenterOfFieldLeadershipPage() {
  const tabs = mdrtCenterOfFieldLeadership.sections.map((s) => ({ label: s.heading, section: s }))
  return (
    <SectionWrapper>
      <PageHeader title={mdrtCenterOfFieldLeadership.title} description={mdrtCenterOfFieldLeadership.description} />
      <TabbedContent tabs={tabs} />
    </SectionWrapper>
  )
}
