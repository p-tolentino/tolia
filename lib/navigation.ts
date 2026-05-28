import type { NavItem, NavSubItem } from "./types"

export const navigationItems: NavItem[] = [
  { title: "Home", href: "/", icon: "Home" },
  {
    title: "New Recruits",
    href: "/new-recruits",
    icon: "UserPlus",
    children: [
      {
        title: "Recruitment Flowchart",
        href: "/new-recruits/recruitment-flowchart",
        description: "Step-by-step recruitment process",
      },
      {
        title: "BYB Schedule",
        href: "/new-recruits/byb-schedule",
        description: "Build Your Business session schedules",
      },
      {
        title: "IC Exam Schedule",
        href: "/new-recruits/ic-exam-schedule",
        description: "Licensing examination schedules",
      },
      {
        title: "Reviewer",
        href: "/new-recruits/reviewer",
        description: "Exam reviewers and study materials",
      },
      {
        title: "Onboarding",
        href: "/new-recruits/onboarding",
        description: "Step-by-step onboarding process",
      },
      {
        title: "Your First 90 Days",
        href: "/new-recruits/your-first-90-days",
        description: "Roadmap and resources for your first 90 days",
      },
      {
        title: "Prospect List",
        href: "/new-recruits/prospect-list",
        description: "Manage your prospect leads",
      },
      {
        title: "ROP ILT",
        href: "/new-recruits/rop-ilt",
        description: "Instructor-Led Training sessions",
      },
      {
        title: "Golden List",
        href: "/new-recruits/golden-list",
        description: "List of qualified and approved recruits",
      },
      {
        title: "Rookie High Flyers Club",
        href: "/new-recruits/rookie-high-flyers-club",
        description: "Recognition program for top rookies",
      },
    ],
  },
  {
    title: "Agent Support",
    href: "/agent-support",
    icon: "Headset",
    children: [
      {
        title: "Product Primers",
        href: "/agent-support/product-primers",
        description: "One-page summaries of all insurance products",
      },
      {
        title: "Investment",
        href: "/agent-support/investment",
        description: "Investment product information and guides",
      },
      {
        title: "Marketing Campaign",
        href: "/agent-support/marketing-campaign",
        description: "Company and branch marketing campaigns",
      },
      {
        title: "Productivity Trainings",
        href: "/agent-support/productivity-trainings",
        description: "Training sessions to boost productivity",
      },
      {
        title: "All About Digital",
        href: "/agent-support/all-about-digital",
        description: "Digital tools: PRUOne, PRISM, and more",
      },
      {
        title: "Forms",
        href: "/agent-support/forms",
        description: "New Business, After Sales, and Claims forms",
      },
      {
        title: "Underwriting",
        href: "/agent-support/underwriting",
        description: "Underwriting guidelines and procedures",
      },
      {
        title: "Agency Handbook",
        href: "/agent-support/agency-handbook",
        description: "Complete agency reference handbook",
      },
      {
        title: "MDRT Materials",
        href: "/agent-support/mdrt-materials",
        description: "MDRT resources and qualification guides",
      },
    ],
  },
  {
    title: "From BM's Desk",
    href: "/from-bms-desk",
    icon: "MessageSquare",
    children: [
      {
        title: "Announcements",
        href: "/from-bms-desk/announcements",
        description: "Latest announcements from the Branch Manager",
      },
      {
        title: "Ask Me Anything",
        href: "/from-bms-desk/ask-me-anything",
        description: "Submit your questions and get answers",
      },
    ],
  },
  {
    title: "Rewards & Incentives",
    href: "/recognition",
    icon: "Award",
    children: [
      {
        title: "Recognition",
        href: "/recognition",
        description: "Posters and announcements celebrating achievements",
      },
      {
        title: "Trackers",
        href: "/trackers",
        description: "Performance trackers and goal monitoring",
      },
      {
        title: "Incentives",
        href: "/incentives",
        description: "Current incentive programs and rewards",
      },
    ],
  },
  { title: "LEAP", href: "/leap", icon: "Zap" },
  { title: "Assemblies", href: "/assemblies", icon: "Calendar" },
  {
    title: "Socials",
    href: "/socials",
    icon: "Share2",
    children: [
      {
        title: "Greetings",
        href: "/socials/greetings",
        description: "Birthday greetings and celebrations",
      },
      {
        title: "Events",
        href: "/socials/events",
        description: "Event photos, videos, and highlights",
      },
    ],
  },
  {
    title: "For UMs Only",
    href: "/for-unit-managers-only",
    icon: "Shield",
    children: [
      {
        title: "Unit Business Plan",
        href: "/for-unit-managers-only/unit-business-plan",
        description: "Develop and track your unit business plan",
      },
      {
        title: "Onboarding Materials",
        href: "/for-unit-managers-only/onboarding-materials",
        description: "Onboarding materials for new agents",
      },
      {
        title: "One-on-One Engagement",
        href: "/for-unit-managers-only/one-on-one-engagement",
        description: "One-on-one coaching engagement tools",
      },
      {
        title: "Promotion Parameters",
        href: "/for-unit-managers-only/promotion-parameters",
        description: "Promotion criteria and parameters",
      },
      {
        title: "TAPP Materials",
        href: "/for-unit-managers-only/tapp-materials",
        description: "TAPP program materials and resources",
      },
      {
        title: "Minutes of the Meeting",
        href: "/for-unit-managers-only/minutes-of-the-meeting",
        description: "Meeting minutes templates and archives",
      },
      {
        title: "MDRT Center of Field Leadership",
        href: "/for-unit-managers-only/mdrt-center-of-field-leadership",
        description: "MDRT leadership development resources",
      },
      {
        title: "Agents Directory",
        href: "/for-unit-managers-only/agents-directory",
        description: "Complete directory of TOLIA agents",
      },
      {
        title: "UM Welcome Kit",
        href: "/for-unit-managers-only/um-welcome-kit",
        description: "Premium starter package for new Unit Managers",
      },
    ],
  },
  {
    title: "Schedules",
    href: "/client-forum",
    icon: "Calendar",
    children: [
      {
        title: "Client Forum",
        href: "/client-forum",
        description: "Client discussions, feedback, and engagement",
      },
      {
        title: "PRU Calendar",
        href: "/pru-calendar",
        description: "Stay up to date with events and deadlines",
      },
    ],
  },
]

export function findActiveNavItem(pathname: string): {
  parent: NavItem | null
  child: NavSubItem | null
} {
  for (const item of navigationItems) {
    if (item.href === pathname) return { parent: item, child: null }
    if (item.children) {
      const child = item.children.find((c) => c.href === pathname)
      if (child) return { parent: item, child }
    }
  }
  return { parent: null, child: null }
}

export function getSidebarItems(section: string): NavSubItem[] {
  const item = navigationItems.find((n) =>
    n.children?.some((c) => c.href.startsWith(`/${section}`))
  )
  return item?.children ?? []
}

export const siteConfig = {
  name: "TOLIA",
  tagline: "Tolentino Life Insurance Agency \u2014 A Pru Life UK Branch",
  description:
    "Empowering Pru Life UK agents to succeed with resources, training, and support.",
  url: "https://tolia-pru.ph",
}
