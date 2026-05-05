import { Container } from "../primitives/Container";
import { Reveal } from "../motion/Reveal";

const ITEMS = [
  {
    cat: "ANALYST",
    title: "Recognized in Gartner® for AI Innovation",
    sub: "2026 cohort, applied AI category",
  },
  {
    cat: "MARKET",
    title: "G2 Leader, Enterprise Automation 2026",
    sub: "Spring report",
  },
  {
    cat: "ANALYST",
    title: "Forrester Wave™ Strong Performer",
    sub: "AI workflow platforms, Q1 2026",
  },
  {
    cat: "COMPLIANCE",
    title: "SOC 2 Type II Certified",
    sub: "ISO 27001 in flight",
  },
];

export function RecognitionStrip() {
  return (
    <Container>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
        // RECOGNIZED BY THE INDUSTRY
      </p>
      <div className="mt-12 grid gap-px bg-line-dark md:grid-cols-2 lg:grid-cols-4 lg:rounded-card-lg lg:overflow-hidden lg:border lg:border-line-dark">
        {ITEMS.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <div className="group relative flex h-full min-h-[180px] flex-col gap-3 bg-card p-7 transition-colors duration-300 hover:bg-elev">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
                {it.cat}
              </span>
              <h3 className="text-[18px] font-semibold leading-[1.3] text-fg">
                {it.title}
              </h3>
              <p className="mt-auto text-[13.5px] text-fg-mid">{it.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
