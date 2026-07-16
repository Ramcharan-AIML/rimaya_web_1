import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function CTASection({
  eyebrow = "Ready when you are",
  title = "Let's get started.",
  intro = "Tell us what you need and we'll come back to you fast — no jargon, no pressure.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact?intent=quote",
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    // A light section holding a navy panel, rather than a navy section.
    // Full-bleed navy here ran straight into the navy footer and the two read as
    // one indistinct slab — the last thing a visitor sees before converting.
    // Floating the panel puts a white margin around it: the CTA becomes an
    // object on the page, and the footer starts somewhere visibly new.
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden bg-brand-band px-6 py-16 text-white card-shadow sm:px-12 sm:py-20">
            {/* Corner brackets — the sharp-corner brand signature, drawn. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-white/25"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/25"
            />
            {/* Light bloom behind the headline. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(circle,rgba(0,140,240,0.28),transparent_65%)]"
            />

            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {eyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {intro}
              </p>
              {/* On navy, white is the loudest thing available — so white is the
                  primary. `action` blue sat only a shade off this band and read
                  as disabled, while the white secondary next to it outshouted
                  the button that actually matters. The glow is what keeps the
                  white button from looking like a flat sticker. */}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={primaryHref}
                  size="lg"
                  variant="onDark"
                  className="group/cta shadow-[0_10px_40px_-8px_rgba(255,255,255,0.45)]"
                >
                  {primaryLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
                {secondaryLabel && secondaryHref && (
                  <Button href={secondaryHref} size="lg" variant="outlineOnDark">
                    {secondaryLabel}
                  </Button>
                )}
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/60">
                <Clock className="h-4 w-4" />
                {site.responsePromise}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
