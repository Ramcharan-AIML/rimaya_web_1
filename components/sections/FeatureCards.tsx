import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CardBrackets from "@/components/ui/CardBrackets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export default function FeatureCards({
  eyebrow,
  title,
  intro,
  features,
  columns = 3,
  tone = "white",
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  features: Feature[];
  columns?: 2 | 3;
  tone?: "white" | "surface" | "soft-blue";
  align?: "left" | "center";
}) {
  const bg =
    tone === "surface"
      ? "bg-surface"
      : tone === "soft-blue"
        ? "bg-soft-blue border-y border-hairline"
        : "bg-white";

  return (
    <section className={cn("py-20 sm:py-24", bg)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          align={align}
        />
        <div
          className={cn(
            "mt-12 grid gap-6",
            columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {features.map((f, i) => (
            <Reveal as="article" key={f.title} delay={i * 0.06}>
              <div className="group relative flex h-full flex-col border border-hairline bg-white p-7 transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover">
                <CardBrackets />
                <span className="inline-flex h-12 w-12 items-center justify-center bg-surface-blue text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
