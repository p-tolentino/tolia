import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { recognitionContent } from "@/lib/content/recognition"

export const metadata: Metadata = {
  title: "Recognition",
  description: "Posters and announcements celebrating agent achievements.",
}

export default function RecognitionPage() {
  return (
    <SectionWrapper>
      <PageHeader title={recognitionContent.title} description={recognitionContent.description} />
      <div className="mt-8">
        <ContentSection sections={recognitionContent.sections} />
      </div>
    </SectionWrapper>
  )
}
