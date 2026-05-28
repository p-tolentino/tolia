import {
  UserSearch,
  MessageCircle,
  CalendarCheck,
  BookOpen,
  ScrollText,
  FileSignature,
  LogIn,
  Rocket,
} from "lucide-react"
import type { TimelineItem } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserSearch,
  MessageCircle,
  CalendarCheck,
  BookOpen,
  ScrollText,
  FileSignature,
  LogIn,
  Rocket,
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border" />
      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon]
          return (
            <div key={index} className="relative flex gap-6">
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                {Icon && <Icon className="size-5" />}
              </div>
              <div className="flex-1 pt-1.5">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
