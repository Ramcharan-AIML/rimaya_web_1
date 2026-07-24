"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces every route change to open at the top of the page.
 *
 * ⚠️ Next's App Router already tries to do this, but `html { scroll-behavior:
 * smooth }` in globals.css turns that jump into an *animated* scroll — which the
 * next paint frequently interrupts, leaving the new page opened halfway down.
 * The fix is to switch the html element back to `auto` for the single frame we
 * jump in, then restore it so in-page anchor links (`/#services`, `#faq`) keep
 * their smooth glide.
 *
 * A real hash in the URL is left alone — that navigation is *meant* to land on
 * a section, not the top.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}
