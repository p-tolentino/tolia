import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { agentsDirectory } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "Agents Directory",
  description: "Complete directory of TOLIA agents.",
}

export default function AgentsDirectoryPage() {
  return (
    <SectionWrapper>
      <PageHeader title={agentsDirectory.title} description={agentsDirectory.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only/agents-directory")}
      />
      <div className="mt-8">
        <ContentSection sections={agentsDirectory.sections} />
      </div>
    </SectionWrapper>
  )
}
