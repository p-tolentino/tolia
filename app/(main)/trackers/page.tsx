import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { Award, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { trackersLanding } from "@/lib/content/trackers"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Achievers Club": Award,
  "Protection Drive": TrendingUp,
}

export const metadata: Metadata = {
  title: "Trackers",
  description: "Performance trackers and goal monitoring tools.",
}

export default function TrackersPage() {
  return (
    <SectionWrapper>
      <PageHeader title={trackersLanding.title} description={trackersLanding.description} 
        breadcrumbs={getBreadcrumbs("/trackers")}
      />
      <div className="mt-8">
        <ContentSection sections={trackersLanding.sections} itemIcons={itemIcons} />
      </div>
    </SectionWrapper>
  )
}
