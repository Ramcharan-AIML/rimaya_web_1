import Link from "next/link";
import { MapPin, Briefcase, Wifi, ArrowRight, Banknote, CalendarDays } from "lucide-react";
import type { Job } from "@/lib/jobs";
import { formatPosted } from "@/lib/jobs";

/**
 * Two layouts, one source of truth.
 *
 * `grid` — the tall card, for 3-up teasers on a dark band.
 * `landscape` — a full-width row for listing pages, where horizontal space is
 * free and a wall of identical tall cards reads as filler. The row gives the
 * salary its own column, which is the first thing a candidate scans for.
 *
 * Meta icons are `brand` (deep blue), not grey and not `action` — `action` is
 * reserved for things you click, and these are labels, not targets.
 */

export default function JobCard({
  job,
  layout = "grid",
}: {
  job: Job;
  layout?: "grid" | "landscape";
}) {
  if (layout === "landscape") return <JobRow job={job} />;

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-white p-6 transition-shadow duration-200 hover:card-shadow-hover"
    >
      {/* Accent rail — wipes in from the left edge on hover. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />

      <div className="flex items-center gap-2">
        <TypeBadge job={job} />
        {job.remote && <RemoteBadge />}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-action">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{job.company}</p>

      <ul className="mt-4 space-y-2 text-sm text-ink/80">
        <Meta icon={MapPin}>{job.location}</Meta>
        {job.salary && <Meta icon={Banknote}>{job.salary}</Meta>}
        <Meta icon={Briefcase}>{job.sector}</Meta>
      </ul>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
        {job.summary}
      </p>

      <div className="mt-6 flex flex-1 items-end justify-between">
        <span className="text-xs text-muted">
          Posted {formatPosted(job.postedISO)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-action">
          View &amp; apply
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/**
 * The landscape row. Three zones on desktop — identity, meta, decision — so the
 * eye can scan straight down any one column across a stack of rows.
 */
function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group relative flex flex-col gap-6 overflow-hidden border border-hairline bg-white p-6 transition-shadow duration-200 hover:card-shadow-hover sm:p-7 lg:flex-row lg:items-center lg:gap-8"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />

      {/* Identity */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge job={job} />
          {job.remote && <RemoteBadge />}
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
            <CalendarDays className="h-3 w-3 text-brand" />
            Posted {formatPosted(job.postedISO)}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-ink group-hover:text-action">
          {job.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{job.company}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted lg:line-clamp-2">
          {job.summary}
        </p>
      </div>

      {/* Meta — vertical rule only once the row is actually horizontal. */}
      <ul className="space-y-2.5 text-sm text-ink/80 lg:w-56 lg:shrink-0 lg:border-l lg:border-hairline lg:pl-8">
        <Meta icon={MapPin}>{job.location}</Meta>
        <Meta icon={Briefcase}>{job.sector}</Meta>
      </ul>

      {/* Decision */}
      <div className="flex items-center justify-between gap-6 border-t border-hairline pt-5 lg:w-64 lg:shrink-0 lg:flex-col lg:items-end lg:justify-center lg:gap-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        {job.salary && (
          <div className="lg:text-right">
            <p className="text-[15px] font-semibold leading-snug text-brand text-balance">
              {job.salary}
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
              Salary
            </p>
          </div>
        )}
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-action">
          View &amp; apply
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function Meta({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-brand" />
      {children}
    </li>
  );
}

function TypeBadge({ job }: { job: Job }) {
  return (
    <span className="border border-action/30 bg-action/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-action">
      {job.type}
    </span>
  );
}

function RemoteBadge() {
  return (
    <span className="inline-flex items-center gap-1 border border-hairline bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
      <Wifi className="h-3 w-3 text-brand" />
      Remote
    </span>
  );
}
