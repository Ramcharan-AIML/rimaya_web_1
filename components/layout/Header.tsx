"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Wallet,
  Users,
  Lightbulb,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Two-tier header: a navy utility strip over the main bar.
 *
 * The strip exists because this is a lead-gen site — the phone number and the
 * 12-hour promise are the two facts most likely to turn a reader into an
 * enquiry, and burying them in the footer wastes them. It collapses on scroll
 * so the bar you actually navigate with stays compact.
 *
 * ⚠️ The header is `fixed`, not `sticky`, and pairs with the spacer below it.
 * Sticky keeps the element in flow, so collapsing the strip on scroll would
 * shorten the document and jump the page 40px. Fixed + a constant-height spacer
 * means the collapse costs nothing. If you change the bar heights, change the
 * spacer to match.
 */

const leftLinks = [
  { label: "Services", href: "/#services", hasDropdown: true },
  { label: "Jobs", href: "/jobs" },
];
const rightLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Keyed by href so the icon can't drift from the service it labels.
const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/payroll": Wallet,
  "/recruitment": Users,
  "/consulting": Lightbulb,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Route change closes everything — otherwise the dropdown hangs open over the
  // page you just navigated to.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Escape closes the dropdown and returns focus to a sane place.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility strip — desktop only; on mobile the CTA has to win the space. */}
        <div
          className={cn(
            "hidden overflow-hidden bg-brand text-white transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
          )}
        >
          <Container>
            <div className="flex h-10 items-center justify-between text-xs">
              <p className="inline-flex items-center gap-2 text-white/75">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {site.responsePromise} — {site.descriptor}
              </p>
              <div className="flex items-center gap-6">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 font-medium text-white/85 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  {site.phone}
                </a>
                <span aria-hidden className="h-3 w-px bg-white/20" />
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 font-medium text-white/85 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {site.email}
                </a>
              </div>
            </div>
          </Container>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "border-b transition-all duration-300",
            scrolled
              ? "border-hairline bg-white/90 backdrop-blur-xl card-shadow"
              : "border-hairline/70 bg-white/80 backdrop-blur-md",
          )}
        >
          <Container>
            {/* Desktop. Equal 1fr rails either side of an auto centre column
                keep the logo optically centred regardless of link widths. */}
            <div
              className={cn(
                "hidden grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-300 lg:grid",
                scrolled ? "h-[68px]" : "h-20",
              )}
            >
              {/* Left cluster */}
              <nav className="flex items-center gap-9" aria-label="Primary">
                {leftLinks.map((item) =>
                  item.hasDropdown ? (
                    <div
                      key={item.label}
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      onFocusCapture={() => setServicesOpen(true)}
                      onBlurCapture={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setServicesOpen(false);
                        }
                      }}
                    >
                      <NavLink
                        href={item.href}
                        active={servicesOpen}
                        aria-expanded={servicesOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            servicesOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </NavLink>

                      <div
                        className={cn(
                          "absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-4 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          servicesOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0",
                        )}
                      >
                        <div className="relative border border-hairline bg-white card-shadow">
                          <span
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-[3px] bg-action"
                          />
                          {services.map((s) => {
                            const Icon = serviceIcons[s.href] ?? Wallet;
                            return (
                              <Link
                                key={s.href}
                                href={s.href}
                                className="group/item flex gap-4 border-b border-hairline p-5 transition-colors last:border-b-0 hover:bg-surface-blue"
                              >
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-surface-blue text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                                  <Icon className="h-5 w-5" />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover/item:text-action">
                                    {s.label}
                                    <ArrowRight
                                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                      aria-hidden
                                    />
                                  </span>
                                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                                    {s.blurb}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}

                          {/* Catches the reader who doesn't know which one is theirs. */}
                          <div className="flex items-center justify-between gap-4 border-t border-hairline bg-surface px-5 py-4">
                            <p className="text-xs text-muted">
                              Not sure which you need?
                            </p>
                            <Link
                              href="/contact?intent=quote"
                              className="group/cta inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-action hover:text-action-hover"
                            >
                              Ask us
                              <ArrowRight
                                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                                aria-hidden
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      active={isActive(item.href)}
                    >
                      {item.label}
                    </NavLink>
                  ),
                )}
              </nav>

              {/* Centred logo */}
              <div className="flex justify-center px-10">
                <Logo />
              </div>

              {/* Right cluster */}
              <div className="flex items-center justify-end gap-9">
                {rightLinks.map((item) => (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    active={isActive(item.href)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button
                  href="/contact?intent=quote"
                  size="md"
                  className="group/quote"
                >
                  Get a Quote
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/quote:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
              </div>
            </div>

            {/* Mobile bar */}
            <div className="flex h-16 items-center justify-between lg:hidden">
              <Logo />
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-action hover:text-action"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </Container>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-hairline bg-white lg:hidden">
            <Container className="py-5">
              <p className="pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Services
              </p>
              <ul className="border-t border-hairline">
                {services.map((s) => {
                  const Icon = serviceIcons[s.href] ?? Wallet;
                  return (
                    <li key={s.href} className="border-b border-hairline">
                      <Link
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-4 py-4"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-surface-blue text-brand">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-ink">
                            {s.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                            {s.blurb}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-6 border-t border-hairline">
                {[...leftLinks.filter((l) => !l.hasDropdown), ...rightLinks].map(
                  (item) => (
                    <li key={item.label} className="border-b border-hairline">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-4 text-base font-medium",
                          isActive(item.href) ? "text-action" : "text-ink",
                        )}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
                      </Link>
                    </li>
                  ),
                )}
              </ul>

              <div className="pt-6">
                <Button
                  href="/contact?intent=quote"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>

              {/* Same two facts as the desktop strip — they matter most here. */}
              <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-ink"
                >
                  <Phone className="h-4 w-4 text-brand" aria-hidden />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-ink"
                >
                  <Mail className="h-4 w-4 text-brand" aria-hidden />
                  {site.email}
                </a>
                <p className="inline-flex items-center gap-2.5 text-xs text-muted">
                  <Clock className="h-4 w-4 text-brand" aria-hidden />
                  {site.responsePromise}
                </p>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Spacer for the fixed header. Must equal the *unscrolled* bar heights:
          mobile 64px; desktop 40 (utility) + 80 (main) = 120px. */}
      <div aria-hidden className="h-16 lg:h-[7.5rem]" />
    </>
  );
}

/**
 * Nav link with an underline that wipes in from the left — the same gesture as
 * FooterLink, so hover feels like one system across the page. The current page
 * keeps the underline permanently, which is how you know where you are.
 */
function NavLink({
  href,
  active,
  children,
  ...rest
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav relative inline-flex items-center gap-1 py-1.5 text-sm font-medium transition-colors duration-200",
        active ? "text-brand" : "text-ink/75 hover:text-brand",
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
        )}
      />
    </Link>
  );
}
