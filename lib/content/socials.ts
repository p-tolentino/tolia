import type { PageContent } from "../types"

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
    { heading: "Overview", body: "This section is under construction. Birthday data and greeting features are being prepared. Please check back later." },
  ],
}

export const socialsEvents: PageContent = {
  title: "Events",
  description: "Event photos and videos.",
  sections: [
    { heading: "Photos", body: "This section is under construction. Event photos are being prepared. Please check back later." },
    { heading: "Videos", body: "This section is under construction. Event videos are being prepared. Please check back later." },
  ],
}
