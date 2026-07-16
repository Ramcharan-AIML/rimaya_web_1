import type { Metadata } from "next";
import Link from "next/link";
import { Search, Radar, Lock, PhoneCall, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/sections/PageHero";
import ApplicationForm from "@/components/jobs/ApplicationForm";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit your CV",
  description:
    "Send your CV to Rimaya and we'll match you to roles across the UK — including vacancies before they're advertised. PDF, DOC, or DOCX, takes two minutes.",
};

/**
 * The speculative half of the candidate funnel, and the destination for every
 * "Submit / Send your CV" call to action on the site. Previously those all
 * pointed at /jobs, which answered a different question ("what's advertised?")
 * than the one being asked ("take my CV") — so the click felt like a dead end.
 */

const reasons = [
  {
    icon: Radar,
    title: "Roles before they're advertised",
    body: "Most of what we fill never reaches the job board. Being on file is how you hear about those first.",
  },
  {
    icon: PhoneCall,
    title: "A person reads it",
    body: "No automated rejection. A Rimaya recruiter reads every CV that arrives and comes back to you.",
  },
  {
    icon: Search,
    title: "Matched, not spammed",
    body: "We put you forward for work that genuinely fits — not everything with a vacancy.",
  },
  {
    icon: Lock,
    title: "Never shared without you",
    body: "Your CV goes nowhere near an employer until we've spoken and you've said yes.",
  },
];

export default function SubmitCvPage() {
  const liveCount = jobs.length;

  return (
    <>
      <PageHero
        breadcrumb="Submit your CV"
        eyebrow="For job seekers"
        title="Send us your CV."
        intro="Nothing on the board that fits? Send your CV anyway. We'll keep you on file and get in touch when the right role comes up — including the ones that never get advertised."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            {/* Form */}
            <Reveal>
              <div className="border border-hairline bg-white p-6 card-shadow sm:p-8">
                <h2 className="text-2xl font-semibold text-ink">
                  Your details
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Two minutes, and {site.responsePromise.toLowerCase()}.
                </p>
                <div className="mt-7">
                  <ApplicationForm
                    speculative
                    role="Speculative CV submission"
                    slug="submit-cv"
                  />
                </div>
              </div>
            </Reveal>

            {/* Why bother */}
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-semibold text-ink">
                What happens to your CV
              </h2>
              <ul className="mt-7 space-y-7">
                {reasons.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-surface-blue text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* The other door: people who'd rather browse first. */}
              <div className="mt-10 border border-hairline bg-surface p-6">
                <p className="text-sm leading-relaxed text-ink/85">
                  Would you rather look at what&apos;s live first? There{" "}
                  {liveCount === 1 ? "is" : "are"} currently{" "}
                  <strong className="font-semibold text-brand">
                    {liveCount} open {liveCount === 1 ? "role" : "roles"}
                  </strong>{" "}
                  you can apply to directly.
                </p>
                <Link
                  href="/jobs"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-action hover:text-action-hover"
                >
                  Browse all jobs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
