import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { icExamSchedule } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "IC Exam Schedule",
  description: "Licensing examination schedules and registration.",
}

export default function IcExamSchedulePage() {
  return (
    <SectionWrapper>
      <PageHeader title={icExamSchedule.title} description={icExamSchedule.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/ic-exam-schedule")}
      />
      <div className="mt-8">
        <ContentSection sections={icExamSchedule.sections} />
      </div>
    </SectionWrapper>
  )
}
