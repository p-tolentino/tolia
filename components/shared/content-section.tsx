import type { ComponentType } from "react"
import { FileText, Video, FileSpreadsheet, FileImage, Link as LinkIcon } from "lucide-react"
import { CardGrid } from "./card-grid"
import { ContentCard } from "./content-card"
import type { PageSection } from "@/lib/types"

const fileTypeIcons: Record<string, ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: FileText,
  xls: FileSpreadsheet,
  ppt: FileText,
  link: LinkIcon,
  video: Video,
  image: FileImage,
}

interface ContentSectionProps {
  sections: PageSection[]
  itemIcons?: Record<string, ComponentType<{ className?: string }>>
}

export function ContentSection({ sections, itemIcons }: ContentSectionProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.heading}>
          <h2 className="text-lg font-semibold sm:text-xl">{section.heading}</h2>
          {section.body && <p className="mt-2 text-sm text-muted-foreground sm:text-base">{section.body}</p>}
          {section.items && (
            <div className="mt-4">
              <CardGrid columns={2}>
                {section.items.map((item) => {
                  const Icon = itemIcons?.[item.label]
                  return (
                    <ContentCard key={item.label} title={item.label} description={item.description ?? ""} href={item.href} icon={Icon && <Icon className="size-5" />} />
                  )
                })}
              </CardGrid>
            </div>
          )}
          {section.documents && section.documents.length > 0 && (
            <div className="mt-4 space-y-2">
              {section.documents.map((doc) => {
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
        </div>
      ))}
    </div>
  )
}
