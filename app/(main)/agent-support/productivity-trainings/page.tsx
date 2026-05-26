import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { productivityTrainings } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Productivity Trainings",
  description: "Training sessions and materials to boost agent productivity.",
}

export default function ProductivityTrainingsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={productivityTrainings.title} description={productivityTrainings.description} />
      <div className="mt-8">
        <ContentSection sections={productivityTrainings.sections} />
      </div>
    </SectionWrapper>
  )
}
