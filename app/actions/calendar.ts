"use server"

import { createClient } from "@/lib/supabase/server"
import { requireManageRole } from "@/lib/auth/require-role"
import { revalidatePath } from "next/cache"
import type { CalendarEvent } from "@/lib/types"

export async function getCalendarMonthEvents(
  year: number,
  month: number,
): Promise<{ data: CalendarEvent[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`
    const lastDay = new Date(year, month, 0).getDate()
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*, event_attachments(*)")
      .in("status", ["published", "rescheduled"])
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true })
      .order("start_time", { ascending: true })

    if (error) return { data: null, error: error.message }

    const events = (data ?? []).map(mapDbEventToCalendarEvent)
    return { data: events, error: null }
  } catch {
    return { data: null, error: "Failed to fetch calendar events" }
  }
}

export async function getCalendarEvents(options?: {
  limit?: number
  offset?: number
  filter?: "all" | "upcoming" | "recurring"
  direction?: "forward" | "backward"
}): Promise<{
  data: CalendarEvent[] | null
  error: string | null
  total?: number
}> {
  try {
    const supabase = await createClient()

    let query = supabase
      .from("calendar_events")
      .select("*, event_attachments(*)", { count: "exact" })
      .in("status", ["published", "rescheduled"])

    const today = new Date().toISOString().split("T")[0]

    if (options?.direction === "forward") {
      query = query.gte("date", today).order("date", { ascending: true })
    } else if (options?.direction === "backward") {
      query = query.lt("date", today).order("date", { ascending: false })
    } else {
      query = query.order("date", { ascending: true })
    }

    if (options?.filter === "upcoming") {
      query = query.gte("date", today)
    }
    if (options?.filter === "recurring") {
      query = query.not("rrule", "is", null)
    }

    query = query.order("start_time", { ascending: true })

    if (options?.limit) query = query.limit(options.limit)
    if (options?.offset) query = query.range(options.offset, options.offset + (options.limit ?? 20) - 1)

    const { data, error, count } = await query

    if (error) return { data: null, error: error.message }

    const events = (data ?? []).map(mapDbEventToCalendarEvent)
    return { data: events, error: null, total: count ?? undefined }
  } catch {
    return { data: null, error: "Failed to fetch calendar events" }
  }
}

export async function getCalendarEventById(
  id: string,
): Promise<{ data: CalendarEvent | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*, event_attachments(*)")
      .eq("id", id)
      .single()

    if (error) return { data: null, error: error.message }
    return { data: mapDbEventToCalendarEvent(data), error: null }
  } catch {
    return { data: null, error: "Failed to fetch event" }
  }
}

export async function createCalendarEvent(
  event: Omit<
    CalendarEvent,
    "id" | "createdAt" | "updatedAt" | "attachments"
  > & { attachments?: { name: string; url: string; type: string }[] },
): Promise<{ data: CalendarEvent | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()

    const { attachments, ...eventData } = event

    const { data, error } = await supabase
      .from("calendar_events")
      .insert({
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        end_date: eventData.endDate,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        all_day: eventData.allDay ?? false,
        location: eventData.location,
        location_url: eventData.locationUrl,
        event_type: eventData.eventType,
        status: eventData.status ?? "published",
        organizer: eventData.organizer,
        is_recurring: eventData.isRecurring ?? false,
        recurring_pattern: eventData.recurringPattern,
        rrule: eventData.rrule,
        registration_url: eventData.registrationUrl,
        href: eventData.href,
        created_by: auth.userId,
      })
      .select("*, event_attachments(*)")
      .single()

    if (error) return { data: null, error: error.message }

    if (attachments && attachments.length > 0) {
      const { error: attError } = await supabase
        .from("event_attachments")
        .insert(
          attachments.map((att) => ({
            event_id: data.id,
            name: att.name,
            url: att.url,
            type: att.type,
          })),
        )

      if (attError) return { data: null, error: attError.message }
    }

    revalidatePath("/")
    return { data: mapDbEventToCalendarEvent(data), error: null }
  } catch {
    return { data: null, error: "Failed to create event" }
  }
}

export async function updateCalendarEvent(
  id: string,
  updates: Partial<
    Omit<CalendarEvent, "id" | "createdAt" | "attachments">
  > & {
    attachments?: { name: string; url: string; type: string }[]
  },
): Promise<{ data: CalendarEvent | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()
    const { attachments, ...eventUpdates } = updates

    const dbUpdates: Record<string, unknown> = {}
    if (eventUpdates.title !== undefined) dbUpdates.title = eventUpdates.title
    if (eventUpdates.description !== undefined)
      dbUpdates.description = eventUpdates.description
    if (eventUpdates.date !== undefined) dbUpdates.date = eventUpdates.date
    if (eventUpdates.endDate !== undefined)
      dbUpdates.end_date = eventUpdates.endDate
    if (eventUpdates.startTime !== undefined)
      dbUpdates.start_time = eventUpdates.startTime
    if (eventUpdates.endTime !== undefined)
      dbUpdates.end_time = eventUpdates.endTime
    if (eventUpdates.allDay !== undefined)
      dbUpdates.all_day = eventUpdates.allDay
    if (eventUpdates.location !== undefined)
      dbUpdates.location = eventUpdates.location
    if (eventUpdates.locationUrl !== undefined)
      dbUpdates.location_url = eventUpdates.locationUrl
    if (eventUpdates.eventType !== undefined)
      dbUpdates.event_type = eventUpdates.eventType
    if (eventUpdates.status !== undefined) dbUpdates.status = eventUpdates.status
    if (eventUpdates.organizer !== undefined)
      dbUpdates.organizer = eventUpdates.organizer
    if (eventUpdates.isRecurring !== undefined)
      dbUpdates.is_recurring = eventUpdates.isRecurring
    if (eventUpdates.recurringPattern !== undefined)
      dbUpdates.recurring_pattern = eventUpdates.recurringPattern
    if (eventUpdates.rrule !== undefined) dbUpdates.rrule = eventUpdates.rrule
    if (eventUpdates.registrationUrl !== undefined)
      dbUpdates.registration_url = eventUpdates.registrationUrl
    if (eventUpdates.href !== undefined) dbUpdates.href = eventUpdates.href

    dbUpdates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from("calendar_events")
      .update(dbUpdates)
      .eq("id", id)
      .select("*, event_attachments(*)")
      .single()

    if (error) return { data: null, error: error.message }

    if (attachments) {
      await supabase.from("event_attachments").delete().eq("event_id", id)

      if (attachments.length > 0) {
        const { error: attError } = await supabase
          .from("event_attachments")
          .insert(
            attachments.map((att) => ({
              event_id: id,
              name: att.name,
              url: att.url,
              type: att.type,
            })),
          )

        if (attError) return { data: null, error: attError.message }
      }
    }

    revalidatePath("/")
    return { data: mapDbEventToCalendarEvent(data), error: null }
  } catch {
    return { data: null, error: "Failed to update event" }
  }
}

export async function deleteCalendarEvent(
  id: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { success: false, error: auth.error }
    const supabase = await createClient()
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id)

    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true, error: null }
  } catch {
    return { success: false, error: "Failed to delete event" }
  }
}

export async function getCalendarEventsCount(): Promise<number> {
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from("calendar_events")
      .select("*", { count: "exact", head: true })
      .in("status", ["published", "rescheduled"])
    return count ?? 0
  } catch {
    return 0
  }
}

interface DbCalendarEvent {
  id: string
  title: string
  description: string | null
  date: string
  end_date: string | null
  start_time: string | null
  end_time: string | null
  all_day: boolean | null
  location: string | null
  location_url: string | null
  event_type: string
  status: string | null
  organizer: string | null
  is_recurring: boolean | null
  recurring_pattern: string | null
  rrule: string | null
  registration_url: string | null
  href: string | null
  event_attachments: { name: string; url: string; type: string }[] | null
}

function mapDbEventToCalendarEvent(dbEvent: unknown): CalendarEvent {
  const e = dbEvent as DbCalendarEvent
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? undefined,
    date: e.date,
    endDate: e.end_date ?? undefined,
    startTime: e.start_time ?? undefined,
    endTime: e.end_time ?? undefined,
    allDay: e.all_day ?? undefined,
    location: e.location ?? undefined,
    locationUrl: e.location_url ?? undefined,
    eventType: e.event_type as CalendarEvent["eventType"],
    status: (e.status ?? undefined) as CalendarEvent["status"],
    organizer: e.organizer ?? undefined,
    isRecurring: e.is_recurring ?? undefined,
    recurringPattern: e.recurring_pattern ?? undefined,
    rrule: e.rrule ?? undefined,
    registrationUrl: e.registration_url ?? undefined,
    href: e.href ?? undefined,
    attachments: e.event_attachments?.map((att) => ({
      name: att.name,
      url: att.url,
      type: att.type as "pdf" | "doc" | "image" | "link" | "other",
    })),
  }
}
