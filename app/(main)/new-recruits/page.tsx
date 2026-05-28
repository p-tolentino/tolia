import type { Metadata } from "next"
import {
  GitBranch,
  CalendarCheck,
  FileText,
  BookOpen,
  Award,
  ListChecks,
  LogIn,
  Users,
  Calendar,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ContentSection } from "@/components/shared/content-section"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { newRecruitsLanding } from "@/lib/content/new-recruits"

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Recruitment Flowchart": GitBranch,
  "BYB Schedule": CalendarCheck,
  "IC Exam Schedule": CalendarCheck,
  Reviewer: FileText,
  "ROP ILT": BookOpen,
  "Rookie High Flyers Club": Award,
  "Golden List": ListChecks,
  Onboarding: LogIn,
  "Your First 90 Days": Calendar,
  "Prospect List": Users,
}

export const metadata: Metadata = {
  title: "New Recruits",
  description: "Everything you need to start your journey as a TOLIA agent.",
}

export default function NewRecruitsPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title={newRecruitsLanding.title}
        description={newRecruitsLanding.description}
      />
      <div className="mt-8">
        <ContentSection
          sections={newRecruitsLanding.sections}
          itemIcons={itemIcons}
        />
      </div>
    </SectionWrapper>
  )
}
