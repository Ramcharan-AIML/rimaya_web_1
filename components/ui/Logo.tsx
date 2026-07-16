import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rimaya lockup: R-mark + RIMAYA wordmark, side by side.
 *
 * Proportion is the whole job here. The two source files crop differently —
 * Logo-1_1 is a near-square glyph (432×447) while Logo-1_2 is a tight crop of
 * the letterforms (787×149), so its height *is* its cap height. Sizing both by
 * raw height therefore lies: at 38/22 the mark's "R" towered over the wordmark's
 * letters and the lockup read as two mismatched logos rather than one.
 *
 * The ratio below (mark ≈ 1.4× cap height) is the balance point. Change one
 * number and you must change the other.
 */

const MARK = 34; // px — rendered height/width of the R-mark
const CAP = 24; // px — rendered cap height of the wordmark

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
        "group/logo inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center",
          isLight && "bg-white p-1",
        )}
        style={{
          width: MARK + (isLight ? 8 : 0),
          height: MARK + (isLight ? 8 : 0),
        }}
      >
        <Image
          src="/images/Logo-1_1.png"
          alt=""
          width={MARK * 2}
          height={MARK * 2}
          className="object-contain"
          style={{ height: MARK, width: "auto", maxWidth: MARK }}
          priority
        />
      </span>

      {isLight ? (
        <span
          className="font-heading font-semibold leading-none tracking-[0.18em] text-white"
          style={{ fontSize: CAP - 3 }}
        >
          RIMAYA
        </span>
      ) : (
        <Image
          src="/images/Logo-1_2.png"
          alt="Rimaya"
          width={Math.round(CAP * 5.282) * 2}
          height={CAP * 2}
          className="object-contain"
          style={{ height: CAP, width: "auto" }}
          priority
        />
      )}
    </Link>
  );
}
