import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns"
import type { CalendarEvent } from "./types"

export interface CalendarDayData {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

export interface CalendarMonthData {
  year: number
  month: number
  label: string
  days: CalendarDayData[]
}

function parseTimeMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const ampm = match[3].toUpperCase()
  if (ampm === "PM" && hours !== 12) hours += 12
  if (ampm === "AM" && hours === 12) hours = 0
  return hours * 60 + minutes
}

function sortEventsByTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    if (!a.time && !b.time) return 0
    if (!a.time) return -1
    if (!b.time) return 1
    return parseTimeMinutes(a.time) - parseTimeMinutes(b.time)
  })
}

export function getCalendarMonth(
  year: number,
  month: number,
  events: CalendarEvent[],
): CalendarMonthData {
  const date = new Date(year, month)
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)
  const allDays = eachDayOfInterval({ start: calStart, end: calEnd })

  return {
    year,
    month,
    label: format(date, "MMMM yyyy"),
    days: allDays.map((day) => ({
      date: day,
      isCurrentMonth: isSameMonth(day, date),
      isToday: isToday(day),
      events: sortEventsByTime(
        events.filter((e) => isSameDay(day, new Date(e.date))),
      ),
    })),
  }
}

export function getEventsForDay(day: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter((e) => isSameDay(day, new Date(e.date)))
}

export function formatTimeForCell(time: string | undefined): string {
  if (!time) return ""
  const match = time.match(/(\d+:\d+\s*(?:AM|PM))/i)
  return match ? match[1] : time.split(" - ")[0] ?? ""
}

export { format, isSameDay, isToday, addMonths, subMonths }
