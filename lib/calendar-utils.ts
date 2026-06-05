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
  const match12h = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (match12h) {
    let hours = parseInt(match12h[1])
    const minutes = parseInt(match12h[2])
    const ampm = match12h[3].toUpperCase()
    if (ampm === "PM" && hours !== 12) hours += 12
    if (ampm === "AM" && hours === 12) hours = 0
    return hours * 60 + minutes
  }
  const match24h = time.match(/^(\d+):(\d+)$/)
  if (match24h) {
    return parseInt(match24h[1]) * 60 + parseInt(match24h[2])
  }
  return 0
}

function eventTimeMinutes(event: CalendarEvent): number {
  if (event.startTime) return parseTimeMinutes(event.startTime)
  if (event.time) return parseTimeMinutes(event.time)
  return 0
}

function sortEventsByTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => eventTimeMinutes(a) - eventTimeMinutes(b))
}

function isEventOnDay(day: Date, event: CalendarEvent): boolean {
  const start = new Date(event.date)
  if (isSameDay(day, start)) return true
  if (!event.endDate) return false
  const end = new Date(event.endDate)
  return day >= start && day <= end
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
        events.filter((e) => isEventOnDay(day, e)),
      ),
    })),
  }
}

export function getEventsForDay(day: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter((e) => isEventOnDay(day, e))
}

export function formatTimeForCell(time: string | undefined): string {
  if (!time) return ""
  const match12h = time.match(/(\d+:\d+\s*(?:AM|PM))/i)
  if (match12h) return match12h[1]
  const match24h = time.match(/^(\d+):(\d+)$/)
  if (match24h) {
    const h = parseInt(match24h[1])
    const m = match24h[2]
    const ampm = h >= 12 ? "PM" : "AM"
    const hour12 = h % 12 || 12
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`
  }
  return ""
}

export { format, isSameDay, isToday, addMonths, subMonths }
