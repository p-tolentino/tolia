import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { amaContent } from "@/lib/content/ama"

export const metadata: Metadata = {
  title: "Ask Me Anything",
  description: "Submit your questions and get answers from the leadership team.",
}

export default function AskMeAnythingPage() {
  return (
    <SectionWrapper>
      <PageHeader title={amaContent.title} description={amaContent.description} 
        breadcrumbs={getBreadcrumbs("/from-bms-desk/ask-me-anything")}
      />
      <div className="mt-8">
        <ContentSection sections={amaContent.sections} />
      </div>
    </SectionWrapper>
  )
}
