import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { TabbedContent } from "@/components/shared/tabbed-content"
import { forms } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Forms",
  description: "New Business, After Sales, and Claims forms.",
}

export default function FormsPage() {
  const tabs = forms.sections.map((s) => ({ label: s.heading, section: s }))

  return (
    <SectionWrapper>
      <PageHeader
        title={forms.title}
        description={forms.description}
        breadcrumbs={getBreadcrumbs("/agent-support/forms")}
      />
      <TabbedContent tabs={tabs} routePath="/agent-support/forms" />
    </SectionWrapper>
  )
}
