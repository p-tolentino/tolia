import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { TabbedContent } from "@/components/shared/tabbed-content"
import { marketingCampaign } from "@/lib/content/agent-support"

export const metadata: Metadata = {
  title: "Marketing Campaign",
  description: "Company and branch marketing campaigns and materials.",
}

export default function MarketingCampaignPage() {
  const tabs = marketingCampaign.sections.map((s) => ({ label: s.heading, section: s }))
  return (
    <SectionWrapper>
      <PageHeader title={marketingCampaign.title} description={marketingCampaign.description} 
        breadcrumbs={getBreadcrumbs("/agent-support/marketing-campaign")}
      />
      <TabbedContent tabs={tabs} />
    </SectionWrapper>
  )
}
