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

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  eventType: "training" | "meeting" | "deadline" | "social" | "exam"
  isRecurring?: boolean
  recurringPattern?: string
  href?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
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
}
