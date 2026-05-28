import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { Heart, Camera } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { socialsLanding } from "@/lib/content/socials"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Greetings: Heart,
  Events: Camera,
}

export const metadata: Metadata = {
  title: "Socials",
  description: "Social events, greetings, and community activities.",
}

export default function SocialsPage() {
  return (
    <SectionWrapper>
      <PageHeader title={socialsLanding.title} description={socialsLanding.description} 
        breadcrumbs={getBreadcrumbs("/socials")}
      />
      <div className="mt-8">
        <ContentSection sections={socialsLanding.sections} itemIcons={itemIcons} />
      </div>
    </SectionWrapper>
  )
}
