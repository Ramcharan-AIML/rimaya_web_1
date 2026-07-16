import { ArrowRight, Zap, FileCheck2, UserCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ChevronLink from "@/components/ui/ChevronLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JobCard from "@/components/jobs/JobCard";
import { jobs } from "@/lib/jobs";

/**
 * The candidate funnel — and a business asset, not a side feature: every CV
 * uploaded here grows the talent pool that the recruitment pitch to employers
 * rests on. So it gets the full-band treatment rather than a quiet light strip.
 *
 * Navy: the three white job cards read as objects lifted off the page instead of
 * white-on-near-white, and it separates cleanly from the light sections either
 * side. The live count is derived from the data, so it can never drift from the
 * board itself.
 */

const promises = [
  { icon: Zap, label: "Apply in minutes", sub: "No lengthy forms" },
  { icon: UserCheck, label: "A person reads it", sub: "Never a queue" },
  { icon: FileCheck2, label: "Kept on file", sub: "Matched to what fits" },
];

export default function CandidateBand() {
  const featured = jobs.slice(0, 3);
  const liveCount = jobs.length;

  return (
    <section className="relative isolate overflow-hidden bg-brand-band py-20 text-white sm:py-28">
      {/* Light bloom, upper right — depth without texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] bg-[radial-gradient(circle,rgba(0,150,255,0.2),transparent_65%)]"
      />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <Eyebrow onDark>For job seekers</Eyebrow>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Looking for your next role?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Browse our live vacancies, apply online in minutes, and upload your
              CV. We&apos;ll match you with the right opportunity — and keep you
              on file for the ones that haven&apos;t been posted yet.
            </p>

            {/* Live count, straight from the job data. */}
            <p className="mt-7 inline-flex items-center gap-2.5 border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-signal" />
              </span>
              {liveCount} live {liveCount === 1 ? "role" : "roles"} right now
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button href="/jobs" size="lg" variant="onDark">
              Browse all jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
            {/* <Button href="/submit-cv" size="lg" variant="outlineOnDark">
              Submit your CV
            </Button> */}
          </Reveal>
        </div>

        {/* What applying here is actually like. */}
        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-3">
          {promises.map(({ icon: Icon, label, sub }) => (
            <StaggerItem
              as="li"
              key={label}
              className="flex items-center gap-3.5 border border-white/15 bg-white/[0.06] px-5 py-4 backdrop-blur-sm"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-white/10 text-white ring-1 ring-white/20">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{label}</span>
                <span className="block text-xs text-white/60">{sub}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => (
            <StaggerItem key={job.slug} as="article" className="h-full">
              <JobCard job={job} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/70">
              Nothing here that fits? Send your CV anyway — we&apos;ll match you
              to roles before they&apos;re advertised.
            </p>
            <ChevronLink href="/submit-cv" onDark className="shrink-0">
              Send your CV
            </ChevronLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
