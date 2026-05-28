import { getBreadcrumbs } from "@/lib/navigation"
import type { Metadata } from "next"
import { FileText, TrendingUp, Megaphone, BarChart3, Laptop, FileSpreadsheet, Search, BookOpen, Trophy } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { agentSupportLanding } from "@/lib/content/agent-support"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Product Primers": FileText,
  Investment: TrendingUp,
  "Marketing Campaign": Megaphone,
  "Productivity Trainings": BarChart3,
  "All About Digital": Laptop,
  Forms: FileSpreadsheet,
  Underwriting: Search,
  "Agency Handbook": BookOpen,
  "MDRT Materials": Trophy,
}

export const metadata: Metadata = {
  title: "Agent Support",
  description: "All the tools, guidelines, and resources you need to succeed at TOLIA.",
}

export default function AgentSupportPage() {
  return (
    <SectionWrapper>
      <PageHeader title={agentSupportLanding.title} description={agentSupportLanding.description} 
        breadcrumbs={getBreadcrumbs("/agent-support")}
      />
      <div className="mt-8">
        <ContentSection sections={agentSupportLanding.sections} itemIcons={itemIcons} />
      </div>
    </SectionWrapper>
  )
}
