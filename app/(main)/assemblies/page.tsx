import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { assembliesContent } from "@/lib/content/assemblies"

export const metadata: Metadata = {
  title: "Assemblies",
  description: "Branch assembly schedules, materials, and updates.",
}

export default function AssembliesPage() {
  return (
    <SectionWrapper>
      <PageHeader title={assembliesContent.title} description={assembliesContent.description} 
        breadcrumbs={getBreadcrumbs("/assemblies")}
      />
      <div className="mt-8">
        <ContentSection sections={assembliesContent.sections} />
      </div>
    </SectionWrapper>
  )
}
