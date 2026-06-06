"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
type FilterTab = "all" | "upcoming" | "recurring"

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

export function EventsSection() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [filter, setFilter] = useState<FilterTab>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null)

  // ── Single-phase pagination (upcoming, recurring) ──
  const hasMoreRef = useRef<Record<"upcoming" | "recurring", boolean>>({
    upcoming: true,
    recurring: true,
  })
  const cacheRef = useRef<Record<"upcoming" | "recurring", CalendarEvent[]>>({
    upcoming: [],
    recurring: [],
  })
  const offsetsRef = useRef<Record<"upcoming" | "recurring", number>>({
    upcoming: 0,
    recurring: 0,
  })

  // ── Two-phase pagination (all) ──
  const allForwardCache = useRef<CalendarEvent[]>([])
  const allForwardLoaded = useRef(false)
  const allBackwardCache = useRef<CalendarEvent[]>([])
  const allBackwardOffset = useRef(0)
  const allBackwardHasMore = useRef(true)

  // ── Helpers ──

  function clearAllCaches() {
    allForwardLoaded.current = false
    allForwardCache.current = []
    allBackwardCache.current = []
    allBackwardOffset.current = 0
    allBackwardHasMore.current = true
    cacheRef.current = { upcoming: [], recurring: [] }
    offsetsRef.current = { upcoming: 0, recurring: 0 }
    hasMoreRef.current = { upcoming: true, recurring: true }
  }

  // ── Single-phase load (upcoming, recurring) ──

  const load = useCallback(
    async (reset?: boolean) => {
      if (filter === "all") return
      const tab = filter as "upcoming" | "recurring"
      const offset = reset ? 0 : offsetsRef.current[tab]
      const { data, error, total } = await getCalendarEvents({
        limit: PAGE_SIZE,
        offset,
        filter: tab === "upcoming" ? "upcoming" : "recurring",
      })
      if (error) {
        toast.error(error)
        return
      }
      const newEvents = reset
        ? (data ?? [])
        : [...cacheRef.current[tab], ...(data ?? [])]
      cacheRef.current[tab] = newEvents
      offsetsRef.current[tab] = offset + PAGE_SIZE
      hasMoreRef.current[tab] = total
        ? offset + PAGE_SIZE < total
        : (data?.length ?? 0) === PAGE_SIZE
      setEvents(newEvents)
    },
    [filter]
  )

  // ── Two-phase load (all) ──

  const loadAll = useCallback(async () => {
    if (allForwardLoaded.current) {
      setEvents([...allForwardCache.current, ...allBackwardCache.current])
      setLoading(false)
      return
    }
    setLoading(true)
    const [forwardRes, backwardRes] = await Promise.all([
      getCalendarEvents({ direction: "forward" }),
      getCalendarEvents({ direction: "backward", limit: PAGE_SIZE, offset: 0 }),
    ])
    if (forwardRes.error || backwardRes.error) {
      toast.error(
        forwardRes.error ?? backwardRes.error ?? "Failed to load events"
      )
      setLoading(false)
      return
    }
    const forward = forwardRes.data ?? []
    const backward = backwardRes.data ?? []
    allForwardCache.current = forward
    allForwardLoaded.current = true
    allBackwardCache.current = backward
    allBackwardOffset.current = PAGE_SIZE
    allBackwardHasMore.current = backwardRes.total
      ? PAGE_SIZE < backwardRes.total
      : backward.length === PAGE_SIZE
    setEvents([...forward, ...backward])
    setLoading(false)
  }, [])

  // ── Effects ──

  useEffect(() => {
    if (filter === "all") return
    const tab = filter as "upcoming" | "recurring"
    if (cacheRef.current[tab].length > 0) {
      setEvents(cacheRef.current[tab])
      setLoading(false)
      return
    }
    setLoading(true)
    load(true).finally(() => setLoading(false))
  }, [filter, load])

  useEffect(() => {
    if (filter !== "all") return
    loadAll()
  }, [filter, loadAll])

  // ── Mutations ──

  async function confirmDelete() {
    if (!deletingEvent) return
    const { success, error } = await deleteCalendarEvent(deletingEvent.id)
    if (error) toast.error(error)
    else {
      toast.success("Event deleted")
      clearAllCaches()
      setLoading(true)
      if (filter === "all") {
        loadAll()
      } else {
        load(true).finally(() => setLoading(false))
      }
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
    clearAllCaches()
    setLoading(true)
    if (filter === "all") {
      loadAll()
    } else {
      load(true).finally(() => setLoading(false))
    }
  }

  async function loadMore() {
    if (filter === "all") {
      if (!allBackwardHasMore.current) return
      setLoadingMore(true)
      const { data, error, total } = await getCalendarEvents({
        direction: "backward",
        limit: PAGE_SIZE,
        offset: allBackwardOffset.current,
      })
      if (error) {
        toast.error(error)
        setLoadingMore(false)
        return
      }
      const newBackward = [...allBackwardCache.current, ...(data ?? [])]
      allBackwardCache.current = newBackward
      allBackwardOffset.current += PAGE_SIZE
      allBackwardHasMore.current = total
        ? allBackwardOffset.current < total
        : (data?.length ?? 0) === PAGE_SIZE
      setEvents([...allForwardCache.current, ...newBackward])
      setLoadingMore(false)
      return
    }
    setLoadingMore(true)
    await load()
    setLoadingMore(false)
  }

  // ── Render ──

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
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Events</TabsTrigger>
        </TabsList>
      </Tabs>

      {events.length === 0 && filter === "upcoming" ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <CalendarRange className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No upcoming events
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            There are no events scheduled for today or later.
          </p>
          <Button className="mt-4" size="sm" onClick={handleAdd}>
            <Plus className="mr-1 size-4" />
            Add Event
          </Button>
        </div>
      ) : events.length === 0 && filter === "recurring" ? (
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
      ) : events.length === 0 ? (
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
      ) : (
        <ScrollArea className="h-125 pr-4">
          <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={
              filter === "all"
                ? allBackwardHasMore.current
                : hasMoreRef.current[filter as "upcoming" | "recurring"]
            }
            loading={loadingMore}
          >
            <div className="space-y-3 p-0.5">
              {events.map((event, index) => {
                const forwardCount = allForwardCache.current.length
                const showSeparator =
                  filter === "all" &&
                  index === forwardCount &&
                  forwardCount > 0 &&
                  allBackwardCache.current.length > 0

                const eventDate = new Date(event.date)
                return (
                  <div key={event.id}>
                    {showSeparator && (
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-3 text-xs text-muted-foreground">
                            Past Events
                          </span>
                        </div>
                      </div>
                    )}
                    <Card className="overflow-hidden border py-0 shadow-sm transition-all hover:shadow-md">
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
                                    {event.endTime
                                      ? ` - ${event.endTime}`
                                      : ""}
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
                                  {format(
                                    new Date(event.endDate),
                                    "MMM d, yyyy"
                                  )}
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
                  </div>
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
