import { Card } from "../primitives/Card";
import { CodeBlock } from "../primitives/CodeBlock";

export function MockupAutomation() {
  return (
    <Card variant="mockup" className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-dark px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid sm:px-5">
        <span className="inline-flex items-center gap-2">
          <span className="h-[6px] w-[6px] rounded-full bg-signal" />
          Incident · summarized by AI
        </span>
        <span className="text-fg-low">14:02:41 UTC</span>
      </div>
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="rounded-card border border-line-dark bg-elev/60 p-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-low">User</p>
          <p className="mt-1 text-[14.5px] text-fg">Why is checkout failing in eu-west-1?</p>
        </div>
        <div className="rounded-card border border-accent/20 bg-accent/5 p-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">Viom Copilot</p>
          <ol className="mt-2 space-y-2 font-mono text-[13px] leading-[1.55] text-fg">
            <li>1. Detected: payment-svc latency spike, 3 regions</li>
            <li>2. Triaged: pinned to release v2.41.0</li>
            <li>3. Action: auto-rolled back, paged on-call, opened CAB</li>
            <li>4. ETA: SLA breach avoided by 14 min</li>
          </ol>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
          <span>// 4 actions taken automatically</span>
          <span className="text-signal">resolved</span>
        </div>
      </div>
    </Card>
  );
}

export function MockupCopilot() {
  return (
    <Card variant="mockup">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="border-b border-line-dark p-5 lg:border-b-0 lg:border-r">
          <CodeBlock
            filename="incidents.ts"
            code={`import { ViomCopilot } from "@viom/sdk";

const copilot = new ViomCopilot({
  model: "claude-sonnet-4.5",
  guardrails: ["pii-redact"],
});

const summary = await copilot.ask({
  prompt: "Top 3 P1 incidents this week."
});`}
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">// inline suggestion</p>
          <div className="rounded-card border border-accent/30 bg-accent/5 p-3 font-mono text-[12.5px] leading-[1.6] text-fg">
            ✦ Add `groupBy: 'service'`
            <br />
            <span className="text-fg-mid">to surface the noisiest service first</span>
          </div>
          <div className="rounded-card border border-line-dark bg-elev/40 p-3 font-mono text-[12px] text-fg-mid">
            ↳ avg. eval score: <span className="text-accent">0.94</span>
            <br />
            ↳ fallback: <span className="text-signal">claude-haiku</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function MockupTeams() {
  const team = [
    { initials: "MC", role: "AI Engineer", chips: ["LLM apps", "RAG"] },
    { initials: "SR", role: "ML Engineer", chips: ["MLOps", "PyTorch"] },
    { initials: "JT", role: "Prompt Engineer", chips: ["evals", "agents"] },
    { initials: "AK", role: "Data Engineer", chips: ["dbt", "vector DBs"] },
  ];
  return (
    <Card variant="mockup">
      <div className="flex items-center justify-between border-b border-line-dark px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid">
        <span>Your Embedded Roster · Q2</span>
        <span className="inline-flex items-center gap-2 text-signal">
          <span className="h-[6px] w-[6px] rounded-full bg-signal" />
          live
        </span>
      </div>
      <ul className="divide-y divide-line-dark">
        {team.map((m) => (
          <li key={m.initials} className="flex items-center gap-4 px-5 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-card border border-line-strong bg-elev font-mono text-[12px] text-fg">
              {m.initials}
            </span>
            <div className="flex-1">
              <p className="text-[14px] text-fg">{m.role}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-low">
                Embedded · cross-functional
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              {m.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-pill border border-line-strong px-3 py-1 font-mono text-[11px] text-fg-mid"
                >
                  {c}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function MockupPlatform() {
  return (
    <Card variant="mockup">
      <div className="flex items-center justify-between border-b border-line-dark px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid">
        <span>Workflow Graph · prod-eu-west-1</span>
        <span className="text-fg-low">99.97% uptime · 30d</span>
      </div>
      <div className="relative h-[260px] overflow-hidden p-5">
        <svg viewBox="0 0 400 220" className="h-full w-full">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="#4ADE80" />
            </marker>
          </defs>
          {[
            { x: 30, y: 30, l: "Trigger" },
            { x: 30, y: 110, l: "Ingest" },
            { x: 30, y: 190, l: "Source" },
            { x: 170, y: 70, l: "Classify" },
            { x: 170, y: 150, l: "Enrich" },
            { x: 310, y: 110, l: "Action" },
          ].map((n) => (
            <g key={n.l}>
              <rect
                x={n.x}
                y={n.y - 14}
                width="80"
                height="28"
                rx="14"
                fill="rgba(11,95,74,0.4)"
                stroke="#4ADE80"
                strokeOpacity="0.5"
              />
              <text
                x={n.x + 40}
                y={n.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontFamily="JetBrains Mono"
                fill="#F2F5F3"
              >
                {n.l}
              </text>
            </g>
          ))}
          {[
            ["110,30", "170,70"],
            ["110,110", "170,70"],
            ["110,110", "170,150"],
            ["110,190", "170,150"],
            ["250,70", "310,110"],
            ["250,150", "310,110"],
          ].map(([a, b], i) => (
            <line
              key={i}
              x1={a.split(",")[0]}
              y1={a.split(",")[1]}
              x2={b.split(",")[0]}
              y2={b.split(",")[1]}
              stroke="#4ADE80"
              strokeWidth="1"
              opacity="0.6"
              markerEnd="url(#arr)"
            />
          ))}
        </svg>
      </div>
    </Card>
  );
}

export function MockupIndustries() {
  return (
    <Card variant="mockup">
      <div className="grid h-full grid-cols-2 gap-px bg-line-dark">
        {[
          { l: "Healthcare", k: "↓ 41%", v: "denied claims" },
          { l: "Finance", k: "↓ 73%", v: "manual recon" },
          { l: "Logistics", k: "↑ 3.2×", v: "throughput" },
          { l: "SaaS", k: "+19", v: "NPS lift" },
        ].map((c) => (
          <div key={c.l} className="bg-card p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
              {c.l}
            </span>
            <p className="mt-3 font-mono text-[28px] text-accent">{c.k}</p>
            <p className="mt-1 text-[13px] text-fg-mid">{c.v}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
