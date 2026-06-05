"use client"

import Link from "next/link"
import {
  ArrowRight,
  UserPlus,
  Headset,
  MessageSquare,
  Shield,
  Zap,
  Calendar as CalendarIcon,
  Share2,
  Award,
  CalendarDays,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"
import { isUmRole } from "@/lib/auth/roles"
import { homeContent } from "@/lib/content/home"

const sectionIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "New Recruits": UserPlus,
  "Agent Support": Headset,
  "From BM's Desk": MessageSquare,
  "For UMs Only": Shield,
  LEAP: Zap,
  Assemblies: CalendarIcon,
  Socials: Share2,
  "Rewards & Incentives": Award,
  Schedules: CalendarDays,
}

export function QuickAccessCards() {
  const { agent } = useAuth()
  const isUm = isUmRole(agent?.role)

  const quickLinks = (homeContent.sections[0]?.items ?? []).filter(
    (item) => !("umOnly" in item && item.umOnly && !isUm)
  )

  return (
    <>
      {/* Mobile: Maya/GCash-style 3-col grid */}
      <div className="grid grid-cols-3 gap-3 space-y-4 sm:hidden">
        {quickLinks.map((section) => {
          const Icon = section.label ? sectionIcons[section.label] : null
          return (
            <Link
              key={section.href}
              href={section.href}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-primary transition-colors hover:bg-muted/70">
                {Icon && <Icon className="size-6" />}
              </div>
              <span className="text-xs leading-tight font-medium text-foreground">
                {section.label}
              </span>
            </Link>
          )
        })}
      </div>
      {/* Desktop: Card grid */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((section) => {
          const Icon = section.label ? sectionIcons[section.label] : null
          return (
            <Link key={section.href} href={section.href}>
              <Card className="group h-full cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted text-primary transition-all duration-300 group-hover:bg-muted/70">
                    <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {Icon && <Icon className="size-5" />}
                    </span>
                  </div>
                  <CardTitle className="text-base">{section.label}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View{" "}
                    <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </>
  )
}
