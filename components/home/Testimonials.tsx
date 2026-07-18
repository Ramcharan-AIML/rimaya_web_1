import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import TrustpilotWidget from "./TrustpilotWidget";
import TestimonialsCarousel, { type Testimonial } from "./TestimonialsCarousel";

// NOTE: placeholder testimonials, shown until the live Trustpilot TrustBox is
// switched on (set businessUnitId + templateId in lib/site.ts). Replace these
// with the client's real, approved reviews if the widget stays off at launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "Rimaya took our payroll off our plate completely. Everything runs on time, HMRC is always happy, and their team actually answers the phone.",
    name: "Operations Director",
    company: "Professional services firm",
  },
  {
    quote:
      "We needed temporary staff at short notice and they delivered vetted people within days. The quality of candidates has been consistently strong.",
    name: "Site Manager",
    company: "Logistics company",
  },
  {
    quote:
      "Straightforward, responsive, and genuinely helpful. It feels like having a finance partner rather than just another supplier.",
    name: "Founder",
    company: "Growing SME",
  },
];

// The section flips to live Trustpilot reviews the moment both IDs are set.
const trustpilotLive = Boolean(
  site.trustpilot.businessUnitId && site.trustpilot.templateId,
);

/** The green Trustpilot star, inline — lucide has no brand marks (CLAUDE.md §11). */
function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="#00b67a">
      <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Social proof"
            title="Trusted by the businesses we work with."
            intro="Real feedback from clients who rely on Rimaya day to day."
            align="center"
          />
        </Reveal>

        {/* Write-a-review CTA — sits above the reviews so a happy client can add
            theirs in one click. Opens Trustpilot's review flow in a new tab. */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              href={site.trustpilot.writeReviewUrl}
              variant="secondary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TrustpilotStar className="h-5 w-5" />
              Write a review on Trustpilot
            </Button>
            <p className="text-xs text-muted">
              Share your experience — reviews you post on Trustpilot appear here.
            </p>
          </div>
        </Reveal>
      </Container>

      {trustpilotLive ? (
        // Live reviews, updated automatically by Trustpilot.
        <Container>
          <Reveal className="mt-12">
            <TrustpilotWidget />
          </Reveal>
        </Container>
      ) : (
        <Reveal className="mt-12">
          {/* Swipeable rail with edge arrows. Sits in a Container so the cards
              align to the page grid; the rail scrolls within it. */}
          <Container className="relative">
            <TestimonialsCarousel items={testimonials} />
            <p className="mt-8 text-center text-xs text-muted">
              Swipe, or use the arrows, to see more.
            </p>
          </Container>
        </Reveal>
      )}
    </section>
  );
}
