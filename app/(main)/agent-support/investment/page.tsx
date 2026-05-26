import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { investment } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Investment",
  description: "Investment product information, guides, and resources.",
}

export default function InvestmentPage() {
  return (
    <SectionWrapper>
      <PageHeader title={investment.title} description={investment.description} />
      <div className="mt-8">
        <ContentSection sections={investment.sections} />
      </div>
    </SectionWrapper>
  )
}
