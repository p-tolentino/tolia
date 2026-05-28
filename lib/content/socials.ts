import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const socialsLanding: PageContent = {
  title: "Socials",
  description: "Social events, greetings, and community activities.",
  sections: [
    {
      heading: "Social Resources",
      items: [
        { label: "Greetings", href: "/socials/greetings", description: "Birthday greetings and celebrations" },
        { label: "Events", href: "/socials/events", description: "Event photos, videos, and highlights" },
      ],
    },
  ],
}

export const greetings: PageContent = {
  title: "Greetings",
  description: "Birthday greetings and celebrations for TOLIA agents.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const socialsEvents: PageContent = {
  title: "Events",
  description: "Event photos and videos.",
  sections: [
    { heading: "Photos", body: STANDARD_BODY },
    { heading: "Videos", body: STANDARD_BODY },
  ],
}
