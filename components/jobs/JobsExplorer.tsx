"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { jobTypes, type Job, type JobType } from "@/lib/jobs";
import { cn } from "@/lib/utils";

export default function JobsExplorer({ jobs }: { jobs: Job[] }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<JobType | "All">("All");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesKw =
        !kw ||
        job.title.toLowerCase().includes(kw) ||
        job.summary.toLowerCase().includes(kw) ||
        job.sector.toLowerCase().includes(kw) ||
        job.company.toLowerCase().includes(kw);
      const matchesLoc = !loc || job.location.toLowerCase().includes(loc);
      const matchesType = type === "All" || job.type === type;
      const matchesRemote = !remoteOnly || job.remote;
      return matchesKw && matchesLoc && matchesType && matchesRemote;
    });
  }, [jobs, keyword, location, type, remoteOnly]);

  const hasFilters =
    keyword || location || type !== "All" || remoteOnly;

  const reset = () => {
    setKeyword("");
    setLocation("");
    setType("All");
    setRemoteOnly(false);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="border border-hairline bg-white p-5 card-shadow">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <label className="block">
            <span className="sr-only">Search keywords</span>
            <div className="flex items-center gap-2 border border-hairline bg-white px-3 focus-within:border-action">
              <Search className="h-4 w-4 text-muted" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keyword, or sector"
                className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
          </label>

          <label className="block">
            <span className="sr-only">Location</span>
            <div className="flex items-center gap-2 border border-hairline bg-white px-3 focus-within:border-action">
              <MapPin className="h-4 w-4 text-muted" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 border border-hairline bg-white px-4 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="h-4 w-4 accent-[#006dc1]"
            />
            Remote only
          </label>
        </div>

        {/* Type chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Type
          </span>
          {(["All", ...jobTypes] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t as JobType | "All")}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors",
                type === t
                  ? "border-action bg-action text-white"
                  : "border-hairline bg-white text-ink/70 hover:border-action hover:text-action",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results header */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          <strong className="font-semibold text-ink">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "role" : "roles"} found
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-action hover:text-action-hover"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        // Keyed on the filter state so a new result set replays the entrance
        // instead of appearing instantly (the reveal only fires `once`).
        <Stagger
          key={`${keyword}|${location}|${type}|${remoteOnly}`}
          className="mt-5 space-y-4"
        >
          {filtered.map((job) => (
            <StaggerItem as="article" key={job.slug}>
              <JobCard job={job} layout="landscape" />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        // A dead end here is a lost candidate — the CV route keeps them in the
        // funnel even when nothing on the board fits.
        <div className="mt-5 border border-hairline bg-surface p-12 text-center">
          <p className="text-base font-semibold text-ink">No roles match your search</p>
          <p className="mt-2 text-sm text-muted">
            Try widening your filters, or{" "}
            <button
              type="button"
              onClick={reset}
              className="font-medium text-action hover:underline"
            >
              clear them
            </button>
            .
          </p>
          <p className="mt-6 text-sm text-muted">
            Or send your CV — we&apos;ll match you to roles before they&apos;re
            advertised.
          </p>
          <Link
            href="/submit-cv"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 bg-action px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-action-hover"
          >
            Submit your CV
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
