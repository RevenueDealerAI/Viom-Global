import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Button } from "../primitives/Button";
import { Reveal } from "../motion/Reveal";

type Props = {
  eyebrow: string;
  accent: string;
  white: string;
  sub: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: React.ReactNode;
};

export function PageHero({ eyebrow, accent, white, sub, primary, secondary, visual }: Props) {
  return (
    <section className="relative pb-16 pt-[120px] sm:pb-20 sm:pt-[160px] md:pt-[180px]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 40%, rgba(11,95,74,0.32), transparent 60%)`,
        }}
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <div className="flex flex-col gap-7">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="h1">
                <span className="acc">{accent}</span>
                <span className="wht">{white}</span>
              </h1>
              <p className="max-w-[560px] text-[16px] leading-[1.55] text-fg-mid sm:text-[18px] lg:text-[19px]">{sub}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                {primary && (
                  <Button
                    href={primary.href}
                    variant="primary"
                    className="w-full justify-center sm:w-auto"
                  >
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button
                    href={secondary.href}
                    variant="secondary"
                    className="w-full justify-center sm:w-auto"
                  >
                    {secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
          {visual && (
            <Reveal delay={0.1}>
              <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-none">
                {visual}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
