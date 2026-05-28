import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { ropIlt } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "ROP ILT",
  description: "Instructor-Led Training sessions for new recruits.",
}

export default function RopIltPage() {
  return (
    <SectionWrapper>
      <PageHeader title={ropIlt.title} description={ropIlt.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/rop-ilt")}
      />
      <div className="mt-8">
        <ContentSection sections={ropIlt.sections} />
      </div>
    </SectionWrapper>
  )
}
