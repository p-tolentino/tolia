import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { leapContent } from "@/lib/content/leap"

export const metadata: Metadata = {
  title: "LEAP: Next TOLIA Leader",
  description: "Leadership development program for aspiring TOLIA leaders.",
}

export default function LeapPage() {
  return (
    <SectionWrapper>
      <PageHeader title={leapContent.title} description={leapContent.description} 
        breadcrumbs={getBreadcrumbs("/leap")}
      />
      <div className="mt-8">
        <ContentSection sections={leapContent.sections} routePath="/leap" />
      </div>
    </SectionWrapper>
  )
}
