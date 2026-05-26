"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CalendarDays, Repeat } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { CalendarEvent } from "@/lib/types"

interface EventModalProps {
  event: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const eventTypeLabels: Record<string, { label: string; color: string }> = {
  training: { label: "Training", color: "bg-blue-500" },
  meeting: { label: "Meeting", color: "bg-green-500" },
  deadline: { label: "Deadline", color: "bg-red-500" },
  social: { label: "Social", color: "bg-purple-500" },
  exam: { label: "Exam", color: "bg-amber-500" },
}

export function EventModal({ event, open, onOpenChange }: EventModalProps) {
  if (!event) return null

  const typeInfo = eventTypeLabels[event.eventType] ?? { label: event.eventType, color: "bg-gray-500" }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", typeInfo.color)} />
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
            <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
          </div>

          {event.time && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              <span>{event.time}</span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span>{event.location}</span>
            </div>
          )}

          {event.isRecurring && event.recurringPattern && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Repeat className="size-4 shrink-0" />
              <span>Repeats: {event.recurringPattern}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
