import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

const pillTints = [
  "bg-blue-500/15 dark:bg-blue-400/15",
  "bg-emerald-500/15 dark:bg-emerald-400/15",
  "bg-red-500/15 dark:bg-red-400/15",
  "bg-purple-500/15 dark:bg-purple-400/15",
  "bg-amber-500/15 dark:bg-amber-400/15",
]

const pillWidths = ["w-full", "w-3/4", "w-2/3", "w-5/6"] as const

export function CalendarSkeleton() {
  return (
    <div
      role="region"
      aria-label="Calendar loading"
      aria-busy="true"
      className="mt-8"
    >
      <div className="mb-6 flex flex-wrap gap-3" aria-hidden="true">
        {pillTints.map((tint, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className={cn("size-2.5 rounded-full", tint)} />
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4" aria-hidden="true">
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="h-9 w-[132px] rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
          </div>
          <Skeleton className="h-9 w-[73px] rounded-md" />
        </div>

        <div className="overflow-hidden rounded-lg bg-card">
          <div className="grid grid-cols-7 rounded-t-lg border-x border-t border-border py-2 text-center text-xs font-medium text-muted-foreground sm:text-sm">
            {WEEKDAYS.map((day) => (
              <div key={day}>
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
          </div>

          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className={cn(row > 0 && "border-t border-border")}>
              <div className="grid grid-cols-7 gap-0.5 bg-border px-0.5 pb-0.5" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, col) => {
                  const cellIndex = row * 7 + col
                  const isPrevMonth = cellIndex < 3
                  const isNextMonth = cellIndex >= 33
                  const isOffset = isPrevMonth || isNextMonth
                  const pillCount = isOffset ? 0 : cellIndex % 13 === 0 ? 0 : 1 + (cellIndex % 3)

                  return (
                    <div
                      key={col}
                      className={cn(
                        "h-24 rounded-lg bg-card p-px sm:h-32 sm:p-0.5",
                        isOffset && "opacity-30",
                      )}
                    >
                      <div className="flex h-full flex-col overflow-hidden rounded-lg p-1 sm:p-1.5">
                        <Skeleton className={cn("h-3.5 w-5", isOffset && "opacity-40")} />
                        {pillCount > 0 && (
                          <div className="mt-1 flex flex-col gap-1">
                            {Array.from({ length: pillCount }).map((_, pi) => {
                              const typeIndex = (cellIndex * 3 + pi * 7) % pillTints.length
                              const widthIndex = Math.min(pi, pillWidths.length - 1)
                              return (
                                <Skeleton
                                  key={pi}
                                  className={cn(
                                    "h-5 rounded",
                                    pillWidths[widthIndex],
                                    pillTints[typeIndex],
                                  )}
                                />
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-6" aria-hidden="true">
          <Skeleton className="h-5 w-64" />
          <div className="mt-4 space-y-3">
            {pillTints.slice(0, 3).map((tint, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border-l-4 p-3"
                style={{ borderLeftColor: "inherit" }}
              >
                <div className={cn("min-w-0 flex-1 space-y-2.5", tint.replace("bg-", "border-l-").replace("/15", "/20"))}>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16 shrink-0 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <span role="status" className="sr-only">Loading calendar events</span>
    </div>
  )
}
