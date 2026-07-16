import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

// NOTE: placeholder testimonials. Replace with the client's real, approved reviews.
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

// Two rows travelling in opposite directions. The second row starts from the
// other end of the list so the two lanes never show the same quote side by side.
const rowOne = testimonials;
const rowTwo = [...testimonials].reverse();

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
 * One lane of the marquee. The list is rendered twice: the first copy is the
 * real content, the second is `aria-hidden` scenery that exists purely so the
 * loop can wrap without a gap — a screen reader should hear each quote once.
 */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee overflow-hidden">
      <div className={cn("marquee-track", reverse && "marquee-track--reverse")}>
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
    // Full-bleed: the lanes must run edge to edge for the loop to read as
    // endless, so they sit outside the Container the heading uses.
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
      </Container>

      <Reveal className="mt-12 space-y-6">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </Reveal>

      <Container>
        <p className="mt-10 text-center text-xs text-muted">
          Hover to pause and read.
        </p>
      </Container>
    </section>
  );
}
