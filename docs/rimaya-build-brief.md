# Rimaya — Website Build Brief

> **Purpose of this document:** A complete, ready-to-build specification for the new Rimaya website. Hand this to Claude Code and build directly from it. Everything needed — positioning, strategy, information architecture, page-by-page structure, the homepage conversion spine, the navigation pattern, and the tech stack — is captured here.

---

## 1. The One Thing to Remember

**This website is a lead-generation engine, not a brochure.**

The client's own words: *"I am going to gain my business via the website."* Every decision — layout, copy, animation, component — gets judged against a single question: **does this help convert a stranger into a lead?** Visual polish matters, but only in service of trust and conversion. Nothing on this site is decoration for its own sake.

There are **two audiences and two conversions**, and the site must close both:

- **Businesses** needing Payroll / Recruitment / Consulting → conversion = *"Request a quote / Book a call."*
- **Candidates** seeking jobs → conversion = *"Apply online + upload CV."*

The candidate side feeds the business side: more candidates in the database makes the recruitment offer to employers stronger. The CV-upload flow is therefore not just a feature — it builds the company's core asset.

---

## 2. Business Positioning

Rimaya offers three services. The hierarchy is deliberate and must be reflected throughout the site:

1. **Payroll Solutions** — *the key/flagship business.* Gets headline weight and visual priority.
2. **Recruitment** — includes a live job board where candidates apply online and upload CVs.
3. **Consulting** — a distinct service offering.

### Brand / Name Direction
- Master brand: **"Rimaya"** (moving away from "Rimaya Recruitment," since "Recruitment" undersells the flagship payroll business).
- Support the name with a descriptor line where appropriate: **Payroll · Recruitment · Consulting**.
- Keep the existing **R-with-green-arrow** logo mark (not tied to recruitment specifically — it carries over fine).

### Trust Signals (conversion fuel — surface these prominently, not buried)
A stranger won't hand over their company payroll to a firm they don't trust. Push these forward:
- Established 2022 (UK registered company).
- VAT registered.
- **A-rated sponsor licence** (can sponsor Skilled Worker visas — strong differentiator).
- Company registration number.
- Real customer rating / reviews (~4.4★).
- Real UK office address, phone, email.
- "We reply within 12 hours" responsiveness promise.

### Traffic Caveat (design implication)
A website converts traffic that already arrives; it doesn't generate visitors from nothing. Bake in **on-page SEO fundamentals** (semantic HTML, metadata, fast load, mobile-first, structured data) so the site is ready to convert whatever traffic the client drives to it.

---

## 3. Information Architecture (Sitemap)

```
Home
├── Payroll Solutions      (flagship service page)
├── Recruitment            (service pitch + live Job Board with apply/CV upload)
│   └── Jobs               (job listings + individual job → application form)
├── Consulting             (service page)
├── About                  (story, values, credentials)
└── Contact                (enquiry form + details)
```

**Navigation labels:** Services (▾ Payroll, Recruitment, Consulting) · Jobs · About · Contact · **[Get a Quote]** (CTA button)

Notes:
- **Testimonials** live *inside* the Home page (a section), not as a standalone nav item.
- The three services can be grouped under a **"Services ▾" dropdown** in the nav to keep it clean (6 destinations + CTA is too many flat items around a centered logo — see §5).
- Every service page ends with its own conversion CTA.

---

## 4. Homepage — The Conversion Spine

The homepage is built as a **conversion spine**: self-select early → build trust → route to need → handle objections → capture candidates → reinforce → close. Every section either builds trust or drives an action.

### Section 1 — Header / Nav (persistent, sticky)
- Centered logo pattern (see §5 for the full nav spec).
- One persistent, visually dominant CTA button pinned to the right — **"Get a Quote"** (or "Book a Call") — that stays visible on scroll.
- **Intent:** no matter where the user is, the business conversion is one click away.

### Section 2 — Hero (payroll-led, single clear promise)
- Headline speaks **payroll first** (the key business).
- Subline: one plain sentence stating who it's for.
- **Two CTAs side by side:**
  - Primary → **"Get a Payroll Quote"** (business funnel)
  - Secondary → **"View Jobs"** (candidate funnel)
- **Intent:** the fork in the road. Both audiences self-select within the first screen.

### Section 3 — Trust Strip (immediately under hero)
- Thin band of proof: rating (★), "Established 2022," VAT registered, **A-rated sponsor licence**.
- **Intent:** give a stranger a reason to trust within the first 5 seconds, before anything else is asked of them.

### Section 4 — Three Service Pillars (spine's core)
- Three cards: **Payroll Solutions · Recruitment · Consulting**.
- Each card: one-line value prop + its **own CTA** to that service page.
- Payroll gets subtle visual priority (flagship); all three equally reachable.
- **Intent:** the main navigational conversion — visitor picks their need and goes deeper.

### Section 5 — "Why Rimaya" (objections handled)
- A tight set of reasons-to-choose (not generic features). Candidates for inclusion: **Cost Efficiency, Quickest Turnaround, Mitigate Risk, Payroll Facilities, Extensive Network, Flexible Terms** — keep the strongest, merge/cut weak overlaps.
- **Intent:** answer the "why you over a competitor?" question forming in the visitor's head.

### Section 6 — Candidate Funnel Teaser
- Band aimed only at job seekers: *"Looking for your next role?"* → preview of 2–3 live vacancies → **"Browse all jobs / Apply now."**
- **Intent:** feed the CV database (the asset that strengthens the employer pitch). Earns its own real estate, not a footer link.
- **Depends on:** dynamic job board (see §6).

### Section 7 — Social Proof (testimonials)
- Real reviews, presented cleanly (no clunky carousel).
- Placed here because the visitor is now warm; nudge of "others trusted them and it worked."

### Section 8 — Final Conversion Block
- Full-width closing CTA, single dominant action — **"Get started / Request a callback"** — plus reassurance line (*"we reply within 12 hours"*).
- **Intent:** catch everyone who scrolled the whole page without clicking. Last chance before the footer.

### Section 9 — Footer
- Contact details (address, phone, email), quick links, socials, WhatsApp button, back-to-top.
- **Intent:** utility + the real UK office details double as a trust signal.

**Open balance point to confirm with client:** Hero currently gives the **business funnel** the primary CTA and the **candidate funnel** the secondary. Deliberate — payroll/recruitment clients are the revenue. If the client sees candidates as the bigger volume play, rebalance.

---

## 5. Navigation Pattern (confirmed design direction)

**Confirmed direction: centered-logo nav, premium editorial feel.**

- **Logo centered**, nav items split to left and right edges (luxury / editorial brand pattern — signals "premium & established," which supports the trust job).
- **Desktop layout (target):**
  ```
  [ Services ▾ ]   [ Jobs ]      — LOGO —      [ About ]   [ Contact ]   [ Get a Quote ● ]
  ```
- **Critical adaptations (do NOT ship the flat reference as-is):**
  1. **CTA must be a real standout button**, not equal-weight text. On a lead-gen site the CTA has to visually out-rank the nav links. The right-most slot is a solid button that pops.
  2. **Tame the item count** — fold the three services under one **"Services ▾"** parent so the nav stays airy and uncramped around the centered logo.
- **Mobile:** this centered-split pattern collapses to **logo + hamburger** (standard). Most leads arrive on mobile — treat mobile as the primary case, not an afterthought. Ensure the CTA remains prominent in the mobile menu.
- Sticky on scroll, with the CTA always visible.

---

## 6. The Job Board + CV Upload (the one real engineering decision)

This is mandatory per the client and is the heart of the candidate funnel.

**Candidate flow:**
1. Browse job listings (filterable: keywords, location, job type — Full Time, Part Time, Freelance, Internship, Temporary; "remote only" toggle).
2. Open an individual job → see full description.
3. **Apply online** via a form: name, email, phone, role (pre-filled), message, **+ CV file upload**.
4. On submit, the application is:
   - **(a)** emailed to the recruiter **with the CV attached** (fast MVP), and
   - **(b)** optionally saved to a simple submissions store the client can review later (the "proper" version).

**Implementation notes:**
- Job listings should be **dynamic/data-driven** (so the homepage teaser in §4/Section 6 can pull live vacancies, and the client can post/edit jobs without touching code).
- Model jobs as structured data (title, company, location, type, posted date, description, remote flag).
- **File upload:** accept PDF/DOC/DOCX, enforce size limits and type validation server-side.
- **Confirm before locking the backend:** where will this be hosted, and does the client want email-only (MVP) or email + a submissions dashboard? This choice affects the stack. Default assumption below if unconfirmed: **email delivery with CV attachment via a serverless route + a lightweight database table for submissions.**

---

## 7. Page-by-Page Requirements

### 7.1 Home
The full conversion spine in §4.

### 7.2 Payroll Solutions (flagship)
- The deepest, most persuasive service page. Payroll is the key business.
- Cover the offering in real depth (e.g. full B2B payroll handling: processing, compliance, reporting, payroll for temporary/contract workers, etc.).
- Include supporting management-reporting / bookkeeping-adjacent capability where relevant (book-keeping, statutory accounts, VAT reports, management reporting, AP/AR, company incorporation, corporation tax, self-assessment) — payroll and bookkeeping overlap heavily.
- Where relevant, show accounting/payroll systems used (e.g. Xero, Sage, QuickBooks, FreeAgent, Microsoft Dynamics 365) as a trust/capability signal.
- **Ends with a conversion CTA:** "Get a Payroll Quote."
- **Content gap to confirm with client:** is payroll a full **B2B payroll bureau** (running payroll for other businesses) or narrower? This changes the page depth.

### 7.3 Recruitment
- Service pitch: temporary + permanent recruitment, the value proposition, track-record stats (placements/year, turnover, workers on payroll, multi-role clients — use real numbers from client), sector expertise, approach.
- Leads directly into the **Jobs board** (§6) — the live vacancies with apply/CV upload.
- **Ends with dual CTA:** employers → "Hire with us / Request talent"; candidates → "Browse jobs."

### 7.4 Consulting (brand new)
- Distinct service page.
- **Content gap — REQUIRED from client:** what Consulting actually covers. Do not ship lorem/placeholder. Structure the page to mirror the other service pages (intro → what's included → why Rimaya → CTA) and drop in real content once received.
- **Ends with a conversion CTA:** "Book a consultation."

### 7.5 About
- Company story, positioning, and **credentials front and center** (established 2022, VAT registered, A-rated sponsor licence, registration number).
- Company values (e.g. Collaboration, Customer Obsession, Quality, Ethics, Entrepreneurial Spirit).
- Reuse trust signals — this page reinforces the decision.
- **Ends with a CTA:** "Work with us / Get in touch."

### 7.6 Contact
- Enquiry form: name, email, subject, message → delivered to client's inbox reliably.
- Contact details: UK office address, phone, email, response promise ("within 12 hours").
- WhatsApp quick-contact.
- **Intent:** the general-purpose lead capture. Must actually deliver — a lead that goes nowhere is lost business.

---

## 8. Global Components & Behaviours

- **Sticky header** with persistent CTA (§5).
- **Persistent WhatsApp "Message Us"** floating button.
- **Back-to-top** button.
- **Footer** with quick links, corporate office block, socials (LinkedIn, Instagram).
- **CTAs on every page** — never leave a page without an obvious next step.
- **Forms** everywhere must reliably deliver to the client (email + optional store), with validation, success/error states, and spam protection (honeypot / rate-limit / captcha as appropriate).
- **SEO baked in:** per-page metadata, semantic structure, Open Graph tags, sitemap, structured data (JobPosting schema for jobs, Organization schema for the business).
- **Performance:** fast on mobile — optimized images, lazy loading, minimal blocking JS.
- **Accessibility:** semantic HTML, keyboard navigable, sufficient contrast, alt text.

---

## 9. Color System (finalized — "Navy & Emerald on Bone")

The palette is decided. Use it consistently; do not improvise colors. The discipline here is the point — two brand colors carrying real meaning, plus a neutral scale, on an off-white base. Restraint is what makes it read as premium and trustworthy (the opposite of the "bright-blue-everywhere template" look we are deliberately avoiding).

**Background — off-white, never pure `#FFFFFF`:**
- Base canvas: `#FAFAF7` — warm bone white (softer, more premium than stark white).
- Alt surface: `#F2F4F1` — alternating sections, cards, the trust strip. Adds depth without borders everywhere.

**Primary — Deep Navy (anchor / brand color):**
- `#0E2A47` — headings, footer, dark bands, nav text, the centered-logo nav. This is the dominant brand color (replaces any bright blue entirely). Navy = trust, stability, finance.
- Lighter step: `#1B3A5C` — hover states, secondary dark surfaces.

**Accent — Emerald (CTAs / action / growth):**
- `#0F8A56` — every primary button ("Get a Quote," "Apply Now"), active states, key highlights. Signals money + "go." Honors the logo's green arrow.
- Hover / darker: `#0B7043`.

**Neutrals (text + structure):**
- Headings: `#14213A` (near-navy, softer than pure black)
- Body text: `#3F4A5A`
- Muted / captions: `#8A94A3`
- Hairlines / borders: `#E4E7E1`

**Logo blue (`~#1E6FD9`) — supporting role only:**
- Permitted for small icon fills, link underlines, subtle details. **Never** as a section background or dominant surface. Demoting this blue to an accent is exactly what separates the new site from the old one.

**Usage rules (enforce these):**
- **60 / 30 / 10 ratio:** ~60% white/bone, ~30% navy + neutrals, ~10% emerald.
- **Emerald appears only on things meant to be clicked.** One green button on a navy-and-white screen is magnetic; green everywhere kills its meaning. Primary CTAs = emerald, always.
- Navy does the heavy lifting for text and serious moments (footer, headers, nav, dark bands).
- Set these as Tailwind theme tokens (e.g. `bone`, `bone-alt`, `navy`, `navy-light`, `emerald` / `emerald-dark`, plus the neutral scale) so usage stays consistent across the build.

---

## 10. Tech Stack

**Core:**
- **Next.js** (App Router) — SSR/SSG for SEO + performance, API routes for form/upload handling.
- **TypeScript** — type safety across the board.
- **Tailwind CSS** — styling.
- **Framer Motion** — animations (purposeful motion: reveals, hero, hover states, page transitions — in service of trust/conversion, never gratuitous).

**Supporting (use where they earn their place):**
- **React Hook Form + Zod** — form state + schema validation (contact + job application).
- **File upload handling** — Next.js route handler / server action for CV uploads; validate type & size server-side.
- **Email delivery** — Resend / Nodemailer / similar, sending applications + enquiries (with CV attachment) to the client's inbox.
- **Data layer for jobs** — start simple (typed JSON / MDX or a lightweight DB such as SQLite/Postgres via Prisma, or a headless CMS like Sanity/Contentful) so the client can manage vacancies without code. Confirm hosting before choosing.
- **Submissions store (optional)** — lightweight DB table so the client can review applications, if they want more than email.
- **lucide-react** (or similar) — icons.
- **next/image** — image optimization.
- **next-seo** or native Next metadata API — SEO metadata.

**To confirm before locking backend choices:** hosting environment, and whether the client wants email-only vs email + submissions dashboard (§6).

---

## 11. Open Items to Confirm With Client (before / during build)

1. **Name change** — approve moving from "Rimaya Recruitment" → "Rimaya" (Payroll · Recruitment · Consulting descriptor).
2. **Consulting content** — what the service actually covers (required to build that page for real).
3. **Payroll scope** — full B2B payroll bureau, or narrower? (Sets the depth of the flagship page.)
4. **Job board backend** — hosting environment + email-only (MVP) vs email + submissions dashboard.
5. **Hero CTA balance** — business funnel as primary (default) vs candidate funnel, depending on which volume the client values more.
6. **Real content** — final copy, real stats/numbers, real testimonials, real job listings, brand assets (logo files, colours).

---

## 12. Design Phase (partially decided)

This brief covers **structure, strategy, and architecture**, plus the confirmed decisions below. Remaining visual details are agreed before/alongside build.

**Confirmed:**
- **Color system** — "Navy & Emerald on Bone" (§9). Locked.
- **Navigation** — centered-logo editorial pattern with standout emerald CTA button and Services dropdown (§5). Locked.
- **Overall aesthetic** — premium, clean, modern, trust-building, with purposeful (never gratuitous) animation via Framer Motion.

**Still to decide in the design phase:**
- Typography (type family, scale, weights).
- Imagery direction (photography style, illustration vs. photo, iconography).
- Motion language specifics (transition timings, reveal patterns).
- Spacing / grid system details.

---

*End of build brief.*
