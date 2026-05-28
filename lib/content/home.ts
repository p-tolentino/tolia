import type { PageContent } from "../types"

export const homeContent: PageContent = {
  title: "TOLIA (Tolentino Life Insurance Agency) — Pru Life UK",
  description:
    "Empowering agents with the tools, training, and support to succeed.",
  sections: [
    {
      heading: "Quick Links",
      items: [
        {
          label: "New Recruits",
          href: "/new-recruits",
          description: "Everything to start your TOLIA journey",
        },
        {
          label: "Agent Support",
          href: "/agent-support",
          description: "Resources and tools for our agents",
        },
        {
          label: "From BM's Desk",
          href: "/from-bms-desk",
          description: "Updates and announcements from the BM",
        },
        {
          label: "For UMs Only",
          href: "/for-unit-managers-only",
          description: "Exclusive UM resources and tools",
        },
        {
          label: "LEAP",
          href: "/leap",
          description: "Leadership development program",
        },
        {
          label: "Assemblies",
          href: "/assemblies",
          description: "Branch assembly schedules and updates",
        },
        {
          label: "Socials",
          href: "/socials",
          description: "Events, greetings, and community",
        },
      ],
    },
  ],
}

export const heroContent = {
  headline: "Welcome to TOLIA Web Suite",
  subheadline: "Empowering agents to succeed.",
  cta: { label: "Explore Resources", href: "/agent-support" },
  ctaSecondary: { label: "View Calendar", href: "/pru-calendar" },
}
