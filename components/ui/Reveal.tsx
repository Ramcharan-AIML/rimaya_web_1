"use client";

import { motion } from "framer-motion";

/**
 * Purposeful scroll-reveal: gentle fade + small rise, once, on enter.
 * Always renders the same element and the same initial state (no SSR/CSR
 * branch → no hydration mismatch). Reduced-motion is handled in CSS via the
 * [data-reveal] override in globals.css, which forces full visibility with
 * !important (beating Framer's inline styles) so content is never stuck hidden.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
