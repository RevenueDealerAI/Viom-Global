import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Card } from "@/components/primitives/Card";
import { ArrowGlyph } from "@/components/primitives/ArrowGlyph";
import { PageHero } from "@/components/marketing/PageHero";
import { NeuralLattice } from "@/components/three/NeuralLattice";
import { CTABand } from "@/components/marketing/CTABand";
import { CustomerCarousel } from "@/components/marketing/CustomerCarousel";
import { IndustryGrid } from "@/components/marketing/IndustryGrid";
import { StatBlock } from "@/components/marketing/StatBlock";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "AI Automation",
  description:
    "Operations that run themselves — automate workflows across every system, governed end to end.",
};

const PILLARS = [
  {
    title: "Customer support",
    items: ["Tier-0 deflection", "Agent assist", "Auto-triage", "Sentiment routing"],
  },
  {
    title: "Finance ops",
    items: ["Reconciliation", "AP automation", "Anomaly detection", "Audit packets"],
  },
  {
    title: "IT incident response",
    items: ["Auto-triage", "Runbook execution", "Postmortem drafts", "Change control"],
  },
  {
    title: "HR & onboarding",
    items: ["Day-1 access", "Doc collection", "Compliance training", "Renewals"],
  },
  {
    title: "Sales ops",
    items: ["Lead enrichment", "CRM hygiene", "Quote routing", "Forecast prep"],
  },
  {
    title: "Compliance & audit",
    items: ["Evidence gathering", "Control testing", "Vendor reviews", "Renewals"],
  },
];

export default function AiAutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="AI AUTOMATION"
        accent="Operations that run themselves"
        white="not the other way around."
        sub="Automate the workflows that run your business — from incident response to claims to reconciliation. Your systems, governed end to end."
        primary={{ label: "Book Automation Demo", href: "/book-call" }}
        secondary={{ label: "See Customer Stories", href: "/#customers" }}
        visual={<NeuralLattice size={480} />}
      />

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// WHAT WE AUTOMATE</Eyebrow>
            <h2 className="h2 max-w-[840px]">
              <span className="acc">Six work surfaces.</span>
              <span className="wht">One control plane.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <Card variant="interactive" className="group flex h-full flex-col gap-4 p-7">
                  <h3 className="text-[20px] font-semibold text-fg">{p.title}</h3>
                  <ul className="flex flex-col gap-2 text-[14px] text-fg-mid opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-accent">
                          <ArrowGlyph size={14} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <IndustryGrid />
      </Section>

      <Section tone="light" className="!pt-0">
        <CustomerCarousel />
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// MEASURED OUTCOMES</Eyebrow>
            <h2 className="h2 max-w-[820px]">
              <span className="acc">What you save</span>
              <span className="wht">when the work runs itself.</span>
            </h2>
          </div>
          <StatBlock
            stats={[
              { value: 62, prefix: "↓ ", suffix: "%", label: "Operational cost", caption: "across deployed workflows" },
              { value: 3.4, decimals: 1, suffix: "×", label: "Throughput", caption: "vs. previous baseline" },
              { value: 14, prefix: "< ", suffix: "d", label: "Time to deploy", caption: "first production workflow" },
              { value: 99.9, decimals: 1, suffix: "%", label: "Uptime SLA", caption: "with regional failover" },
            ]}
          />
        </Container>
      </Section>

      <Section tone="dark">
        <CTABand />
      </Section>
    </>
  );
}
