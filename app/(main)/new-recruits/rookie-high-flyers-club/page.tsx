import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { rookieHighFlyersClub } from "@/lib/content/new-recruits"

export const metadata: Metadata = {
  title: "Rookie High Flyers Club",
  description: "Recognition program for top-performing rookie agents.",
}

export default function RookieHighFlyersClubPage() {
  return (
    <SectionWrapper>
      <PageHeader title={rookieHighFlyersClub.title} description={rookieHighFlyersClub.description} 
        breadcrumbs={getBreadcrumbs("/new-recruits/rookie-high-flyers-club")}
      />
      <div className="mt-8">
        <ContentSection sections={rookieHighFlyersClub.sections} />
      </div>
    </SectionWrapper>
  )
}
