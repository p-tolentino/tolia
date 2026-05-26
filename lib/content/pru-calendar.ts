import type { CalendarEvent, PageContent } from "../types"

export const pruCalendarContent: PageContent = {
  title: "PRU Calendar",
  description: "Stay up to date with TOLIA events, training sessions, and important deadlines.",
  sections: [
    { heading: "Upcoming Events", body: "Browse upcoming events, training sessions, and important dates." },
  ],
}

export const calendarEvents: CalendarEvent[] = [
  { id: "1", title: "Green Hour Weekly Training", date: "2026-05-18", time: "10:00 AM - 11:00 AM", eventType: "training", isRecurring: true, recurringPattern: "Every Monday" },
  { id: "2", title: "Branch Managers Meeting", date: "2026-05-20", time: "2:00 PM - 4:00 PM", eventType: "meeting" },
  { id: "3", title: "BYB Session", date: "2026-05-22", time: "9:00 AM - 12:00 PM", location: "TOLIA Branch Office", eventType: "exam" },
  { id: "4", title: "Licensing Exam", date: "2026-05-25", time: "8:00 AM - 12:00 PM", location: "Testing Center", eventType: "exam" },
  { id: "5", title: "Company Incentive Deadline", date: "2026-05-30", time: "5:00 PM", eventType: "deadline" },
  { id: "6", title: "Product Training - PruLink Prime", date: "2026-06-01", time: "10:00 AM - 12:00 PM", eventType: "training" },
  { id: "7", title: "Team Building Activity", date: "2026-06-05", time: "8:00 AM - 5:00 PM", location: "Venue TBA", eventType: "social" },
]
