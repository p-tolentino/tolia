import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { recruitmentFlowchart } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Recruitment Flowchart",
  description: "Step-by-step guide to the recruitment process.",
}

export default function RecruitmentFlowchartPage() {
  return (
    <SectionWrapper>
      <PageHeader title={recruitmentFlowchart.title} description={recruitmentFlowchart.description} />
      <div className="mt-8">
        <ContentSection sections={recruitmentFlowchart.sections} />
      </div>
    </SectionWrapper>
  )
}
