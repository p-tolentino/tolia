import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { underwriting } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Underwriting",
  description: "Underwriting guidelines, rules, and reference materials.",
}

export default function UnderwritingPage() {
  return (
    <SectionWrapper>
      <PageHeader title={underwriting.title} description={underwriting.description} 
        breadcrumbs={getBreadcrumbs("/agent-support/underwriting")}
      />
      <div className="mt-8">
        <ContentSection sections={underwriting.sections} routePath="/agent-support/underwriting" />
      </div>
    </SectionWrapper>
  )
}
