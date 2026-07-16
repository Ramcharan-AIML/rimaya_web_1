# Rimaya — Website

Lead-generation website for **Rimaya** (Payroll · Recruitment · Consulting).
Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

Design and strategy live in [`docs/`](docs/):
- `rimaya-storytelling-architecture.md` — the story, journey, page-by-page structure
- `rimaya-design-system.md` — colours, backgrounds, typography, components
- `rimaya-homepage-summary.md` — one-page overview (for stakeholders)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Environment (email delivery)

Copy `.env.example` to `.env.local` and fill in the values. Without a
`RESEND_API_KEY`, contact + job-application submissions are **logged to the
server console** so the flow works in development. With a key, they are emailed
to `RIMAYA_INBOX` (job applications include the CV as an attachment).

## Design system

Colours, fonts, and layout tokens are defined in [`app/globals.css`](app/globals.css):
- `--color-brand` `#005597` (deep blue — structure/trust)
- `--color-action` `#006dc1` (bright blue — buttons/clickable only)
- Sharp 90° corners everywhere (`* { border-radius: 0 }`)
- Fonts: Geist (headings) + Inter (body)

## Managing content

- **Jobs:** edit [`lib/jobs.ts`](lib/jobs.ts) — a typed array drives the job board,
  the homepage teaser, and each job detail page. Add/remove objects; no other
  changes needed. (Upgrade path: swap this file for a CMS/DB later.)
- **Company details:** edit [`lib/site.ts`](lib/site.ts) — name, contact, address,
  socials, credentials. Values marked `// TODO` are placeholders.

## ⚠️ Placeholders to replace before launch

Search the code for `TODO` and `NOTE`. Key items:
- Real contact details in `lib/site.ts` (phone, email, address, company/VAT no., WhatsApp, socials).
- Real **Consulting** content in `app/consulting/page.tsx` (currently sensible placeholder copy).
- Real recruitment **stats** in `app/recruitment/page.tsx`.
- Real **testimonials** in `components/home/Testimonials.tsx`.
- Real **job listings** in `lib/jobs.ts`.
- Confirm the final **domain** in `lib/site.ts` (`url`) for SEO/sitemap.

## Routes

`/` · `/payroll` · `/recruitment` · `/consulting` · `/jobs` · `/jobs/[slug]`
· `/about` · `/contact` · `/api/contact` · `/api/apply` · `/sitemap.xml` · `/robots.txt`
