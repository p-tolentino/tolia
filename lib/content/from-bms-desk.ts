import type { PageContent } from "../types"

export const fromBmsDeskContent: PageContent = {
  title: "From BM\u2019s Desk",
  description: "Updates, announcements, and messages from the Branch Manager.",
  sections: [
    {
      heading: "Resources",
      items: [
        { label: "Announcements", href: "/from-bms-desk/announcements", description: "Latest announcements from the Branch Manager" },
        { label: "Ask Me Anything", href: "/from-bms-desk/ask-me-anything", description: "Submit your questions and get answers" },
      ],
    },
  ],
}

export const announcements: PageContent = {
  title: "Announcements",
  description: "Latest announcements and updates from the Branch Manager.",
  sections: [
    { heading: "Latest Updates", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Downloads", documents: [{ name: "BM Message - Latest (PDF)", type: "pdf" }] },
  ],
}
