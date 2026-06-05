"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Megaphone,
  FileText,
  Headset,
  CalendarDays,
  Zap,
  MessageSquareText,
  UserPlus,
  Shield,
  CalendarClock,
  Award,
  Share2,
  LayoutDashboard,
} from "lucide-react"
import type { RouteNode } from "@/app/actions/manage"
import { Button } from "@/components/ui/button"

const navTabs = [
  { value: "events", label: "Calendar Events", icon: Calendar },
  { value: "announcements", label: "Announcements", icon: Megaphone },
  { value: "files", label: "Route Files", icon: FileText },
] as const

const routeIcons: Record<string, React.ReactNode> = {
  "agent-support": <Headset className="size-4" />,
  assemblies: <CalendarDays className="size-4" />,
  leap: <Zap className="size-4" />,
  "from-bms-desk": <MessageSquareText className="size-4" />,
  "new-recruits": <UserPlus className="size-4" />,
  "for-unit-managers-only": <Shield className="size-4" />,
  schedules: <CalendarClock className="size-4" />,
  "rewards-and-incentives": <Award className="size-4" />,
  socials: <Share2 className="size-4" />,
}

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  selectedRoute: string | null
  onSelectRoute: (path: string, label: string) => void
  className?: string
  variant?: "desktop" | "sheet"
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  selectedRoute,
  onSelectRoute,
  className,
  variant = "desktop",
}: DashboardSidebarProps) {
  const [routes, setRoutes] = useState<RouteNode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { getRouteTree } = await import("@/app/actions/manage")
      const tree = await getRouteTree()
      setRoutes(tree)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <aside
      className={cn(
        variant === "desktop"
          ? "flex w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground"
          : "flex w-full flex-col text-sidebar-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-5">
        <LayoutDashboard className="size-5 text-sidebar-primary" />
        <span className="text-sm font-semibold">Dashboard</span>
      </div>

      <div className="flex flex-col gap-0.5 px-3 py-4">
        <span className="px-1 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
          Navigation
        </span>
        {navTabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.value
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex-1 overflow-auto px-3 py-2">
        <span className="block px-1 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
          Route Files
        </span>
        {loading ? (
          <div className="space-y-2 px-1 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 animate-pulse rounded-md bg-sidebar-accent/50"
              />
            ))}
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-0.5">
            {routes.map((section) => (
              <AccordionItem
                key={section.path}
                value={section.path}
                className="border-none"
              >
                <AccordionTrigger className="gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent/50 hover:no-underline [&[data-state=open]]:bg-sidebar-accent/50">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-sidebar-foreground/50">
                      {routeIcons[section.path.split("/").pop() ?? ""] ?? (
                        <FileText className="size-4" />
                      )}
                    </span>
                    <span className="text-sidebar-foreground/80">
                      {section.label}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex flex-col gap-0.5 pl-6">
                    {section.children.length > 0
                      ? section.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() =>
                              onSelectRoute(child.path, child.label)
                            }
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                              selectedRoute === child.path &&
                                activeTab === "files"
                                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground/80"
                            )}
                          >
                            <FileText className="size-3.5 shrink-0 opacity-50" />
                            {child.label}
                          </button>
                        ))
                      : section.children.length === 0 && (
                          <button
                            onClick={() =>
                              onSelectRoute(section.path, section.label)
                            }
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                              selectedRoute === section.path &&
                                activeTab === "files"
                                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground/80"
                            )}
                          >
                            <FileText className="size-3.5 shrink-0 opacity-50" />
                            {section.label}
                          </button>
                        )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </aside>
  )
}
