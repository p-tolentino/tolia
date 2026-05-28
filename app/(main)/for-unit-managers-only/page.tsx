import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { FileText, BookOpen, Users, TrendingUp, ClipboardList, FileSpreadsheet, Award, UserCheck, Gift } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { forUnitManagersOnlyLanding } from "@/lib/content/for-unit-managers-only"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Unit Business Plan": FileText,
  "Onboarding Materials": BookOpen,
  "One-on-One Engagement": Users,
  "Promotion Parameters": TrendingUp,
  "TAPP Materials": ClipboardList,
  "Minutes of the Meeting": FileSpreadsheet,
  "MDRT Center of Field Leadership": Award,
  "Agents Directory": UserCheck,
  "UM Welcome Kit": Gift,
}

export const metadata: Metadata = {
  title: "For UMs Only",
  description: "Exclusive resources, tools, and materials for TOLIA Unit Managers.",
}

export default function ForUnitManagersOnlyPage() {
  return (
    <SectionWrapper>
      <PageHeader title={forUnitManagersOnlyLanding.title} description={forUnitManagersOnlyLanding.description} 
        breadcrumbs={getBreadcrumbs("/for-unit-managers-only")}
      />
      <div className="mt-8">
        <ContentSection sections={forUnitManagersOnlyLanding.sections} itemIcons={itemIcons} />
      </div>
    </SectionWrapper>
  )
}
