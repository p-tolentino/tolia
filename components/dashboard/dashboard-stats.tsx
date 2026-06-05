"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Megaphone, Users } from "lucide-react"

interface Stat {
  title: string
  value: string | number
  icon: typeof Calendar
  trend: string
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stat[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ getCalendarEventsCount }, { getAnnouncements, getAgentStats }] =
        await Promise.all([
          import("@/app/actions/calendar"),
          import("@/app/actions/manage"),
        ])

      const [eventsCount, announcementsRes, agentStats] = await Promise.all([
        getCalendarEventsCount(),
        getAnnouncements(),
        getAgentStats(),
      ])

      setStats([
        {
          title: "Calendar Events",
          value: eventsCount,
          icon: Calendar,
          trend: "Total events",
        },
        {
          title: "Announcements",
          value:
            announcementsRes.data?.filter((a) => a.is_published).length ?? 0,
          icon: Megaphone,
          trend: `${announcementsRes.data?.length ?? 0} total`,
        },
        {
          title: "Active Agents",
          value: agentStats.data ? `${agentStats.data.active}` : 0,
          icon: Users,
          trend: agentStats.data
            ? `Out of ${agentStats.data.total} total agents`
            : "",
        },
      ])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-8 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-1 h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
