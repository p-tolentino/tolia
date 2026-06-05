import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const trackersLanding: PageContent = {
  title: "Trackers",
  description: "Performance trackers and goal monitoring tools.",
  sections: [
    {
      heading: "Tracker Resources",
      items: [
        { label: "Achievers Club", href: "/trackers/achievers-club", description: "Track achievers club qualifications" },
        { label: "Protection Drive", href: "/trackers/protection-drive", description: "Protection drive progress tracker" },
      ],
    },
  ],
}

export const achieversClub: PageContent = {
  title: "Achievers Club",
  description: "Track your Achievers Club qualifications and progress.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const protectionDrive: PageContent = {
  title: "Protection Drive",
  description: "Protection drive performance and progress tracker.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}
