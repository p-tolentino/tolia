import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { mdrtMaterials } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "MDRT Materials",
  description: "MDRT qualification resources, guides, and reference materials.",
}

export default function MdrtMaterialsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={mdrtMaterials.title} description={mdrtMaterials.description} 
        breadcrumbs={getBreadcrumbs("/agent-support/mdrt-materials")}
      />
      <div className="mt-8">
        <ContentSection sections={mdrtMaterials.sections} />
      </div>
    </SectionWrapper>
  )
}
