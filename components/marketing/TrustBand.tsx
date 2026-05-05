import { Container } from "../primitives/Container";
import { Card } from "../primitives/Card";
import { Reveal } from "../motion/Reveal";
import { ArrowGlyph } from "../primitives/ArrowGlyph";

const ITEMS = [
  {
    label: "OUTCOME · FINANCE",
    title: "Reconciliation closed in hours, not weeks.",
    sub: "Tier-1 bank, 240k transactions/day",
    pattern: "diag",
  },
  {
    label: "OUTCOME · HEALTHCARE",
    title: "Prior auth approvals, 6× faster.",
    sub: "National payer network",
    pattern: "grid",
  },
  {
    label: "OUTCOME · LOGISTICS",
    title: "Dispatch resolution without humans in the loop.",
    sub: "Global 3PL, 12 markets",
    pattern: "rings",
  },
] as const;

function Composition({ pattern }: { pattern: "diag" | "grid" | "rings" }) {
  if (pattern === "diag") {
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full">
        <defs>
          <linearGradient id="d1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4ADE80" stopOpacity="0.6" />
            <stop offset="1" stopColor="#00FFA3" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={i * 15 - 30}
            y1={0}
            x2={i * 15 + 60}
            y2={120}
            stroke="url(#d1)"
            strokeWidth={i % 4 === 0 ? "2" : "0.6"}
            opacity={0.55}
          />
        ))}
        <circle cx="155" cy="40" r="22" fill="none" stroke="#00FFA3" strokeWidth="1.2" opacity="0.7" />
        <circle cx="155" cy="40" r="3" fill="#00FFA3" />
      </svg>
    );
  }
  if (pattern === "grid") {
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 14 }).map((_, c) => {
            const filled = (r + c) % 5 === 0;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 14 + 6}
                y={r * 14 + 4}
                width="4"
                height="4"
                fill={filled ? "#4ADE80" : "rgba(255,255,255,0.08)"}
              />
            );
          }),
        )}
        <path
          d="M0 60 Q 100 30 200 70"
          fill="none"
          stroke="#00FFA3"
          strokeWidth="1.5"
          opacity="0.85"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <g transform="translate(100 60)" fill="none" stroke="#4ADE80" strokeWidth="1">
        {[20, 35, 50, 65].map((r, i) => (
          <circle
            key={r}
            r={r}
            opacity={0.7 - i * 0.12}
            strokeDasharray={i % 2 ? "4 6" : "0"}
          />
        ))}
        <circle r="4" fill="#00FFA3" stroke="none" />
        {/* radial ticks */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 70}
              y1={Math.sin(a) * 70}
              x2={Math.cos(a) * 78}
              y2={Math.sin(a) * 78}
              opacity="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function TrustBand() {
  return (
    <Container>
      <div className="grid gap-5 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06}>
            <Card variant="interactive" className="flex h-full flex-col">
              <div className="aspect-[16/10] border-b border-line-dark bg-elev/40 p-2">
                <Composition pattern={item.pattern} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
                  {item.label}
                </span>
                <h3 className="text-[19px] font-semibold leading-[1.3] text-fg">
                  {item.title}
                </h3>
                <p className="text-[14px] text-fg-mid">{item.sub}</p>
                <div className="mt-auto pt-3">
                  <span className="inline-flex items-center gap-2 text-[13px] text-accent transition-transform">
                    Read story <ArrowGlyph />
                  </span>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
