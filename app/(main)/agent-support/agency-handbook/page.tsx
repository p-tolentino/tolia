import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { agencyHandbook } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Agency Handbook",
  description: "Complete agency reference handbook for all TOLIA agents.",
}

export default function AgencyHandbookPage() {
  return (
    <SectionWrapper>
      <PageHeader title={agencyHandbook.title} description={agencyHandbook.description} 
        breadcrumbs={getBreadcrumbs("/agent-support/agency-handbook")}
      />
      <div className="mt-8">
        <ContentSection sections={agencyHandbook.sections} routePath="/agent-support/agency-handbook" />
      </div>
    </SectionWrapper>
  )
}
