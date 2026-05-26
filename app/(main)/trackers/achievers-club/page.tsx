import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { achieversClub } from "@/lib/content/trackers"

export const metadata: Metadata = {
  title: "Achievers Club",
  description: "Track your Achievers Club qualifications and progress.",
}

export default function AchieversClubPage() {
  return (
    <SectionWrapper>
      <PageHeader title={achieversClub.title} description={achieversClub.description} />
      <div className="mt-8">
        <ContentSection sections={achieversClub.sections} />
      </div>
    </SectionWrapper>
  )
}
