import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outlineOnDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:opacity-60 disabled:cursor-not-allowed select-none";

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-3 min-h-[44px]",
  lg: "text-base px-7 py-4 min-h-[52px]",
};

const variants: Record<Variant, string> = {
  // Bright-blue action — the only "click me" fill on light surfaces
  primary: "bg-action text-white hover:bg-action-hover",
  // Outline in deep brand blue
  secondary:
    "bg-white text-brand border border-brand hover:bg-surface-blue",
  ghost: "text-brand hover:text-action",
  // On dark navy bands
  onDark: "bg-white text-brand hover:bg-surface-blue",
  // Secondary action on dark bands — outline that fills white on hover.
  // A real variant rather than a className override, because `cn` is a plain
  // join (no tailwind-merge), so overrides collide with the variant instead of
  // replacing it.
  outlineOnDark:
    "border border-white/70 bg-transparent text-white hover:bg-white hover:text-brand hover:border-white",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } =
      props as ButtonAsLink;
    void _v; void _s; void _c; void _ch;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
