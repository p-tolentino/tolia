import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const agentSupportLanding: PageContent = {
  title: "Agent Support",
  description: "Resources, tools, and training materials for all TOLIA agents.",
  sections: [
    {
      heading: "Resources",
      items: [
        { label: "Product Primers", href: "/agent-support/product-primers", description: "One-page summaries of all insurance products" },
        { label: "Investment", href: "/agent-support/investment", description: "Investment product information and guides" },
        { label: "Marketing Campaign", href: "/agent-support/marketing-campaign", description: "Company and branch marketing campaigns" },
        { label: "Productivity Trainings", href: "/agent-support/productivity-trainings", description: "Training sessions to boost productivity" },
        { label: "All About Digital", href: "/agent-support/all-about-digital", description: "Digital tools: PRUOne, PRISM, and more" },
        { label: "Forms", href: "/agent-support/forms", description: "New Business, After Sales, and Claims forms" },
        { label: "Underwriting", href: "/agent-support/underwriting", description: "Underwriting guidelines and procedures" },
        { label: "Agency Handbook", href: "/agent-support/agency-handbook", description: "Complete agency reference handbook" },
        { label: "MDRT Materials", href: "/agent-support/mdrt-materials", description: "MDRT resources and qualification guides" },
      ],
    },
  ],
}

export const productPrimers: PageContent = {
  title: "Product Primers",
  description: "One-page summaries of all Pru Life UK insurance products.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const investment: PageContent = {
  title: "Investment",
  description: "Investment product information, guides, and resources.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const marketingCampaign: PageContent = {
  title: "Marketing Campaign",
  description: "Company and branch marketing campaigns and materials.",
  sections: [
    { heading: "Company Campaigns", body: STANDARD_BODY },
    { heading: "Branch Campaigns", body: STANDARD_BODY },
  ],
}

export const productivityTrainings: PageContent = {
  title: "Productivity Trainings",
  description: "Training sessions and materials to boost agent productivity.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const allAboutDigital: PageContent = {
  title: "All About Digital",
  description: "Digital tools and platforms: PRUOne, PRISM, and more.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const forms: PageContent = {
  title: "Forms",
  description: "New Business, After Sales, and Claims forms.",
  sections: [
    { heading: "New Business Forms", body: STANDARD_BODY },
    { heading: "After Sales Forms", body: STANDARD_BODY },
    { heading: "Claims Forms", body: STANDARD_BODY },
  ],
}

export const underwriting: PageContent = {
  title: "Underwriting",
  description: "Underwriting guidelines, rules, and reference materials.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const agencyHandbook: PageContent = {
  title: "Agency Handbook",
  description: "Complete agency reference handbook for all TOLIA agents.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const mdrtMaterials: PageContent = {
  title: "MDRT Materials",
  description: "MDRT qualification resources, guides, and reference materials.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}
