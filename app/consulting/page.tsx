import type { Metadata } from "next";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  TrendingUp,
  Settings2,
  ClipboardCheck,
  MessageSquare,
  Search,
  Rocket,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import FeatureCards from "@/components/sections/FeatureCards";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Practical business consulting from Rimaya — advice to help your business run leaner, safer, and smarter. Book a consultation.",
};

/**
 * CONTENT NOTE: The specific consulting offering is to be confirmed by the client.
 * The areas below are sensible placeholders that mirror the other service pages.
 * Replace the copy with Rimaya's real consulting services once received.
 */
const areas = [
  {
    icon: ShieldCheck,
    title: "Compliance & risk",
    body: "Practical guidance to keep your business on the right side of regulation and reduce avoidable risk.",
  },
  {
    icon: Users,
    title: "People & HR advisory",
    body: "Support with the people side of your business — structure, policy, and getting the best from your team.",
  },
  {
    icon: TrendingUp,
    title: "Growth & efficiency",
    body: "A clear-eyed look at where you can save, streamline, and grow — with steps you can actually act on.",
  },
  {
    icon: Settings2,
    title: "Systems & process",
    body: "Advice on the tools and processes that make finance, payroll, and operations run smoothly.",
  },
  {
    icon: ClipboardCheck,
    title: "Financial planning support",
    body: "Sensible, jargon-free planning to help you make confident decisions about the road ahead.",
  },
  {
    icon: Lightbulb,
    title: "Tailored advisory",
    body: "Not sure where to start? Bring us the challenge and we'll help you find a practical way forward.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "1. Talk it through",
    body: "We start with a conversation to understand your business and what you're trying to achieve.",
  },
  {
    icon: Search,
    title: "2. Assess & advise",
    body: "We look at the detail, identify what matters most, and give you clear, honest recommendations.",
  },
  {
    icon: Rocket,
    title: "3. Move forward",
    body: "You get a practical plan and next steps — and our support to put them into action.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        breadcrumb="Consulting"
        eyebrow="Consulting"
        title="Expert guidance when the decision matters."
        intro="Sometimes you need a steady, experienced partner to help you think things through. Rimaya's consulting gives you practical advice to run your business leaner, safer, and smarter."
        primary={{ label: "Book a consultation", href: "/contact?intent=consulting" }}
        secondary={{ label: "See all services", href: "/#services" }}
      />

      <FeatureCards
        eyebrow="What we help with"
        title="Advice that turns into action."
        intro="Wherever you need a clearer head or a second opinion, we bring practical experience — not jargon."
        features={areas}
        tone="surface"
      />

      {/* How it works */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Simple, straightforward, and built around you."
            intro="No lengthy processes — just clear steps from first conversation to real progress."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="article" key={s.title} delay={i * 0.1}>
                <div className="flex h-full flex-col border border-hairline bg-white p-8 transition-shadow duration-200 hover:card-shadow">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-brand text-white">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Let's talk"
        title="Book a consultation."
        intro="Bring us the challenge you're facing. We'll listen, give you honest advice, and help you find a practical way forward."
        primaryLabel="Book a consultation"
        primaryHref="/contact?intent=consulting"
      />
    </>
  );
}
