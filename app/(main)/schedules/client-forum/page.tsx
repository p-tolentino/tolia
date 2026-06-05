import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { clientForumContent } from "@/lib/content/client-forum"

export const metadata: Metadata = {
  title: "Client Forum",
  description: "A space for client discussions, feedback, and engagement.",
}

export default function ClientForumPage() {
  return (
    <SectionWrapper>
      <PageHeader title={clientForumContent.title} description={clientForumContent.description} 
        breadcrumbs={getBreadcrumbs("/schedules/client-forum")}
      />
      <div className="mt-8">
        <ContentSection sections={clientForumContent.sections} routePath="/schedules/client-forum" />
      </div>
    </SectionWrapper>
  )
}
