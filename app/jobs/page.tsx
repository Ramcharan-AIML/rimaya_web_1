import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import JobsExplorer from "@/components/jobs/JobsExplorer";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Browse live vacancies with Rimaya. Filter by keyword, location, and job type, then apply online and upload your CV in minutes.",
};

export default function JobsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Jobs"
        eyebrow="Live vacancies"
        title="Find your next role."
        intro="Browse our current openings, filter to what fits you, and apply online in minutes — CV upload included. New roles are added regularly."
      />

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <JobsExplorer jobs={jobs} />
        </Container>
      </section>

      <CTASection
        eyebrow="Employers"
        title="Hiring instead?"
        intro="If you're a business looking for reliable people, we can help you fill roles fast with vetted candidates."
        primaryLabel="Request talent"
        primaryHref="/contact?intent=hire"
        secondaryLabel="About Rimaya"
        secondaryHref="/about"
      />
    </>
  );
}
