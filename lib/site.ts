// Central site configuration. Placeholder contact details are marked TODO —
// swap for the client's real values before launch.

export const site = {
  name: "Rimaya",
  descriptor: "Payroll · Recruitment · Consulting",
  url: "https://rimaya.co.uk", // TODO: confirm final domain
  email: "info@rimaya.co.uk",
  // Mobile — also the WhatsApp line.
  phone: "+44 7448 111418",
  phoneHref: "tel:+447448111418",
  // Landline for the Romford office.
  officePhone: "020 3490 6598",
  officePhoneHref: "tel:+442034906598",
  whatsapp: "447448111418",
  responsePromise: "We reply within 12 hours",
  address: {
    label: "Corporate Office",
    line1: "Rimaya Ltd, 22 Westfield Garden",
    line2: "Romford, RM6 4BY, UK",
  },
  credentials: {
    established: "2022",
    vat: "VAT registered",
    sponsor: "A-rated sponsor licence",
    companyNo: "Company No. 00000000", // TODO: real registration number
    rating: "4.4",
  },
  socials: {
    linkedin: "https://www.linkedin.com/", // TODO
    instagram: "https://www.instagram.com/", // TODO
  },
} as const;

export type NavChild = { label: string; href: string; blurb: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const services: NavChild[] = [
  {
    label: "Payroll Solutions",
    href: "/payroll",
    blurb: "Accurate, compliant payroll run for you — every time.",
  },
  {
    label: "Recruitment",
    href: "/recruitment",
    blurb: "The right people, placed fast — temporary or permanent.",
  },
  {
    label: "Consulting",
    href: "/consulting",
    blurb: "Expert guidance when the decision matters.",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/#services", children: services },
  { label: "Jobs", href: "/jobs" },
];

export const secondaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
