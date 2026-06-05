"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  CalendarRange,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { CalendarEvent } from "@/lib/types"
import { EventFormDialog } from "./event-form-dialog"
import { InfiniteScroll } from "@/components/ui/infinite-scroll"
import { getCalendarEvents, deleteCalendarEvent } from "@/app/actions/calendar"
import { rruleToDisplayText } from "@/lib/calendar/recurrence"

const PAGE_SIZE = 10

const eventTypeColors: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  training: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  meeting: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  deadline: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  social: {
    bg: "bg-teal-50 dark:bg-teal-950/30",
    text: "text-teal-700 dark:text-teal-400",
    dot: "bg-teal-500",
  },
  exam: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
}

function EventTypeBadge({ type }: { type: string }) {
  const colors = eventTypeColors[type] ?? eventTypeColors.meeting
  return (
    <Badge
      className={cn(
        "gap-1 rounded-full border-0 px-2.5 py-0.5 text-[11px] font-medium",
        colors.bg,
        colors.text
      )}
    >
      <span className={cn("size-1.5 rounded-full", colors.dot)} />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  )
}

type FilterTab = "all" | "upcoming" | "recurring"

export function EventsSection() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null)
  const [filter, setFilter] = useState<FilterTab>("all")
  const offsetRef = useRef(0)

  const load = useCallback(async (reset?: boolean) => {
    const offset = reset ? 0 : offsetRef.current
    const { data, error, total } = await getCalendarEvents({
      limit: PAGE_SIZE,
      offset,
    })
    if (error) {
      toast.error(error)
      return
    }
    if (reset) {
      setEvents(data ?? [])
    } else {
      setEvents((prev) => [...prev, ...(data ?? [])])
    }
    offsetRef.current = offset + PAGE_SIZE
    setHasMore(
      total ? offsetRef.current < total : (data?.length ?? 0) === PAGE_SIZE
    )
  }, [])

  useEffect(() => {
    offsetRef.current = 0
    setLoading(true)
    load(true).finally(() => setLoading(false))
  }, [load])

  async function confirmDelete() {
    if (!deletingEvent) return
    const { success, error } = await deleteCalendarEvent(deletingEvent.id)
    if (error) toast.error(error)
    else {
      toast.success("Event deleted")
      offsetRef.current = 0
      load(true)
    }
    setDeletingEvent(null)
  }

  function handleEdit(event: CalendarEvent) {
    setEditingEvent(event)
    setDialogOpen(true)
  }

  function handleAdd() {
    setEditingEvent(null)
    setDialogOpen(true)
  }

  function handleSaved() {
    offsetRef.current = 0
    load(true)
  }

  async function loadMore() {
    setLoadingMore(true)
    await load()
    setLoadingMore(false)
  }

  const today = format(new Date(), "yyyy-MM-dd")
  const filtered =
    filter === "upcoming"
      ? events.filter((e) => e.date >= today)
      : filter === "recurring"
        ? events.filter((e) => e.rrule)
        : events

  if (loading) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Loading events...
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Calendar Events</h3>
        <Button size="sm" onClick={handleAdd}>
          <Plus className="mr-1 size-4" />
          Add Event
        </Button>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
        <TabsList className="overflow-hidden">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Events</TabsTrigger>
        </TabsList>
      </Tabs>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <CalendarRange className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No events yet
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first calendar event to get started managing your
            team&apos;s schedule.
          </p>
          <Button className="mt-4" size="sm" onClick={handleAdd}>
            <Plus className="mr-1 size-4" />
            Add Event
          </Button>
        </div>
      ) : filtered.length === 0 && filter === "recurring" ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <RotateCcw className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No recurring events
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Events with a recurrence pattern set will appear here.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <CalendarRange className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No matching events
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try adjusting the filter to see more events.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-125 pr-4">
          <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loadingMore}
          >
            <div className="space-y-3 p-0.5">
              {filtered.map((event) => {
                const eventDate = new Date(event.date)
                return (
                  <Card
                    key={event.id}
                    className="overflow-hidden border py-0 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex">
                      <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r bg-muted/30 py-3">
                        <span className="text-xs font-bold text-muted-foreground uppercase">
                          {format(eventDate, "MMM")}
                        </span>
                        <span className="text-2xl leading-none font-bold tracking-tight">
                          {format(eventDate, "d")}
                        </span>
                        <span className="mt-0.5 text-[11px] text-muted-foreground">
                          {format(eventDate, "EEE")}
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-between p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <EventTypeBadge type={event.eventType} />
                            <h4 className="text-sm font-medium">
                              {event.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex min-w-28 shrink-0 items-center gap-1">
                              {event.allDay ? (
                                <>
                                  <Clock className="size-3" />
                                  All day
                                </>
                              ) : event.startTime ? (
                                <>
                                  <Clock className="size-3" />
                                  {event.startTime}
                                  {event.endTime ? ` - ${event.endTime}` : ""}
                                </>
                              ) : null}
                            </span>
                            {event.location && (
                              <span className="flex max-w-48 items-center gap-1">
                                <MapPin className="size-3 shrink-0" />
                                {event.location}
                              </span>
                            )}
                            {event.endDate && (
                              <span
                                className={`flex items-center gap-1 ${event.location && "ml-8"}`}
                              >
                                <CalendarRange className="size-3" />
                                Until{" "}
                                {format(new Date(event.endDate), "MMM d, yyyy")}
                              </span>
                            )}
                          </div>
                          {event.rrule && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <RotateCcw className="size-3 shrink-0" />
                              {rruleToDisplayText(event.rrule)}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEdit(event)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeletingEvent(event)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </InfiniteScroll>
        </ScrollArea>
      )}

      <EventFormDialog
        event={editingEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSaved={handleSaved}
      />

      <AlertDialog
        open={!!deletingEvent}
        onOpenChange={(open) => {
          if (!open) setDeletingEvent(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingEvent?.title}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
