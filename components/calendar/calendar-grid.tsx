"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCalendarMonth, addMonths, subMonths } from "@/lib/calendar-utils"
import { CalendarDay } from "./calendar-day"
import { EventDetail } from "./event-detail"
import { EventModal } from "./event-modal"
import type { CalendarEvent } from "@/lib/types"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface CalendarGridProps {
  events: CalendarEvent[]
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null)

  const monthData = useMemo(
    () => getCalendarMonth(currentDate.getFullYear(), currentDate.getMonth(), events),
    [currentDate, events],
  )

  const selectedDayEvents = useMemo(
    () => events.filter((e) => {
      const ed = new Date(e.date)
      return ed.getFullYear() === selectedDate.getFullYear()
        && ed.getMonth() === selectedDate.getMonth()
        && ed.getDate() === selectedDate.getDate()
    }),
    [selectedDate, events],
  )

  function goToToday() {
    const now = new Date()
    setCurrentDate(now)
    setSelectedDate(now)
  }

  function goPrev() {
    setCurrentDate((d) => subMonths(d, 1))
  }

  function goNext() {
    setCurrentDate((d) => addMonths(d, 1))
  }

  function handleMonthChange(month: number) {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1))
  }

  function handleYearChange(year: number) {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
  }

  const { minYear, yearRange } = useMemo(() => {
    const years = events.map((e) => new Date(e.date).getFullYear())
    const min = years.length > 0 ? Math.min(...years) : new Date().getFullYear()
    const range = Array.from({ length: 11 }, (_, i) => min + i)
    return { minYear: min, yearRange: range }
  }, [events])

  const isAtBoundary = currentDate.getFullYear() === minYear && currentDate.getMonth() === 0

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goPrev} disabled={isAtBoundary} aria-label="Previous month">
            <ChevronLeft className="size-4" />
          </Button>

          <select
            value={currentDate.getMonth()}
            onChange={(e) => handleMonthChange(parseInt(e.target.value))}
            className="h-9 rounded-md border bg-background px-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Select month"
          >
            {MONTHS.map((name, i) => (
              <option key={name} value={i}>{name}</option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="h-9 rounded-md border bg-background px-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Select year"
          >
            {yearRange.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <Button variant="outline" size="icon" onClick={goNext} aria-label="Next month">
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={goToToday}>
          Today
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="grid grid-cols-7 border-b">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium text-muted-foreground sm:text-sm"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-border">
          {monthData.days.map((day) => (
            <div key={day.date.toISOString()} className="bg-card p-px sm:p-0.5">
              <CalendarDay
                day={day}
                isSelected={
                  selectedDate.getFullYear() === day.date.getFullYear() &&
                  selectedDate.getMonth() === day.date.getMonth() &&
                  selectedDate.getDate() === day.date.getDate()
                }
                onSelect={setSelectedDate}
                onEventClick={setModalEvent}
              />
            </div>
          ))}
        </div>
      </div>

      <EventDetail date={selectedDate} events={selectedDayEvents} />
      <EventModal
        event={modalEvent}
        open={modalEvent !== null}
        onOpenChange={(open) => { if (!open) setModalEvent(null) }}
      />
    </div>
  )
}
