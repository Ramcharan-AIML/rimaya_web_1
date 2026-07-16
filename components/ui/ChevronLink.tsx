import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The Azure/Fluent inline link: bright-blue label with an arrow that nudges
 * right on hover. Nudging the arrow (not the whole link) keeps the text still,
 * so nothing reflows — the movement reads as intent, not jitter.
 *
 * The arrow shifts when hovering the link itself OR any ancestor marked
 * `group`, which lets a whole card drive it.
 */
export default function ChevronLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
        onDark ? "text-white hover:text-white/80" : "text-action hover:text-action-hover",
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
