import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Card } from "@/components/primitives/Card";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABand } from "@/components/marketing/CTABand";
import { NeuralLattice } from "@/components/three/NeuralLattice";
import { StatBlock } from "@/components/marketing/StatBlock";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Virtual AI Teams",
  description:
    "Vetted AI, ML, and prompt engineers — embedded into your team in under 14 days.",
};

const ROLES = [
  { role: "AI Engineer", chips: ["LLM apps", "RAG", "evaluation", "observability", "Python", "TypeScript"] },
  { role: "ML Engineer", chips: ["training", "fine-tuning", "MLOps", "feature stores", "PyTorch"] },
  { role: "Prompt Engineer", chips: ["eval design", "red-teaming", "prompt opt", "agentic patterns"] },
  { role: "AI PM", chips: ["discovery", "roadmapping", "policy", "vendor mgmt"] },
  { role: "Data Engineer", chips: ["ELT", "vector DBs", "governance", "lineage", "dbt", "Snowflake"] },
];

const TIMELINE = [
  { d: "Day 1", t: "Intake brief", c: "60-min scoping with a senior architect, not an account rep." },
  { d: "Day 3", t: "Profile match", c: "Three calibrated profiles with code samples and references." },
  { d: "Day 7", t: "Calibration interviews", c: "Live working sessions with your team. Real problems." },
  { d: "Day 14", t: "Embedded", c: "Full-time, in your standup, in your repo, on your roadmap." },
];

export default function VirtualTeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="VIRTUAL AI TEAMS"
        accent="Hire AI engineers"
        white="in days, not months."
        sub="Vetted AI, ML, and prompt engineers — embedded into your team in under 14 days. Calibrated to your stack, your review process, your standup."
        primary={{ label: "Get Profiles", href: "/book-call" }}
        secondary={{ label: "How calibration works", href: "/contact" }}
        visual={<NeuralLattice size={460} />}
      />

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// ROLES WE PLACE</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">Five roles.</span>
              <span className="wht">All vetted by senior engineers.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r, i) => (
              <Reveal key={r.role} delay={i * 0.05}>
                <Card variant="interactive" className="flex h-full flex-col gap-4 p-7">
                  <h3 className="text-[22px] font-semibold text-fg">{r.role}</h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {r.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-pill border border-line-strong px-3 py-[5px] font-mono text-[11px] text-fg-mid"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// ONBOARDING TIMELINE</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">Two weeks</span>
              <span className="wht">from intake to embedded.</span>
            </h2>
          </div>
          <ol className="relative grid gap-px overflow-hidden rounded-card-lg border border-line-dark bg-line-dark md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((s) => (
              <li key={s.d} className="flex flex-col gap-3 bg-card p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {s.d}
                </span>
                <h3 className="text-[22px] font-semibold text-fg">{s.t}</h3>
                <p className="text-[14px] text-fg-mid">{s.c}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// WHY TEAMS PICK VIOM</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">The math works out.</span>
              <span className="wht">For both sides.</span>
            </h2>
          </div>
          <StatBlock
            stats={[
              { value: 14, prefix: "< ", suffix: "d", label: "To embed", caption: "vs. 6–12 weeks recruiting" },
              { value: 3, prefix: "Top ", suffix: "%", label: "Acceptance rate", caption: "into our network" },
              { value: 92, suffix: "%", label: "Convert to FTE", caption: "after first quarter" },
              { value: 0, suffix: "", label: "Lock-in", caption: "Replace at any time" },
            ]}
          />
        </Container>
      </Section>

      <Section tone="dark">
        <CTABand
          accent="Profiles in your inbox"
          white="within 72 hours."
          primary={{ label: "Get Profiles", href: "/book-call" }}
        />
      </Section>
    </>
  );
}
