export type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

// NOTE: placeholder testimonials, shown until the live Trustpilot TrustBox is
// switched on (set businessUnitId + templateId in lib/site.ts). Replace these
// with the client's real, approved reviews before launch. One shared list drives
// the homepage carousel and the About page.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Rimaya took our payroll off our plate completely. Everything runs on time, HMRC is always happy, and their team actually answers the phone.",
    name: "Operations Director",
    company: "Professional services firm",
  },
  {
    quote:
      "We needed temporary staff at short notice and they delivered vetted people within days. The quality of candidates has been consistently strong.",
    name: "Site Manager",
    company: "Logistics company",
  },
  {
    quote:
      "Straightforward, responsive, and genuinely helpful. It feels like having a finance partner rather than just another supplier.",
    name: "Founder",
    company: "Growing SME",
  },
  {
    quote:
      "Payroll used to swallow a full day of my week. Now it's handled, the payslips are right first time, and I've got that day back.",
    name: "Finance Manager",
    company: "Manufacturing business",
  },
  {
    quote:
      "Auto-enrolment, RTI, the lot — they keep us compliant without me having to chase deadlines. That peace of mind is worth every penny.",
    name: "HR Lead",
    company: "Care provider",
  },
  {
    quote:
      "They filled two roles we'd struggled with for months. The shortlist was tight, relevant, and every candidate had actually been vetted.",
    name: "Managing Director",
    company: "Construction firm",
  },
  {
    quote:
      "Switching to Rimaya was painless. They handled the migration, sorted the historic corrections, and nothing slipped through the cracks.",
    name: "Payroll Coordinator",
    company: "Hospitality group",
  },
  {
    quote:
      "As a small business owner I don't have a back office. Rimaya is it — payroll, advice, a real person to call. I honestly couldn't run without them.",
    name: "Owner",
    company: "Independent retailer",
  },
  {
    quote:
      "We scaled from 12 to 40 people in a year and they scaled with us — hiring support one month, pension setup the next. No friction, no fuss.",
    name: "Head of People",
    company: "Technology start-up",
  },
  {
    quote:
      "Their consulting cut through a compliance mess we'd been putting off for ages. Clear advice, no jargon, and a plan we could actually follow.",
    name: "Director",
    company: "Facilities company",
  },
  {
    quote:
      "Weekly payroll for a big shift-based team is a nightmare and they make it look easy. Accurate every week, and quick to fix the odd query.",
    name: "General Manager",
    company: "Restaurant group",
  },
  {
    quote:
      "What I value most is the honesty. They told us where we didn't need to spend, which is not what you expect from a supplier. Earned our trust fast.",
    name: "Chief Executive",
    company: "Consultancy",
  },
  {
    quote:
      "Reliable, professional, and quick to respond. In three years we've never had a late payroll or an unanswered call. That consistency is rare.",
    name: "Operations Lead",
    company: "Healthcare staffing",
  },
];
