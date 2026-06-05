"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Upload, Plus, Trash2, FileText, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { documentSchema, type DocumentFormValues } from "@/lib/schemas/document"
import type { RouteDocument } from "@/app/actions/manage"
import {
  getRouteDocuments,
  createRouteDocument,
  uploadRouteDocument,
  deleteRouteDocument,
} from "@/app/actions/manage"

interface FilesSectionProps {
  routePath: string
  routeLabel: string
  onBack?: () => void
}

export function FilesSection({
  routePath,
  routeLabel,
  onBack,
}: FilesSectionProps) {
  const [documents, setDocuments] = useState<RouteDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [labelDialogOpen, setLabelDialogOpen] = useState(false)
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null)
  const [draggingDocId, setDraggingDocId] = useState<string | null>(null)
  const [deletingDoc, setDeletingDoc] = useState<RouteDocument | null>(null)

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: { label: "" },
  })

  async function load() {
    const { data, error } = await getRouteDocuments(routePath)
    if (error) toast.error(error)
    else setDocuments(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [routePath])

  async function handleCreateLabel(values: DocumentFormValues) {
    const { error } = await createRouteDocument(routePath, values.label)
    if (error) toast.error(error)
    else {
      toast.success("Document label created")
      form.reset()
      setLabelDialogOpen(false)
      load()
    }
  }

  async function handleUpload(docId: string, file?: File) {
    const fileInput = document.getElementById(
      `file-${docId}`
    ) as HTMLInputElement
    const resolvedFile = file ?? fileInput?.files?.[0]
    if (!resolvedFile) return
    setUploadingDocId(docId)
    try {
      const formData = new FormData()
      formData.append("file", resolvedFile)
      const { data, error } = await uploadRouteDocument(docId, formData)
      if (error) toast.error(error)
      else {
        toast.success("File uploaded")
        load()
      }
    } catch {
      toast.error("Upload failed")
    } finally {
      setUploadingDocId(null)
      if (fileInput) fileInput.value = ""
    }
  }

  async function confirmDelete() {
    if (!deletingDoc) return
    const { success, error } = await deleteRouteDocument(deletingDoc.id)
    if (error) toast.error(error)
    else {
      toast.success("Document deleted")
      load()
    }
    setDeletingDoc(null)
  }

  if (loading)
    return (
      <p className="py-8 text-center text-muted-foreground">
        Loading documents...
      </p>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={onBack}
              >
                <ArrowLeft className="size-3.5" />
              </Button>
            )}
            <h3 className="text-lg font-semibold">{routeLabel}</h3>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{routePath}</p>
        </div>
        <Dialog
          open={labelDialogOpen}
          onOpenChange={(open) => {
            setLabelDialogOpen(open)
            if (!open) form.reset()
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="mr-1 size-4" />
              Add Label
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Document Label</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateLabel)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Document name (e.g. &quot;BYB Schedule 2026&quot;)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="group h-full border-2 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <CardHeader className="pb-2">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <TooltipProvider>
                  <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                    <FileText className="size-4 shrink-0 text-primary" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CardTitle className="truncate text-sm font-medium">
                          {doc.label}
                        </CardTitle>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-64 wrap-break-word"
                      >
                        {doc.label}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                  onClick={() => setDeletingDoc(doc)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-3 pb-4">
              {doc.file_url ? (
                <div className="flex items-center gap-2 rounded-lg border bg-muted/20 px-3 py-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <FileText className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {doc.file_name}
                    </p>
                  </div>
                </div>
              ) : null}

              <label
                className={cn(
                  "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-all",
                  "hover:border-primary/50 hover:bg-primary/5",
                  doc.file_url
                    ? "border-muted-300 bg-muted/10"
                    : "border-muted-300",
                  draggingDocId === doc.id &&
                    "border-primary bg-primary/5 ring-2 ring-primary/30"
                )}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDraggingDocId(doc.id)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDraggingDocId(null)
                }}
                onDrop={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDraggingDocId(null)
                  const file = e.dataTransfer.files?.[0]
                  if (file) await handleUpload(doc.id, file)
                }}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-muted/50">
                  <Upload
                    className={cn(
                      "size-5",
                      uploadingDocId === doc.id
                        ? "animate-bounce text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </div>
                {uploadingDocId === doc.id ? (
                  <span className="text-sm font-medium text-primary">
                    Uploading...
                  </span>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium">
                        {doc.file_url ? "Replace file" : "Upload file"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.file_url
                          ? "Drop a new file or click to browse"
                          : "Drop your file here or click to browse"}
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60">
                      PDF, DOC, XLS, PPT up to 25MB
                    </p>
                  </>
                )}
                <input
                  id={`file-${doc.id}`}
                  type="file"
                  className="hidden"
                  onChange={() => handleUpload(doc.id)}
                />
              </label>
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No documents yet
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Add a document label to start organizing files for this route.
          </p>
        </div>
      )}

      <AlertDialog
        open={!!deletingDoc}
        onOpenChange={(open) => {
          if (!open) setDeletingDoc(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingDoc?.label}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
