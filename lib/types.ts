export interface NavSubItem {
  title: string
  href: string
  description?: string
  icon?: string
  isExternal?: boolean
  badge?: string
  umOnly?: boolean
}

export interface NavItem {
  title: string
  href?: string
  icon?: string
  children?: NavSubItem[]
  isExternal?: boolean
  umOnly?: boolean
}

export interface ResourceItem {
  id: string
  title: string
  description: string
  category: string
  fileType: "pdf" | "doc" | "xls" | "ppt" | "link" | "video" | "image"
  fileUrl?: string
  thumbnailUrl?: string
  tags: string[]
  isFeatured?: boolean
  createdAt: string
  updatedAt?: string
}

export type EventStatus = "draft" | "published" | "cancelled" | "rescheduled"

export interface EventAttachment {
  name: string
  url: string
  type: "pdf" | "doc" | "image" | "link" | "other"
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string

  // Dates (YYYY-MM-DD)
  date: string
  endDate?: string

  // Times (24h HH:mm)
  startTime?: string
  endTime?: string
  time?: string
  allDay?: boolean

  // Location
  location?: string
  locationUrl?: string

  // Categorization
  eventType: "training" | "meeting" | "deadline" | "social" | "exam"
  status?: EventStatus
  organizer?: string

  // Recurrence
  isRecurring?: boolean
  recurringPattern?: string
  rrule?: string

  // Attachments
  attachments?: EventAttachment[]

  // Links
  registrationUrl?: string
  href?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface TimelineItem {
  title: string
  description: string
  icon: string
}

export interface PageContent {
  title: string
  description: string
  sections: PageSection[]
}

export interface PageSection {
  heading: string
  body?: string
  items?: { label: string; href: string; description?: string }[]
  documents?: { name: string; url?: string; type: string }[]
  timeline?: TimelineItem[]
}
