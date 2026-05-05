import { cn } from "@/lib/cn";

type Props = {
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ dot = true, children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[10px] font-mono text-[12px] font-medium uppercase",
        "tracking-[0.14em] text-fg-mid",
        className,
      )}
    >
      {dot && (
        <span
          className="h-[6px] w-[6px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
          style={{ animation: "pulse-dot 2s var(--ease-out-expo) infinite" }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
