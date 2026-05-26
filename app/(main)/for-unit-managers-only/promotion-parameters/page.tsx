import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { promotionParameters } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "Promotion Parameters",
  description: "Promotion criteria, parameters, and guidelines.",
}

export default function PromotionParametersPage() {
  return (
    <SectionWrapper>
      <PageHeader title={promotionParameters.title} description={promotionParameters.description} />
      <div className="mt-8">
        <ContentSection sections={promotionParameters.sections} />
      </div>
    </SectionWrapper>
  )
}
