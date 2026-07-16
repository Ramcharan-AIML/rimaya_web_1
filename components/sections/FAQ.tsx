"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/utils";

/**
 * The CTA is configurable because this section also runs on /contact, where
 * "Ask us a question" → /contact would send the reader to the page they are
 * already on.
 */
export default function FAQ({
  ctaLabel = "Ask us a question",
  ctaHref = "/contact",
}: {
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  // Single-open accordion: keeps the section short enough to scan, and the
  // reader never loses the question they were reading to a reflow above it.
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-24 bg-surface py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left: sticky framing */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                The things people ask before they get in touch.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Straight answers, no sales pitch. If yours isn&apos;t here, ask
                us directly — we&apos;ll tell you honestly, even when the answer
                is &ldquo;we&apos;re not the right fit&rdquo;.
              </p>
              <Button href={ctaHref} variant="secondary" size="lg" className="mt-8">
                {ctaLabel}
              </Button>
            </div>
          </Reveal>

          {/* Right: the accordion */}
          <Reveal delay={0.1}>
            <ul className="border-t border-hairline">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                const buttonId = `${baseId}-button-${i}`;

                return (
                  <li key={f.q} className="border-b border-hairline">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent py-5 text-left transition-colors hover:bg-white/60"
                      >
                        <span
                          className={cn(
                            "text-base font-semibold transition-colors sm:text-lg",
                            isOpen ? "text-brand" : "text-ink group-hover:text-brand",
                          )}
                        >
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isOpen
                              ? "rotate-45 border-action bg-action text-white"
                              : "border-hairline bg-white text-muted group-hover:border-action group-hover:text-action",
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.22 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-12 text-sm leading-relaxed text-muted sm:text-base">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
