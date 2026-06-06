"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyStatePlaceholder } from "./empty-state"
import { RouteDocuments } from "./route-documents"
import type { PageSection } from "@/lib/types"
import { ScrollArea } from "../ui/scroll-area"

interface TabbedContentProps {
  tabs: { label: string; section: PageSection }[]
  defaultValue?: string
  routePath?: string
}

export function TabbedContent({
  tabs,
  defaultValue,
  routePath,
}: TabbedContentProps) {
  const hasAnyContent = tabs.some(
    (t) => (t.section.items && t.section.items.length > 0) || t.section.body
  )

  if (!hasAnyContent && !routePath) {
    return <EmptyStatePlaceholder />
  }

  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.label} className="mt-6">
      {/* <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label} className="mt-4 space-y-4">
          {tab.section.body && <p className="text-sm text-muted-foreground sm:text-base">{tab.section.body}</p>}
        </TabsContent>
      ))} */}
      {routePath && <RouteDocuments routePath={routePath} />}
    </Tabs>
  )
}
