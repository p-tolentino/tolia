"use client"

import { useEffect, useState } from "react"
import { FileText, FileSpreadsheet, FileImage, Link as LinkIcon, Video, Download } from "lucide-react"
import type { RouteDocument } from "@/app/actions/manage"

interface RouteDocumentsProps {
  routePath: string
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: FileText,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  ppt: FileText,
  pptx: FileText,
  link: LinkIcon,
  video: Video,
  image: FileImage,
  png: FileImage,
  jpg: FileImage,
  jpeg: FileImage,
}

function getIcon(type: string) {
  const Icon = typeIcons[type.toLowerCase()] ?? FileText
  return Icon
}

export function RouteDocuments({ routePath }: RouteDocumentsProps) {
  const [documents, setDocuments] = useState<RouteDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { getRouteDocuments } = await import("@/app/actions/manage")
      const { data, error } = await getRouteDocuments(routePath)
      if (!error && data) setDocuments(data)
      setLoading(false)
    }
    load()
  }, [routePath])

  if (loading) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold sm:text-xl">Documents</h2>
        <p className="text-sm text-muted-foreground">Loading documents...</p>
      </div>
    )
  }

  if (documents.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold sm:text-xl">Documents</h2>
      <div className="space-y-2">
        {documents.map((doc) => {
          const Icon = getIcon(doc.file_type ?? "pdf")
          return (
            <a
              key={doc.id}
              href={doc.file_url ?? "#"}
              target={doc.file_url ? "_blank" : undefined}
              rel={doc.file_url ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm transition-colors hover:bg-accent"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <span className="flex-1 break-words">{doc.label}</span>
              {doc.file_url && <Download className="size-4 shrink-0 text-muted-foreground" />}
            </a>
          )
        })}
      </div>
    </div>
  )
}
