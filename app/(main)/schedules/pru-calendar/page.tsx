import { Suspense } from "react"
import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { CalendarSkeleton } from "@/components/shared/skeletons"
import { eventTypeConfig } from "@/lib/calendar-colors"
import { pruCalendarContent, calendarEvents as hardcodedEvents } from "@/lib/content/pru-calendar"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { getCalendarEvents } from "@/app/actions/calendar"

export const metadata: Metadata = {
  title: "PRU Calendar",
  description:
    "Stay up to date with TOLIA events, training sessions, and important deadlines.",
}

async function CalendarContent() {
  const { data: events, error } = await getCalendarEvents()

  const displayEvents = error ? hardcodedEvents : (events ?? [])

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-wrap gap-3">
        {Object.values(eventTypeConfig).map((type) => (
          <div
            key={type.label}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className={`size-2.5 rounded-full ${type.dot}`} />
            {type.label}
          </div>
        ))}
      </div>
      <CalendarGrid events={displayEvents} />
    </div>
  )
}

export default function PruCalendarPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={pruCalendarContent.title}
        description={pruCalendarContent.description}
        breadcrumbs={getBreadcrumbs("/schedules/pru-calendar")}
      />
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarContent />
      </Suspense>
    </SectionWrapper>
  )
}
