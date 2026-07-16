// Homepage FAQ. Shared between the accordion UI and the FAQPage JSON-LD on the
// homepage, so the rendered answers and the structured data can never drift
// apart — Google penalises schema that doesn't match visible content.
//
// NOTE: answers are drafted from the build brief. Have the client confirm the
// pricing, notice-period, and sponsor-licence claims before launch.

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "What exactly does Rimaya do?",
    a: "Three things: we run your payroll for you, we find and place staff (temporary or permanent), and we advise you on the decisions in between. Most clients start with payroll and grow into the rest.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on headcount, pay frequency, and how much you want us to handle. There's no standard list price because there's no standard business — tell us your setup and we'll send a clear, itemised quote with no obligation.",
  },
  {
    q: "How quickly will I hear back?",
    a: "Within 12 hours on any working day, and usually much sooner. A named person reads your enquiry and replies — you're not joining a ticket queue.",
  },
  {
    q: "We already have a payroll provider. Is switching painful?",
    a: "No — switching is the part we do most often. We handle the data migration, liaise with your outgoing provider, and time the move around your pay dates so no one misses a payslip.",
  },
  {
    q: "Are you compliant with HMRC and pension rules?",
    a: "Yes. RTI submissions, auto-enrolment, and statutory pay are all handled as standard, and we're VAT registered and UK incorporated. Compliance isn't an add-on — it's the baseline.",
  },
  {
    q: "Can you sponsor Skilled Worker visas?",
    a: "We hold an A-rated sponsor licence, which means we can support eligible Skilled Worker routes. Talk to us about your specific role and we'll tell you honestly whether it qualifies.",
  },
  {
    q: "I'm looking for a job, not hiring. Can you help?",
    a: "Absolutely. Browse our live vacancies and apply online with your CV in a couple of minutes. Even if nothing fits today, we'll keep you on file and get in touch when something does.",
  },
  {
    q: "Am I tied into a long contract?",
    a: "No. We work on flexible terms and expect to keep your business by doing the job well, not by locking you in.",
  },
];
