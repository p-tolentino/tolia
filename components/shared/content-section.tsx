import { CardGrid } from "./card-grid"
import { ContentCard } from "./content-card"
import { EmptyStatePlaceholder } from "./empty-state"
import { RouteDocuments } from "./route-documents"
import type { ComponentType } from "react"
import type { PageSection } from "@/lib/types"

interface ContentSectionProps {
  sections: PageSection[]
  itemIcons?: Record<string, ComponentType<{ className?: string }>>
  routePath?: string
}

export function ContentSection({ sections, itemIcons, routePath }: ContentSectionProps) {
  const hasAnyContent = sections.some(
    (s) => (s.items && s.items.length > 0) || (s.body)
  )

  if (!hasAnyContent && !routePath) {
    return <EmptyStatePlaceholder />
  }

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
        </div>
      ))}
      {routePath && <RouteDocuments routePath={routePath} />}
    </div>
  )
}
