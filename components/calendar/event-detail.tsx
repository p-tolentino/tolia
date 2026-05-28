import { format } from "date-fns"
import { Clock, MapPin, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatTimeForCell } from "@/lib/calendar-utils"
import type { CalendarEvent } from "@/lib/types"

interface EventDetailProps {
  date: Date
  events: CalendarEvent[]
}

const eventStyles: Record<string, string> = {
  training: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
  meeting: "border-l-green-500 bg-green-50 dark:bg-green-950/20",
  deadline: "border-l-red-500 bg-red-50 dark:bg-red-950/20",
  social: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20",
  exam: "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
}

const eventTypeLabels: Record<string, { label: string; className: string }> = {
  training: {
    label: "Training",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  },
  meeting: {
    label: "Meeting",
    className:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400",
  },
  deadline: {
    label: "Deadline",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400",
  },
  social: {
    label: "Social",
    className:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400",
  },
  exam: {
    label: "Exam",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400",
  },
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
                  {(event.time || event.startTime) && !event.endDate && (
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
