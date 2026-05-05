import { CountUp } from "../motion/CountUp";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  caption?: string;
};

export function StatBlock({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-card-lg border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <li key={s.label} className="flex flex-col gap-3 bg-card p-7">
          <p className="font-mono text-fluid-stat font-medium text-accent">
            {s.prefix}
            <CountUp to={s.value} decimals={s.decimals ?? 0} />
            {s.suffix}
          </p>
          <p className="text-[15px] font-medium text-fg">{s.label}</p>
          {s.caption && <p className="text-[13px] text-fg-mid">{s.caption}</p>}
        </li>
      ))}
    </ul>
  );
}
