import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { prospectList } from "@/lib/content/rookie-support"

export const metadata: Metadata = {
  title: "Prospect List",
  description: "Tools and templates for managing your prospect leads.",
}

export default function ProspectListPage() {
  return (
    <SectionWrapper>
      <PageHeader title={prospectList.title} description={prospectList.description} />
      <div className="mt-8">
        <ContentSection sections={prospectList.sections} />
      </div>
    </SectionWrapper>
  )
}
