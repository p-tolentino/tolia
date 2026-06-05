import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { onboardingMaterials } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "Onboarding Materials",
  description: "Onboarding materials for new agents joining your unit.",
}

export default function OnboardingMaterialsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={onboardingMaterials.title} description={onboardingMaterials.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only/onboarding-materials")}
      />
      <div className="mt-8">
        <ContentSection sections={onboardingMaterials.sections} routePath="/for-unit-managers-only/onboarding-materials" />
      </div>
    </SectionWrapper>
  )
}
