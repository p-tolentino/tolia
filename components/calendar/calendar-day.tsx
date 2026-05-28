"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { formatTimeForCell } from "@/lib/calendar-utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { CalendarDayData } from "@/lib/calendar-utils"
import type { CalendarEvent } from "@/lib/types"

interface CalendarDayProps {
  day: CalendarDayData
  isSelected: boolean
  onSelect: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarDay({
  day,
  isSelected,
  onSelect,
  onEventClick,
}: CalendarDayProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const maxVisible = 3
  const allEvents = day.events
  const shownPills = allEvents.slice(0, maxVisible)
  const extraCount = allEvents.length - maxVisible

  const eventStyles: Record<string, string> = {
    training:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    meeting:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    deadline: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    social:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    exam: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  }

  function handleEventClick(e: React.MouseEvent, ev: CalendarEvent) {
    e.stopPropagation()
    setPopoverOpen(false)
    onEventClick(ev)
  }

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-lg p-1 transition-colors sm:p-1.5"
    >
      <span
        className={cn(
          "text-xs leading-none font-medium",
          !day.isCurrentMonth && "text-muted-foreground/40",
          isSelected && "text-primary"
        )}
      >
        {day.date.getDate()}
      </span>

      <div className="mt-1 flex flex-col gap-1">
          {shownPills.map((ev) => (
            <button
              key={ev.id}
              onClick={(e) => {
                e.stopPropagation()
                onEventClick(ev)
              }}
              className={cn(
                "truncate rounded px-1.5 py-1 text-left text-[11px] leading-tight font-medium transition-all hover:opacity-80",
                eventStyles[ev.eventType] ?? "bg-muted text-muted-foreground"
              )}
              title={`${ev.title}${ev.time ? ` — ${ev.time}` : ""}`}
            >
              {(ev.time || ev.startTime) && (
                <span className="mr-1 font-semibold">
                  {formatTimeForCell(ev.time ?? ev.startTime)}
                </span>
              )}
              {ev.title}
            </button>
          ))}
          {extraCount > 0 && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-fit rounded px-1.5 py-1 text-left text-[11px] font-medium text-muted-foreground transition-all hover:text-foreground"
                >
                  +{extraCount} more
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="w-64 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-border px-3 py-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {day.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col py-1">
                  {allEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={(e) => handleEventClick(e, ev)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-left text-sm transition-all transition-colors hover:bg-accent"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          ev.eventType === "training" && "bg-blue-500",
                          ev.eventType === "meeting" && "bg-green-500",
                          ev.eventType === "deadline" && "bg-red-500",
                          ev.eventType === "social" && "bg-purple-500",
                          ev.eventType === "exam" && "bg-amber-500"
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {ev.title}
                        </p>
                        {(ev.time || ev.startTime) && (
                          <p className="truncate text-xs text-muted-foreground">
                            {formatTimeForCell(ev.time ?? ev.startTime)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
    </div>
  )
}
