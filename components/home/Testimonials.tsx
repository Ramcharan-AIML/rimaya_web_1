import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import TrustpilotWidget from "./TrustpilotWidget";

type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

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

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mr-6 flex w-[22rem] shrink-0 flex-col border border-hairline bg-white p-7 transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover sm:w-[26rem]">
      <Quote className="h-8 w-8 shrink-0 text-action/25" aria-hidden />
      <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-action text-action" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/85">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-hairline pt-4">
        <p className="text-sm font-semibold text-ink">{t.name}</p>
        <p className="text-xs text-muted">{t.company}</p>
      </figcaption>
    </figure>
  );
}

/**
 * A single marquee lane. The list is rendered twice: the first copy is the real
 * content, the second is `aria-hidden` scenery that exists purely so the loop
 * can wrap without a gap — a screen reader should hear each quote once.
 */
function MarqueeRow({ items }: { items: Testimonial[] }) {
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track">
        {items.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
        <div className="flex" aria-hidden>
          {items.map((t) => (
            <TestimonialCard key={`dup-${t.name}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    // Full-bleed: the lane must run edge to edge for the loop to read as
    // endless, so it sits outside the Container the heading uses.
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
        <>
          <Reveal className="mt-12">
            <MarqueeRow items={testimonials} />
          </Reveal>
          <Container>
            <p className="mt-10 text-center text-xs text-muted">
              Hover to pause and read.
            </p>
          </Container>
        </>
      )}
    </section>
  );
}
