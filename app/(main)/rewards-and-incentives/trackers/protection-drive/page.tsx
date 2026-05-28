import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { protectionDrive } from "@/lib/content/trackers"

export const metadata: Metadata = {
  title: "Protection Drive",
  description: "Protection drive performance and progress tracker.",
}

export default function ProtectionDrivePage() {
  return (
    <SectionWrapper>
      <PageHeader title={protectionDrive.title} description={protectionDrive.description} 
        breadcrumbs={getBreadcrumbs("/rewards-and-incentives/trackers/protection-drive")}
      />
      <div className="mt-8">
        <ContentSection sections={protectionDrive.sections} />
      </div>
    </SectionWrapper>
  )
}
