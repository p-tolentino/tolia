import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { pruCalendarContent, calendarEvents } from "@/lib/content/pru-calendar"
import { CalendarGrid } from "@/components/calendar/calendar-grid"

export const metadata: Metadata = {
  title: "PRU Calendar",
  description: "Stay up to date with TOLIA events, training sessions, and important deadlines.",
}

export default function PruCalendarPage() {
  return (
    <SectionWrapper>
      <PageHeader title={pruCalendarContent.title} description={pruCalendarContent.description} />
      <div className="mt-8">
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            { label: "Training", color: "bg-blue-500" },
            { label: "Meeting", color: "bg-green-500" },
            { label: "Deadline", color: "bg-red-500" },
            { label: "Social", color: "bg-purple-500" },
            { label: "Exam", color: "bg-amber-500" },
          ].map((type) => (
            <div key={type.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className={`size-2.5 rounded-full ${type.color}`} />
              {type.label}
            </div>
          ))}
        </div>
        <CalendarGrid events={calendarEvents} />
      </div>
    </SectionWrapper>
  )
}
