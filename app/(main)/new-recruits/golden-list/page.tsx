import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { goldenList } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Golden List",
  description: "List of qualified and approved recruits.",
}

export default function GoldenListPage() {
  return (
    <SectionWrapper>
      <PageHeader title={goldenList.title} description={goldenList.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/golden-list")}
      />
      <div className="mt-8">
        <ContentSection sections={goldenList.sections} routePath="/new-recruits/golden-list" />
      </div>
    </SectionWrapper>
  )
}
