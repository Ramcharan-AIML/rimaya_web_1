import { Star, ShieldCheck, CalendarCheck, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { site } from "@/lib/site";

const items = [
  {
    icon: Star,
    title: `${site.credentials.rating}★ rating`,
    sub: "Rated by real clients",
  },
  {
    icon: CalendarCheck,
    title: `Established ${site.credentials.established}`,
    sub: "UK registered company",
  },
  {
    icon: BadgeCheck,
    title: site.credentials.vat,
    sub: "Fully compliant",
  },
  {
    icon: ShieldCheck,
    title: "A-rated sponsor licence",
    sub: "Can sponsor Skilled Worker visas",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-soft-blue border-y border-hairline">
      <Container className="py-6">
        <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {items.map(({ icon: Icon, title, sub }) => (
            <StaggerItem as="li" key={title} className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-white text-action">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-ink">
                  {title}
                </p>
                <p className="text-xs leading-tight text-muted">{sub}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
