import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { minutesOfTheMeeting } from "@/lib/content/for-unit-managers-only"

export const metadata: Metadata = {
  title: "Minutes of the Meeting",
  description: "Meeting minutes templates and archives.",
}

export default function MinutesOfTheMeetingPage() {
  return (
    <SectionWrapper>
      <PageHeader title={minutesOfTheMeeting.title} description={minutesOfTheMeeting.description} />
      <div className="mt-8">
        <ContentSection sections={minutesOfTheMeeting.sections} />
      </div>
    </SectionWrapper>
  )
}
