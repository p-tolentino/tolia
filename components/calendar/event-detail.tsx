import { format } from "date-fns"
import { Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
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
        {events.map((event) => (
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
                {event.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {event.time}
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
          </div>
        ))}
      </div>
    </div>
  )
}
