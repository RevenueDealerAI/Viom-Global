import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { NeuralLattice } from "../three/NeuralLattice";
import { Reveal } from "../motion/Reveal";

type Props = {
  accent?: string;
  white?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTABand({
  accent = "Ready to put AI to work?",
  white = "Let's build your platform.",
  primary = { label: "Book Strategy Call", href: "/book-call" },
  secondary = { label: "Watch Platform Tour", href: "/ai-automation" },
}: Props) {
  return (
    <Container>
      <div className="relative isolate overflow-hidden rounded-card-lg border border-line-strong bg-elev px-5 py-14 sm:px-8 sm:py-20 md:px-16 md:py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 -translate-y-1/2 translate-x-[20%] opacity-30">
          <NeuralLattice size={520} ambient />
        </div>
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(11,95,74,0.35), transparent 60%)",
          }}
        />
        <Reveal>
          <h2 className="h2 max-w-[820px]">
            <span className="acc">{accent}</span>
            <span className="wht">{white}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={primary.href}
              variant="primary"
              className="w-full justify-center sm:w-auto"
            >
              {primary.label}
            </Button>
            <Button
              href={secondary.href}
              variant="secondary"
              className="w-full justify-center sm:w-auto"
            >
              {secondary.label}
            </Button>
          </div>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.18em] text-fg-low sm:text-[11px]">
            // avg. response time: under 2 hours
          </p>
        </Reveal>
      </div>
    </Container>
  );
}
