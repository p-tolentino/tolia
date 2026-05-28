import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { unitBusinessPlan } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "Unit Business Plan",
  description: "Develop, track, and manage your unit business plan.",
}

export default function UnitBusinessPlanPage() {
  return (
    <SectionWrapper>
      <PageHeader title={unitBusinessPlan.title} description={unitBusinessPlan.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only/unit-business-plan")}
      />
      <div className="mt-8">
        <ContentSection sections={unitBusinessPlan.sections} />
      </div>
    </SectionWrapper>
  )
}
