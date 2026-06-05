import { z } from "zod"

export const attachmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["pdf", "doc", "image", "link", "other"]),
  mode: z.enum(["file", "url"]),
  file: z.any().nullable(),
  url: z.string().optional(),
  existingUrl: z.string().optional(),
})

export const calendarEventSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  endDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  allDay: z.boolean().optional(),
  location: z.string().optional(),
  eventType: z.enum(["training", "meeting", "deadline", "social", "exam"]),
  organizer: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional(),
  rrule: z.string().optional(),
  recurrence: z.string().optional(),
  recurrenceInterval: z.number().optional(),
  recurrenceByDay: z.array(z.string()).optional(),
  recurrenceByMonthDay: z.number().nullable().optional(),
  recurrenceBySetPos: z.string().nullable().optional(),
  recurrenceByDayName: z.string().nullable().optional(),
  recurrenceByMonth: z.number().nullable().optional(),
  registrationUrl: z.string().optional(),
  attachments: z.array(attachmentSchema).optional(),
})

export type CalendarEventFormValues = z.infer<typeof calendarEventSchema>
