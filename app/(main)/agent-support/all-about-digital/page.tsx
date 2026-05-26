import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { allAboutDigital } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "All About Digital",
  description: "Digital tools and platforms: PRUOne, PRISM, and more.",
}

export default function AllAboutDigitalPage() {
  return (
    <SectionWrapper>
      <PageHeader title={allAboutDigital.title} description={allAboutDigital.description} />
      <div className="mt-8">
        <ContentSection sections={allAboutDigital.sections} />
      </div>
    </SectionWrapper>
  )
}
