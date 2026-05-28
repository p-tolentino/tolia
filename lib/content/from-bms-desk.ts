import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

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
    { heading: "Latest Updates", body: STANDARD_BODY },
    { heading: "Downloads", documents: [{ name: "BM Message - Latest (PDF)", type: "pdf" }] },
  ],
}
