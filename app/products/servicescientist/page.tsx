import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Card } from "@/components/primitives/Card";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABand } from "@/components/marketing/CTABand";
import { NeuralLattice } from "@/components/three/NeuralLattice";
import { Reveal } from "@/components/motion/Reveal";
import { ShieldCheck, GitBranch, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "ServiceScientist",
  description:
    "Enterprise workflow optimization powered by ServiceScientist — Viom's flagship platform for cross-system AI work.",
};

const FEATURES = [
  {
    Icon: ShieldCheck,
    name: "AI Resolution Center",
    desc: "Auto-triages and resolves incidents end-to-end. Human review only where policy requires it.",
    items: ["Multi-step runbooks", "Policy-aware actions", "Replayable sessions"],
  },
  {
    Icon: GitBranch,
    name: "Workflow Automation",
    desc: "Composes cross-system workflows with retries, fan-out, and structured approvals.",
    items: ["200+ first-party connectors", "Visual graph editor", "Versioned with rollback"],
  },
  {
    Icon: UsersRound,
    name: "AI-Augmented Staffing",
    desc: "Pairs your human teams with copilots tuned to their queue. Adoption metrics built-in.",
    items: ["Per-seat copilots", "Team-level guardrails", "Quality + cost telemetry"],
  },
];

const COMPLIANCE = [
  { k: "SOC 2", v: "Type II Certified" },
  { k: "ISO 27001", v: "In flight, Q2 2026" },
  { k: "GDPR", v: "Data residency by region" },
  { k: "HIPAA", v: "BAAs available" },
];

export default function ServiceScientistPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICESCIENTIST"
        accent="Enterprise workflow optimization"
        white="powered by ServiceScientist."
        sub="Built natively by Viom, ServiceScientist plays nicely with the systems you already pay for — including your existing ServiceNow estate as a credibility signal of how we integrate, not a dependency."
        primary={{ label: "Book Demo", href: "/book-call" }}
        secondary={{ label: "Architecture brief", href: "/contact" }}
        visual={<NeuralLattice fluid />}
      />

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// THREE BLOCKS</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">One platform.</span>
              <span className="wht">Three reinforcing surfaces.</span>
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.06}>
                <Card variant="interactive" className="flex h-full flex-col gap-5 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-card border border-accent/30 bg-accent/10 text-accent">
                    <f.Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="text-[22px] font-semibold leading-[1.25] text-fg">{f.name}</h3>
                  <p className="text-[14.5px] text-fg-mid">{f.desc}</p>
                  <ul className="mt-2 flex flex-col gap-2 text-[13.5px] text-fg-mid">
                    {f.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-[4px] w-[4px] rounded-full bg-accent" />
                        {it}
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
            <Eyebrow>// COMPLIANCE</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">Built for the security teams</span>
              <span className="wht">that actually approve things.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-card-lg border border-line-dark bg-line-dark md:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE.map((c) => (
              <div key={c.k} className="flex flex-col gap-2 bg-card p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
                  {c.k}
                </span>
                <span className="font-mono text-[15px] text-fg">{c.v}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <CTABand
          accent="See the platform live."
          white="Bring your hardest workflow."
          primary={{ label: "Book Demo", href: "/book-call" }}
        />
      </Section>
    </>
  );
}
