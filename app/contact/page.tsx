import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ShieldCheck,
  Building2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/sections/PageHero";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rimaya for payroll, recruitment, or consulting. Real UK office, direct phone, WhatsApp, and email — a named person replies within 12 hours.",
};

/**
 * The page most visitors judge us on, and the last step before a lead exists.
 * Three deliberate moves:
 *
 * 1. Channels first. Someone ready to talk should never have to scroll past a
 *    form to find the phone number — the form is for people who want to think.
 * 2. The form asks quote-shaped questions, so an enquiry arrives priceable.
 * 3. "What happens next" + credentials answer the two silent objections
 *    ("will anyone actually reply?", "are these people real?") right beside the
 *    submit button, where the hesitation happens.
 */

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Rimaya, I'd like to talk about your services.",
  )}`;

  const channels = [
    {
      icon: Phone,
      label: "Call us",
      value: site.phone,
      href: site.phoneHref,
      note: "Straight through to a person, not a menu.",
      cta: "Call now",
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us",
      href: whatsappHref,
      note: "The fastest way to get a quick answer.",
      cta: "Open WhatsApp",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: site.responsePromise + ", usually sooner.",
      cta: "Send an email",
      external: false,
    },
  ];

  const steps = [
    {
      title: "You send it",
      body: "One short form. Nothing you send is passed on, sold, or used for a mailing list.",
    },
    {
      title: "A person reads it",
      body: `A named member of the team picks it up — ${site.responsePromise.toLowerCase()}, on any working day.`,
    },
    {
      title: "You get a straight answer",
      body: "A clear, itemised quote or an honest “we're not the right fit”. No pressure either way.",
    },
  ];

  const credentials = [
    { icon: CalendarCheck, label: `Established ${site.credentials.established}` },
    { icon: BadgeCheck, label: site.credentials.vat },
    { icon: ShieldCheck, label: site.credentials.sponsor },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact"
        title="Let's talk."
        intro="Tell us what you need — payroll, people, or advice — and we'll come straight back to you with a real answer. No jargon, no pressure, no sales calls."
      />

      {/* Channels — for anyone already decided. */}
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href, note, cta, external }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-white p-7 transition-shadow duration-200 hover:card-shadow-hover"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-brand text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {label}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-ink transition-colors group-hover:text-action">
                    {value}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {note}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-action">
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + reassurance */}
      <section className="border-y border-hairline bg-soft-blue py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-14">
            {/* Form */}
            <Reveal>
              <div className="border border-hairline bg-white p-6 card-shadow sm:p-9">
                <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                  Get a quote
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Answer what you can — only your name, email, and a message are
                  required. The rest just means we can price it accurately first
                  time.
                </p>
                <div className="mt-8">
                  <Suspense fallback={<div className="h-[32rem]" />}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1} className="space-y-5">
              {/* What happens next — kills the "will anyone reply?" doubt. */}
              <div className="border border-hairline bg-white p-7">
                <h3 className="text-lg font-semibold text-ink">
                  What happens next
                </h3>
                <ol className="mt-6 space-y-6">
                  {steps.map((s, i) => (
                    <li key={s.title} className="relative flex gap-4">
                      {/* Connector — every step but the last. */}
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[13px] top-8 h-full w-px bg-hairline"
                        />
                      )}
                      <span className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center bg-brand text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Response promise — the single most reassuring fact we have. */}
              <div className="flex items-start gap-3.5 border border-action/25 bg-action/5 p-6">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {site.responsePromise}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Usually much sooner. You&apos;re not joining a ticket queue.
                  </p>
                </div>
              </div>

              {/* A real address is a trust signal — show it, don't bury it. */}
              <div className="border border-hairline bg-white p-7">
                <h3 className="text-lg font-semibold text-ink">Our office</h3>
                <ul className="mt-5 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium text-ink">
                        {site.address.label}
                      </p>
                      <p className="mt-0.5 leading-relaxed text-muted">
                        {site.address.line1}
                        <br />
                        {site.address.line2}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium text-ink">Office line</p>
                      <a
                        href={site.officePhoneHref}
                        className="text-muted transition-colors hover:text-action"
                      >
                        {site.officePhone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium text-ink">Opening hours</p>
                      <p className="mt-0.5 text-muted">
                        Monday to Friday, 9:00 – 18:00
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Credentials — "are these people real?", answered. */}
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
                  {credentials.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-1.5 border border-hairline bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink/75"
                    >
                      <Icon className="h-3.5 w-3.5 text-brand" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The questions that otherwise arrive as an email we have to answer.
          Its CTA points at WhatsApp here — "Ask us a question" → /contact would
          be a link to this very page. */}
      <FAQ ctaLabel="Ask us on WhatsApp" ctaHref={whatsappHref} />
    </>
  );
}
