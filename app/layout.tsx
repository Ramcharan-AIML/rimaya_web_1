import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";
import { site } from "@/lib/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Payroll · Recruitment · Consulting`,
    template: `%s — ${site.name}`,
  },
  description:
    "Rimaya delivers accurate, compliant payroll, fast recruitment, and expert consulting for growing UK businesses. Established 2022 · VAT registered · A-rated sponsor licence.",
  keywords: [
    "payroll services UK",
    "recruitment agency",
    "business consulting",
    "payroll bureau",
    "skilled worker visa sponsor",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Payroll · Recruitment · Consulting`,
    description:
      "Accurate, compliant payroll, fast recruitment, and expert consulting for growing UK businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {/* Reinstates a dismissed utility strip *before* first paint. React can't
            do this: reading localStorage during render would make the client's
            first render disagree with the server's and blow up hydration (see
            CLAUDE.md §11). So the pre-paint state is CSS, driven by this flag,
            and Header owns it from hydration onward. Both must agree — see the
            html[data-strip="off"] rules in globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("rimaya:strip")==="off"){document.documentElement.dataset.strip="off"}}catch(e){}`,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
