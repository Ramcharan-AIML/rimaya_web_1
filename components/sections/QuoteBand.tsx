import Image from "next/image";
import { Building2, UserRound, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { site } from "@/lib/site";

/**
 * Mid-page conversion anchor. Rimaya has two audiences and two conversions, so
 * this offers both routes side by side rather than guessing which one the
 * reader is — someone who arrives as a browser and decides mid-scroll can act
 * without hunting for the header or scrolling to the footer.
 *
 * Both cards are white on the photograph: two equal doors, not one door and one
 * shadow. Which is primary is still legible — the business card carries the
 * solid action-blue button, the candidate card an outlined one.
 */

type Route = {
  icon: LucideIcon;
  for: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  primary: boolean;
};

const routes: Route[] = [
  {
    icon: Building2,
    for: "For businesses",
    title: "Get a quote",
    body: "Tell us your headcount and pay cycle. We'll send back a clear price with no obligation — usually the same working day.",
    cta: { label: "Get a Quote", href: "/contact?intent=quote" },
    primary: true,
  },
  {
    icon: UserRound,
    for: "For job seekers",
    title: "Find your next role",
    body: "Browse live vacancies and apply in minutes with your CV. We'll keep you on file and match you to what fits.",
    cta: { label: "Browse Jobs", href: "/jobs" },
    primary: false,
  },
];

export default function QuoteBand() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-band py-20 text-white sm:py-28">
      {/* London at blue hour: the UK trust signal this section trades on, and
          already brand-blue so it needs no colour correction. Decorative. */}
      <Image
        src="/images/which_one.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Navy scrim. The photo's centre is its brightest region and that is
          exactly where the headline sits, so the scrim is heaviest through the
          middle and lifts at the edges to let the skyline read. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,42,71,0.82)_0%,rgba(1,48,80,0.7)_45%,rgba(1,42,71,0.88)_100%)]"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Two ways in
          </span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Which one are you?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Whether you&apos;re hiring or job hunting, the next step is one
            click — and a real person on the other end of it.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {routes.map((r) => (
            <StaggerItem as="article" key={r.title} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden bg-white p-8 text-ink card-shadow transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover">
                {/* Accent rule fills across on hover — decorative, no reflow. */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100 ${
                    r.primary ? "bg-action" : "bg-brand"
                  }`}
                />

                <span
                  className={`inline-flex h-12 w-12 items-center justify-center transition-colors duration-300 ${
                    r.primary
                      ? "bg-brand text-white"
                      : "bg-surface-blue text-brand group-hover:bg-brand group-hover:text-white"
                  }`}
                >
                  <r.icon className="h-6 w-6" />
                </span>

                <p
                  className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${
                    r.primary ? "text-action" : "text-muted"
                  }`}
                >
                  {r.for}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.body}</p>

                <div className="mt-8 flex-1" />
                <Button
                  href={r.cta.href}
                  size="lg"
                  variant={r.primary ? "primary" : "secondary"}
                  className="w-full"
                >
                  {r.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-white/70">
            <Clock className="h-4 w-4" aria-hidden />
            {site.responsePromise}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
