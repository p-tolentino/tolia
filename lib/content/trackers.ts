import type { PageContent } from "../types"

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
    { heading: "Overview", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Downloads", documents: [{ name: "Achievers Club Guidelines (PDF)", type: "pdf" }, { name: "Qualification Tracker (XLS)", type: "xls" }] },
  ],
}

export const protectionDrive: PageContent = {
  title: "Protection Drive",
  description: "Protection drive performance and progress tracker.",
  sections: [
    { heading: "Overview", body: "This section is under construction. Resources and content are being prepared. Please check back later." },
    { heading: "Downloads", documents: [{ name: "Protection Drive Tracker (XLS)", type: "xls" }, { name: "Campaign Guidelines (PDF)", type: "pdf" }] },
  ],
}
