"use client";

import { motion } from "framer-motion";
import { MessageSquare, Clock, Settings2, CheckCircle2, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Step = {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Tell us what you need",
    body: "One short form or a phone call. No lengthy discovery process, no obligation to continue.",
  },
  {
    n: "02",
    icon: Clock,
    title: "We come back within 12 hours",
    body: "A named person reads it — not a queue. You get a clear answer on what we'd do and what it costs.",
  },
  {
    n: "03",
    icon: Settings2,
    title: "We set it up around you",
    body: "We fit your pay dates, your systems, and your notice periods. Switching from another provider is on us.",
  },
  {
    n: "04",
    icon: CheckCircle2,
    title: "It just runs",
    body: "Payroll lands on time, shortlists arrive, questions get answered. You go back to running the business.",
  },
];

/**
 * The process, as a track the eye can follow.
 *
 * The rail draws itself left-to-right as the section enters, then the nodes and
 * cards land along it in sequence — the animation *is* the message: this runs
 * in order, start to finish, no surprises. The rail is `data-reveal` so the
 * reduced-motion override in globals.css forces it to full width instead of
 * leaving it stuck at scaleX(0).
 */
export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-surface-blue/40 to-white py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-[32rem] w-[32rem] bg-[radial-gradient(circle,rgba(0,109,193,0.07),transparent_65%)]"
      />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps. No surprises."
            intro="Working with us is deliberately boring — that's the point. Here's exactly what happens from your first message."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* The rail: one continuous line behind all four nodes on desktop.
              It stops dead at the centre of node 04 rather than running on to
              the container edge — a line trailing past the last step reads as
              "and then something else", which is the opposite of the promise.
              Inset maths, for a 4-column grid with a 24px gap (gap-x-6) and a
              48px node: each column is (100% - 72px) / 4, so node 04's centre
              lands 25% - 42px in from the right edge. */}
          <motion.span
            data-reveal
            aria-hidden
            className="absolute left-6 right-[calc(25%-42px)] top-6 -z-10 hidden h-px origin-left bg-gradient-to-r from-brand to-action lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />

          <Stagger as="ol" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem as="li" key={s.n} className="group relative flex h-full flex-col">
                {/* Node sitting on the rail */}
                <span
                  aria-hidden
                  className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center self-start bg-brand font-heading text-sm font-semibold text-white ring-4 ring-white transition-colors duration-300 group-hover:bg-action"
                >
                  {s.n}
                </span>

                <div className="mt-6 flex-1 border border-hairline bg-white/90 p-6 backdrop-blur-sm transition-all duration-300 ease-[var(--ease-out-soft)] card-shadow group-hover:border-action/40 group-hover:card-shadow-hover">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-surface-blue text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
