import Image from "next/image";
import {
  PiggyBank,
  Timer,
  ShieldCheck,
  Network,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CardBrackets from "@/components/ui/CardBrackets";
import ChevronLink from "@/components/ui/ChevronLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Reason = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const reasons: Reason[] = [
  {
    icon: PiggyBank,
    title: "Cost efficiency",
    body: "Clear value and honest pricing — no bloated fees, no surprises on the invoice.",
  },
  {
    icon: Timer,
    title: "Quickest turnaround",
    body: "Fast responses and fast delivery. We reply within 12 hours and move at your pace.",
  },
  {
    icon: ShieldCheck,
    title: "Risk mitigated",
    body: "Compliant, careful, and correct. Your payroll and hiring stay on the right side of the rules.",
  },
  {
    icon: Network,
    title: "Extensive network",
    body: "A deep, growing pool of vetted candidates and trusted partners across sectors.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible terms",
    body: "Arrangements that fit how you actually work — scale up or down without friction.",
  },
];

/**
 * A bento, not a grid of equal boxes.
 *
 * Five identical cards gave every reason the same weight and the eye nowhere to
 * land. The layout now carries the argument: the promise we are actually judged
 * on (12 hours) is a tall tile the eye hits first, the five reasons sit at
 * ordinary weight around it, and the team photograph closes the row — the
 * "real people, not software" claim from the top of the page, shown rather
 * than repeated.
 */
export default function WhyRimaya() {
  return (
    <section className="bg-azure-mint py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Rimaya"
            title="Reasons to choose us — not just claims."
            intro="Here's what you actually get when you work with Rimaya, and why clients stay with us."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Feature tile — spans two rows beside the first four reasons. */}
          <StaggerItem className="lg:row-span-2">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-brand-band p-8 text-white card-shadow">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Our response promise
                </p>
                <p className="mt-6 font-heading text-7xl font-semibold tracking-tight text-white">
                  12h
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Send an enquiry and hear back within twelve hours — usually
                  much sooner, and from a named person rather than a queue.
                </p>
              </div>

              <div className="mt-10">
                <div aria-hidden className="mb-6 h-px bg-white/15" />
                <ChevronLink href="/contact?intent=quote" onDark>
                  Put us to the test
                </ChevronLink>
              </div>
            </div>
          </StaggerItem>

          {reasons.map((r) => (
            <StaggerItem key={r.title} as="article" className="h-full">
              <div className="group relative flex h-full flex-col border border-hairline bg-white p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover">
                <CardBrackets />
                <span className="inline-flex h-12 w-12 items-center justify-center bg-surface-blue text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            </StaggerItem>
          ))}

          {/* Photo tile closes the bottom row beside the fifth reason. */}
          <StaggerItem className="lg:col-span-2">
            <div className="relative h-full min-h-[13rem] overflow-hidden">
              <Image
                src="/images/about_team.png"
                alt="The Rimaya team at work"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,42,71,0.9)_0%,rgba(1,42,71,0.55)_55%,transparent_100%)]"
              />
              <div className="relative flex h-full flex-col justify-end p-8">
                <p className="max-w-sm font-heading text-xl font-semibold leading-snug text-white">
                  Real people behind every account — not a ticket number.
                </p>
                <ChevronLink href="/about" onDark className="mt-4">
                  Meet the team
                </ChevronLink>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
