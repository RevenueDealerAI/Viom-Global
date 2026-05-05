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

      <div className="relative mx-auto mt-10 grid aspect-square w-full max-w-[680px] place-items-center sm:mt-14 lg:h-[720px] lg:w-[720px] lg:max-w-none">
        {/* corner labels — top pair shown from sm, bottom pair from lg */}
        <span className="pointer-events-none absolute left-0 top-0 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low sm:inline-flex">
          <span className="h-px w-5 bg-accent" />
          ENTERPRISE
        </span>
        <span className="pointer-events-none absolute right-0 top-0 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low sm:inline-flex">
          AI-NATIVE
          <span className="h-px w-5 bg-accent" />
        </span>
        <span className="pointer-events-none absolute bottom-0 left-0 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low lg:inline-flex">
          <span className="h-px w-5 bg-accent" />
          GOVERNED
        </span>
        <span className="pointer-events-none absolute bottom-0 right-0 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low lg:inline-flex">
          OBSERVABLE
          <span className="h-px w-5 bg-accent" />
        </span>

        <div className="absolute inset-4 sm:inset-6 lg:inset-0">
          <NeuralLattice fluid />
        </div>

        {/* center capsule */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-4">
          <div className="max-w-full rounded-[24px] border border-accent/60 bg-elev/85 px-4 py-3 text-center font-mono text-[11px] leading-[1.4] text-fg backdrop-blur-md sm:rounded-pill sm:px-6 sm:text-[13.5px] sm:leading-[1] lg:text-[14px]">
            Automation + Intelligence + Workflows + Trust
          </div>
        </div>
      </div>
    </Container>
  );
}
