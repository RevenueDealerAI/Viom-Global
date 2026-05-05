import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Card } from "@/components/primitives/Card";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABand } from "@/components/marketing/CTABand";
import { NeuralLattice } from "@/components/three/NeuralLattice";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "LLM Copilots",
  description:
    "Custom AI copilots wired into your stack — domain-tuned, guardrailed, and shipping in weeks.",
};

const COPILOTS = [
  {
    name: "Engineering",
    sub: "Code review, incident summarization, runbook execution.",
    items: ["Repo-aware retrieval", "PR-level evals", "Per-team guardrails"],
  },
  {
    name: "Sales",
    sub: "Account briefs, follow-ups, CRM enrichment, deal hygiene.",
    items: ["Pipeline summaries", "Email drafts", "Forecast prep"],
  },
  {
    name: "Operations",
    sub: "Triage, routing, KB-grounded responses, postmortems.",
    items: ["Tier-0 deflection", "Cross-system actions", "Sentiment-aware routing"],
  },
];

const STEPS = [
  { n: "01", t: "Discover", d: "We map your top three copilot opportunities and the data they'll need." },
  { n: "02", t: "Wire", d: "We connect the model, your data, and your guardrails. Per-team policies." },
  { n: "03", t: "Eval", d: "We ship with an evaluation suite. Every prompt change is tested." },
  { n: "04", t: "Run", d: "We move to production with rollouts, observability, and per-tenant cost limits." },
];

export default function LlmPage() {
  return (
    <>
      <PageHero
        eyebrow="LLM COPILOTS"
        accent="Custom AI copilots"
        white="for your stack."
        sub="Domain-tuned LLM copilots that ship in weeks, not quarters. Your data, your guardrails, your model choice."
        primary={{ label: "Book AI Consultation", href: "/book-call" }}
        secondary={{ label: "Read the SDK docs", href: "/contact" }}
        visual={<NeuralLattice size={460} />}
      />

      <Section tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              <Eyebrow>// AI AGENTS</Eyebrow>
              <h2 className="h2">
                <span className="acc">Reasoning traces</span>
                <span className="wht">you can audit.</span>
              </h2>
              <p className="max-w-[480px] text-[16.5px] text-fg-mid">
                Every step the agent takes is observable, replayable, and tied to the policy that allowed it. No black boxes.
              </p>
              <ul className="space-y-2 text-[15px] text-fg">
                {[
                  "Per-step traces with inputs, outputs, and tool calls",
                  "Policy attribution: which rule allowed which action",
                  "Replay any session in a sandbox — no PII",
                  "Export to your SIEM in real time",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 inline-block h-[5px] w-[5px] rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={0.05}>
              <Card variant="mockup" className="p-5">
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-[6px] w-[6px] rounded-full bg-signal" />
                    Trace · session 8821
                  </span>
                  <span className="text-fg-low">3 tools · 1.4s</span>
                </div>
                <ol className="space-y-3 font-mono text-[12.5px] leading-[1.55] text-fg">
                  {[
                    { k: "search_kb", v: "→ 3 matched (top score 0.91)" },
                    { k: "rerank", v: "→ kept 2, dropped 1 (policy: pii)" },
                    { k: "compose", v: "→ draft 218 tokens (model: sonnet-4.6)" },
                    { k: "validate", v: "→ ✓ no leaked secrets, ✓ on-policy" },
                  ].map((row) => (
                    <li key={row.k} className="rounded-card border border-line-dark bg-elev/40 p-3">
                      <span className="text-accent">{row.k}</span>
                      <span className="ml-2 text-fg-mid">{row.v}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// COPILOT LIBRARY</Eyebrow>
            <h2 className="h2 max-w-[760px]">
              <span className="acc">Three places to start.</span>
              <span className="wht">Then wherever you need.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {COPILOTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <Card variant="interactive" className="flex h-full flex-col gap-4 p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Copilot · {c.name}
                  </span>
                  <h3 className="text-[24px] font-semibold text-fg">{c.name}</h3>
                  <p className="text-[14.5px] text-fg-mid">{c.sub}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-pill border border-line-strong px-3 py-[5px] font-mono text-[11px] text-fg-mid"
                      >
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
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              <Eyebrow>// INTERNAL TOOLS</Eyebrow>
              <h2 className="h2">
                <span className="acc">SDK-first.</span>
                <span className="wht">Drop into any tool.</span>
              </h2>
              <p className="max-w-[480px] text-[16.5px] text-fg-mid">
                A typed SDK with sensible defaults and explicit guardrails. No magic — just primitives that compose.
              </p>
            </div>
            <CodeBlock
              filename="copilot.ts"
              code={`import { ViomCopilot } from "@viom/sdk";

const copilot = new ViomCopilot({
  model: "claude-sonnet-4.6",
  context: { repo: "your-org/your-repo", scope: "engineering" },
  guardrails: ["pii-redact", "no-prod-writes"],
});

const reply = await copilot.ask({
  user: "u_8821",
  prompt: "Summarize the top 3 P1 incidents this week.",
});`}
            />
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>// HOW WE INTEGRATE</Eyebrow>
            <h2 className="h2 max-w-[760px]">
              <span className="acc">Four steps.</span>
              <span className="wht">Two to four weeks.</span>
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-card-lg border border-line-dark bg-line-dark md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-card p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
                  Step {s.n}
                </span>
                <h3 className="text-[22px] font-semibold text-fg">{s.t}</h3>
                <p className="text-[14px] text-fg-mid">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark">
        <CTABand
          accent="Get the right copilot live"
          white="in your stack — not a slide deck."
          primary={{ label: "Book AI Consultation", href: "/book-call" }}
          secondary={{ label: "See pricing", href: "/contact" }}
        />
      </Section>
    </>
  );
}
