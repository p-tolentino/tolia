"use client"

import { cn } from "@/lib/utils"
import { formatTimeForCell } from "@/lib/calendar-utils"
import type { CalendarDayData } from "@/lib/calendar-utils"
import type { CalendarEvent } from "@/lib/types"

interface CalendarDayProps {
  day: CalendarDayData
  isSelected: boolean
  onSelect: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarDay({ day, isSelected, onSelect, onEventClick }: CalendarDayProps) {
  const maxVisible = 3
  const visibleEvents = day.events.slice(0, maxVisible)
  const extraCount = day.events.length - maxVisible

  return (
    <div
      className={cn(
        "relative flex min-h-[56px] flex-col rounded-lg p-1 transition-colors sm:min-h-[80px] sm:p-1.5",
        !day.isCurrentMonth && "text-muted-foreground/30",
        day.isCurrentMonth && "cursor-pointer hover:bg-accent",
        day.isToday && !isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background",
        isSelected && "bg-primary/5 ring-1 ring-primary",
      )}
      onClick={() => onSelect(day.date)}
      aria-label={`${day.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}${day.events.length > 0 ? `, ${day.events.length} event${day.events.length > 1 ? "s" : ""}` : ""}`}
    >
      <span
        className={cn(
          "text-xs font-medium leading-none",
          !day.isCurrentMonth && "invisible",
          isSelected && "text-primary",
        )}
      >
        {day.date.getDate()}
      </span>

      {day.isCurrentMonth && (
        <div className="mt-1 flex flex-col gap-0.5">
          {visibleEvents.map((ev) => (
            <button
              key={ev.id}
              onClick={(e) => {
                e.stopPropagation()
                onEventClick(ev)
              }}
              className={cn(
                "truncate rounded px-1 py-0.5 text-left text-[10px] font-medium leading-tight transition-colors hover:opacity-80 sm:text-[11px]",
                ev.eventType === "training" && "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
                ev.eventType === "meeting" && "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
                ev.eventType === "deadline" && "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
                ev.eventType === "social" && "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
                ev.eventType === "exam" && "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
              )}
              title={`${ev.title}${ev.time ? ` — ${ev.time}` : ""}`}
            >
              {ev.time && (
                <span className="mr-1 font-semibold">{formatTimeForCell(ev.time)}</span>
              )}
              {ev.title}
            </button>
          ))}
          {extraCount > 0 && (
            <span className="px-1 text-[10px] text-muted-foreground">
              +{extraCount} more
            </span>
          )}
        </div>
      )}
    </div>
  )
}
