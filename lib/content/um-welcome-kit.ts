export interface WelcomeKitItem {
  name: string
  description: string
  features: string[]
}

export interface WelcomeKitCategory {
  heading: string
  tag: string
  items: WelcomeKitItem[]
}

export const umWelcomeKit = {
  title: "UM Welcome Kit",
  subtitle: '"From Producer to Leader" Premium Starter Package',
  categories: [
    {
      heading: "I. Identity & Branding Materials",
      tag: "Leadership Status Boost",
      items: [
        {
          name: "Official UM Leadership Jacket",
          description: "Branch-branded jacket with UM title embroidered on the chest in leadership colors (navy + gold).",
          features: ["Branch-branded design", "UM title embroidered on chest", "Leadership navy + gold colors", "Worn during assemblies & meetings"],
        },
        {
          name: "UM Nameplate / Desk Name Block",
          description: "Acrylic or wooden name block with gold-lettered 'UNIT MANAGER' branding.",
          features: ["Acrylic or wooden build", "Gold-lettered UNIT MANAGER title", "Reinforces authority in the branch"],
        },
        {
          name: "Personalized UM Lanyard + ID Card",
          description: "Exclusive lanyard color reserved for leaders, with personalized ID card.",
          features: ["Exclusive leader-only color", "Personalized ID card", "Immediately differentiates from agents"],
        },
        {
          name: "UM Certificate of Promotion (Framed)",
          description: "Framed certificate signed by Branch Head and agency leaders, presented on stage.",
          features: ["Signed by Branch Head & leaders", "Framed for display", "Presented on stage with spotlight & music"],
        },
      ],
    },
    {
      heading: "II. Leader\u2019s Toolkit",
      tag: "Everything needed to recruit & coach",
      items: [
        {
          name: "Leader\u2019s Playbook Binder",
          description: "A structured 60\u201380 page binder — the UM Operations Bible.",
          features: ["90-Day UM Roadmap", "Daily, weekly, monthly UM routines", "Scorecards for agent activation", "Recruitment & coaching scripts", "Activity monitoring forms", "Case clinic guide", "New agent onboarding checklist", "Team meeting agenda templates", "Performance troubleshooting guide"],
        },
        {
          name: "Recruitment Master Folder",
          description: "Complete recruitment toolkit with presentations, scripts, and handouts.",
          features: ["Updated career presentation slides", "30-minute opportunity script", "Step-by-step Recruit \u2192 License \u2192 Activate workflow", "ROI comparison charts", "A5 quick-handouts for walk-ins", "Sample messages for inviting prospects"],
        },
        {
          name: "New Agent Onboarding Kit",
          description: "A complete starter folder for UMs to give their first new agent.",
          features: ["Welcome letter", "Training calendar", "Onboarding forms", "Activity log sheets", "First 30-day roadmap"],
        },
        {
          name: "UM Digital Toolkit",
          description: "Digital resources accessible via Google Drive / QR Code.",
          features: ["Editable pitch decks", "Recruitment videos", "Coaching videos", "Checklists & sample scripts", "Tracking sheets", "Team reporting templates"],
        },
      ],
    },
    {
      heading: "III. Productivity & Leadership Assets",
      tag: "Tools to lead effectively",
      items: [
        {
          name: "UM Leadership Planner (Hardbound)",
          description: "Hardbound planner designed specifically for unit leaders.",
          features: ["Daily activity planning", "Weekly team scoreboard", "1-on-1 coaching pages", "Goal setting & agent notes", "Performance trackers"],
        },
        {
          name: "Weekly UM Dashboard Sheets",
          description: "Printed tear-off sheets for weekly performance reporting.",
          features: ["Recruit pipeline tracking", "New licensees & activations", "Presentations & new cases", "Team performance summary"],
        },
        {
          name: "Team Leader Starter Pack",
          description: "Resources to help UMs build more Team Leaders.",
          features: ["TL scripts", "TL job description", "TL incentives sheet", "TL onboarding checklist"],
        },
      ],
    },
    {
      heading: "IV. Team Building & Leadership Credibility",
      tag: "Build your brand as a leader",
      items: [
        {
          name: "UM Team Banner",
          description: "Small standing banner for recruitment events and team meetings.",
          features: ["UM name displayed", "Team name & motto/slogan", "Branch logo included"],
        },
        {
          name: "UM Welcome Video (Personalized)",
          description: "A short 30-second video announcing their promotion.",
          features: ["Announces promotion", "Showcases achievements", "Used for social media & recruitment"],
        },
        {
          name: "UM Achievement Card",
          description: "A printed card summarizing career highlights and achievements.",
          features: ["Career highlights summary", "Top achievements listed", "Personal motto / story", "Used for self-introduction in orientations"],
        },
      ],
    },
    {
      heading: "V. Incentive Starters & Motivation Drivers",
      tag: "Rewards that drive performance",
      items: [
        {
          name: "\u20B110,000 UM Starter Bonus",
          description: "Starter bonus given in two tranches upon promotion and activation milestones.",
          features: ["\u20B15,000 upon promotion", "\u20B15,000 after 5 active agents within 60 days"],
        },
        {
          name: "Build Your First 5 Reward Coupons",
          description: "5 mini-vouchers (\u20B1200\u2013\u20B1300 each) for motivating new active agents.",
          features: ["5 mini-vouchers per UM", "Give to new active agents", "Creates positive reinforcement culture"],
        },
        {
          name: "Leadership Milestone Cards",
          description: "Progress tracker showing achievement levels with badges, pins, or perks.",
          features: ["5 / 10 / 20 active producers tiers", "5 / 10 recruits licensed tiers", "Earn badges, pins, or perks per level"],
        },
      ],
    },
    {
      heading: "VI. Premium Items",
      tag: "Optional but powerful",
      items: [
        {
          name: "Leather Document Case",
          description: "Premium leather case for carrying applications, proposals, and brochures.",
          features: ["Carries applications & proposals", "Holds business cards", "Fits recruitment brochures"],
        },
        {
          name: "UM Pen Set (Metal Engraved)",
          description: "Symbolic and functional engraved metal pen set.",
          features: ["Metal engraved design", "Great for signing applications", "Professional onboarding tool"],
        },
        {
          name: "Leadership Mug / Tumbler",
          description: "Premium mug or tumbler with motivational quote and UM title.",
          features: ["Motivational quote printed", "UM title displayed", "Premium quality"],
        },
      ],
    },
  ],
}
