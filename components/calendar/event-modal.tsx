"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CalendarDays, Repeat, Paperclip, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getTypeConfig } from "@/lib/calendar-colors"
import { formatTimeForCell } from "@/lib/calendar-utils"
import type { CalendarEvent } from "@/lib/types"

interface EventModalProps {
  event: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventModal({ event, open, onOpenChange }: EventModalProps) {
  if (!event) return null

  const typeInfo = getTypeConfig(event.eventType)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", typeInfo.dot)} />
            <Badge variant="outline" className="text-[10px]">{typeInfo.label}</Badge>
          </div>
          <DialogTitle className="mt-2 text-xl">{event.title}</DialogTitle>
          {event.description && (
            <DialogDescription>{event.description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0" />
            <span>
              {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
              {event.endDate && <> &ndash; {format(new Date(event.endDate), "EEEE, MMMM d, yyyy")}</>}
            </span>
          </div>

          {event.organizer && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="size-4 shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">@</span>
              <span>{event.organizer}</span>
            </div>
          )}

          {event.allDay ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              <span>All Day</span>
            </div>
          ) : (event.time || event.startTime) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              <span>{event.time || `${formatTimeForCell(event.startTime)}${event.endTime ? ` - ${formatTimeForCell(event.endTime)}` : ""}`}</span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {event.locationUrl ? (
                <a href={event.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                  {event.location} <ExternalLink className="ml-0.5 inline size-3" />
                </a>
              ) : (
                <span>{event.location}</span>
              )}
            </div>
          )}

          {event.isRecurring && event.recurringPattern && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Repeat className="size-4 shrink-0" />
              <span>Repeats: {event.recurringPattern}</span>
            </div>
          )}

          {event.attachments && event.attachments.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Paperclip className="size-3.5" /> Attachments ({event.attachments.length})
              </p>
              <div className="space-y-1">
                {event.attachments.map((att, i) => (
                  <a
                    key={i}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border bg-muted/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <span className="font-medium uppercase text-[10px] text-muted-foreground/60">{att.type}</span>
                    <span className="truncate">{att.name}</span>
                    <ExternalLink className="ml-auto size-3 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
