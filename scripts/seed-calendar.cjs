/**
 * Generates seed SQL for calendar events from the hardcoded data.
 * Run: node scripts/seed-calendar.js
 * Then copy the output SQL into Supabase Dashboard > SQL Editor.
 */
const { randomUUID } = require("crypto")

// Map hardcoded event slugs to fixed UUIDs so they're deterministic
const uuidMap = {}

function uuidFor(slug) {
  if (!uuidMap[slug]) uuidMap[slug] = randomUUID()
  return uuidMap[slug]
}

// Recurring event base entries (first occurrence + rrule)
const recurringTemplates = [
  {
    slug: "ba",
    title: "Branch Assembly",
    date: "2026-05-02",
    startTime: "09:00",
    endTime: "12:00",
    location: "TOLIA Main Office",
    eventType: "meeting",
    recurringPattern: "First Saturday of every month",
    rrule: "FREQ=MONTHLY;BYDAY=1SA",
    organizer: "Branch Manager",
  },
  {
    slug: "gh",
    title: "Green Hour Weekly Training",
    date: "2026-05-04",
    startTime: "10:00",
    endTime: "11:00",
    eventType: "training",
    recurringPattern: "Every Monday",
    rrule: "FREQ=WEEKLY;BYDAY=MO",
  },
]

// One-off events
const oneOffEvents = [
  // May 2026
  {
    slug: "bmm-20",
    title: "Branch Managers Meeting",
    date: "2026-05-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Conference Room A",
    eventType: "meeting",
    description: "Monthly branch performance review and target setting.",
    organizer: "Branch Manager",
  },
  {
    slug: "orient-18",
    title: "New Agent Orientation",
    date: "2026-05-18",
    startTime: "14:00",
    endTime: "16:00",
    location: "TOLIA Training Room",
    eventType: "training",
    description:
      "Mandatory orientation for all new agents. Bring government IDs and contract documents.",
    organizer: "HR Department",
  },
  {
    slug: "policy-18",
    title: "Policy Submission Reminder",
    date: "2026-05-18",
    eventType: "deadline",
    allDay: true,
    description:
      "All pending policy submissions must be encoded by end of day.",
  },
  {
    slug: "coach-19",
    title: "One-on-One Coaching Session",
    date: "2026-05-19",
    startTime: "09:00",
    endTime: "10:00",
    location: "Unit Manager's Office",
    eventType: "meeting",
    organizer: "Unit Manager",
  },
  {
    slug: "sm-deadline-19",
    title: "Social Media Content Deadline",
    date: "2026-05-19",
    startTime: "17:00",
    eventType: "deadline",
    description: "Submit May content cards for approval.",
  },
  {
    slug: "compliance-20",
    title: "Compliance Refresher",
    date: "2026-05-20",
    startTime: "09:00",
    endTime: "10:30",
    location: "Conference Room B",
    eventType: "training",
    description: "Annual compliance and code of ethics refresher course.",
  },
  {
    slug: "bday-20",
    title: "May Birthday Celebration",
    date: "2026-05-20",
    startTime: "16:00",
    endTime: "17:00",
    location: "Lounge Area",
    eventType: "social",
    description: "Celebrating May-born team members!",
    organizer: "Social Committee",
  },
  {
    slug: "leadership-21",
    title: "Leadership Workshop",
    date: "2026-05-21",
    startTime: "13:00",
    endTime: "15:00",
    location: "Training Center",
    eventType: "training",
    description:
      "Situational leadership and team motivation techniques.",
    attachments: [
      { name: "Workshop Slides", url: "#", type: "pdf" },
      { name: "Handout", url: "#", type: "pdf" },
    ],
  },
  {
    slug: "byb-22",
    title: "BYB Session",
    date: "2026-05-22",
    startTime: "09:00",
    endTime: "12:00",
    location: "TOLIA Branch Office",
    eventType: "exam",
    description:
      "Build Your Business (BYB) training and assessment session.",
  },
  {
    slug: "lunch-22",
    title: "Team Lunch",
    date: "2026-05-22",
    startTime: "12:00",
    endTime: "13:30",
    location: "Café TOLIA",
    eventType: "social",
  },
  {
    slug: "licensing-25",
    title: "Licensing Exam",
    date: "2026-05-25",
    startTime: "08:00",
    endTime: "12:00",
    location: "Testing Center",
    eventType: "exam",
    description:
      "Pre-licensing examination for new agents. Bring valid ID and notice of admission.",
  },
  {
    slug: "review-25",
    title: "Unit Performance Review",
    date: "2026-05-25",
    startTime: "15:00",
    endTime: "16:30",
    location: "Unit Manager's Office",
    eventType: "meeting",
    organizer: "Unit Manager",
  },
  {
    slug: "claims-27",
    title: "Claims Processing Seminar",
    date: "2026-05-27",
    startTime: "09:00",
    endTime: "11:00",
    location: "Seminar Hall",
    eventType: "training",
    description:
      "Updates on claims processing workflow and documentation.",
  },
  {
    slug: "recruit-28",
    title: "Recruitment Strategy Huddle",
    date: "2026-05-28",
    startTime: "10:00",
    endTime: "11:30",
    eventType: "meeting",
  },
  {
    slug: "mdrt-28",
    title: "MDRT Qualification Check-In",
    date: "2026-05-28",
    startTime: "14:00",
    endTime: "15:00",
    eventType: "meeting",
    description:
      "Track MDRT qualification progress and address gaps.",
  },
  {
    slug: "huddle-29",
    title: "Weekend Kickoff Huddle",
    date: "2026-05-29",
    startTime: "09:00",
    endTime: "10:00",
    location: "Main Office",
    eventType: "meeting",
    description: "End-of-week motivation and target check.",
    organizer: "Branch Manager",
  },
  {
    slug: "pruonline-29",
    title: "PRU Life UK Online Module Due",
    date: "2026-05-29",
    eventType: "deadline",
    allDay: true,
    description:
      "Complete PRU Life UK Module 3: Needs Analysis.",
  },
  {
    slug: "incentive-30",
    title: "Company Incentive Deadline",
    date: "2026-05-30",
    startTime: "17:00",
    eventType: "deadline",
    description:
      "Final day to qualify for the Q2 production incentive.",
  },
  {
    slug: "outreach-30",
    title: "Weekend Outreach Program",
    date: "2026-05-30",
    startTime: "08:00",
    endTime: "12:00",
    location: "Community Center",
    eventType: "social",
    description:
      "Community outreach and financial literacy seminar for barangay residents.",
    organizer: "Social Committee",
  },
  // June 2026
  {
    slug: "bmm-03",
    title: "Branch Managers Meeting",
    date: "2026-06-03",
    startTime: "14:00",
    endTime: "16:00",
    eventType: "meeting",
    organizer: "Branch Manager",
  },
  {
    slug: "pruprime-01",
    title: "Product Training - PruLink Prime",
    date: "2026-06-01",
    startTime: "10:00",
    endTime: "12:00",
    eventType: "training",
    description:
      "In-depth product training on the new PruLink Prime investment-linked plan.",
    attachments: [
      { name: "PruLink Prime Brochure", url: "#", type: "pdf" },
      { name: "Product Illustrations", url: "#", type: "doc" },
    ],
  },
  {
    slug: "ethics-03",
    title: "Insurance Code of Ethics",
    date: "2026-06-03",
    startTime: "09:00",
    endTime: "11:00",
    location: "Training Room A",
    eventType: "training",
  },
  {
    slug: "recruit-week",
    title: "Recruitment Week Campaign",
    date: "2026-06-01",
    endDate: "2026-06-05",
    eventType: "social",
    allDay: true,
    description:
      "Branch-wide recruitment drive. All agents encouraged to invite prospects. Prizes for top referrer.",
    organizer: "Branch Manager",
  },
  {
    slug: "teambuild-05",
    title: "Team Building Activity",
    date: "2026-06-05",
    startTime: "08:00",
    endTime: "17:00",
    location: "Venue TBA",
    eventType: "social",
    description: "Annual team building and bonding activity.",
  },
  {
    slug: "byb-05",
    title: "BYB Session",
    date: "2026-06-05",
    startTime: "09:00",
    endTime: "12:00",
    location: "TOLIA Branch Office",
    eventType: "exam",
  },
  {
    slug: "leaders-08",
    title: "Unit Leaders Meeting",
    date: "2026-06-08",
    startTime: "13:00",
    endTime: "14:30",
    eventType: "meeting",
    organizer: "Unit Manager",
  },
  {
    slug: "qreport-08",
    title: "Quarterly Report Deadline",
    date: "2026-06-08",
    startTime: "17:00",
    eventType: "deadline",
    description: "Submit Q2 performance reports to the branch office.",
  },
  {
    slug: "midyear-plan",
    title: "Mid-Year Planning Workshop",
    date: "2026-06-08",
    endDate: "2026-06-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "Conference Center",
    eventType: "meeting",
    description:
      "Three-day strategic planning workshop for all unit managers and branch leaders. Hotel accommodation provided.",
    organizer: "Branch Manager",
    attachments: [
      { name: "Planning Agenda", url: "#", type: "pdf" },
      { name: "Hotel Info", url: "#", type: "link" },
    ],
  },
  {
    slug: "prospect-11",
    title: "Prospecting Workshop",
    date: "2026-06-11",
    startTime: "09:00",
    endTime: "11:00",
    location: "Training Center",
    eventType: "training",
    description:
      "Effective prospecting techniques and lead generation strategies.",
  },
  {
    slug: "bootcamp-12",
    title: "Recruiting Bootcamp",
    date: "2026-06-12",
    startTime: "09:00",
    endTime: "12:00",
    location: "Seminar Hall",
    eventType: "training",
    description:
      "Intensive recruiting skills bootcamp. Role-playing and objection handling.",
    attachments: [{ name: "Bootcamp Workbook", url: "#", type: "pdf" }],
  },
  {
    slug: "social-plan-12",
    title: "Social Committee Planning",
    date: "2026-06-12",
    startTime: "14:00",
    endTime: "15:00",
    eventType: "meeting",
  },
  {
    slug: "mdrt-deadline-15",
    title: "MDRT Application Deadline",
    date: "2026-06-15",
    eventType: "deadline",
    allDay: true,
    description:
      "Final submission of MDRT qualification documents.",
  },
  {
    slug: "underwriting-17",
    title: "Underwriting Updates",
    date: "2026-06-17",
    startTime: "10:00",
    endTime: "11:30",
    location: "Conference Room",
    eventType: "training",
    description:
      "Latest underwriting guidelines and frequently asked cases.",
    attachments: [
      { name: "Underwriting Guide v3", url: "#", type: "pdf" },
    ],
  },
  {
    slug: "salepush-19",
    title: "Month-End Sales Push",
    date: "2026-06-19",
    startTime: "08:00",
    endTime: "17:00",
    location: "All Branches",
    eventType: "social",
    description:
      "Final sales push day. Extended office hours, free dinner for top performers.",
  },
  {
    slug: "license2-19",
    title: "Licensing Exam (Batch 2)",
    date: "2026-06-19",
    startTime: "13:00",
    endTime: "16:00",
    location: "Testing Center",
    eventType: "exam",
  },
  {
    slug: "awards-19",
    title: "Agent Recognition Awards",
    date: "2026-06-19",
    startTime: "17:30",
    endTime: "19:00",
    location: "Grand Ballroom",
    eventType: "social",
    description:
      "Quarterly awards ceremony recognizing top-performing agents.",
    organizer: "Branch Manager",
  },
  {
    slug: "conversion-22",
    title: "Policy Conversion Workshop",
    date: "2026-06-22",
    startTime: "14:00",
    endTime: "16:00",
    location: "Training Room B",
    eventType: "training",
    attachments: [
      { name: "Conversion Checklist", url: "#", type: "pdf" },
      { name: "Sample Scenarios", url: "#", type: "doc" },
    ],
  },
  {
    slug: "convention",
    title: "TOLIA Agency Convention",
    date: "2026-06-25",
    endDate: "2026-06-27",
    eventType: "social",
    allDay: true,
    location: "Batangas Convention Center",
    description:
      "Annual agency convention. All agents required to attend. Bus transportation provided from branch office.",
    organizer: "Branch Manager",
    attachments: [
      { name: "Convention Program", url: "#", type: "pdf" },
      { name: "Hotel Room Assignment", url: "#", type: "doc" },
      { name: "Transportation Schedule", url: "#", type: "link" },
    ],
  },
  {
    slug: "finlit-26",
    title: "Financial Literacy Seminar",
    date: "2026-06-26",
    startTime: "09:00",
    endTime: "11:00",
    location: "Seminar Hall",
    eventType: "training",
  },
  {
    slug: "happyhour-26",
    title: "Team Happy Hour",
    date: "2026-06-26",
    startTime: "16:00",
    endTime: "18:00",
    location: "Rooftop Lounge",
    eventType: "social",
  },
  {
    slug: "eom-29",
    title: "End-of-Month Performance Review",
    date: "2026-06-29",
    startTime: "15:00",
    endTime: "17:00",
    eventType: "meeting",
    description:
      "Month-end review of individual and unit performance targets.",
    organizer: "Unit Manager",
  },
  {
    slug: "enroll-30",
    title: "Enrollment Deadline - FYI",
    date: "2026-06-30",
    startTime: "17:00",
    eventType: "deadline",
    description:
      "Final day to enroll clients under the FYI (First Year Incentive) program.",
  },
  {
    slug: "goals-30",
    title: "Mid-Year Goal Setting",
    date: "2026-06-30",
    startTime: "09:00",
    endTime: "11:00",
    location: "Conference Room A",
    eventType: "meeting",
    description:
      "Set H2 goals and action plans with your unit manager.",
    organizer: "Unit Manager",
  },
  // July 2026
  {
    slug: "product-bootcamp",
    title: "Product Knowledge Bootcamp",
    date: "2026-07-06",
    endDate: "2026-07-08",
    startTime: "09:00",
    endTime: "17:00",
    location: "Training Center",
    eventType: "training",
    description:
      "Three-day intensive product training covering all Pru Life UK products. Certification required for all agents.",
    organizer: "Training Department",
    attachments: [
      { name: "Bootcamp Schedule", url: "#", type: "pdf" },
      { name: "Pre-Reading Materials", url: "#", type: "pdf" },
    ],
  },
]

function sqlQuote(val) {
  if (val === undefined || val === null) return "NULL"
  return "'" + String(val).replace(/'/g, "''") + "'"
}

function sqlBool(val) {
  return val ? "true" : "false"
}

function generateSQL() {
  const lines = [
    "-- Calendar Events Seed Data",
    "-- Generated on " + new Date().toISOString(),
    "-- Run this in Supabase Dashboard > SQL Editor",
    "",
    "BEGIN;",
    "",
    "-- Clear existing data (safe to re-run)",
    "DELETE FROM public.event_attachments;",
    "DELETE FROM public.recurring_event_exceptions;",
    "DELETE FROM public.calendar_events;",
    "",
    "-- Insert recurring event templates",
  ]

  // Recurring templates
  for (const evt of recurringTemplates) {
    const id = uuidFor(evt.slug)
    lines.push(
      `INSERT INTO public.calendar_events (id, title, description, date, end_date, start_time, end_time, all_day, location, location_url, event_type, status, organizer, is_recurring, recurring_pattern, rrule, registration_url, href)`
    )
    lines.push(`VALUES (${sqlQuote(id)}, ${sqlQuote(evt.title)}, ${sqlQuote(evt.description || null)}, ${sqlQuote(evt.date)}, NULL, ${sqlQuote(evt.startTime || null)}, ${sqlQuote(evt.endTime || null)}, false, ${sqlQuote(evt.location || null)}, NULL, ${sqlQuote(evt.eventType)}, 'published', ${sqlQuote(evt.organizer || null)}, true, ${sqlQuote(evt.recurringPattern || null)}, ${sqlQuote(evt.rrule || null)}, NULL, NULL);`)
  }

  lines.push("")
  lines.push("-- Insert one-off events")

  // One-off events
  for (const evt of oneOffEvents) {
    const id = uuidFor(evt.slug)
    lines.push(
      `INSERT INTO public.calendar_events (id, title, description, date, end_date, start_time, end_time, all_day, location, location_url, event_type, status, organizer, is_recurring, recurring_pattern, rrule, registration_url, href)`
    )
    lines.push(
      `VALUES (${sqlQuote(id)}, ${sqlQuote(evt.title)}, ${sqlQuote(evt.description || null)}, ${sqlQuote(evt.date)}, ${sqlQuote(evt.endDate || null)}, ${sqlQuote(evt.startTime || null)}, ${sqlQuote(evt.endTime || null)}, ${sqlBool(evt.allDay || false)}, ${sqlQuote(evt.location || null)}, NULL, ${sqlQuote(evt.eventType)}, 'published', ${sqlQuote(evt.organizer || null)}, false, NULL, NULL, NULL, NULL);`
    )
  }

  // Attachments
  const allWithAttachments = [
    ...oneOffEvents.filter((e) => e.attachments),
  ]

  if (allWithAttachments.length > 0) {
    lines.push("")
    lines.push("-- Insert event attachments")
    for (const evt of allWithAttachments) {
      const eventId = uuidFor(evt.slug)
      for (const att of evt.attachments) {
        const attId = randomUUID()
        lines.push(
          `INSERT INTO public.event_attachments (id, event_id, name, url, type) VALUES (${sqlQuote(attId)}, ${sqlQuote(eventId)}, ${sqlQuote(att.name)}, ${sqlQuote(att.url)}, ${sqlQuote(att.type)});`
        )
      }
    }
  }

  lines.push("")
  lines.push("COMMIT;")

  return lines.join("\n")
}

// Output to stdout
console.log(generateSQL())
