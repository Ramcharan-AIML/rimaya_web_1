"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

// Gap between cards, in px — kept here because the arrow step needs the exact
// value and Tailwind's `gap-6` is 1.5rem = 24px.
const GAP = 24;

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure
      data-card
      // Wide enough that a few cards always overrun the rail, so there's a real
      // next card to reach for (and a sliver of it peeks in to advertise that).
      // 86vw on mobile shows one card plus that peek.
      className="flex w-[86vw] max-w-[27rem] shrink-0 snap-start flex-col border border-hairline bg-white p-7 transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover sm:w-[27rem]"
    >
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

function ArrowButton({
  side,
  enabled,
  onClick,
}: {
  side: "left" | "right";
  enabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={side === "left" ? "Previous testimonials" : "Next testimonials"}
      className={cnArrow(side, enabled)}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

// Always present at the edges on sm+; greyed and non-interactive at the end of
// travel so the pair reads as a carousel without ever lying about what it does.
// Small local join so this component carries no import beyond lucide/react.
function cnArrow(side: "left" | "right", enabled: boolean) {
  return [
    "absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center",
    "h-11 w-11 border bg-white/95 backdrop-blur-sm sm:flex",
    "shadow-[0_8px_24px_-8px_rgba(0,40,72,0.35)] transition-all duration-200",
    side === "left" ? "left-2" : "right-2",
    enabled
      ? "cursor-pointer border-hairline text-brand hover:border-brand hover:bg-brand hover:text-white"
      : "cursor-not-allowed border-hairline/60 text-muted/40",
  ].join(" ");
}

/**
 * Swipeable testimonial rail. Native horizontal scroll gives touch + trackpad
 * swipe and scroll-snap for free; the arrows drive the same scroll for mouse
 * and keyboard users. Arrows only show when the rail can move that way, so an
 * arrow appearing IS the "there's one you missed" cue the design wants.
 */
export default function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    // Recompute when the rail resizes (breakpoint change, font swap, etc.).
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <div className="relative">
      {/* Edge fades: a partial card at the boundary reads as intentional, and
          the fade points to the hidden content. Shown only when scrollable. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
          canPrev ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
          canNext ? "opacity-100" : "opacity-0"
        }`}
      />

      <ArrowButton side="left" enabled={canPrev} onClick={() => step(-1)} />
      <ArrowButton side="right" enabled={canNext} onClick={() => step(1)} />

      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        // No horizontal padding: it would inflate scrollWidth and fake an
        // overflow when the cards actually fit. Vertical padding only, so the
        // card shadows and the focus ring aren't clipped. Scrollbar hidden
        // across engines; swipe/scroll still work.
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </div>
  );
}
