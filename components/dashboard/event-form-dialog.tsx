"use client"

import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Plus, Trash2, Upload, Link as LinkIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  calendarEventSchema,
  type CalendarEventFormValues,
} from "@/lib/schemas/calendar"
import type { CalendarEvent } from "@/lib/types"
import {
  rruleToDisplayText,
  rruleToFormValues,
  formValuesToRrule,
  WEEKDAYS,
  SET_POS_OPTIONS,
} from "@/lib/calendar/recurrence"

interface EventFormDialogProps {
  event?: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

const EVENT_TYPES = [
  { value: "training", label: "Training" },
  { value: "meeting", label: "Meeting" },
  { value: "deadline", label: "Deadline" },
  { value: "social", label: "Social" },
  { value: "exam", label: "Exam" },
] as const

const ATTACHMENT_TYPES = [
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "Document" },
  { value: "image", label: "Image" },
  { value: "link", label: "Link" },
  { value: "other", label: "Other" },
] as const

function toFormValues(
  e: CalendarEvent | null | undefined
): CalendarEventFormValues {
  const rruleValues = rruleToFormValues(e?.rrule)
  return {
    title: e?.title ?? "",
    description: e?.description ?? "",
    date: e?.date ?? "",
    endDate: e?.endDate ?? "",
    startTime: e?.startTime ?? "",
    endTime: e?.endTime ?? "",
    allDay: e?.allDay ?? false,
    location: e?.location ?? "",
    eventType: e?.eventType ?? "meeting",
    organizer: e?.organizer ?? "",
    isRecurring: e?.isRecurring ?? false,
    recurringPattern: e?.recurringPattern ?? "",
    registrationUrl: e?.registrationUrl ?? "",
    ...rruleValues,
    attachments:
      e?.attachments?.map((a) => ({
        name: a.name,
        type: a.type,
        mode: (a.url.startsWith("http") &&
        !a.url.includes("/storage/v1/object/")
          ? "url"
          : "file") as "file" | "url",
        file: null,
        url:
          a.url.startsWith("http") && !a.url.includes("/storage/v1/object/")
            ? a.url
            : "",
        existingUrl: a.url,
      })) ?? [],
  }
}

export function EventFormDialog({
  event,
  open,
  onOpenChange,
  onSaved,
}: EventFormDialogProps) {
  const isEdit = !!event

  const form = useForm<CalendarEventFormValues>({
    resolver: zodResolver(calendarEventSchema),
    values: toFormValues(event),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attachments",
  })

  const allDay = form.watch("allDay")
  const recurrence = form.watch("recurrence")
  const recurrenceBySetPos = form.watch("recurrenceBySetPos")
  const attachments = form.watch("attachments")
  const date = form.watch("date")

  const handleSubmit = form.handleSubmit(async (values) => {
    const uploadedAttachments: { name: string; url: string; type: string }[] =
      []
    let uploadFailed = false

    for (const att of values.attachments ?? []) {
      if (!att.name.trim()) continue

      if (att.mode === "url") {
        if (!att.url?.trim()) continue
        uploadedAttachments.push({
          name: att.name,
          url: att.url,
          type: att.type,
        })
      } else {
        if (att.file instanceof File) {
          const formData = new FormData()
          formData.append("file", att.file)
          const ext = att.file.name.split(".").pop() ?? "pdf"
          const filePath = `event-attachments/${crypto.randomUUID()}/${att.file.name}`

          const { createClient } = await import("@/lib/supabase/client")
          const supabase = createClient()
          const { error: uploadError } = await supabase.storage
            .from("tolia-files")
            .upload(filePath, att.file, { upsert: true })

          if (uploadError) {
            toast.error(`Failed to upload ${att.name}: ${uploadError.message}`)
            uploadFailed = true
            break
          }

          const { data: urlData } = supabase.storage
            .from("tolia-files")
            .getPublicUrl(filePath)
          uploadedAttachments.push({
            name: att.name,
            url: urlData.publicUrl,
            type: ext,
          })
        } else if (att.existingUrl) {
          uploadedAttachments.push({
            name: att.name,
            url: att.existingUrl,
            type: att.type,
          })
        }
      }
    }

    if (uploadFailed) return

    const rrule = formValuesToRrule({
      recurrence: values.recurrence ?? "none",
      recurrenceInterval: values.recurrenceInterval,
      recurrenceByDay: values.recurrenceByDay,
      recurrenceByMonthDay:
        values.recurrence === "yearly" && values.date
          ? new Date(values.date + "T00:00:00").getDate()
          : (values.recurrenceByMonthDay ?? null),
      recurrenceBySetPos: values.recurrenceBySetPos,
      recurrenceByDayName: values.recurrenceByDayName,
      recurrenceByMonth:
        values.recurrence === "yearly" && values.date
          ? new Date(values.date + "T00:00:00").getMonth() + 1
          : (values.recurrenceByMonth ?? null),
    })

    const recurringPattern = rrule ? rruleToDisplayText(rrule) : undefined

    const { createCalendarEvent, updateCalendarEvent } =
      await import("@/app/actions/calendar")

    const eventData = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      date: values.date,
      endDate: values.endDate || undefined,
      startTime: values.allDay ? undefined : values.startTime || undefined,
      endTime: values.allDay ? undefined : values.endTime || undefined,
      allDay: values.allDay ?? false,
      location: values.location?.trim() || undefined,
      eventType: values.eventType as CalendarEvent["eventType"],
      organizer: values.organizer?.trim() || undefined,
      isRecurring:
        values.recurrence !== "none" && values.recurrence !== undefined,
      recurringPattern,
      rrule: rrule || undefined,
      registrationUrl: values.registrationUrl?.trim() || undefined,
    }

    const result = isEdit
      ? await updateCalendarEvent(event!.id, {
          ...eventData,
          attachments: uploadedAttachments,
        })
      : await createCalendarEvent({
          ...eventData,
          attachments: uploadedAttachments,
        })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(isEdit ? "Event updated" : "Event created")
      onOpenChange(false)
      onSaved()
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Event" : "New Event"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event description"
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="allDay"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="mt-0!">All day event</FormLabel>
                </FormItem>
              )}
            />

            {!allDay && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <FormLabel>Recurrence</FormLabel>
              </div>
              <div className="flex min-h-11 flex-wrap items-center gap-3">
                <FormField
                  control={form.control}
                  name="recurrence"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <Select
                        value={field.value ?? "none"}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-36 h-9">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="none">Does not repeat</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {recurrence &&
                  recurrence !== "none" &&
                  recurrence !== "daily" && (
                    <span className="inline-flex text-sm whitespace-nowrap text-muted-foreground">
                      {recurrence === "monthly" ? "on every" : "on"}
                    </span>
                  )}

                {(recurrence === "weekly" || recurrence === "biweekly") && (
                  <div className="flex flex-wrap gap-1">
                    {WEEKDAYS.map((day) => {
                      const isSelected = (
                        form.watch("recurrenceByDay") ?? []
                      ).includes(day.key)
                      return (
                        <button
                          key={day.key}
                          type="button"
                          onClick={() => {
                            const current =
                              form.getValues("recurrenceByDay") ?? []
                            form.setValue(
                              "recurrenceByDay",
                              isSelected
                                ? current.filter((d) => d !== day.key)
                                : [...current, day.key]
                            )
                          }}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors hover:cursor-pointer sm:w-9",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-accent"
                          )}
                        >
                          {day.label}
                        </button>
                      )
                    })}
                  </div>
                )}

                {recurrence === "monthly" && (
                  <>
                    <Select
                      value={recurrenceBySetPos ?? "first"}
                      onValueChange={(v) =>
                        form.setValue("recurrenceBySetPos", v)
                      }
                    >
                      <SelectTrigger className="w-full min-w-32 sm:w-28 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper" className="min-w-32">
                        {SET_POS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={form.watch("recurrenceByDayName") ?? "MO"}
                      onValueChange={(v) =>
                        form.setValue("recurrenceByDayName", v)
                      }
                    >
                      <SelectTrigger className="min-w-32 sm:w-24 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper" className="min-w-32">
                        {WEEKDAYS.map((day) => (
                          <SelectItem key={day.key} value={day.key}>
                            {day.fullLabel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}

                {recurrence === "yearly" && (
                  <span className="inline-flex items-center text-sm whitespace-nowrap text-muted-foreground">
                    {date
                      ? new Date(date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric" }
                        )
                      : "..."}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {EVENT_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organizer name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration URL</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel>Attachments</FormLabel>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      type: "pdf",
                      mode: "file",
                      file: null,
                      url: "",
                    })
                  }
                >
                  <Plus className="mr-1 size-3.5" /> Add Attachment
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No attachments yet. Add files or reference links for this
                  event.
                </p>
              )}

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border bg-muted/20 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <FormField
                          control={form.control}
                          name={`attachments.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Attachment name"
                                  className="h-8 text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`attachments.${index}.type`}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-8 w-28 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent position="popper">
                                  {ATTACHMENT_TYPES.map((t) => (
                                    <SelectItem key={t.value} value={t.value}>
                                      {t.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />

                          <Controller
                            control={form.control}
                            name={`attachments.${index}.mode`}
                            render={({ field }) => (
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(v) => {
                                  if (v) field.onChange(v)
                                }}
                                size="sm"
                              >
                                <ToggleGroupItem
                                  value="file"
                                  aria-label="File upload"
                                >
                                  <Upload className="size-3" />
                                  File
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="url"
                                  aria-label="URL link"
                                >
                                  <LinkIcon className="size-3" />
                                  URL
                                </ToggleGroupItem>
                              </ToggleGroup>
                            )}
                          />
                        </div>

                        {attachments?.[index]?.mode === "file" ? (
                          <div className="flex items-center gap-2">
                            <Controller
                              control={form.control}
                              name={`attachments.${index}.file`}
                              render={({ field }) => (
                                <Input
                                  type="file"
                                  className="h-8 text-sm"
                                  onChange={(e) =>
                                    field.onChange(e.target.files?.[0] ?? null)
                                  }
                                />
                              )}
                            />
                            {attachments?.[index]?.existingUrl &&
                              !attachments?.[index]?.file && (
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  Current file attached
                                </span>
                              )}
                          </div>
                        ) : (
                          <FormField
                            control={form.control}
                            name={`attachments.${index}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="https://..."
                                    className="h-8 text-sm"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Event"
                    : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
