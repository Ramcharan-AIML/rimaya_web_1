import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  FileCheck2,
  PiggyBank,
  Clock4,
  BarChart3,
  Users,
  BookOpen,
  Receipt,
  Building2,
  FileText,
  Landmark,
  CircleDollarSign,
  CheckCircle2,
  ArrowLeftRight,
  MonitorSmartphone,
  CalendarCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CardBrackets from "@/components/ui/CardBrackets";
import ChevronLink from "@/components/ui/ChevronLink";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import FeatureCards from "@/components/sections/FeatureCards";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Payroll Solutions",
  description:
    "Accurate, compliant B2B payroll run for you — processing, RTI, pensions, reporting, and payroll for temporary and contract workers. Get a payroll quote from Rimaya.",
};

const coreFeatures = [
  {
    icon: Calculator,
    title: "End-to-end payroll processing",
    body: "Weekly, fortnightly, or monthly payroll run accurately and on time — starters, leavers, and everything in between.",
  },
  {
    icon: FileCheck2,
    title: "HMRC compliance & RTI",
    body: "Real Time Information submitted correctly, PAYE and NIC reconciled, and full compliance kept up to date.",
  },
  {
    icon: PiggyBank,
    title: "Pensions & auto-enrolment",
    body: "Workplace pension contributions calculated, filed, and managed — so you meet your duties without the headache.",
  },
  {
    icon: Users,
    title: "Temporary & contract payroll",
    body: "Confident handling of variable hours, agency, and contract workers — ideal alongside our recruitment service.",
  },
  {
    icon: Clock4,
    title: "Statutory payments",
    body: "SSP, SMP, SPP, and other statutory payments calculated and applied correctly, every cycle.",
  },
  {
    icon: BarChart3,
    title: "Clear management reporting",
    body: "Payslips, P60s, and clear reports that give you and your accountant a clean, accurate picture.",
  },
];

const beyondPayroll = [
  { icon: BookOpen, title: "Bookkeeping", body: "Day-to-day books kept tidy and accurate." },
  { icon: FileText, title: "Statutory accounts", body: "Year-end accounts prepared and filed." },
  { icon: Receipt, title: "VAT returns", body: "VAT calculated and submitted on time." },
  { icon: BarChart3, title: "Management reporting", body: "Numbers that help you decide, not just record." },
  { icon: CircleDollarSign, title: "AP / AR", body: "Accounts payable and receivable kept under control." },
  { icon: Building2, title: "Company incorporation", body: "Set up correctly from day one." },
  { icon: Landmark, title: "Corporation tax", body: "Calculated, filed, and planned for." },
  { icon: FileCheck2, title: "Self-assessment", body: "Personal tax returns handled properly." },
];

const systems = ["Xero", "Sage", "QuickBooks", "FreeAgent", "Microsoft Dynamics 365"];

// Each of these restates a promise made elsewhere on the site (the four steps in
// "How it works", and "you don't buy software" on the homepage) — kept in the
// same words so the story doesn't drift between pages.
const systemPromises = [
  {
    icon: ArrowLeftRight,
    title: "Switching is on us",
    body: "Moving from another provider? We handle the migration end to end.",
  },
  {
    icon: MonitorSmartphone,
    title: "No new software",
    body: "You don't buy a platform and work the rest out yourself. We use what you have.",
  },
  {
    icon: CalendarCheck,
    title: "We fit your cycle",
    body: "Your pay dates, your reporting, your notice periods — not a fixed template.",
  },
];

export default function PayrollPage() {
  return (
    <>
      <PageHero
        breadcrumb="Payroll Solutions"
        eyebrow="Flagship service"
        title="Payroll, handled properly — every single time."
        intro="Getting payroll wrong is stressful and risky. Rimaya takes it off your plate entirely: accurate, compliant, and on time, so your people are paid right and HMRC stays happy."
        primary={{ label: "Get a Payroll Quote", href: "/contact?intent=payroll" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />

      {/* Promise band */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Why it matters"
                title="One dependable partner, instead of scattered spreadsheets."
                intro="Payroll is our key business — not an afterthought. We run it as a full B2B payroll bureau, which means we can take on the whole process for your company and give you back the time and peace of mind."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Payroll run on time, every cycle — no missed deadlines",
                  "Full HMRC compliance, handled for you",
                  "A real person who answers your questions quickly",
                  "Clear reporting you and your accountant can trust",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-ink/85">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-hairline card-shadow">
                <Image
                  src="/images/payroll.png"
                  alt="The Rimaya payroll dashboard open on a laptop, showing employee totals, payroll summary, and compliance updates"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureCards
        eyebrow="What's included"
        title="Full-service payroll, end to end."
        intro="Everything needed to run payroll for your business — accurately, compliantly, and without the stress."
        features={coreFeatures}
        tone="surface"
      />

      {/* Beyond payroll — the heading column used to leave a dead right half
          while eight small cards fought for attention below it. Now the copy
          holds one column and the eight capabilities are a single hairline
          matrix in the other: one object, read as a set. */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Payroll & bookkeeping overlap"
                  title="Need more than payroll? We cover the adjacent finance work too."
                  intro="Payroll and bookkeeping go hand in hand. Where it helps, we can support the wider finance function so it all joins up."
                />
                <div aria-hidden className="mt-8 h-px w-full max-w-[12rem] bg-hairline" />
                <p className="mt-8 text-sm leading-relaxed text-muted">
                  Take one, take several, or take the lot — it&apos;s the same
                  team either way.
                </p>
                <ChevronLink href="/contact?intent=payroll" className="mt-5">
                  Ask what we can cover
                </ChevronLink>
              </div>
            </Reveal>

            {/* The 1px background shows through the gaps, so the cells share
                hairlines instead of doubling them up. */}
            <Reveal delay={0.1}>
              <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                {beyondPayroll.map((b) => (
                  <div
                    key={b.title}
                    className="group relative flex items-start gap-3.5 bg-white p-6 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-surface-blue/60"
                  >
                    <CardBrackets size="sm" />
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-surface-blue text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{b.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Systems — was a bare row of name chips on a thin strip, which read as
          filler. It carries a real objection ("do I have to move systems?"), so
          it now gets a full navy band, the answer stated plainly, and the
          white chips pop off the dark. */}
      <section className="relative isolate overflow-hidden bg-brand-band py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(0,150,255,0.18),transparent_65%)]"
        />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow onDark>Your systems, not ours</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              We work with the systems you already know.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              You don&apos;t buy new software and you don&apos;t retrain your
              team. We fit around the tools already in your business.
            </p>
          </Reveal>

          <Stagger className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {systems.map((s) => (
              <StaggerItem key={s}>
                <span className="group relative inline-flex items-center gap-2.5 border border-white/20 bg-white px-6 py-4 text-sm font-semibold text-brand transition-colors duration-300 hover:bg-surface-blue">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                  {s}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {systemPromises.map(({ icon: Icon, title, body }) => (
              <StaggerItem
                as="li"
                key={title}
                className="group relative border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
              >
                <CardBrackets size="sm" onDark />
                <span className="inline-flex h-10 w-10 items-center justify-center bg-white/10 text-white ring-1 ring-white/20">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mt-10 text-center text-sm text-white/60">
              Using something else?{" "}
              <Link
                href="/contact?intent=payroll"
                className="font-semibold text-white underline underline-offset-4 hover:text-white/80"
              >
                Tell us what you run
              </Link>{" "}
              — we&apos;ll tell you straight if we can work with it.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Payroll, sorted"
        title="Get a payroll quote today."
        intro="Tell us about your business and how many people you pay. We'll come back within 12 hours with a clear, no-obligation quote."
        primaryLabel="Get a Payroll Quote"
        primaryHref="/contact?intent=payroll"
        secondaryLabel="See our other services"
        secondaryHref="/#services"
      />
    </>
  );
}
