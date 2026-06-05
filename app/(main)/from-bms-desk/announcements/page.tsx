import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { announcements } from "@/lib/content/from-bms-desk"

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest announcements and updates from the Branch Manager.",
}

export default function AnnouncementsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={announcements.title} description={announcements.description} 
        breadcrumbs={getBreadcrumbs("/from-bms-desk/announcements")}
      />
      <div className="mt-8">
        <ContentSection sections={announcements.sections} routePath="/from-bms-desk/announcements" />
      </div>
    </SectionWrapper>
  )
}
