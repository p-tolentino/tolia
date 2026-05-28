"use client"

import { FileText, Video, FileSpreadsheet, FileImage, Link as LinkIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyStatePlaceholder } from "./empty-state"
import type { PageSection } from "@/lib/types"
import type { ComponentType } from "react"

const fileTypeIcons: Record<string, ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: FileText,
  xls: FileSpreadsheet,
  ppt: FileText,
  link: LinkIcon,
  video: Video,
  image: FileImage,
}

interface TabbedContentProps {
  tabs: { label: string; section: PageSection }[]
  defaultValue?: string
}

export function TabbedContent({ tabs, defaultValue }: TabbedContentProps) {
  const hasAnyContent = tabs.some(
    (t) =>
      (t.section.items && t.section.items.length > 0) ||
      (t.section.documents && t.section.documents.length > 0)
  )

  if (!hasAnyContent) {
    return <EmptyStatePlaceholder />
  }

  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.label} className="mt-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label} className="mt-4 space-y-4">
          {tab.section.body && <p className="text-sm text-muted-foreground sm:text-base">{tab.section.body}</p>}
          {tab.section.documents && tab.section.documents.length > 0 && (
            <div className="space-y-2">
              {tab.section.documents.map((doc) => {
                const Icon = doc.type ? fileTypeIcons[doc.type] : null
                return (
                  <div
                    key={doc.name}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm"
                  >
                    {Icon && (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                    )}
                    <span className="flex-1">{doc.name}</span>
                  </div>
                )
              })}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
