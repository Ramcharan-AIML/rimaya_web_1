"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating back-to-top control, bottom-right. Fades in past 600px of scroll.
 *
 * It used to carry a bottom margin to clear the WhatsApp pill that sat below it;
 * that pill was removed, so it now anchors straight to the corner.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      // Keyboard users shouldn't be able to reach it while it's faded out.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "group fixed bottom-5 right-5 z-30 inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-hairline bg-white/90 text-brand shadow-[0_8px_24px_-8px_rgba(0,40,72,0.4)] backdrop-blur-md transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
