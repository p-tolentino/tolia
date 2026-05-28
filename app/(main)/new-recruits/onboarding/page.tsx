import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { onboarding } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Step-by-step onboarding process for new TOLIA agents.",
}

export default function OnboardingPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={onboarding.title}
        description={onboarding.description}
      
        breadcrumbs={getBreadcrumbs("/new-recruits/onboarding")}
      />
      <div className="mt-8">
        <ContentSection sections={onboarding.sections} />
      </div>
    </SectionWrapper>
  )
}
