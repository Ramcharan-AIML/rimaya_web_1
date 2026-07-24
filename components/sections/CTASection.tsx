import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function CTASection({
  eyebrow = "Ready when you are",
  title = "Let's get started.",
  intro = "Tell us what you need and we'll come back to you fast — no jargon, no pressure.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact?intent=quote",
  secondaryLabel,
  secondaryHref,
  compact = false,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  // A trimmed-down version: less padding, a smaller headline, and a medium
  // button. For pages where the closing CTA should be present but not shout.
  compact?: boolean;
}) {
  const btnSize = compact ? "md" : "lg";
  return (
    // A light section holding a navy panel, rather than a navy section.
    // Full-bleed navy here ran straight into the navy footer and the two read as
    // one indistinct slab — the last thing a visitor sees before converting.
    // Floating the panel puts a white margin around it: the CTA becomes an
    // object on the page, and the footer starts somewhere visibly new.
    <section className={cn("bg-white", compact ? "py-12 sm:py-14" : "py-16 sm:py-20")}>
      <Container>
        <Reveal>
          <div
            className={cn(
              "relative isolate overflow-hidden bg-brand-band text-white card-shadow",
              compact ? "px-6 py-10 sm:px-10 sm:py-12" : "px-6 py-16 sm:px-12 sm:py-20",
            )}
          >
            {/* Corner brackets — the sharp-corner brand signature, drawn. */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0 top-0 border-l-2 border-t-2 border-white/25",
                compact ? "h-12 w-12" : "h-16 w-16",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute bottom-0 right-0 border-b-2 border-r-2 border-white/25",
                compact ? "h-12 w-12" : "h-16 w-16",
              )}
            />
            {/* Light bloom behind the headline. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(circle,rgba(0,140,240,0.28),transparent_65%)]"
            />

            <div className={cn("mx-auto text-center", compact ? "max-w-2xl" : "max-w-3xl")}>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {eyebrow}
              </span>
              <h2
                className={cn(
                  "mt-4 font-semibold",
                  compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl md:text-5xl",
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-xl leading-relaxed text-white/75",
                  compact ? "mt-4 text-sm sm:text-base" : "mt-5 text-base sm:text-lg",
                )}
              >
                {intro}
              </p>
              {/* On navy, white is the loudest thing available — so white is the
                  primary. `action` blue sat only a shade off this band and read
                  as disabled, while the white secondary next to it outshouted
                  the button that actually matters. The glow is what keeps the
                  white button from looking like a flat sticker. */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-3 sm:flex-row",
                  compact ? "mt-7" : "mt-9",
                )}
              >
                <Button
                  href={primaryHref}
                  size={btnSize}
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
                  <Button href={secondaryHref} size={btnSize} variant="outlineOnDark">
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
