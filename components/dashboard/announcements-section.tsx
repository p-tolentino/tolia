"use client"

import { useEffect, useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, Pencil, Trash2, Eye, EyeOff, Megaphone } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { announcementSchema, type AnnouncementFormValues } from "@/lib/schemas/announcement"
import type { Announcement } from "@/app/actions/manage"
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/app/actions/manage"

export function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState<"draft" | "publish" | null>(null)
  const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | null>(null)

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: { title: "", content: "" },
  })

  const load = useCallback(async () => {
    const { data, error } = await getAnnouncements()
    if (error) toast.error(error)
    else setAnnouncements(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (dialogOpen && editId) {
      const ann = announcements.find((a) => a.id === editId)
      if (ann) form.reset({ title: ann.title, content: ann.content })
    }
  }, [dialogOpen, editId, announcements, form])

  function handleSave(mode: "draft" | "publish") {
    form.handleSubmit(async (values: AnnouncementFormValues) => {
      setSubmitting(mode)
      const isPublished = mode === "publish"
      const result = editId
        ? await updateAnnouncement(editId, {
            title: values.title.trim(),
            content: values.content.trim(),
            is_published: isPublished,
          })
        : await createAnnouncement(values.title.trim(), values.content.trim(), isPublished)
      if (result.error) toast.error(result.error)
      else {
        toast.success(isPublished ? "Announcement published" : "Draft saved")
        setDialogOpen(false)
        setEditId(null)
        form.reset()
        load()
      }
      setSubmitting(null)
    })()
  }

  async function handleTogglePublish(id: string, current: boolean) {
    const { error } = await updateAnnouncement(id, { is_published: !current })
    if (error) toast.error(error)
    else {
      toast.success(current ? "Unpublished" : "Published")
      load()
    }
  }

  async function confirmDelete() {
    if (!deletingAnnouncement) return
    const { success, error } = await deleteAnnouncement(deletingAnnouncement.id)
    if (error) toast.error(error)
    else {
      toast.success("Announcement deleted")
      load()
    }
    setDeletingAnnouncement(null)
  }

  function openEdit(a: Announcement | null) {
    setEditId(a?.id ?? null)
    form.reset({ title: a?.title ?? "", content: a?.content ?? "" })
    setDialogOpen(true)
  }

  if (loading)
    return (
      <p className="py-8 text-center text-muted-foreground">
        Loading announcements...
      </p>
    )

  return (
    <TooltipProvider>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Announcements</h3>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditId(null); form.reset() } }}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => openEdit(null)}>
              <Plus className="mr-1 size-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit" : "New"} Announcement</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <textarea
                          className="min-h-30 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-6 gap-2">
                <Button
                  variant="outline"
                  type="button"
                  disabled={!!submitting}
                  onClick={() => handleSave("draft")}
                >
                  {submitting === "draft" ? "Saving..." : "Save as Draft"}
                </Button>
                <Button
                  type="button"
                  disabled={!!submitting}
                  onClick={() => handleSave("publish")}
                >
                  {submitting === "publish" ? "Publishing..." : "Publish"}
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Megaphone className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No announcements yet
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Publish your first announcement to reach your team.
          </p>
          <Button className="mt-4" size="sm" onClick={() => openEdit(null)}>
            <Plus className="mr-1 size-4" />
            Create Announcement
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {announcements.map((a) => (
            <Card
              key={a.id}
              className="border shadow-sm transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={a.is_published ? "default" : "secondary"}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                        a.is_published &&
                          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                      )}
                    >
                      {a.is_published ? "Published" : "Draft"}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(a.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() =>
                              handleTogglePublish(a.id, a.is_published)
                            }
                          >
                            {a.is_published ? (
                              <EyeOff className="size-3.5" />
                            ) : (
                              <Eye className="size-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {a.is_published ? "Unpublish" : "Publish"}
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => openEdit(a)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeletingAnnouncement(a)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                </div>
                <CardTitle className="mt-2 text-base leading-snug font-semibold">
                  {a.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {a.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>

      <AlertDialog
        open={!!deletingAnnouncement}
        onOpenChange={(open) => { if (!open) setDeletingAnnouncement(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingAnnouncement?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}
