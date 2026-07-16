import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Briefcase,
  Wifi,
  Banknote,
  CalendarDays,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ApplicationForm from "@/components/jobs/ApplicationForm";
import { jobs, getJob, formatPosted } from "@/lib/jobs";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} — ${job.location}`,
    description: job.summary,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [...job.description, ...job.responsibilities].join(" "),
    datePosted: job.postedISO,
    employmentType: job.type.toUpperCase().replace(" ", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "GB",
      },
    },
    ...(job.remote && { jobLocationType: "TELECOMMUTE" }),
  };

  const meta = [
    { icon: MapPin, label: job.location },
    { icon: Briefcase, label: job.type },
    ...(job.salary ? [{ icon: Banknote, label: job.salary }] : []),
    ...(job.remote ? [{ icon: Wifi, label: "Remote" }] : []),
    { icon: CalendarDays, label: `Posted ${formatPosted(job.postedISO)}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      {/* Header */}
      <section className="bg-hero-wash border-b border-hairline">
        <Container className="py-12 sm:py-14">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-action hover:text-action-hover"
          >
            <ChevronLeft className="h-4 w-4" />
            All jobs
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="border border-action/30 bg-action/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-action">
              {job.type}
            </span>
            <span className="border border-hairline bg-white px-3 py-1 text-xs font-medium text-muted">
              {job.sector}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-2 text-base text-muted">{job.company}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/80">
            {meta.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <m.icon className="h-4 w-4 text-muted" />
                {m.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* Description */}
            <Reveal className="max-w-2xl">
              <div className="space-y-4">
                {job.description.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink/85">
                    {p}
                  </p>
                ))}
              </div>

              <Block title="What you'll do" items={job.responsibilities} />
              <Block title="What we're looking for" items={job.requirements} />

              <div className="mt-10 border border-hairline bg-surface p-6">
                <p className="text-sm text-muted">
                  Not quite the right role?{" "}
                  <Link href="/jobs" className="font-medium text-action hover:underline">
                    Browse all our vacancies
                  </Link>{" "}
                  or send us your CV anyway — we&apos;ll keep you in mind.
                </p>
              </div>
            </Reveal>

            {/* Apply */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-hairline bg-white p-6 card-shadow sm:p-7">
                <h2 className="text-xl font-semibold text-ink">Apply for this role</h2>
                <p className="mt-1.5 text-sm text-muted">
                  A few details and your CV — that&apos;s it.
                </p>
                <div className="mt-6">
                  <ApplicationForm role={job.title} slug={job.slug} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-9">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-ink/85">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
