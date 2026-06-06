import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { getAnnouncements } from "@/app/actions/manage"
import { AnnouncementCard } from "@/components/from-bms-desk/announcement-card"
import { RouteDocuments } from "@/components/shared/route-documents"
import { EmptyStatePlaceholder } from "@/components/shared/empty-state"

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest announcements and updates from the Branch Manager.",
}

export default async function AnnouncementsPage() {
  const { data: announcements } = await getAnnouncements()

  return (
    <SectionWrapper>
      <PageHeader
        title="Announcements"
        description="Latest announcements and updates from the Branch Manager."
        breadcrumbs={getBreadcrumbs("/from-bms-desk/announcements")}
      />
      <div className="mt-8 space-y-4">
        {announcements && announcements.length > 0 ? (
          announcements.map((a) => (
            <AnnouncementCard
              key={a.id}
              title={a.title}
              content={a.content}
              created_at={a.created_at}
              author_id={a.author_id}
            />
          ))
        ) : (
          <EmptyStatePlaceholder title="No announcements yet" description="Check back soon for updates from the Branch Manager." />
        )}
      </div>
      <div className="mt-10">
        <RouteDocuments routePath="/from-bms-desk/announcements" />
      </div>
    </SectionWrapper>
  )
}
