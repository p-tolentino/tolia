export interface CalendarTypeConfig {
  label: string
  pill: string
  dot: string
  card: string
  badge: string
}

export const eventTypeConfig: Record<string, CalendarTypeConfig> = {
  training: {
    label: "Training",
    pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    dot: "bg-blue-500",
    card: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  },
  meeting: {
    label: "Meeting",
    pill: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    dot: "bg-green-500",
    card: "border-l-green-500 bg-green-50 dark:bg-green-950/20",
    badge:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400",
  },
  deadline: {
    label: "Deadline",
    pill: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
    card: "border-l-red-500 bg-red-50 dark:bg-red-950/20",
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400",
  },
  social: {
    label: "Social",
    pill: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    dot: "bg-purple-500",
    card: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20",
    badge:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400",
  },
  exam: {
    label: "Exam",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
    card: "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400",
  },
}

export function getTypeConfig(
  eventType: string,
): CalendarTypeConfig {
  return (
    eventTypeConfig[eventType] ?? {
      label: eventType,
      pill: "bg-muted text-muted-foreground",
      dot: "bg-gray-500",
      card: "border-l-border",
      badge:
        "border-border bg-muted text-muted-foreground dark:border-border dark:bg-muted dark:text-muted-foreground",
    }
  )
}
