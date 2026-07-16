# Rimaya — Design System & Visual Spec

> **What this is:** The locked visual language for the build — colours, backgrounds, typography, components, and motion. This turns the storytelling architecture (`rimaya-storytelling-architecture.md`) into concrete, buildable design rules. Validated against the `ui-ux-pro-max` design intelligence skill and styled around an **Azure-inspired background theme**.

---

## 1. Design direction (one line)

**Clean, airy, corporate-trust design on a white canvas, with soft light-blue gradient atmospherics (Azure-style), two brand blues, and sharp 90° corners throughout.**

The skill independently recommended a **"Trust & Authority"** style for this exact business type (payroll/finance/professional services) — credentials, badges, metrics, WCAG-AAA contrast. That is precisely our trust-signal strategy, so we're aligned.

---

## 2. Colour system (LOCKED)

Two brand blues + a neutral scale on white. The neutral scale comes from the skill's validated B2B-service palette.

### Brand blues (yours)
| Token | Hex | Role |
| --- | --- | --- |
| `brand` | **`#005597`** | Deep blue — headings, nav text, footer, dark bands, structure, small blue text on white |
| `action` | **`#006dc1`** | Bright blue — **buttons and clickable things only**, links, active states |
| `action-hover` | `#00559A` (≈ darkens toward brand) | Hover state for action buttons |

### Neutrals & surfaces (from skill's B2B palette)
| Token | Hex | Role |
| --- | --- | --- |
| `white` | `#FFFFFF` | Main canvas |
| `surface` | `#F8FAFC` | Alternating sections, cards, trust strip (very light blue-grey) |
| `surface-blue` | `#F0F6FF` | Soft blue wash for hero / feature bands (Azure feel) |
| `text` | `#0F172A` | Body text (slate-900) |
| `text-muted` | `#475569` | Captions, secondary lines (slate-600 — meets contrast) |
| `border` | `#E2E8F0` | Sharp 1px hairlines on cards/buttons/inputs |

### Contrast (verified — accessibility)
- White text on `#006dc1` = **5.31:1** → AA pass (normal text) ✓
- White text on `#005597` = **7.65:1** → AAA pass ✓
- `#0F172A` body text on white = ~17:1 → AAA ✓
- `#475569` muted on white = ~7:1 → AAA ✓
- **Rule:** any blue used as *small text* on white must be `#005597` (the darker one), never `#006dc1` alone at small sizes on light surfaces if it must carry information.

### The 60 / 30 / 10 discipline
~60% white/surface · ~30% deep blue + neutral text/structure · ~10% bright-blue action. The action blue stays rare so buttons always pop.

---

## 3. Background theme — "Azure-inspired" (the atmosphere)

This is the specific look you asked for from `azure.microsoft.com`. Azure's signature is **not** flat colour blocks — it's a white base with **subtle, soft light-blue gradient washes and glows** that make the page feel airy, modern, and premium. We recreate that with our blues.

### 3.1 The recipe
- **Base everywhere:** clean `#FFFFFF`.
- **Hero background:** a soft diagonal gradient wash from white into a very pale blue — plus a subtle radial "glow" behind the headline.
  ```css
  /* Hero wash */
  background:
    radial-gradient(60% 80% at 70% 20%, rgba(0,109,193,0.10), transparent 60%),
    linear-gradient(160deg, #FFFFFF 0%, #F0F6FF 55%, #EAF2FC 100%);
  ```
- **Alternating sections:** flip between pure `white` and `surface` (`#F8FAFC`) so the page has rhythm and depth **without heavy borders** — exactly the Azure section cadence.
- **Feature / trust bands:** the softer `surface-blue` (`#F0F6FF`) wash to lift key moments (trust strip, "Why Rimaya", final CTA).
- **Dark bands (footer, occasional feature):** deep `brand` blue `#005597` (or a `#00426F → #005597` gradient) with white text — the "serious" anchor moments.
- **Soft glows, not hard shapes:** any colour accents in the background are low-opacity radial glows (8–12% opacity blue), never solid geometric blocks. This is what reads as "Azure."

### 3.2 Section background map (homepage)
| Section | Background |
| --- | --- |
| Header (sticky) | White, subtle blur/translucency on scroll, 1px bottom hairline |
| Hero | White → pale-blue diagonal wash + soft radial glow |
| Trust strip | `surface-blue` (`#F0F6FF`) band |
| Service pillars | White |
| Why Rimaya | `surface` (`#F8FAFC`) |
| Candidate band | `surface-blue` (`#F0F6FF`) — visually distinct for job seekers |
| Testimonials | White |
| Final CTA | Deep `brand` blue band (`#005597`), white text, bright-blue button |
| Footer | Deep `brand` blue (`#005597`), white/muted text |

**Rule:** never two identical backgrounds touching. White → soft-blue → white → grey keeps the eye moving and each section distinct — which directly supports the "user never confuses the sections" goal.

---

## 4. Typography (LOCKED to your choice)

You asked for **Geist or Inter**. Both are clean, modern, screen-first, and read as professional — a better fit for this brand than the skill's default (Poppins/Open Sans), so we keep yours.

**Recommended pairing:**
- **Headings:** **Geist** (or Geist if unavailable → Inter). Tight, confident, modern.
- **Body:** **Inter**. Extremely readable at all sizes.
- Simplest option: **Inter for everything** — one family, zero risk, still premium. (Recommended if you want to keep it bulletproof.)

**Type rules (from skill's UX data):**
- Body text ≥ 16px on mobile.
- Line height 1.5–1.75 for body.
- Line length capped at ~65–75 characters.
- Clear scale — big confident headings, calm body. (e.g. Hero H1 ~48–64px desktop / ~32–40px mobile.)

---

## 5. Components (sharp corners — your signature rule)

**Every element has clean 90° corners. `border-radius: 0` across the board.** No rounded buttons, cards, inputs, or images.

### Buttons
| Type | Style |
| --- | --- |
| **Primary CTA** ("Get a Quote", "Apply Now") | Solid `action` `#006dc1`, white text, sharp corners, `cursor-pointer`, hover → `action-hover` with 200ms colour transition (no scale/layout shift) |
| **Secondary** ("View Jobs") | White or transparent bg, `brand` `#005597` text, 1px `brand` border, sharp corners; hover → light blue fill |
| **On dark bands** | White or bright-blue button on the deep-blue background |
- Min touch target 44×44px. Visible focus ring: `focus:ring-2 focus:ring-[#006dc1]`.

### Cards (service pillars, job cards, testimonials)
- White or `surface` background, 1px `#E2E8F0` border, sharp corners.
- Subtle shadow on hover (not scale). `cursor-pointer` if the whole card is clickable.
- Consistent internal padding; consistent icon sizing (24×24 viewBox, SVG only — **no emoji icons**).

### Forms (contact + job application)
- Clean white inputs, 1px `#E2E8F0` border, sharp corners, visible label above each field.
- Focus state: border turns `#006dc1` + focus ring.
- Clear inline error messages near the field; disabled + spinner on submit; success state after send.
- Keep required fields minimal (skill: fewer fields = higher conversion).

### Icons & logos
- SVG icons only (Lucide / Heroicons), consistent 24×24 sizing.
- System/brand logos (Xero, Sage, QuickBooks, LinkedIn) from official sources — never guessed.

---

## 6. Motion language (Framer Motion — purposeful only)

From the skill's UX rules, baked in:
- **Micro-interactions:** 150–300ms. Hover uses colour/shadow/opacity — **never** scale transforms that shift layout.
- **Section reveals:** gentle fade + small upward translate on scroll-in. `ease-out` for entering, `ease-in` for exiting.
- **No infinite/decorative animation** — continuous motion only for genuine loaders (spinner/skeleton).
- **Respect `prefers-reduced-motion`** — disable non-essential motion when the user asks for it.
- **Loading states** — skeletons/spinners for job board fetches and form submits; never a frozen blank screen.

---

## 7. Layout & structure rules

- **Consistent container width** (e.g. `max-w-7xl`) across all pages — no mixing.
- **Sticky header** with `padding-top` compensation so no content hides behind it.
- **Z-index scale:** 10 / 20 / 30 / 50 (header, dropdown, WhatsApp button, modal) — no arbitrary `z-[9999]`.
- **Responsive breakpoints tested at:** 375 / 768 / 1024 / 1440px. No horizontal scroll on mobile. Mobile is the primary case.
- **Semantic HTML** throughout (header, nav, main, section, article, footer) for SEO + accessibility.

---

## 8. SEO & performance (baked in from the start)

- Next.js **metadata API** per page (title, description) — no manual head tags.
- **OpenGraph images** for social sharing (`opengraph-image` / og property).
- **Route Handlers** (`app/api/.../route.ts`) for form + CV-upload endpoints.
- **Structured data:** `JobPosting` schema on jobs, `Organization` schema on the business.
- **next/image** with WebP, srcset, lazy loading; reserve space to avoid layout jumps.
- Sitemap + robots.

---

## 9. What the skill told us to AVOID (anti-patterns)

- ❌ Generic, credential-free content (we lead with real trust signals — good).
- ❌ AI-style purple/pink gradients (we're all-blue — good).
- ❌ Emoji as icons (SVG only).
- ❌ Hover states that cause layout shift (colour/shadow only).
- ❌ Two identical section backgrounds touching (we alternate white/blue/grey).

---

## 10. Final locked stack

- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS** (palette + neutrals as theme tokens).
- **Framer Motion** — purposeful animation.
- **React Hook Form + Zod** — forms.
- **Resend / Nodemailer** — email delivery (enquiries + applications with CV attached).
- **Route Handler / server action** — CV upload, server-side type + size validation.
- **Jobs data** — typed JSON to start (client-editable later / CMS upgrade path).
- **lucide-react** icons · **next/image** · native metadata for SEO.

---

*This design system is locked and ready to build against. Pairs with `rimaya-storytelling-architecture.md` (the what/why) and `rimaya-homepage-summary.md` (the manager overview).*
