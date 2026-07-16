import { cn } from "@/lib/utils";

/**
 * The house card-hover: brackets draw out from opposite corners to frame the
 * card. It echoes the sharp-corner brand signature and, unlike the sliding
 * top-edge line every other site uses, it reads as ours.
 *
 * Requires an ancestor marked `group` and `relative`. The brackets are
 * absolutely positioned, so growing them shifts nothing in the card.
 */
export default function CardBrackets({
  size = "md",
  onDark = false,
}: {
  /** Bracket arm length at full extension. */
  size?: "sm" | "md";
  onDark?: boolean;
}) {
  const arm = size === "sm" ? "group-hover:h-5 group-hover:w-5" : "group-hover:h-8 group-hover:w-8";
  const colour = onDark ? "border-white" : "border-action";

  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-0 w-0 border-l-2 border-t-2 transition-all duration-500 ease-[var(--ease-out-soft)]",
          colour,
          arm,
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 right-0 h-0 w-0 border-b-2 border-r-2 transition-all duration-500 ease-[var(--ease-out-soft)]",
          colour,
          arm,
        )}
      />
    </>
  );
}
