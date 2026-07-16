"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp action.
 *
 * A plain green pill is what every site has, and it reads as a widget bolted on.
 * This is a navy card carrying the WhatsApp mark on its own green tile: the
 * green still does the recognising (people don't read these, they spot them),
 * while the navy ties it to the site.
 *
 * It arrives full-width — at the top of a page you have the reader's attention
 * and the promise ("Replies within 12h") is worth the space — then collapses to
 * the bare mark once they start reading, so it stops sitting on the content.
 * Hover brings the label back, so the affordance is never actually lost.
 *
 * ⚠️ The height is constant in both states (58px: 36px tile + 2×10px padding +
 * border) — only the width animates. BackToTop is parked directly above on that
 * exact number, so a change here moves it too.
 */

const COLLAPSE_AT = 240; // px of scroll — roughly "has started reading"

export default function WhatsAppButton() {
  // Starts expanded so the server and the client's first render agree; the
  // effect corrects it on load for anyone deep-linked mid-page.
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > COLLAPSE_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Rimaya, I'd like to know more about your services.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Rimaya on WhatsApp"
      className={cn(
        "group fixed bottom-5 right-5 z-30 inline-flex items-center overflow-hidden border border-white/10 bg-brand p-2.5 text-white shadow-[0_12px_40px_-10px_rgba(0,40,72,0.65)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brand-dark",
        // Padding/gap only open up where the label is actually rendered (sm+),
        // so the mobile button stays a clean square.
        collapsed ? "sm:hover:gap-3 sm:hover:pr-4" : "sm:gap-3 sm:pr-4",
      )}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[#25D366] text-white">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>

      {/* Hidden outright on the smallest screens: the mark alone is
          unmistakable, and the thumb-reach corner is too valuable for a label. */}
      <span
        className={cn(
          "hidden overflow-hidden whitespace-nowrap text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block",
          collapsed
            ? "max-w-0 opacity-0 group-hover:max-w-[11rem] group-hover:opacity-100"
            : "max-w-[11rem] opacity-100",
        )}
      >
        <span className="block text-sm font-semibold leading-tight">Message us</span>
        <span className="block text-[11px] leading-tight text-white/60">
          Replies within 12h
        </span>
      </span>
    </a>
  );
}
