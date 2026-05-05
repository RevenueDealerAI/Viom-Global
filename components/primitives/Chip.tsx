import { cn } from "@/lib/cn";

type Variant = "eyebrow" | "industry" | "status";

type Props = {
  variant?: Variant;
  pulse?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Chip({
  variant = "eyebrow",
  pulse,
  icon,
  children,
  className,
}: Props) {
  if (variant === "industry") {
    return (
      <button
        className={cn(
          "group inline-flex min-h-[44px] items-center justify-center gap-[8px] rounded-pill border border-line-light bg-paper px-3 py-[10px] sm:gap-[10px] sm:px-5",
          "text-[13px] font-medium text-fg-on-light sm:text-[14px]",
          "transition-[background,border-color,color,transform] duration-200 ease-out-expo",
          "hover:bg-brand hover:border-brand hover:text-paper hover:-translate-y-[1px]",
          className,
        )}
      >
        {icon && (
          <span className="text-brand transition-transform duration-200 ease-out-expo group-hover:rotate-[6deg] group-hover:text-paper">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === "status") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-[8px] rounded-pill border border-line-strong bg-card/60",
          "px-[10px] py-[4px] font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid",
          className,
        )}
      >
        <span
          className="h-[6px] w-[6px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
          style={
            pulse
              ? { animation: "pulse-dot 2s var(--ease-out-expo) infinite" }
              : undefined
          }
        />
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[10px] font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-fg-mid",
        className,
      )}
    >
      {pulse && (
        <span
          className="h-[6px] w-[6px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
          style={{ animation: "pulse-dot 2s var(--ease-out-expo) infinite" }}
        />
      )}
      {children}
    </span>
  );
}
