import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { fromBmsDeskContent } from "@/lib/content/from-bms-desk"

export const metadata: Metadata = {
  title: "From BM's Desk",
  description: "Updates, announcements, and messages from the Branch Manager.",
}

export default function FromBmsDeskPage() {
  return (
    <SectionWrapper>
      <PageHeader title={fromBmsDeskContent.title} description={fromBmsDeskContent.description} />
      <div className="mt-8">
        <ContentSection sections={fromBmsDeskContent.sections} />
      </div>
    </SectionWrapper>
  )
}
