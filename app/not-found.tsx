import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-hero-wash">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-action">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
