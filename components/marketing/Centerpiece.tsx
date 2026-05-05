import { Container } from "../primitives/Container";
import { NeuralLattice } from "../three/NeuralLattice";
import { Reveal } from "../motion/Reveal";

export function Centerpiece() {
  return (
    <Container>
      <Reveal>
        <h2 className="h2 max-w-[920px]">
          <span className="acc">Viom is the AI platform</span>
          <span className="wht">for business reinvention.</span>
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-14 grid h-[520px] w-full max-w-[760px] place-items-center md:h-[640px] lg:h-[720px]">
        {/* corner labels */}
        <span className="pointer-events-none absolute left-0 top-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
          <span className="h-px w-5 bg-accent" />
          ENTERPRISE
        </span>
        <span className="pointer-events-none absolute right-0 top-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
          AI-NATIVE
          <span className="h-px w-5 bg-accent" />
        </span>
        <span className="pointer-events-none absolute bottom-0 left-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
          <span className="h-px w-5 bg-accent" />
          GOVERNED
        </span>
        <span className="pointer-events-none absolute bottom-0 right-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
          OBSERVABLE
          <span className="h-px w-5 bg-accent" />
        </span>

        <NeuralLattice size={680} />

        {/* center capsule */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="rounded-pill border border-accent/60 bg-elev/80 px-6 py-3 font-mono text-[13.5px] text-fg backdrop-blur-md sm:text-[14px]">
            Automation + Intelligence + Workflows + Trust
          </div>
        </div>
      </div>
    </Container>
  );
}
