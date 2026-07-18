"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Official Trustpilot TrustBox. This is the ONE legitimate way to show reviews
 * that update automatically as customers post them — the review text lives on
 * Trustpilot and the widget renders it live; we never copy or store it.
 *
 * It renders nothing unless BOTH `businessUnitId` and `templateId` are set in
 * lib/site.ts (from a Trustpilot Business account). Until then the parent shows
 * the curated testimonials instead — see Testimonials.tsx. That gate is why we
 * never ship a broken/empty external widget.
 *
 * The bootstrap script hydrates any `.trustpilot-widget` on load, but on a
 * client-navigated SPA route the element can mount after the script has already
 * run, so we also call `loadFromElement` once on mount.
 */
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement | null, forceReload?: boolean) => void;
    };
  }
}

export default function TrustpilotWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const { businessUnitId, templateId, reviewUrl, locale, widgetHeight } =
    site.trustpilot;

  useEffect(() => {
    if (window.Trustpilot) window.Trustpilot.loadFromElement(ref.current, true);
  }, []);

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
      />
      {/* Trustpilot styles this element itself; the inner link is the required
          fallback shown before the script hydrates and to crawlers. */}
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height={widgetHeight}
        data-style-width="100%"
        data-theme="light"
      >
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
          See our reviews on Trustpilot
        </a>
      </div>
    </>
  );
}
