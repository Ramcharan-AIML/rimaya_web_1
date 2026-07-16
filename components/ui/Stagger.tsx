"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Stagger: children enter in sequence rather than all at once.
 *
 * Same no-branch/no-hydration-mismatch contract as Reveal — the [data-reveal]
 * CSS override in globals.css forces full visibility under reduced motion.
 *
 * Use StaggerItem for each direct child. Delay is derived from position, so
 * reordering the list never leaves a hand-tuned `delay` prop stale.
 */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag data-reveal className={className} variants={item}>
      {children}
    </Tag>
  );
}
