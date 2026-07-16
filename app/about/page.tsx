import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarCheck,
  BadgeCheck,
  ShieldCheck,
  Hash,
  Handshake,
  HeartHandshake,
  Award,
  Scale,
  Rocket,
  Quote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rimaya is a UK firm delivering payroll, recruitment, and consulting. Established 2022, VAT registered, with an A-rated sponsor licence. Meet the team behind the service.",
};

/**
 * The trust page. Nobody arrives here for entertainment — they arrive to decide
 * whether we're real and whether we're any good. So it leads with verifiable
 * facts (a navy proof band directly under the hero), then earns the claim with
 * the story, then closes on a CTA rather than trailing off.
 */

const proof = [
  { value: site.credentials.established, label: "Trading since" },
  { value: "12h", label: "Response promise" },
  { value: `${site.credentials.rating}★`, label: "Client rating" },
  { value: "A-rated", label: "Sponsor licence" },
];

const credentials = [
  {
    icon: CalendarCheck,
    title: `Established ${site.credentials.established}`,
    body: "A UK-registered company, built to be a dependable long-term partner.",
  },
  {
    icon: BadgeCheck,
    title: site.credentials.vat,
    body: "Fully VAT registered and compliant in how we operate.",
  },
  {
    icon: ShieldCheck,
    title: "A-rated sponsor licence",
    body: "We can sponsor Skilled Worker visas — a genuine advantage for employers.",
  },
  {
    icon: Hash,
    title: site.credentials.companyNo,
    body: "A registered, accountable business you can verify.",
  },
];

const values = [
  {
    icon: Handshake,
    title: "Collaboration",
    body: "We work with you, not just for you — as an extension of your team.",
  },
  {
    icon: HeartHandshake,
    title: "Customer obsession",
    body: "Your outcome comes first. We measure ourselves by how well we serve you.",
  },
  {
    icon: Award,
    title: "Quality",
    body: "Accurate, careful work — because in payroll and hiring, details matter.",
  },
  {
    icon: Scale,
    title: "Ethics",
    body: "Honest advice and fair dealing, every time. No fine print games.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurial spirit",
    body: "We move quickly, think practically, and help ambitious businesses grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About Rimaya"
        title="A dependable partner for payroll, people, and advice."
        intro="Rimaya was built on a simple idea: growing businesses deserve a partner who handles the essential, behind-the-scenes work accurately and without fuss — so they can get on with what they do best."
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "See our services", href: "/#services" }}
      />

      {/* Proof band — facts before claims. */}
      <section className="bg-brand-band py-14 text-white sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {proof.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.06}>
                <div className="border-l border-white/20 pl-5">
                  <p className="text-4xl font-semibold sm:text-5xl">{p.value}</p>
                  <p className="mt-2 text-sm text-white/70">{p.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Our story"
                title="Started in 2022, focused on doing the essentials brilliantly."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/85">
                <p>
                  Rimaya began with payroll — the kind of work that has to be right
                  every single time. From there, we grew naturally into
                  recruitment and consulting, because the businesses we served
                  needed people and advice they could trust just as much as
                  accurate payslips.
                </p>
                <p>
                  Today we help UK businesses run leaner and hire smarter, while
                  connecting candidates with roles that fit. We&apos;re proud to be
                  a real, registered company with real credentials — and a team
                  that actually picks up the phone.
                </p>
              </div>

              {/* The belief the whole business runs on, stated plainly. */}
              <blockquote className="mt-8 border-l-2 border-action bg-surface p-6">
                <Quote className="h-5 w-5 text-brand" aria-hidden />
                <p className="mt-3 text-base font-medium leading-relaxed text-ink">
                  Get payroll wrong and nothing else matters. Get it right, every
                  time, and you earn the right to help with everything else.
                </p>
                <footer className="mt-3 text-sm text-muted">
                  How we&apos;ve worked since day one
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="relative aspect-[3/2] w-full overflow-hidden border border-hairline card-shadow">
                  <Image
                    src="/images/about_team.png"
                    alt="The Rimaya team working together around a desk in their office"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Anchored tag — reads as a caption on the photo, not a stray card. */}
                <div className="absolute -bottom-5 left-5 border border-hairline bg-brand px-5 py-4 text-white card-shadow sm:left-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                    Flagship service
                  </p>
                  <p className="mt-1 text-lg font-semibold">Payroll, done right</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section className="border-y border-hairline bg-soft-blue py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Credentials"
            title="Real proof you can rely on."
            intro="These aren't badges for show — they're the reason businesses trust us with something as important as payroll."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c, i) => (
              <Reveal as="article" key={c.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-white p-7 transition-shadow duration-200 hover:card-shadow-hover">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-brand text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Sticky framing — the list scrolls against a fixed statement. */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Our values</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                  What guides how we work.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  Five words that sound like everyone else&apos;s until you watch
                  how a company behaves on a bad day. These are the ones we hold
                  to when it costs us something.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="border-t border-hairline">
                {values.map((v, i) => (
                  <li
                    key={v.title}
                    className="group flex items-start gap-5 border-b border-hairline py-6 transition-colors hover:bg-surface"
                  >
                    <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center bg-surface-blue text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-semibold text-ink">
                          {v.title}
                        </h3>
                        <span className="text-xs font-semibold tabular-nums text-muted/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {v.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Let's work together"
        title="Ready to make the essentials effortless?"
        intro="Whether it's payroll, people, or advice — we'd love to help. Get in touch and see how straightforward it can be."
        primaryLabel="Get in touch"
        primaryHref="/contact"
        secondaryLabel="Browse jobs"
        secondaryHref="/jobs"
      />
    </>
  );
}
