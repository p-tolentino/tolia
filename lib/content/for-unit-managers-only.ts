import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const forUnitManagersOnlyLanding: PageContent = {
  title: "For Unit Managers Only",
  description:
    "Exclusive resources, tools, and materials for TOLIA Unit Managers.",
  sections: [
    {
      heading: "UM Resources",
      items: [
        {
          label: "Unit Business Plan",
          href: "/for-unit-managers-only/unit-business-plan",
          description: "Develop and track your unit business plan",
        },
        {
          label: "Onboarding Materials",
          href: "/for-unit-managers-only/onboarding-materials",
          description: "Onboarding materials for new agents",
        },
        {
          label: "One-on-One Engagement",
          href: "/for-unit-managers-only/one-on-one-engagement",
          description: "One-on-one coaching engagement tools",
        },
        {
          label: "Promotion Parameters",
          href: "/for-unit-managers-only/promotion-parameters",
          description: "Promotion criteria and parameters",
        },
        {
          label: "TAPP Materials",
          href: "/for-unit-managers-only/tapp-materials",
          description: "TAPP program materials and resources",
        },
        {
          label: "Minutes of the Meeting",
          href: "/for-unit-managers-only/minutes-of-the-meeting",
          description: "Meeting minutes templates and archives",
        },
        {
          label: "MDRT Center of Field Leadership",
          href: "/for-unit-managers-only/mdrt-center-of-field-leadership",
          description: "MDRT leadership development resources",
        },
        {
          label: "Agents Directory",
          href: "/for-unit-managers-only/agents-directory",
          description: "Complete directory of TOLIA agents",
        },
        {
          label: "UM Welcome Kit",
          href: "/for-unit-managers-only/um-welcome-kit",
          description: "Premium starter package for new Unit Managers",
        },
      ],
    },
  ],
}

export const unitBusinessPlan: PageContent = {
  title: "Unit Business Plan",
  description: "Develop, track, and manage your unit business plan.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const onboardingMaterials: PageContent = {
  title: "Onboarding Materials",
  description: "Onboarding materials for new agents joining your unit.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const oneOnOneEngagement: PageContent = {
  title: "One-on-One Engagement",
  description: "Tools and templates for one-on-one coaching sessions.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const promotionParameters: PageContent = {
  title: "Promotion Parameters",
  description: "Promotion criteria, parameters, and guidelines.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const tappMaterials: PageContent = {
  title: "TAPP Materials",
  description: "TAPP program materials, guides, and resources.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const minutesOfTheMeeting: PageContent = {
  title: "Minutes of the Meeting",
  description: "Meeting minutes templates and archives.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const mdrtCenterOfFieldLeadership: PageContent = {
  title: "MDRT Center of Field Leadership",
  description:
    "MDRT leadership development resources — Recruitment and Activation.",
  sections: [
    { heading: "Recruitment", body: STANDARD_BODY },
    { heading: "Activation", body: STANDARD_BODY },
  ],
}

export const agentsDirectory: PageContent = {
  title: "Agents Directory",
  description: "Complete directory of TOLIA agents.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}
