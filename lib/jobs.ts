// Data-driven job board. Start simple with typed data so the homepage teaser,
// listings, and detail pages all read from one source. Swap for a CMS / DB later
// without changing the components.

export type JobType =
  | "Full Time"
  | "Part Time"
  | "Freelance"
  | "Internship"
  | "Temporary";

export interface Job {
  slug: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  remote: boolean;
  salary?: string;
  postedISO: string; // ISO date
  summary: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  sector: string;
}

// NOTE: placeholder vacancies. Replace with the client's real live roles.
export const jobs: Job[] = [
  {
    slug: "payroll-administrator-london",
    title: "Payroll Administrator",
    company: "Rimaya Client — Professional Services",
    location: "London, UK",
    type: "Full Time",
    remote: false,
    salary: "£28,000 – £34,000",
    postedISO: "2026-07-10",
    sector: "Finance & Accounting",
    summary:
      "Join a busy payroll team processing end-to-end payroll for multiple business clients.",
    description: [
      "We are looking for a detail-driven Payroll Administrator to support our growing payroll bureau.",
      "You will process weekly and monthly payrolls accurately and on time, ensuring full compliance with HMRC requirements.",
    ],
    responsibilities: [
      "Process end-to-end payroll for a portfolio of business clients",
      "Handle starters, leavers, and statutory payments (SSP, SMP, SPP)",
      "Submit RTI to HMRC and reconcile PAYE/NIC",
      "Respond to client and employee payroll queries within SLA",
    ],
    requirements: [
      "1+ years of payroll experience (bureau experience a plus)",
      "Working knowledge of Sage, Xero, or QuickBooks payroll",
      "Strong attention to detail and numeracy",
      "Clear communicator, comfortable with deadlines",
    ],
  },
  {
    slug: "recruitment-consultant-manchester",
    title: "Recruitment Consultant",
    company: "Rimaya",
    location: "Manchester, UK",
    type: "Full Time",
    remote: true,
    salary: "£25,000 base + commission",
    postedISO: "2026-07-08",
    sector: "Recruitment",
    summary:
      "Drive temporary and permanent placements across our fastest-growing client sectors.",
    description: [
      "A 360° recruitment role for someone who loves building relationships and closing placements.",
      "You will manage the full recruitment cycle, from client briefing to candidate offer.",
    ],
    responsibilities: [
      "Source and screen candidates for temporary and permanent roles",
      "Build and manage a portfolio of business clients",
      "Manage the interview and offer process end to end",
      "Keep the candidate database accurate and up to date",
    ],
    requirements: [
      "Sales or recruitment experience preferred (not essential)",
      "Confident communicator and natural relationship builder",
      "Target-driven and resilient",
      "Right to work in the UK",
    ],
  },
  {
    slug: "warehouse-operative-birmingham",
    title: "Warehouse Operative",
    company: "Rimaya Client — Logistics",
    location: "Birmingham, UK",
    type: "Temporary",
    remote: false,
    salary: "£11.90 – £13.50 per hour",
    postedISO: "2026-07-12",
    sector: "Logistics & Warehousing",
    summary:
      "Immediate temporary vacancies for reliable warehouse operatives with weekly pay.",
    description: [
      "We have ongoing temporary opportunities for warehouse operatives at a busy distribution centre.",
      "Weekly pay, flexible shifts, and the potential for a permanent contract for strong performers.",
    ],
    responsibilities: [
      "Pick, pack, and dispatch orders accurately",
      "Load and unload deliveries safely",
      "Keep the working area clean and organised",
      "Meet daily productivity targets",
    ],
    requirements: [
      "Ability to work on your feet for a full shift",
      "Reliable and punctual",
      "Previous warehouse experience helpful but not required",
      "Right to work in the UK",
    ],
  },
  {
    slug: "hr-advisor-remote",
    title: "HR Advisor",
    company: "Rimaya Client — Technology",
    location: "Remote (UK)",
    type: "Full Time",
    remote: true,
    salary: "£35,000 – £42,000",
    postedISO: "2026-07-05",
    sector: "Human Resources",
    summary:
      "Support a scaling tech business with practical, people-first HR advice.",
    description: [
      "A generalist HR role for a fast-moving technology company.",
      "You will be the first point of contact for managers on everything people-related.",
    ],
    responsibilities: [
      "Advise managers on employee relations and policy",
      "Support recruitment, onboarding, and performance reviews",
      "Maintain accurate HR records and compliance",
      "Help roll out people initiatives across the business",
    ],
    requirements: [
      "CIPD Level 5 or equivalent experience",
      "Solid grasp of UK employment law basics",
      "Approachable, discreet, and organised",
      "Comfortable working remotely",
    ],
  },
  {
    slug: "management-accountant-leeds",
    title: "Management Accountant",
    company: "Rimaya Client — Manufacturing",
    location: "Leeds, UK",
    type: "Full Time",
    remote: false,
    salary: "£45,000 – £52,000",
    postedISO: "2026-07-14",
    sector: "Finance & Accounting",
    summary:
      "Own the monthly management accounts for a growing manufacturing group.",
    description: [
      "A hands-on management accounting role with genuine influence over how the business reads its numbers.",
      "You will own the month-end cycle and partner with operations to explain what the figures actually mean.",
    ],
    responsibilities: [
      "Prepare monthly management accounts and variance analysis",
      "Own budgeting and rolling forecasts with department heads",
      "Report on stock, margin, and production costs",
      "Support the year-end audit process",
    ],
    requirements: [
      "ACCA / CIMA qualified or finalist",
      "Management accounts experience in industry",
      "Strong Excel and ERP familiarity",
      "Confident presenting numbers to non-finance colleagues",
    ],
  },
  {
    slug: "care-assistant-bristol",
    title: "Care Assistant",
    company: "Rimaya Client — Healthcare",
    location: "Bristol, UK",
    type: "Part Time",
    remote: false,
    salary: "£12.60 – £14.20 per hour",
    postedISO: "2026-07-13",
    sector: "Health & Social Care",
    summary:
      "Flexible part-time care shifts with weekly pay and full training provided.",
    description: [
      "We are recruiting compassionate care assistants for residential settings across Bristol.",
      "Shifts are flexible around your commitments, and full training is provided from day one.",
    ],
    responsibilities: [
      "Support residents with daily living and personal care",
      "Encourage independence, dignity, and wellbeing",
      "Keep accurate care records for each shift",
      "Work alongside nurses and senior carers",
    ],
    requirements: [
      "A genuinely caring, patient manner",
      "Enhanced DBS (or willingness to obtain one)",
      "Experience welcome but not essential — we train",
      "Right to work in the UK",
    ],
  },
  {
    slug: "customer-service-advisor-glasgow",
    title: "Customer Service Advisor",
    company: "Rimaya Client — Retail",
    location: "Glasgow, UK",
    type: "Full Time",
    remote: true,
    salary: "£24,000 – £27,000",
    postedISO: "2026-07-11",
    sector: "Customer Service",
    summary:
      "Hybrid customer service role for a well-known retail brand with clear progression.",
    description: [
      "Be the voice of a retail brand customers genuinely like dealing with.",
      "A hybrid role — two days in the Glasgow office, three from home — with a structured path into team leadership.",
    ],
    responsibilities: [
      "Resolve customer queries across phone, email, and chat",
      "Own each case through to a real resolution",
      "Log interactions accurately in the CRM",
      "Spot recurring issues and feed them back to the business",
    ],
    requirements: [
      "Customer-facing experience in any sector",
      "Calm, clear, and genuinely helpful under pressure",
      "Comfortable with CRM systems",
      "Reliable home internet for hybrid days",
    ],
  },
  {
    slug: "site-supervisor-manchester",
    title: "Site Supervisor",
    company: "Rimaya Client — Construction",
    location: "Manchester, UK",
    type: "Full Time",
    remote: false,
    salary: "£38,000 – £44,000",
    postedISO: "2026-07-09",
    sector: "Construction & Trades",
    summary:
      "Lead site teams on commercial fit-out projects across the North West.",
    description: [
      "A supervisory role for someone who runs a safe, tidy, on-programme site.",
      "You will lead trades teams on commercial fit-out projects and be the client's day-to-day point of contact on site.",
    ],
    responsibilities: [
      "Supervise subcontractors and site operatives daily",
      "Enforce health and safety standards without compromise",
      "Track progress against programme and report delays early",
      "Conduct site inductions and toolbox talks",
    ],
    requirements: [
      "SMSTS or SSSTS certification",
      "CSCS card and First Aid at Work",
      "Commercial fit-out or construction supervisory experience",
      "Full UK driving licence",
    ],
  },
  {
    slug: "marketing-executive-london",
    title: "Marketing Executive",
    company: "Rimaya Client — Professional Services",
    location: "London, UK",
    type: "Full Time",
    remote: true,
    salary: "£30,000 – £36,000",
    postedISO: "2026-07-06",
    sector: "Marketing",
    summary:
      "Own campaigns end to end for a growing professional services firm.",
    description: [
      "A broad marketing role with real ownership — you will not be one cog in a large team.",
      "You will run campaigns from idea to reporting, across content, email, and social.",
    ],
    responsibilities: [
      "Plan and deliver multi-channel marketing campaigns",
      "Write content for the website, email, and LinkedIn",
      "Report on performance and act on what the data says",
      "Work with external designers and agencies",
    ],
    requirements: [
      "2+ years in a marketing role",
      "Strong writing and a good eye for detail",
      "Hands-on with analytics and email platforms",
      "Self-starter who can run with a brief",
    ],
  },
];

export const jobTypes: JobType[] = [
  "Full Time",
  "Part Time",
  "Freelance",
  "Internship",
  "Temporary",
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function formatPosted(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
