"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getCalendarMonth, addMonths, subMonths } from "@/lib/calendar-utils"
import type { CalendarDayData } from "@/lib/calendar-utils"
import { CalendarDay } from "./calendar-day"
import { EventDetail } from "./event-detail"
import { EventModal } from "./event-modal"
import type { CalendarEvent } from "@/lib/types"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface CalendarGridProps {
  events: CalendarEvent[]
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null)

  const monthData = useMemo(
    () =>
      getCalendarMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        events
      ),
    [currentDate, events]
  )

  const selectedDayEvents = useMemo(
    () =>
      events.filter((e) => {
        const start = new Date(e.date)
        const day = selectedDate
        if (
          start.getFullYear() === day.getFullYear() &&
          start.getMonth() === day.getMonth() &&
          start.getDate() === day.getDate()
        )
          return true
        if (!e.endDate) return false
        const end = new Date(e.endDate)
        return day >= start && day <= end
      }),
    [selectedDate, events]
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

  const isAtBoundary =
    currentDate.getFullYear() === minYear && currentDate.getMonth() === 0

  const weeks = useMemo(() => {
    const result: CalendarDayData[][] = []
    for (let i = 0; i < monthData.days.length; i += 7) {
      result.push(monthData.days.slice(i, i + 7))
    }
    return result
  }, [monthData.days])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            disabled={isAtBoundary}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Select
            value={String(currentDate.getMonth())}
            onValueChange={(value) => handleMonthChange(parseInt(value))}
          >
            <SelectTrigger
              className="h-9 min-w-32 px-2 font-medium"
              aria-label="Select month"
            >
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent align="start" position="popper" className="min-w-32">
              {MONTHS.map((name, i) => (
                <SelectItem key={name} value={String(i)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(currentDate.getFullYear())}
            onValueChange={(value) => handleYearChange(parseInt(value))}
          >
            <SelectTrigger
              className="h-9 min-w-32 px-2 font-medium"
              aria-label="Select year"
            >
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper" className="min-w-32">
              {yearRange.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={goToToday}>
          Today
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg bg-card">
        <div className="grid grid-cols-7 rounded-t-lg border-x border-y">
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
        {weeks.map((week, wi) => (
          <div key={wi} className={cn(wi > 0 && "z-10 border-t border-border")}>
            <div className="grid grid-cols-7 gap-0.5 bg-border px-0.5 pb-0.5">
              {week.map((day) => {
                const isDaySelected =
                  selectedDate.getFullYear() === day.date.getFullYear() &&
                  selectedDate.getMonth() === day.date.getMonth() &&
                  selectedDate.getDate() === day.date.getDate()
                return (
                  <div
                    key={day.date.toISOString()}
                    className={cn(
                      "h-24 cursor-pointer rounded-lg bg-card p-px transition-all hover:bg-accent sm:h-32 sm:p-0.5",
                      day.isToday &&
                        !isDaySelected &&
                        "relative z-10 ring-1 ring-primary",
                      isDaySelected &&
                        "relative z-10 bg-accent ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <CalendarDay
                      day={day}
                      isSelected={isDaySelected}
                      onSelect={setSelectedDate}
                      onEventClick={setModalEvent}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <EventDetail date={selectedDate} events={selectedDayEvents} />
      <EventModal
        event={modalEvent}
        open={modalEvent !== null}
        onOpenChange={(open) => {
          if (!open) setModalEvent(null)
        }}
      />
    </div>
  )
}
