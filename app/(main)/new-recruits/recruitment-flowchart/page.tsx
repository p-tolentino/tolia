import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { Timeline } from "@/components/shared/timeline"
import { recruitmentFlowchart } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Recruitment Flowchart",
  description: "Step-by-step guide to the recruitment process.",
}

export default function RecruitmentFlowchartPage() {
  const timelineSection = recruitmentFlowchart.sections.find(
    (s) => s.timeline
  )

  return (
    <SectionWrapper>
      <PageHeader title={recruitmentFlowchart.title} description={recruitmentFlowchart.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/recruitment-flowchart")}
      />
      <div className="mt-8">
        <h2 className="mb-6 text-lg font-semibold sm:text-xl">
          {timelineSection?.heading}
        </h2>
        {timelineSection?.timeline && (
          <Timeline items={timelineSection.timeline} />
        )}
      </div>
    </SectionWrapper>
  )
}
