import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { reviewer } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Reviewer",
  description: "Exam reviewers and study materials for the licensing exam.",
}

export default function ReviewerPage() {
  return (
    <SectionWrapper>
      <PageHeader title={reviewer.title} description={reviewer.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/reviewer")}
      />
      <div className="mt-8">
        <ContentSection sections={reviewer.sections} />
      </div>
    </SectionWrapper>
  )
}
