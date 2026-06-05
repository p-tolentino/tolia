import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const newRecruitsLanding: PageContent = {
  title: "New Recruits",
  description: "Everything you need to start your journey as a TOLIA agent.",
  sections: [
    {
      heading: "Recruitment Resources",
      items: [
        {
          label: "Recruitment Flowchart",
          href: "/new-recruits/recruitment-flowchart",
          description: "Step-by-step recruitment process",
        },
        {
          label: "BYB Schedule",
          href: "/new-recruits/byb-schedule",
          description: "Build Your Business session schedules",
        },
        {
          label: "IC Exam Schedule",
          href: "/new-recruits/ic-exam-schedule",
          description: "Licensing examination schedules",
        },
        {
          label: "Reviewer",
          href: "/new-recruits/reviewer",
          description: "Exam reviewers and study materials",
        },
        {
          label: "Onboarding",
          href: "/new-recruits/onboarding",
          description: "Step-by-step onboarding process",
        },
        {
          label: "Your First 90 Days",
          href: "/new-recruits/your-first-90-days",
          description: "Roadmap and resources for your first 90 days",
        },
        {
          label: "Prospect List",
          href: "/new-recruits/prospect-list",
          description: "Manage your prospect leads",
        },
        {
          label: "ROP ILT",
          href: "/new-recruits/rop-ilt",
          description: "Instructor-Led Training sessions",
        },

        {
          label: "Golden List",
          href: "/new-recruits/golden-list",
          description: "List of qualified and approved recruits",
        },
        {
          label: "Rookie High Flyers Club",
          href: "/new-recruits/rookie-high-flyers-club",
          description: "Recognition program for top rookies",
        },
      ],
    },
  ],
}

export const recruitmentFlowchart: PageContent = {
  title: "Recruitment Flowchart",
  description: "Step-by-step guide to the recruitment process.",
  sections: [
    {
      heading: "Recruitment Journey",
      timeline: [
        {
          title: "Prospect Identification",
          description:
            "Identify and approach potential candidates through referrals, networking, and community engagement. Look for individuals who align with PRU's values and have the drive to build a career as a financial advisor.",
          icon: "UserSearch",
        },
        {
          title: "Initial Interview",
          description:
            "Conduct an initial discussion to assess the prospect's fit, explain the financial advisor opportunity, and gauge their commitment. This is where you introduce PRU's value proposition and address any questions.",
          icon: "MessageCircle",
        },
        {
          title: "Build Your Business (BYB)",
          description:
            "The prospect attends a BYB session — PRU Life UK's flagship recruitment event — to learn about the insurance industry, the financial advisor career path, and inspiring success stories from seasoned PRU business builders. Sessions are held both online and in key cities nationwide.",
          icon: "CalendarCheck",
        },
        {
          title: "Rookie Onboarding Program (ROP1)",
          description:
            "Complete the first part of the Rookie Onboarding Program, an instructor-led training that covers foundational knowledge, sales techniques, compliance, and the tools needed to start building a client base.",
          icon: "BookOpen",
        },
        {
          title: "IC Exam",
          description:
            "Take and pass the Insurance Commission (IC) licensing examination. Study materials, reviewers, and practice tests are available to help candidates prepare. A passing score is required to obtain a license to sell life insurance products.",
          icon: "ScrollText",
        },
        {
          title: "Licensing & Contract Signing",
          description:
            "Submit all licensing requirements to the Insurance Commission and sign the agency contract with PRU Life UK. Once approved, the agent receives their official agent code and Authority to Sell.",
          icon: "FileSignature",
        },
        {
          title: "Onboarding & PRISM Access",
          description:
            "Complete the full onboarding process and gain access to PRISM and other digital tools. This includes system orientation, account setup, and familiarization with PRU's digital ecosystem for managing clients and policies.",
          icon: "LogIn",
        },
        {
          title: "Your First 90 Days",
          description:
            "Execute a structured 90-day action plan with guidance from your Unit Manager. Focus on building a prospect list, conducting financial consultations, closing your first sales, and establishing momentum for a long-term career.",
          icon: "Rocket",
        },
      ],
    },
  ],
}

export const bybSchedule: PageContent = {
  title: "BYB Schedule",
  description: "Build Your Business session schedules and registration.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const icExamSchedule: PageContent = {
  title: "IC Exam Schedule",
  description: "Licensing examination schedules and registration.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const reviewer: PageContent = {
  title: "Reviewer",
  description: "Exam reviewers and study materials for the licensing exam.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const ropIlt: PageContent = {
  title: "ROP ILT",
  description: "Instructor-Led Training sessions for new recruits.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const rookieHighFlyersClub: PageContent = {
  title: "Rookie High Flyers Club",
  description: "Recognition program for top-performing rookie agents.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const goldenList: PageContent = {
  title: "Golden List",
  description: "List of qualified and approved recruits.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const onboarding: PageContent = {
  title: "Onboarding",
  description: "Step-by-step onboarding process for new TOLIA agents.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const prospectList: PageContent = {
  title: "Prospect List",
  description: "Tools and templates for managing your prospect leads.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
  ],
}

export const yourFirst90Days: PageContent = {
  title: "Your First 90 Days",
  description:
    "Roadmap and resources to help you succeed in your first 90 days.",
  sections: [
    { heading: "Recording", body: STANDARD_BODY },
    { heading: "PRISM Access", body: STANDARD_BODY },
    { heading: "PRUExpert Link", body: STANDARD_BODY },
    { heading: "BPI Enrolment", body: STANDARD_BODY },
    { heading: "Agency Handbook", body: STANDARD_BODY },
  ],
}
