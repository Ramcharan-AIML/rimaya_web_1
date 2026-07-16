# Rimaya — Website Storytelling & Architecture

> **What this document is:** This is the *storytelling blueprint* for the Rimaya website. The build brief (`rimaya-build-brief.md`) tells us *what* the business is and *what* to build. This document tells us *how the website talks to a visitor* — the order it reveals things, the feeling at each step, and the exact point where a stranger decides to become a customer.
>
> **This is for brainstorming, not building.** Nothing gets coded until we agree on this map together.

---

## 0. Two things to settle before anything else

Two decisions change the whole look, so I want them on the table first — not buried.

### 0.1 Colour palette conflict (needs your call)

- The **build brief (§9)** locks a palette called *"Navy & Emerald on Bone"* — deep navy, emerald green, off-white background.
- **Your instruction to me** says use **`#005597` (deep blue)** + **`#006dc1` (bright blue)** on a **white** theme.

These are two different looks. I can't follow both. **This whole document is written assuming your latest instruction wins** (two blues + white). If you actually want the navy/emerald version from the brief, tell me and I'll re-skin the plan. My recommendation: go with your two-blue + white — it's clean, modern, and reads as "tech-forward professional services."

**Working palette used in this doc:**

| Role | Colour | Where it's used |
| --- | --- | --- |
| Primary / brand anchor | `#005597` (deep blue) | Headings, nav, footer, dark bands, primary structure |
| Action / accent | `#006dc1` (bright blue) | **Every clickable call-to-action button.** This is the "click me" colour. |
| Canvas | `#FFFFFF` (white) | Main background |
| Soft surface | very light grey (e.g. `#F5F7FA`) | Alternating sections, cards, trust strip — adds depth without heavy borders |
| Text (dark) | near-black slate (e.g. `#1B2430`) | Body copy |
| Text (muted) | grey (e.g. `#6B7280`) | Captions, secondary lines |
| Hairlines / borders | light grey (e.g. `#E2E6EB`) | Sharp 1px borders on cards/buttons |

**The one hard rule:** the bright blue (`#006dc1`) is reserved for things you're meant to click. The deep blue (`#005597`) does the heavy lifting for structure and trust; the bright blue is the magnet. Keep the action blue rare so it always signals "click me" — if every element is bright blue, the buttons stop standing out.

### 0.2 Non-negotiable design rules (from you)

- **Sharp corners everywhere.** No rounded buttons, no rounded cards. Every edge is a clean 90° corner. This is a deliberate signature — it reads as precise, corporate, and confident.
- **Font:** Geist or Inter (both clean, professional, screen-first). Recommendation: **Geist** for headings + **Inter** for body, or just Inter throughout for simplicity. We lock this in the design phase.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS.

---

## 1. The core story of the whole website (read this first)

Before we talk about pages, understand the *one story* the entire site tells. Every page is a chapter of this.

> **"You have a problem. We are the safe, proven pair of hands that solves it. Here's the proof. Here's how to start — today."**

Rimaya sells trust, not features. Nobody hands over their company's payroll — or their next job application — to a firm they don't believe in. So the website's real job is **turning "I don't know these people" into "I trust these people enough to reach out."**

Everything is judged by one question: **does this move the visitor one step closer to reaching out?** If a section doesn't build trust or drive an action, it doesn't belong.

### The website talks to two different people

The site has a split personality on purpose, because two very different visitors arrive:

1. **The Business** — a company owner or manager who needs **Payroll, Recruitment, or Consulting.**
   - Their goal: *"I need a reliable partner to handle something important."*
   - Their conversion: **"Get a Quote" / "Book a Call."**

2. **The Candidate** — a person looking for a **job.**
   - Their goal: *"I want my next role."*
   - Their conversion: **"Apply + upload my CV."**

These two feed each other. Every candidate who uploads a CV makes Rimaya's pitch to employers stronger ("we have the talent ready"). So the candidate journey isn't a side feature — it quietly builds the company's biggest asset.

**The site's first job on every landing is to help each visitor instantly see "this path is mine"** — so neither one feels lost.

---

## 2. How a visitor moves through the site (the journey map)

Think of the site as a set of roads, all leading to one of two doors: **"Get a Quote"** (business) or **"Apply Now"** (candidate).

```
                          ┌─────────────────────────┐
                          │         HOMEPAGE          │
                          │   "Which path is mine?"   │
                          └────────────┬──────────────┘
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │   PAYROLL    │   │ RECRUITMENT  │   │  CONSULTING  │
            │  (flagship)  │   │   + JOBS     │   │              │
            └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
                   │                  │                  │
                   │            ┌─────┴──────┐           │
                   │            ▼            ▼           │
                   │      ┌──────────┐ ┌──────────┐      │
                   │      │ JOB LIST │ │ (business│      │
                   │      │  (feed)  │ │  pitch)  │      │
                   │      └────┬─────┘ └────┬─────┘      │
                   │           ▼            │            │
                   │     ┌──────────┐       │            │
                   │     │ ONE JOB  │       │            │
                   │     │  detail  │       │            │
                   │     └────┬─────┘       │            │
                   │          ▼             │            │
                   │   ╔═════════════╗      │            │
                   │   ║ APPLY + CV  ║      │            │
                   │   ║  (door #2)  ║      │            │
                   │   ╚═════════════╝      │            │
                   ▼          ▼             ▼            ▼
            ╔═══════════════════════════════════════════════╗
            ║   GET A QUOTE  /  BOOK A CALL   (door #1)      ║
            ║   Reachable from EVERY page, always visible.   ║
            ╚═══════════════════════════════════════════════╝

     Supporting pages that build belief: ABOUT · CONTACT
     Always-on: sticky header CTA · floating WhatsApp · footer
```

**The rule that makes this work:** no visitor is ever more than **one click** from a door. The "Get a Quote" button lives in the sticky header on every single page. The candidate always has "View Jobs / Apply" within reach. A visitor should never hit a dead end.

---

## 3. The pages (sitemap)

```
Home
├── Services ▾
│   ├── Payroll Solutions      → flagship service page
│   ├── Recruitment            → service pitch + leads into the job board
│   └── Consulting             → service page
├── Jobs                       → live job listings (filterable)
│   └── Jobs / [one job]       → full description → Apply + CV upload
├── About                      → story, values, credentials
└── Contact                    → enquiry form + office details
```

**Navigation bar (top of every page):**

```
[ Services ▾ ]  [ Jobs ]        — RIMAYA (logo) —        [ About ]  [ Contact ]   ▐ Get a Quote ▌
```

- Logo sits in the **centre** (premium, editorial, "established" feel).
- Nav links split left and right of it.
- The **"Get a Quote"** button is a solid **bright-blue** block on the far right — it visibly out-ranks every text link. It is the only bright-blue element in the nav, so the eye goes straight to it.
- The three services collapse under one **"Services ▾"** dropdown so the bar stays calm and uncrowded.
- **Testimonials are NOT a nav item** — they live inside the Home page.
- **Mobile:** logo + hamburger. The "Get a Quote" button stays prominent inside the opened menu. Most visitors arrive on mobile, so mobile is treated as the main design, not an afterthought.
- The header is **sticky** — it follows the visitor down every page, CTA always visible.

---

## 4. THE HOMEPAGE — told section by section

The homepage is the most important page. It's built as a **story spine**: the visitor arrives a stranger and, block by block, is walked toward a decision. Here is every section in order, what it says, why it's there, and what the visitor feels.

I'll describe each as: **what the visitor sees → the job it does → the feeling it creates.**

---

### SECTION 1 — The Header (sticky, always present)

**What the visitor sees:** The centred Rimaya logo, clean nav links, and one bold bright-blue **"Get a Quote"** button pinned to the right.

**The job it does:** Keeps the business door open at all times. No matter how far the visitor scrolls or wanders, converting is one click away.

**The feeling:** *"This looks like an established, organised company. And if I decide I want in, I know exactly where to click."*

---

### SECTION 2 — The Hero (the fork in the road)

**What the visitor sees:**
- A clear, confident headline that **leads with payroll** (the flagship business). Example direction: *"Payroll, sorted. Recruitment, delivered. Consulting, on your side."* — or a sharper single promise like *"Reliable payroll and recruitment for growing UK businesses."*
- One plain subline saying who it's for: *"We handle payroll, find you the right people, and advise you when it counts — so you can focus on running your business."*
- **Two buttons, side by side:**
  - **Primary (bright blue, solid): "Get a Payroll Quote"** → the business door.
  - **Secondary (deep-blue outline / lighter): "View Jobs"** → the candidate door.

**The job it does:** This is the most important moment on the whole site — **the fork in the road.** Within the first screen, both types of visitor see their own path clearly. Nobody is confused about whether this site is for them.

**The feeling:**
- Business visitor: *"Payroll — yes, that's exactly what I need. Let me get a quote."*
- Candidate: *"Jobs — that button's for me."*

> **Open question (from the brief):** Right now the *business* button is primary and *jobs* is secondary — because payroll/recruitment clients are the revenue. If you tell me candidates are actually your bigger volume, we flip which button gets the spotlight. **Your call.**

---

### SECTION 3 — The Trust Strip (proof in the first 5 seconds)

**What the visitor sees:** A thin, calm band directly under the hero showing hard proof:
- ★ ~4.4 customer rating
- Established 2022 (UK registered)
- VAT registered
- **A-rated sponsor licence** (can sponsor Skilled Worker visas — a genuine differentiator)

**The job it does:** A stranger won't hand over payroll to a firm they don't trust. Before we ask *anything* of the visitor, we give them reasons to believe. This band answers "are these people real and legitimate?" instantly.

**The feeling:** *"Okay — real company, real credentials, real reviews. I can relax a little."*

---

### SECTION 4 — The Three Service Pillars (choose your need)

**What the visitor sees:** Three sharp-cornered cards, side by side:

| Card | One-line promise | Its own button |
| --- | --- | --- |
| **Payroll Solutions** *(flagship — subtly larger / emphasised)* | "Accurate, compliant payroll run for you — every time." | **Explore Payroll →** |
| **Recruitment** | "The right people, placed fast — temporary or permanent." | **See Recruitment →** |
| **Consulting** | "Expert guidance when the decision matters." | **Discover Consulting →** |

Payroll gets a subtle visual lift (it's the key business), but all three are equally clickable.

**The job it does:** This is the site's main navigation moment. The visitor picks the need that's theirs and goes deeper into that service page. Each card is a signpost with its own door.

**The feeling:** *"There are three things they do. Mine is [X]. Let me go read about that."*

---

### SECTION 5 — "Why Rimaya" (handling the doubt)

**What the visitor sees:** A tight set of real reasons to choose Rimaya — not fluffy "we're the best" claims. From the brief's candidates, keep the strongest and merge the weak ones. Suggested final set of **four to five**:
- **Cost Efficiency** — clear value, no bloated fees.
- **Quickest Turnaround** — fast responses, fast delivery.
- **Risk Mitigated** — compliant, careful, correct — you're covered.
- **Extensive Network** — deep talent pool and reach.
- **Flexible Terms** — arrangements that fit how you actually work.

**The job it does:** By now a question is forming in the visitor's head: *"Why you and not a competitor?"* This section answers it directly, before doubt turns into a closed tab.

**The feeling:** *"These aren't just services — there's an actual reason to pick them over the next firm."*

---

### SECTION 6 — The Candidate Band (the job-seeker's moment)

**What the visitor sees:** A distinct band clearly aimed at job seekers (visually separated so business visitors don't confuse it with their track):
- Heading: *"Looking for your next role?"*
- A preview of **2–3 live vacancies** pulled straight from the real job board (title, location, type).
- Button: **"Browse all jobs / Apply now"** → the Jobs page.

**The job it does:** This is the candidate funnel earning real estate on the homepage — not a buried footer link. Every application feeds the CV database, which makes the recruitment pitch to employers stronger. It's a business asset disguised as a helpful feature.

**The feeling (candidate):** *"They actually have live jobs right now — and one of these looks like me. Let me apply."*

> **Depends on:** the live, data-driven job board (Section 8 below). The homepage pulls these vacancies automatically, so they're never stale.

---

### SECTION 7 — Social Proof (others trusted them, and it worked)

**What the visitor sees:** Real customer reviews/testimonials, presented cleanly — quote, name, company/role. **No clunky auto-spinning carousel.** Simple, readable, real.

**The job it does:** The visitor is now "warm" — they've seen the services, the reasons, the credentials. This is the nudge: *"real people trusted Rimaya and it worked out."* Proof from peers beats any claim the company makes about itself.

**The feeling:** *"Other businesses like mine trusted them and were happy. That lowers my risk."*

---

### SECTION 8 — The Final Conversion Block (last chance to act)

**What the visitor sees:** A full-width closing band, one single dominant bright-blue action:
- Heading: *"Ready to get started?"*
- Button: **"Get a Quote / Request a Callback"**
- A reassurance line right under it: *"We reply within 12 hours."*

**The job it does:** Catches every visitor who read the whole page but never clicked. This is the last, focused ask before the footer — no distractions, one action.

**The feeling:** *"I've seen enough. They reply fast. Let me reach out now."*

---

### SECTION 9 — The Footer (utility + a final trust anchor)

**What the visitor sees:** Contact block (real UK office address, phone, email), quick links, social icons (LinkedIn, Instagram), WhatsApp button, back-to-top.

**The job it does:** Practical navigation *and* a quiet final trust signal — a real physical UK address says "we're a genuine, findable company."

**The feeling:** *"Everything I need to reach them is right here. They're real and reachable."*

---

### Homepage spine at a glance

```
1. Header      →  "The door is always open."
2. Hero        →  "Which path is mine?"          (self-select)
3. Trust Strip →  "Can I trust them?"            (proof, fast)
4. Pillars     →  "Here's my need — go deeper."  (route)
5. Why Rimaya  →  "Why them, not a rival?"       (handle doubt)
6. Candidates  →  "Jobs are for me."             (feed the CV asset)
7. Testimonials→  "Others trusted them."         (peer proof)
8. Final CTA   →  "Okay — let's start."          (close)
9. Footer      →  "They're real and reachable."  (anchor)
```

Each block does exactly one job. The visitor is never asked to do two things at once, and is never left wondering "what is this section for?"

---

## 5. The other pages — told as chapters

Every service page follows the **same four-beat rhythm** so the site feels consistent and the visitor always knows where they are:

> **Intro (the promise) → What's included (the substance) → Why Rimaya (the reason) → CTA (the door).**

---

### 5.1 Payroll Solutions — the flagship (deepest page on the site)

This is the key business, so it's the most detailed and most persuasive page.

**Chapter 1 — The promise:** A confident opener: *"Payroll, handled properly — accurate, compliant, on time, every time."* Speak to the business owner's real fear: getting payroll wrong is stressful and risky. Rimaya removes that stress.

**Chapter 2 — What's included:** Cover the offering in real depth:
- Full B2B payroll processing, compliance, and reporting.
- Payroll for temporary/contract workers.
- Adjacent finance capability where relevant: bookkeeping, statutory accounts, VAT reports, management reporting, AP/AR, company incorporation, corporation tax, self-assessment. (Payroll and bookkeeping overlap heavily — showing both signals depth.)
- **Systems used** (Xero, Sage, QuickBooks, FreeAgent, Microsoft Dynamics 365) shown as small logos — a capability/trust signal that says "we work with the tools you already know."

**Chapter 3 — Why Rimaya for payroll:** Accuracy, compliance confidence, fast turnaround, one dependable partner instead of scattered tools.

**Chapter 4 — The door:** **"Get a Payroll Quote."**

> **Content gap to confirm:** Is payroll a full **B2B payroll bureau** (running payroll *for other businesses*), or something narrower? This decides how deep the page goes. **I need your answer.**

---

### 5.2 Recruitment — the pitch that leads into the job board

**Chapter 1 — The promise:** *"The right people, placed fast — temporary and permanent."*

**Chapter 2 — What's included:** Temp + permanent recruitment, the value proposition, sector expertise, and the approach. **Back it with real numbers** (placements per year, workers on payroll, turnover, multi-role clients) — real stats are powerful trust fuel.

**Chapter 3 — Why Rimaya:** Speed, network depth, quality of match, the A-rated sponsor licence (can sponsor Skilled Worker visas).

**Chapter 4 — The doors (this page has two audiences, so two CTAs):**
- Employers: **"Hire with us / Request talent."**
- Candidates: **"Browse jobs."** → flows straight into the live job board.

> **Content gap to confirm:** Real recruitment stats/numbers. **I need these from you.**

---

### 5.3 Consulting — the brand-new page

**Chapter 1–4:** Same four-beat rhythm as the others (intro → what's included → why Rimaya → CTA). Closing door: **"Book a consultation."**

> **BLOCKING content gap — REQUIRED from you:** I genuinely don't know what Consulting covers. I will **not** ship placeholder/lorem text here — that would damage trust, which is the whole point of the site. I'll build the *structure* now and drop in your real content the moment you send it. **This is the single most important piece of content I need from you.**

---

### 5.4 About — the belief-builder

**Chapter 1 — The story:** How Rimaya started (2022), what it stands for, who it serves.

**Chapter 2 — Credentials, front and centre:** Established 2022, VAT registered, **A-rated sponsor licence**, company registration number. These aren't fine print — they're the reason people trust a payroll firm.

**Chapter 3 — Values:** Collaboration, Customer Obsession, Quality, Ethics, Entrepreneurial Spirit (or your final set).

**Chapter 4 — The door:** **"Work with us / Get in touch."**

---

### 5.5 Contact — the general lead-catcher

**What's on it:**
- Enquiry form: name, email, subject, message → delivered **reliably** to your inbox.
- Contact details: UK office address, phone, email, and the **"we reply within 12 hours"** promise.
- WhatsApp quick-contact.

**The one rule:** the form **must actually deliver.** A lead that vanishes into a broken form is lost business. Validation, success/error messages, and spam protection all included.

---

## 6. The Job Board + CV Upload (the heart of the candidate funnel)

This is the one real piece of engineering, and it's mandatory. Here's the candidate's story:

```
1. BROWSE   →  Job list, filterable by keyword, location, and type
               (Full Time · Part Time · Freelance · Internship · Temporary),
               plus a "remote only" toggle.
                          │
                          ▼
2. OPEN     →  Click a job → full description, details, "what we're looking for."
                          │
                          ▼
3. APPLY    →  A clean form: name, email, phone, role (pre-filled),
               message, + CV upload (PDF / DOC / DOCX).
                          │
                          ▼
4. DELIVER  →  On submit:
               (a) emailed straight to the recruiter WITH the CV attached  ← fast MVP
               (b) optionally saved to a submissions store to review later ← the "proper" version
                          │
                          ▼
5. CONFIRM  →  Candidate sees a clear "Thank you — we've got your application"
               message. No confusion about whether it worked.
```

**Why it matters to the business:** jobs are **data-driven**, so the homepage teaser (Section 6) pulls live vacancies automatically, and you can post/edit jobs without touching code. Every CV uploaded grows the talent database — the asset that makes your recruitment pitch to employers stronger.

> **Decision I need from you (affects the backend):**
> 1. **Where will the site be hosted?**
> 2. Do you want **email-only** (fast MVP — applications land in your inbox with the CV attached), **or email + a simple dashboard** where you can log in and review all applications later?
>
> Default assumption if you don't specify: email delivery with CV attachment, plus a lightweight database table storing submissions.

---

## 7. Call-to-action strategy (how we make people click)

CTAs are how a website earns business, so they're deliberate, not scattered.

**The two doors, and their colours:**
- **Business door → "Get a Quote"** — solid **bright-blue** button. Lives in the sticky header (every page), the hero, the service pages, and the final homepage block.
- **Candidate door → "Apply / View Jobs"** — clearly styled and reachable from the hero, the candidate band, and the recruitment page.

**Rules we follow:**
1. **Bright blue = clickable, always.** Every primary action is bright blue (`#006dc1`). Nothing decorative uses it. This trains the visitor's eye in seconds: "bright blue means go."
2. **One dominant action per section.** Never make the visitor choose between five buttons — that causes hesitation, and hesitation loses leads.
3. **No dead ends.** Every page ends with an obvious next step. A visitor should never scroll to the bottom and think "…now what?"
4. **The header CTA never leaves.** Sticky, always visible — the business door is open on every screen, at every scroll position.
5. **Always-on WhatsApp button** floats in the corner for instant, low-effort contact.

---

## 8. Global elements (present on every page)

- **Sticky header** with the persistent bright-blue "Get a Quote" CTA.
- **Floating WhatsApp "Message Us"** button.
- **Back-to-top** button.
- **Footer** with quick links, UK office block, socials (LinkedIn, Instagram).
- **A CTA on every page** — no page ends without a door.
- **Forms that reliably deliver** (email + optional store), with validation, clear success/error states, and spam protection.
- **SEO baked in** — per-page titles/descriptions, semantic HTML, Open Graph tags, sitemap, and structured data (JobPosting schema for jobs, Organization schema for the company).
- **Fast on mobile** — optimised images, lazy loading, minimal blocking scripts.
- **Accessible** — semantic structure, keyboard-navigable, good contrast, alt text.

---

## 9. The visual language (design signature)

So the whole site feels like one confident brand:

- **Sharp corners, everywhere.** Buttons, cards, images, bands — all clean 90° edges. This is the brand's signature: precise, corporate, sure of itself.
- **White canvas.** Lots of breathing room. Restraint reads as premium.
- **Deep blue for structure, bright blue for action.** Deep blue (`#005597`) carries headings, nav, footer, and serious moments. Bright blue (`#006dc1`) is reserved for buttons and things to click.
- **Roughly 60 / 30 / 10:** ~60% white, ~30% deep blue + neutral text/structure, ~10% bright-blue action. The action blue stays rare so it stays powerful.
- **Clean, professional type** (Geist / Inter). Clear hierarchy — big confident headings, calm readable body.
- **Purposeful motion only** (Framer Motion): gentle reveals as sections enter, subtle hover feedback on buttons/cards. Motion supports trust; it's never decoration for its own sake.
- **Depth without heavy borders:** use the soft light-grey surface for alternating sections instead of drawing boxes everywhere.

---

## 10. Recommended tech stack

- **Next.js (App Router)** — server rendering for SEO + speed, API routes for forms/uploads.
- **TypeScript** — type safety across the build.
- **Tailwind CSS** — styling, with the palette above set as theme tokens (`brand` for `#005597`, `action` for `#006dc1`, `white`, `surface`, etc.) so colours stay consistent.
- **Framer Motion** — purposeful animation.
- **React Hook Form + Zod** — form state + validation (contact + job application).
- **File upload** — Next.js route handler / server action; validate CV type & size on the server.
- **Email delivery** — Resend / Nodemailer — sends enquiries + applications (with CV attached) to your inbox.
- **Jobs data layer** — start simple (typed JSON or a lightweight DB) so you can manage vacancies without code; upgrade to a CMS later if you want.
- **Optional submissions store** — a small DB table so you can review applications in a dashboard.
- **lucide-react** icons · **next/image** · native Next metadata for SEO.

---

## 11. What I need from you before we build (checklist)

Nothing here blocks us from agreeing the *structure* — but I need these to build for real:

| # | What I need | Why it matters | Priority |
| --- | --- | --- | --- |
| 1 | **Colour decision** — confirm two-blue + white (`#005597` + `#006dc1`, this doc) vs. the brief's navy + emerald | Sets the entire look | 🔴 Now |
| 2 | **Consulting content** — what the service actually covers | Can't build a real page without it | 🔴 Now |
| 3 | **Payroll scope** — full B2B bureau or narrower? | Sets depth of the flagship page | 🔴 Now |
| 4 | **Job board backend** — hosting + email-only vs. email + dashboard | Decides the backend | 🔴 Now |
| 5 | **Hero CTA balance** — business door primary (default) or candidate door? | Sets the hero's spotlight | 🟠 Soon |
| 6 | **Name change** — confirm "Rimaya Recruitment" → "Rimaya" (Payroll · Recruitment · Consulting) | Affects logo/nav wording | 🟠 Soon |
| 7 | **Real content** — final copy, real stats/numbers, real testimonials, real job listings | Replaces all my placeholders | 🟠 During build |
| 8 | **Brand assets** — logo files (the R-with-arrow mark), any imagery | Needed for hero, nav, cards | 🟠 During build |

### On images specifically (you offered — here's what would help)

If you can provide these, the site will look far more real and trustworthy:
- **Logo files** — the R-with-arrow mark, ideally SVG or high-res PNG (light + dark versions if you have them).
- **A hero image or direction** — do you want real photography (office/team/people) or a clean graphic/abstract style? Tell me the vibe and I'll match it.
- **Team or office photos** — great for the About page and the trust story.
- **System logos** — Xero, Sage, QuickBooks etc. (I can source these, just confirm which you actually use).
- **Any real testimonial photos/names** you're allowed to show.

Don't worry if you don't have polished images yet — I'll use clean placeholders that match the design so nothing looks broken, and we swap in the real ones later.

---

## 12. Where we are, and the next step

**This document = the map.** It covers the story, the journey, every page, every homepage section, the CTA strategy, and the visual language.

**What I'd like from you now:**
1. Read this and tell me if the **story and flow feel right** — especially the homepage spine (Section 4) and the two-audience split.
2. Answer the four 🔴 "Now" items in the checklist (Section 11), *especially* the **colour decision** and **Consulting content.**
3. Then give me the green light, and I'll start building — page by page, exactly to this map.

Nothing gets coded until you say go. Let's get the map right first.

*— End of storytelling & architecture document.*
