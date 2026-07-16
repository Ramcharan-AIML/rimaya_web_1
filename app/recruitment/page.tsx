import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  Clock,
  ShieldCheck,
  Network,
  Handshake,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import FeatureCards from "@/components/sections/FeatureCards";
import JobCard from "@/components/jobs/JobCard";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Temporary and permanent recruitment for UK businesses, backed by a live job board and a growing pool of vetted candidates. Hire with Rimaya or browse jobs.",
};

// NOTE: placeholder stats — replace with the client's real numbers.
const stats = [
  { value: "500+", label: "Placements a year" },
  { value: "1,000+", label: "Workers on payroll" },
  { value: "12h", label: "Average response time" },
  { value: "A-rated", label: "Sponsor licence" },
];

const features = [
  {
    icon: Clock,
    title: "Temporary recruitment",
    body: "Reliable, vetted temporary staff — often at short notice — with weekly pay handled through our payroll.",
  },
  {
    icon: UserCheck,
    title: "Permanent recruitment",
    body: "The right long-term hire, screened properly, so you bring on people who fit and stay.",
  },
  {
    icon: Network,
    title: "Extensive candidate network",
    body: "A deep and growing pool of candidates across sectors — strengthened every day by online applications.",
  },
  {
    icon: ShieldCheck,
    title: "Visa sponsorship",
    body: "Our A-rated sponsor licence means we can support Skilled Worker visa routes where you need them.",
  },
  {
    icon: Handshake,
    title: "A true partnership",
    body: "We take time to understand your business, so the people we send actually match your needs.",
  },
  {
    icon: Users,
    title: "Multi-role clients",
    body: "From a single hire to whole teams — we scale with you as your headcount grows.",
  },
];

export default function RecruitmentPage() {
  // Landscape rows, so a deeper list stays scannable instead of turning into a
  // wall of tall cards.
  const featured = jobs.slice(0, 6);

  return (
    <>
      <PageHero
        breadcrumb="Recruitment"
        eyebrow="Recruitment"
        title="The right people, placed fast."
        intro="Temporary or permanent, Rimaya connects growing UK businesses with vetted, ready-to-work talent — and connects candidates with roles that fit."
        primary={{ label: "Hire with us", href: "/contact?intent=hire" }}
        secondary={{ label: "Browse jobs", href: "/jobs" }}
      />

      {/* Stats */}
      <section className="bg-brand-band py-14 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label} className="text-center lg:text-left">
                <p className="text-4xl font-semibold sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Partnership band */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-hairline card-shadow">
                <Image
                  src="/images/recruitment.png"
                  alt="A Rimaya recruiter welcoming a candidate with a handshake in a modern office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Our approach"
                title="We get to know you before we send anyone."
                intro="Good recruitment isn't about volume — it's about fit. We take time to understand your business, your team, and the role, so the people we put forward are ones you'd actually hire."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Every candidate screened and vetted before you meet them",
                  "Fast turnaround when you need people at short notice",
                  "Temporary workers paid through our own payroll bureau",
                  "One point of contact who knows your business",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-ink/85">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureCards
        eyebrow="What we do"
        title="Recruitment built around your business."
        intro="A practical, relationship-led approach to hiring — for employers who need people they can rely on."
        features={features}
        tone="surface"
      />

      {/* Live jobs teaser */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Live vacancies"
              title="Some of the roles we're hiring for now."
              intro="Candidates can apply online in minutes and upload a CV. New roles are added regularly."
            />
            <Button href="/jobs" variant="secondary" className="shrink-0">
              View all jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 space-y-4">
            {featured.map((job, i) => (
              <Reveal key={job.slug} delay={Math.min(i, 4) * 0.06}>
                <JobCard job={job} layout="landscape" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {`Showing ${featured.length} of ${jobs.length} live roles.`}{" "}
                Nothing that fits? Send your CV and we&apos;ll match you to
                what&apos;s coming.
              </p>
              <Button href="/submit-cv" variant="secondary" className="shrink-0">
                Submit your CV
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dual CTA */}
      <section className="bg-soft-blue border-y border-hairline py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col border border-hairline bg-white p-8">
                <h3 className="text-2xl font-semibold text-ink">
                  Employers — need talent?
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Tell us the roles you&apos;re filling and we&apos;ll send vetted
                  candidates who match. Temporary, permanent, or both.
                </p>
                <div className="mt-6">
                  <Button href="/contact?intent=hire">Request talent</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col border border-hairline bg-white p-8">
                <h3 className="text-2xl font-semibold text-ink">
                  Candidates — looking for work?
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Browse our live vacancies, apply online, and upload your CV.
                  We&apos;ll be in touch about roles that suit you.
                </p>
                <div className="mt-6">
                  <Button href="/jobs">Browse jobs</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
