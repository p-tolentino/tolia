import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { yourFirst90Days } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Your First 90 Days",
  description:
    "Roadmap and resources to help you succeed in your first 90 days.",
}

export default function YourFirst90DaysPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={yourFirst90Days.title}
        description={yourFirst90Days.description}
      
        breadcrumbs={getBreadcrumbs("/new-recruits/your-first-90-days")}
      />
      <div className="mt-8">
        <ContentSection sections={yourFirst90Days.sections} />
      </div>
    </SectionWrapper>
  )
}
