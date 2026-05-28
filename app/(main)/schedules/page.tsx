import type { Metadata } from "next"
import { MessageSquare, Calendar } from "lucide-react"
import { getBreadcrumbs } from "@/lib/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { schedulesLanding } from "@/lib/content/schedules"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Client Forum": MessageSquare,
  "PRU Calendar": Calendar,
}

export const metadata: Metadata = {
  title: "Schedules",
  description: "Client forum schedules, PRU calendar, and important dates.",
}

export default function SchedulesPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={schedulesLanding.title}
        description={schedulesLanding.description}
        breadcrumbs={getBreadcrumbs("/schedules")}
      />
      <div className="mt-8">
        <ContentSection
          sections={schedulesLanding.sections}
          itemIcons={itemIcons}
        />
      </div>
    </SectionWrapper>
  )
}
