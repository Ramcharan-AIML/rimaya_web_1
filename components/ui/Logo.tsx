"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rimaya logo — a single square emblem with the R-mark and the RIMAYA wordmark
 * baked into one image. Resize with `size` (px).
 *
 * ⚠️ The background is TRANSPARENT and the artwork is deep blue: great on white,
 * near-invisible on navy. On dark bands it needs a white plaque behind it — see
 * the footer. (Image viewers composite the transparency onto dark, which makes
 * the file look like it carries its own navy tile. It does not.)
 *
 * The intrinsic width/height stay fixed while `size` only drives the CSS box, so
 * shrinking the header logo on scroll animates smoothly instead of asking the
 * image optimiser for a second, differently-sized file mid-transition.
 *
 * Clicking it always returns you to the top: a Link to the route you are already
 * on is a no-op for the router, so the scroll has to be done by hand.
 */
export default function Logo({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Rimaya — home"
      onClick={() => {
        if (window.location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={cn(
        "group/logo inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      <Image
        src="/images/logo.webp"
        alt="Rimaya"
        width={160}
        height={160}
        className="object-contain transition-[height,width] duration-300 ease-[var(--ease-out-soft)]"
        style={{ height: size, width: size }}
        loading="eager"
      />
    </Link>
  );
}
