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
      {/* suppressHydrationWarning covers <body>'s own attributes only, not its
          children. Extensions (Grammarly, password managers) inject attributes
          here before React hydrates, which React reports as a mismatch even
          though nothing is wrong with the app. Scoped this tightly so a real
          mismatch inside the tree still surfaces. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-canvas text-ink"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
