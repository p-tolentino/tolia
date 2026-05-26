import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { productPrimers } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Product Primers",
  description: "One-page summaries of all Pru Life UK insurance products.",
}

export default function ProductPrimersPage() {
  return (
    <SectionWrapper>
      <PageHeader title={productPrimers.title} description={productPrimers.description} />
      <div className="mt-8">
        <ContentSection sections={productPrimers.sections} />
      </div>
    </SectionWrapper>
  )
}
