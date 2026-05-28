import type { Metadata } from "next"
import { Award, TrendingUp, Gift } from "lucide-react"
import { getBreadcrumbs } from "@/lib/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { rewardsAndIncentivesLanding } from "@/lib/content/rewards-and-incentives"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Recognition: Award,
  Trackers: TrendingUp,
  Incentives: Gift,
}

export const metadata: Metadata = {
  title: "Rewards & Incentives",
  description: "Incentive programs, recognition posters, and performance trackers.",
}

export default function RewardsAndIncentivesPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={rewardsAndIncentivesLanding.title}
        description={rewardsAndIncentivesLanding.description}
        breadcrumbs={getBreadcrumbs("/rewards-and-incentives")}
      />
      <div className="mt-8">
        <ContentSection
          sections={rewardsAndIncentivesLanding.sections}
          itemIcons={itemIcons}
        />
      </div>
    </SectionWrapper>
  )
}
