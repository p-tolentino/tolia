import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { tappMaterials } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "TAPP Materials",
  description: "TAPP program materials, guides, and resources.",
}

export default function TappMaterialsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={tappMaterials.title} description={tappMaterials.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only/tapp-materials")}
      />
      <div className="mt-8">
        <ContentSection sections={tappMaterials.sections} routePath="/for-unit-managers-only/tapp-materials" />
      </div>
    </SectionWrapper>
  )
}
