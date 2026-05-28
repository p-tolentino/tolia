import type { PageContent } from "../types"

export const schedulesLanding: PageContent = {
  title: "Schedules",
  description: "Client forum schedules, PRU calendar, and important dates.",
  sections: [
    {
      heading: "Schedule Resources",
      items: [
        { label: "Client Forum", href: "/schedules/client-forum", description: "Client discussions, feedback, and engagement" },
        { label: "PRU Calendar", href: "/schedules/pru-calendar", description: "Stay up to date with events and deadlines" },
      ],
    },
  ],
}
