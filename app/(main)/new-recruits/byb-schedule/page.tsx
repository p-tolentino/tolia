import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { bybSchedule } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "BYB Schedule",
  description: "Build Your Business session schedules and registration.",
}

export default function BybSchedulePage() {
  return (
    <SectionWrapper>
      <PageHeader title={bybSchedule.title} description={bybSchedule.description} />
      <div className="mt-8">
        <ContentSection sections={bybSchedule.sections} />
      </div>
    </SectionWrapper>
  )
}
