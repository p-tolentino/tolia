import { format } from "date-fns"
import { Clock, MapPin, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { getTypeConfig } from "@/lib/calendar-colors"
import { Badge } from "@/components/ui/badge"
import { formatTimeForCell } from "@/lib/calendar-utils"
import type { CalendarEvent } from "@/lib/types"

interface EventDetailProps {
  date: Date
  events: CalendarEvent[]
}

const eventStyles: Record<string, string> = {
  training: getTypeConfig("training").card,
  meeting: getTypeConfig("meeting").card,
  deadline: getTypeConfig("deadline").card,
  social: getTypeConfig("social").card,
  exam: getTypeConfig("exam").card,
}

const eventTypeLabels: Record<string, { label: string; className: string }> = {
  training: { label: getTypeConfig("training").label, className: getTypeConfig("training").badge },
  meeting: { label: getTypeConfig("meeting").label, className: getTypeConfig("meeting").badge },
  deadline: { label: getTypeConfig("deadline").label, className: getTypeConfig("deadline").badge },
  social: { label: getTypeConfig("social").label, className: getTypeConfig("social").badge },
  exam: { label: getTypeConfig("exam").label, className: getTypeConfig("exam").badge },
}

export function EventDetail({ date, events }: EventDetailProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
        No events on {format(date, "MMMM d, yyyy")}
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        {format(date, "EEEE, MMMM d, yyyy")} &mdash; {events.length} event{events.length > 1 ? "s" : ""}
      </h3>
      <div className="space-y-2">
        {events.map((event) => {
          const typeLabel = eventTypeLabels[event.eventType]
          return (
            <div
              key={event.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border-l-4 p-3",
                eventStyles[event.eventType] ?? "border-l-border",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{event.title}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {typeLabel && (
                    <Badge
                      variant="outline"
                      className={cn("sm:hidden", typeLabel.className)}
                    >
                      {typeLabel.label}
                    </Badge>
                  )}
                  {event.endDate && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {format(new Date(event.date), "MMM d")} &ndash; {format(new Date(event.endDate), "MMM d, yyyy")}
                    </span>
                  )}
                  {event.allDay ? (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> All Day
                    </span>
                  ) : (event.time || event.startTime) && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {event.time || `${formatTimeForCell(event.startTime)}${event.endTime ? ` - ${formatTimeForCell(event.endTime)}` : ""}`}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {event.location}
                    </span>
                  )}
                  {event.isRecurring && event.recurringPattern && (
                    <span className="text-primary">({event.recurringPattern})</span>
                  )}
                </div>
              </div>
              {typeLabel && (
                <Badge
                  variant="outline"
                  className={cn("hidden sm:inline-flex", typeLabel.className)}
                >
                  {typeLabel.label}
                </Badge>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
