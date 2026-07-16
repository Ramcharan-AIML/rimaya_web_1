import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rimaya lockup: R-mark + RIMAYA wordmark, side by side.
 *
 * ⚠️ Size the INK, not the box. The two source files carry very different
 * internal padding, measured from their pixels:
 *
 *   Logo-1_1.webp  432×447  ink 416×425  → 95% of the box is glyph
 *   Logo-1_2.webp  787×149  ink 767×116  → 78% of the box is letterform
 *
 * So equal-looking `height` values lie: at 34px/24px the mark's glyph rendered
 * 32px tall against 19px letters — a 1.7 ratio, which is exactly the "the mark
 * dwarfs the name" imbalance. The constants below work backwards from the ink
 * instead, which is why the two boxes end up nearly the same height even though
 * the mark reads as clearly larger.
 *
 * To resize the lockup, change CAP. Everything else follows.
 */

// Share of each canvas that is actually ink (measured, see above).
const MARK_INK_RATIO = 425 / 447; // 0.951
const CAP_INK_RATIO = 116 / 149; // 0.779

// Source aspect ratios, for next/image's intrinsic sizing.
const MARK_ASPECT = 432 / 447;
const WORD_ASPECT = 787 / 149;

const CAP = 20; // px — the wordmark's cap height ON SCREEN
const MARK_TO_CAP = 1.4; // the lockup's balance point

// The boxes we actually render, derived so the ink lands at the ratio above.
const MARK_BOX = Math.round((CAP * MARK_TO_CAP) / MARK_INK_RATIO); // ≈ 30
const WORD_BOX = Math.round(CAP / CAP_INK_RATIO); // ≈ 26

export default function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "light";
  className?: string;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label="Rimaya — home"
      className={cn(
        "group/logo inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center",
          isLight && "bg-white p-1",
        )}
        style={{
          width: MARK_BOX + (isLight ? 8 : 0),
          height: MARK_BOX + (isLight ? 8 : 0),
        }}
      >
        <Image
          src="/images/Logo-1_1.webp"
          alt=""
          width={Math.round(MARK_BOX * MARK_ASPECT * 2)}
          height={MARK_BOX * 2}
          className="object-contain"
          style={{ height: MARK_BOX, width: "auto" }}
          loading="eager"
        />
      </span>

      {isLight ? (
        // Cap height of a typeface is ~0.72em, so this lands the text at the
        // same CAP as the image wordmark it stands in for.
        <span
          className="font-heading font-semibold leading-none tracking-[0.16em] text-white"
          style={{ fontSize: Math.round(CAP / 0.72) }}
        >
          RIMAYA
        </span>
      ) : (
        <Image
          src="/images/Logo-1_2.webp"
          alt="Rimaya"
          width={Math.round(WORD_BOX * WORD_ASPECT * 2)}
          height={WORD_BOX * 2}
          className="object-contain"
          style={{ height: WORD_BOX, width: "auto" }}
          loading="eager"
        />
      )}
    </Link>
  );
}
