import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { incentivesContent } from "@/lib/content/incentives"

export const metadata: Metadata = {
  title: "Incentives",
  description: "Current incentive programs, rewards, and recognition.",
}

export default function IncentivesPage() {
  return (
    <SectionWrapper>
      <PageHeader title={incentivesContent.title} description={incentivesContent.description} 
        breadcrumbs={getBreadcrumbs("/rewards-and-incentives/incentives")}
      />
      <div className="mt-8">
        <ContentSection sections={incentivesContent.sections} />
      </div>
    </SectionWrapper>
  )
}
