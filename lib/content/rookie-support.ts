import type { PageContent } from "../types"

export const rookieSupportLanding: PageContent = {
  title: "Rookie Support",
  description: "Onboarding and training resources for new agents.",
  sections: [
    {
      heading: "Rookie Resources",
      items: [
        { label: "Onboarding", href: "/rookie-support/onboarding", description: "Step-by-step onboarding process" },
        { label: "Prospect List", href: "/rookie-support/prospect-list", description: "Manage your prospect leads" },
        { label: "Your First 90 Days", href: "/rookie-support/your-first-90-days", description: "Roadmap and resources for your first 90 days" },
      ],
    },
  ],
}

export const onboarding: PageContent = {
  title: "Onboarding",
  description: "Step-by-step onboarding process for new TOLIA agents.",
  sections: [
    { heading: "Overview", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Downloads", documents: [{ name: "Onboarding Checklist (PDF)", type: "pdf" }, { name: "New Agent Handbook (PDF)", type: "pdf" }] },
  ],
}

export const prospectList: PageContent = {
  title: "Prospect List",
  description: "Tools and templates for managing your prospect leads.",
  sections: [
    { heading: "Overview", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Downloads", documents: [{ name: "Prospect List Template (XLS)", type: "xls" }, { name: "Prospect Tracking Guide (PDF)", type: "pdf" }] },
  ],
}

export const yourFirst90Days: PageContent = {
  title: "Your First 90 Days",
  description: "Roadmap and resources to help you succeed in your first 90 days.",
  sections: [
    { heading: "Recording", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "PRISM Access", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "PRUExpert Link", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "BPI Enrolment", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Agency Handbook", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
  ],
}
